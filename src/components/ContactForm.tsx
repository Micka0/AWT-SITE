"use client";

import { useEffect, useId, useState } from "react";
import { services } from "@/lib/site";
import { contactSchema } from "@/lib/contact-schema";
import { cn } from "@/lib/cn";
import { useQuote } from "./QuoteProvider";
import { buttonClass } from "./ui";

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl font-normal border border-line bg-surface px-4 py-3 text-[15px] text-fg outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/30 aria-[invalid=true]:border-accent";

export default function ContactForm() {
  const uid = useId();
  const { service: picked } = useQuote();
  const [service, setService] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");

  // Pré-remplit le service quand on clique sur « Demander un devis »
  useEffect(() => {
    if (picked) setService(picked);
  }, [picked]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = contactSchema.safeParse({ ...data, service });
    if (!parsed.success) {
      const fe: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Errors;
        if (k in { name: 1, email: 1, phone: 1, message: 1 } && !fe[k]) fe[k] = issue.message;
      }
      setErrors(fe);
      setStatus("idle");
      form.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, service }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; fieldErrors?: Errors };
      if (res.ok) {
        setStatus("sent");
        form.reset();
        setService("");
      } else if (res.status === 422 && json.fieldErrors) {
        setErrors(json.fieldErrors);
        setStatus("idle");
      } else {
        setServerMsg(json.error ?? "Une erreur est survenue. Réessayez dans un instant.");
        setStatus("error");
      }
    } catch {
      setServerMsg("Connexion impossible. Vérifiez votre réseau et réessayez.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="grid gap-4 rounded-2xl bg-bg p-8 text-fg shadow-[0_20px_50px_rgba(0,0,0,.25)]">
        <div className="grid size-12 place-items-center rounded-full bg-brand text-white">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold">Message envoyé.</h3>
        <p className="text-muted">Merci ! Notre équipe vous répond sous 24 h.</p>
        <button type="button" onClick={() => setStatus("idle")} className={buttonClass("line", "sm", "w-fit")}>
          Envoyer un autre message
        </button>
      </div>
    );
  }

  const id = (n: string) => `${uid}-${n}`;
  const err = (n: keyof Errors) => (
    errors[n] ? (
      <span id={id(`${n}-err`)} className="mt-1 block text-sm text-accent">
        {errors[n]}
      </span>
    ) : null
  );
  const aria = (n: keyof Errors) =>
    ({ "aria-invalid": !!errors[n], "aria-describedby": errors[n] ? id(`${n}-err`) : undefined }) as const;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-4 rounded-2xl bg-bg p-6 text-fg shadow-[0_20px_50px_rgba(0,0,0,.25)] sm:p-8"
    >
      <div>
        <h3 className="text-2xl font-bold">Parlons de votre projet</h3>
        <p className="mt-1 text-sm text-muted">Réponse sous 24 h. Audit stratégique offert, sans engagement.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor={id("name")} className="grid gap-1.5 text-sm font-semibold">
          Nom complet
          <input id={id("name")} name="name" autoComplete="name" required className={field} placeholder="Awa Koné" {...aria("name")} />
          {err("name")}
        </label>
        <label htmlFor={id("email")} className="grid gap-1.5 text-sm font-semibold">
          E-mail
          <input id={id("email")} name="email" type="email" autoComplete="email" required className={field} placeholder="awa@entreprise.com" {...aria("email")} />
          {err("email")}
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor={id("phone")} className="grid gap-1.5 text-sm font-semibold">
          <span>Téléphone <span className="font-normal text-muted">(facultatif)</span></span>
          <input id={id("phone")} name="phone" type="tel" autoComplete="tel" className={field} placeholder="+225 …" {...aria("phone")} />
          {err("phone")}
        </label>
        <label htmlFor={id("service")} className="grid gap-1.5 text-sm font-semibold">
          Sujet
          <select
            id={id("service")}
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={cn(field, "cursor-pointer")}
          >
            <option value="">Audit stratégique gratuit</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label htmlFor={id("message")} className="grid gap-1.5 text-sm font-semibold">
        Votre besoin
        <textarea id={id("message")} name="message" rows={4} required className={cn(field, "resize-y")} placeholder="Décrivez brièvement votre projet, votre secteur et vos échéances." {...aria("message")} />
        {err("message")}
      </label>

      {/* Champ piège anti-spam : invisible pour les humains */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Ne pas remplir
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div aria-live="polite">
        {status === "error" && <p className="rounded-xl border border-accent/50 bg-accent/10 px-4 py-3 text-sm text-accent">{serverMsg}</p>}
      </div>

      <button type="submit" disabled={status === "sending"} className={buttonClass("red", "md", "w-full")}>
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
      <p className="text-xs text-muted">Vos informations servent uniquement à répondre à votre demande.</p>
    </form>
  );
}
