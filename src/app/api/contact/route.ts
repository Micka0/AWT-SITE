import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { company, services } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Anti-abus simple en mémoire : 5 envois / 10 min / IP (suffisant pour un site vitrine ;
   utilisez Upstash/Redis si vous déployez sur plusieurs instances). */
const WINDOW_MS = 10 * 60_000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_HITS;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type Delivery = "sent" | "dev" | "unconfigured";

async function deliver(d: ContactInput, subjectLabel: string): Promise<Delivery> {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CONTACT_WEBHOOK_URL } = process.env;

  if (RESEND_API_KEY && CONTACT_TO_EMAIL) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL ?? `${company.name} <onboarding@resend.dev>`,
        to: [CONTACT_TO_EMAIL],
        reply_to: d.email,
        subject: `[Site AWT] ${subjectLabel} : ${d.name}`,
        text: `Nom : ${d.name}\nE-mail : ${d.email}\nTéléphone : ${d.phone || "-"}\nSujet : ${subjectLabel}\n\n${d.message}`,
        html: `<p><b>Nom :</b> ${esc(d.name)}<br><b>E-mail :</b> ${esc(d.email)}<br><b>Téléphone :</b> ${esc(d.phone || "-")}<br><b>Sujet :</b> ${esc(subjectLabel)}</p><p>${esc(d.message).replace(/\n/g, "<br>")}</p>`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
    return "sent";
  }

  if (CONTACT_WEBHOOK_URL) {
    const res = await fetch(CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "awt-website",
        receivedAt: new Date().toISOString(),
        ...d,
        service: subjectLabel,
        website: undefined,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook ${res.status}`);
    return "sent";
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[contact] (mode développement, rien n’est envoyé)", { ...d, service: subjectLabel });
    return "dev";
  }
  return "unconfigured";
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Champ piège rempli : on répond « ok » sans rien faire pour ne pas renseigner les robots.
  if (typeof body === "object" && body && "website" in body && String((body as { website: unknown }).website).trim()) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Certains champs sont invalides.", fieldErrors: Object.fromEntries(Object.entries(z.flattenError(parsed.error).fieldErrors).map(([k, v]) => [k, v?.[0]])) },
      { status: 422 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Trop de demandes. Réessayez dans quelques minutes." }, { status: 429 });
  }

  const subjectLabel = services.find((s) => s.id === parsed.data.service)?.title ?? "Audit stratégique gratuit";

  try {
    const result = await deliver(parsed.data, subjectLabel);
    if (result === "unconfigured") {
      console.error("[contact] Aucun service d’envoi configuré (RESEND_API_KEY ou CONTACT_WEBHOOK_URL).");
      return NextResponse.json(
        { error: `L’envoi est momentanément indisponible. Écrivez-nous à ${company.email}.` },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] échec d’envoi", e);
    return NextResponse.json(
      { error: `Votre message n’a pas pu être envoyé. Écrivez-nous à ${company.email}.` },
      { status: 502 },
    );
  }
}
