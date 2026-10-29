import { cn } from "@/lib/cn";

type Variant = "white" | "ghost" | "red" | "line";
type Size = "md" | "sm";

export function buttonClass(variant: Variant = "red", size: Size = "md", extra?: string) {
  return cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-transparent font-semibold no-underline transition duration-150 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
    size === "md" ? "px-[22px] py-[13px] text-[15px]" : "px-4 py-[9px] text-sm",
    variant === "white" && "bg-white text-[#b51818]",
    variant === "ghost" && "border-white/70 bg-transparent text-white hover:bg-white/10",
    variant === "red" && "bg-brand text-white",
    variant === "line" && "border-line bg-transparent text-fg",
    extra,
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("text-xs font-semibold uppercase tracking-[.14em] text-accent", className)}>
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mb-11 grid max-w-[680px] gap-3.5">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-[clamp(30px,4.4vw,50px)] font-bold">{title}</h2>
      {text && <p className="text-[17px] text-muted">{text}</p>}
    </div>
  );
}
