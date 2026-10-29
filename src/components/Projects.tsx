import { projects } from "@/lib/site";
import { projectArt } from "./ProjectArt";
import { SectionHead } from "./ui";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="realisations" className="pt-24">
      <SectionHead
        eyebrow="Réalisations"
        title="Des projets qui laissent une trace."
        text="Trois emplacements prêts à accueillir vos vraies références."
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[18px]">
        {projects.map((p, i) => {
          const Art = projectArt[p.id];
          return (
            <Reveal key={p.id} delay={i * 90} className="h-full">
              <article className="group h-full min-w-0 overflow-hidden rounded-[14px] border border-line bg-surface transition duration-200 hover:-translate-y-[3px] hover:border-brand hover:shadow-[0_14px_34px_rgba(0,0,0,.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div role="img" aria-label={p.alt} className="relative aspect-[20/11] overflow-hidden bg-brand">
                  <Art className="absolute inset-0 size-full transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                </div>
                <div className="grid gap-2 p-[22px]">
                  <small className="text-xs font-semibold uppercase tracking-[.1em] text-accent">{p.category}</small>
                  <h3 className="text-[19px]">{p.title}</h3>
                  <p className="text-[15px] text-muted">{p.text}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
      <p className="mt-4 text-[13px] text-muted">
        Exemples de présentation. Remplacez les visuels et les textes par vos projets réels, avec captures d’écran,
        noms de clients et résultats mesurés.
      </p>
    </section>
  );
}
