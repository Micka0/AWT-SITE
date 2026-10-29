"use client";

import { useState } from "react";
import { services, type Service } from "@/lib/site";
import { formatPrice, type Currency } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Icon } from "@/lib/icons";
import { useQuote } from "./QuoteProvider";
import Reveal from "./Reveal";

function Bullets({ items, hot }: { items: React.ReactNode[]; hot?: boolean }) {
  return (
    <ul className={cn("mt-1 grid list-none p-0", hot ? "gap-2 text-[15px]" : "gap-1.5 text-sm")}>
      {items.map((it, i) => (
        <li
          key={i}
          className={cn(
            "flex gap-2.5 before:mt-[11px] before:w-3.5 before:flex-none before:content-['']",
            hot ? "before:h-[3px] before:bg-brand" : "before:h-0.5 before:bg-accent",
          )}
        >
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function PriceBlock({ s, currency }: { s: Service; currency: Currency }) {
  const { setService } = useQuote();
  const price = s.from ? formatPrice(s.from, currency) : null;
  return (
    <div className="mt-auto pt-2.5">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2.5 border-t border-line pt-4">
        <div>
          <small className="block text-xs font-semibold uppercase tracking-[.08em] text-muted">
            {price ? "À partir de" : "Tarif"}
          </small>
          <strong className="font-display text-[26px] font-extrabold leading-[1.1] tracking-[-.02em] tabular-nums">
            {price ? (
              <>
                {price.amount}
                <em className="ml-1 font-sans text-sm font-semibold not-italic tracking-normal text-muted">
                  {price.unit}
                </em>
              </>
            ) : (
              "Sur devis"
            )}
          </strong>
        </div>
        <a
          href="#contact"
          onClick={() => setService(s.id)}
          className="whitespace-nowrap text-sm font-semibold text-accent no-underline underline-offset-4 hover:underline"
        >
          {s.soon ? "Être prévenu du lancement →" : "Demander un devis →"}
        </a>
      </div>
    </div>
  );
}

function ServiceCard({ s, currency }: { s: Service; currency: Currency }) {
  return (
    <article className="flex h-full min-w-0 flex-col gap-3 rounded-[14px] border border-line bg-surface p-7 transition duration-200 hover:-translate-y-[3px] hover:border-brand motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="grid size-11 place-items-center rounded-xl bg-brand text-white">
        <Icon name={s.icon} className="size-6" />
      </div>
      <h3 className="text-[21px] font-bold">
        {s.title}
        {s.soon && (
          <span className="ml-2 inline-block rounded-full border-[1.5px] border-accent px-[9px] py-[3px] align-middle text-[11px] font-bold uppercase tracking-[.08em] text-accent">
            Bientôt
          </span>
        )}
      </h3>
      <p className="text-[15px] text-muted">{s.description}</p>
      {s.bullets && <Bullets items={s.bullets} />}
      <PriceBlock s={s} currency={currency} />
    </article>
  );
}

/** Bandeau pleine largeur : les cibles prioritaires (Fintech, GouvTech) */
function SectorCard({ s, currency }: { s: Service; currency: Currency }) {
  const sector = s.sector!;
  return (
    <article className="relative grid min-w-0 gap-8 rounded-[14px] border border-brand bg-surface p-7 shadow-[inset_0_0_0_1px_var(--color-brand)] transition duration-200 hover:-translate-y-[3px] motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:grid-cols-[1fr_1.25fr] lg:gap-12 lg:p-9">
      <span className="absolute right-5 top-5 rounded-full bg-brand px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-[.08em] text-white">
        Priorité
      </span>
      <div className="flex flex-col gap-3">
        <div className="grid size-11 place-items-center rounded-xl bg-brand text-white">
          <Icon name={s.icon} className="size-6" />
        </div>
        <h3 className="text-[26px] font-bold">{s.title}</h3>
        <p className="max-w-[48ch] text-[15px] text-muted">{s.description}</p>
        <PriceBlock s={s} currency={currency} />
      </div>
      <div className="grid content-center gap-4">
        <div className="text-xs font-bold uppercase tracking-[.1em] text-accent">Cibles prioritaires</div>
        <div className="grid gap-3 sm:grid-cols-2">
          {sector.priorities.map((p) => (
            <div key={p.name} className="rounded-xl border border-brand/40 bg-bg p-5">
              <b className="font-display text-2xl font-extrabold tracking-[-.02em]">{p.name}</b>
              <p className="mt-1.5 text-[15px] text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted">
          <span className="mr-2 text-xs font-bold uppercase tracking-[.1em]">Autres secteurs</span>
          {sector.others}
        </p>
      </div>
    </article>
  );
}

export default function ServicesGrid() {
  const [currency, setCurrency] = useState<Currency>("XOF");

  return (
    <>
      <div
        role="group"
        aria-label="Devise d’affichage des tarifs"
        className="mb-6 inline-flex rounded-full border border-line bg-surface p-1 text-sm font-semibold"
      >
        {(["XOF", "EUR"] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={currency === c}
            onClick={() => setCurrency(c)}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 transition",
              currency === c ? "bg-brand text-white" : "text-muted hover:text-fg",
            )}
          >
            {c === "XOF" ? "FCFA" : "Euro"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal
            key={s.id}
            delay={(i % 3) * 70}
            className={cn("h-full", s.sector && "md:col-span-2 lg:col-span-3")}
          >
            {s.sector ? <SectorCard s={s} currency={currency} /> : <ServiceCard s={s} currency={currency} />}
          </Reveal>
        ))}
      </div>

      <p className="mt-4 text-[13px] text-muted">
        Tarifs indicatifs hors taxes. Le prix final dépend du périmètre, validé après l’audit gratuit. Montants
        d’exemple à remplacer par vos tarifs réels.
        {currency === "EUR" && " Conversion indicative au taux fixe de 1 € = 655,957 FCFA."}
      </p>
    </>
  );
}
