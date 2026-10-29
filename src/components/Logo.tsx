import { cn } from "@/lib/cn";

/** Marque AWT (vague + T), reprise à l’identique du logo officiel. */
export function AwtMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-6 -12 192 100" aria-hidden="true" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 74 L30 16 Q38 -2 46 16 L58 56 Q64 72 70 56 L80 22 Q86 6 92 22 L102 56 Q108 72 114 56 L122 36" />
        <path d="M128 8 H178" />
        <path d="M153 8 L146 74" />
      </g>
    </svg>
  );
}

const WAVE_PATH =
  "M0 130 Q100 40 200 130 " +
  Array.from({ length: 15 }, (_, i) => `T${400 + i * 200} 130`).join(" ") +
  " V260 H0Z";

export type WaveLayer = { speed: "a" | "b" | "c"; fill: "white" | "bg"; opacity?: number };

/** Vagues animées en bas d’une bande de couleur. */
export function Waves({ layers, className }: { layers: WaveLayer[]; className?: string }) {
  const anim = { a: "animate-drift-a", b: "animate-drift-b", c: "animate-drift-c" } as const;
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[260px]", className)}
    >
      {layers.map((l, i) => (
        <svg
          key={i}
          viewBox="0 0 3200 260"
          preserveAspectRatio="none"
          style={{ opacity: l.opacity }}
          className={cn(
            "absolute bottom-0 left-0 h-full w-[3200px] motion-reduce:animate-none",
            anim[l.speed],
            l.fill === "white" ? "fill-white" : "fill-bg",
          )}
        >
          <path d={WAVE_PATH} />
        </svg>
      ))}
    </div>
  );
}
