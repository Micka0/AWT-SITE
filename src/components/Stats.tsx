"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/site";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLElement>(null);
  const [n, setN] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1300;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setN(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <b ref={ref} aria-label={`${value}${suffix}`} className="block font-display text-[clamp(30px,4vw,44px)] font-extrabold tracking-[-.03em] tabular-nums">
      <span aria-hidden="true">
        {n}
        {suffix}
      </span>
    </b>
  );
}

export default function Stats() {
  return (
    <div
      className="relative z-[3] -mt-[72px] grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] overflow-hidden rounded-[14px] border border-line bg-surface"
      role="group"
      aria-label="Chiffres clés (exemples à remplacer)"
    >
      {stats.map((s) => (
        <div key={s.label} className="-mb-px -mr-px border-b border-r border-line px-6 py-[26px]">
          <CountUp value={s.value} suffix={s.suffix} />
          <span className="text-sm text-muted">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
