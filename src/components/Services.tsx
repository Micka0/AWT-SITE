import { SectionHead } from "./ui";
import ServicesGrid from "./ServicesGrid";

export default function Services() {
  return (
    <section id="services" className="pt-24">
      <SectionHead
        eyebrow="Nos services"
        title="Sept pôles d’expertise, une seule équipe."
        text="Chaque mission part de vos objectifs métier. Nous choisissons ensuite les technologies, jamais l’inverse."
      />
      <ServicesGrid />
    </section>
  );
}
