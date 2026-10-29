import { steps } from "@/lib/site";
import { SectionHead } from "./ui";
import Reveal from "./Reveal";

export default function Process() {
  return (
    <section id="methode" className="pt-24">
      <SectionHead eyebrow="Méthode" title="De l’idée au déploiement." />
      <ol className="grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] border-t-2 border-fg p-0">
        {steps.map((s, i) => (
          <li key={s.title}>
            <Reveal delay={i * 90} className="pb-2 pr-6 pt-[26px]">
              <span className="mb-2.5 block font-display text-sm font-bold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 text-xl">{s.title}</h3>
              <p className="text-[15px] text-muted">{s.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
