import { company } from "@/lib/site";
import { AwtMark, Waves } from "./Logo";
import { buttonClass } from "./ui";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand text-white">
      <div className="wrap relative z-[2]">
        <div className="grid max-w-[820px] gap-7 pb-[190px] pt-[140px]">
          <span
            className="inline-flex w-fit animate-fade-up items-center gap-2.5 rounded-full border-[1.5px] border-white/55 px-3.5 py-1.5 text-[13px] font-semibold uppercase tracking-[.06em] motion-reduce:animate-none"
          >
            <i className="block size-2 rounded-full bg-white" />
            Groupe technologique · Afrique
          </span>
          <h1
            className="animate-fade-up text-[clamp(40px,7.4vw,84px)] font-extrabold motion-reduce:animate-none"
            style={{ animationDelay: "90ms" }}
          >
            {company.tagline}
          </h1>
          <p
            className="max-w-[56ch] animate-fade-up text-[clamp(17px,2vw,20px)] opacity-95 motion-reduce:animate-none"
            style={{ animationDelay: "180ms" }}
          >
            Africa Wave Technology conçoit, déploie et sécurise les solutions numériques qui font avancer les
            organisations africaines, de la stratégie digitale jusqu’au support au quotidien.
          </p>
          <div
            className="mt-1.5 flex animate-fade-up flex-wrap gap-3 motion-reduce:animate-none"
            style={{ animationDelay: "270ms" }}
          >
            <a href="#contact" className={buttonClass("white")}>
              Demander un audit gratuit
            </a>
            <a href="#services" className={buttonClass("ghost")}>
              Découvrir nos services
            </a>
          </div>
        </div>
      </div>
      <AwtMark className="absolute right-[max(1rem,3vw)] top-1/2 z-[1] hidden w-[min(34vw,420px)] -translate-y-[58%] text-white opacity-[.14] min-[1000px]:block" />
      <Waves
        layers={[
          { speed: "c", fill: "white", opacity: 0.28 },
          { speed: "b", fill: "white", opacity: 0.5 },
          { speed: "a", fill: "bg" },
        ]}
      />
    </section>
  );
}
