"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { cn } from "@/lib/cn";
import { useActiveSection } from "@/lib/useActiveSection";
import { AwtMark } from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { buttonClass } from "./ui";

const ids = nav.map((n) => n.id);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] text-white transition-[background-color,box-shadow] duration-300",
        scrolled || open ? "bg-brand shadow-[0_6px_24px_rgba(0,0,0,.2)]" : "bg-transparent",
      )}
    >
      <nav className="wrap flex items-center justify-between gap-4 py-3.5" aria-label="Navigation principale">
        <a
          href="#top"
          aria-label="Africa Wave Technology, accueil"
          className="flex items-center gap-3 text-white no-underline"
          onClick={() => setOpen(false)}
        >
          <AwtMark className="h-auto w-16 flex-none" />
          <b className="hidden font-display text-[15px] leading-[1.1] tracking-[.02em] min-[560px]:block">
            AFRICA WAVE
            <br />
            TECHNOLOGY
          </b>
        </a>

        <div className="hidden gap-[26px] text-sm font-medium min-[900px]:flex">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? "true" : undefined}
              className={cn(
                "underline-offset-[6px] decoration-2 hover:underline hover:opacity-100",
                active === n.id ? "underline opacity-100" : "no-underline opacity-90",
              )}
            >
              {n.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a href="#contact" className={buttonClass("white", "sm", "hidden min-[420px]:inline-flex")}>
            Audit gratuit
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 cursor-pointer place-items-center rounded-full border-2 border-white/60 bg-transparent text-white min-[900px]:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-[18px]" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div id="menu-mobile" className="border-t border-white/25 bg-brand min-[900px]:hidden">
          <div className="wrap grid gap-1 py-4">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 font-display text-lg font-semibold no-underline hover:bg-white/10",
                  active === n.id && "bg-white/15",
                )}
              >
                {n.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className={buttonClass("white", "md", "mt-2")}>
              Demander un audit gratuit
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
