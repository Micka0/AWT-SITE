import { company } from "@/lib/site";
import { Waves } from "./Logo";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative mt-[110px] overflow-hidden bg-brand pb-[170px] pt-20 text-white">
      <div className="wrap relative z-[2] grid items-start gap-12 min-[960px]:grid-cols-[1fr_1.05fr]">
        <Reveal className="grid gap-[22px]">
          <span className="text-xs font-semibold uppercase tracking-[.14em] text-white/85">Contact</span>
          <h2 className="text-[clamp(32px,5vw,58px)] font-extrabold">Démarrons votre transformation dès aujourd’hui.</h2>
          <p className="text-lg opacity-95">Audit stratégique offert, sans engagement. Notre équipe vous rappelle sous 24 h.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            {["Audit 100 % gratuit", "Réponse sous 24 h", "Sans engagement"].map((c) => (
              <span key={c} className="before:content-['✓_']">{c}</span>
            ))}
          </div>
          <a
            href={`https://wa.me/${company.phoneDigits}?text=${encodeURIComponent("Bonjour AWT, je souhaite discuter de mes besoins en transformation digitale.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-white/70 px-5 py-2.5 text-[15px] font-semibold transition hover:bg-white/15"
          >
            Écrire sur WhatsApp
          </a>
          <div className="mt-1.5 grid gap-2 text-[15px]">
            <span>
              <b className="mr-1.5 font-semibold opacity-80">E-mail</b>
              <a href={`mailto:${company.email}`} className="underline-offset-4 hover:underline">{company.email}</a>
            </span>
            <span>
              <b className="mr-1.5 font-semibold opacity-80">Téléphone</b>
              <a href={`tel:+${company.phoneDigits}`} className="underline-offset-4 hover:underline">{company.phone}</a>
            </span>
            <span>
              <b className="mr-1.5 font-semibold opacity-80">Adresse</b>
              {company.address}
            </span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
      <Waves
        className="h-[140px] opacity-90"
        layers={[
          { speed: "b", fill: "white", opacity: 0.5 },
          { speed: "c", fill: "white", opacity: 0.28 },
        ]}
      />
    </section>
  );
}
