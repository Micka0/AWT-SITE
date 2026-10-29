import { why } from "@/lib/site";
import { SectionHead } from "./ui";
import Reveal from "./Reveal";

export default function Why() {
  return (
    <section id="pourquoi" className="pt-24">
      <SectionHead eyebrow="Pourquoi AWT" title="Ce qui nous distingue d’un prestataire classique." />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-10 gap-y-[30px]">
        {why.map((w, i) => (
          <Reveal key={w.title} delay={(i % 3) * 80} className="border-l-[3px] border-brand pl-[18px]">
            <h3 className="mb-1.5 text-[19px]">{w.title}</h3>
            <p className="text-[15px] text-muted">{w.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
