import { company, footerServices, nav } from "@/lib/site";
import { AwtMark } from "./Logo";

export default function Footer() {
  const entreprise = nav.filter((n) => n.id !== "services");
  return (
    <footer className="wrap pb-10 pt-14">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-9">
        <div className="grid content-start gap-3.5">
          <AwtMark className="w-[84px] text-accent" />
          <p className="max-w-[34ch] text-[15px] text-muted">
            {company.name}. {company.tagline} Une société du groupe {company.group}.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-display text-[13px] font-bold uppercase tracking-[.12em] text-muted">Services</h4>
          <ul className="grid list-none gap-2 p-0 text-[15px]">
            {footerServices.map((s) => (
              <li key={s}>
                <a href="#services" className="no-underline hover:text-accent">{s}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-[13px] font-bold uppercase tracking-[.12em] text-muted">Entreprise</h4>
          <ul className="grid list-none gap-2 p-0 text-[15px]">
            {entreprise.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="no-underline hover:text-accent">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap justify-between gap-2.5 border-t border-line pt-5 text-[13px] text-muted">
        <span>© {new Date().getFullYear()} {company.name}. Tous droits réservés.</span>
        <span>{company.group}</span>
      </div>
    </footer>
  );
}
