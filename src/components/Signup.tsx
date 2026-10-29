import { googleFormUrl } from "@/lib/site";
import { qrSvg } from "@/lib/qr";
import { Eyebrow, buttonClass } from "./ui";
import Reveal from "./Reveal";

const steps = [
  "Ouvrez l’appareil photo de votre téléphone",
  "Pointez-le vers le QR code",
  "Remplissez le formulaire Google Form",
];

export default function Signup() {
  const svg = qrSvg(googleFormUrl);
  const download = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  return (
    <section id="inscription" className="pt-24">
      <Reveal>
        <div className="relative grid items-center gap-8 overflow-hidden rounded-[14px] border border-line bg-surface p-[clamp(24px,4vw,44px)] before:absolute before:inset-y-0 before:left-0 before:w-1.5 before:bg-brand before:content-[''] min-[820px]:grid-cols-[1.25fr_1fr] min-[820px]:pl-[clamp(36px,5vw,64px)]">
          <div className="grid content-center gap-4">
            <Eyebrow>Inscription</Eyebrow>
            <h2 className="text-[clamp(28px,4vw,44px)] font-bold">Inscrivez-vous en scannant le QR code.</h2>
            <p className="max-w-[46ch] text-[17px] text-muted">
              Le formulaire s’ouvre directement sur votre téléphone. Quelques informations suffisent, notre équipe
              revient vers vous rapidement.
            </p>
            <ol className="grid list-none gap-2 p-0 text-[15px]">
              {steps.map((t, i) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid size-[26px] flex-none place-items-center rounded-full bg-brand font-display text-[13px] font-bold text-white">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("red")}>
                Ouvrir le formulaire
              </a>
              <a
                href={download}
                download="awt-inscription-qr.svg"
                className="text-sm font-semibold text-accent no-underline underline-offset-4 hover:underline"
              >
                Télécharger le QR code
              </a>
            </div>
          </div>

          <div className="grid justify-items-center gap-3 justify-self-center text-center">
            <div
              role="img"
              aria-label="QR code vers le formulaire d’inscription Africa Wave Technology"
              className="aspect-square w-[min(78vw,280px)] rounded-2xl border border-line bg-white p-3.5 shadow-[0_10px_30px_rgba(0,0,0,.14)] [&_svg]:block [&_svg]:size-full"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
            <small className="text-[13px] tracking-[.04em] text-muted">Scannez pour vous inscrire</small>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
