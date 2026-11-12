/** Mel Milap mark: four cut-paper quarters meeting at the centre. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M18.5 18.5 L18.5 3 A15.5 15.5 0 0 0 3 18.5 Z" fill="#FFBD2E" />
      <path d="M21.5 18.5 L37 18.5 A15.5 15.5 0 0 0 21.5 3 Z" fill="#D82A63" />
      <path d="M21.5 21.5 L21.5 37 A15.5 15.5 0 0 0 37 21.5 Z" fill="#18845F" />
      <path d="M18.5 21.5 L3 21.5 A15.5 15.5 0 0 0 18.5 37 Z" fill="#2546D8" />
      <circle cx="20" cy="20" r="3.2" fill="currentColor" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${tone === "light" ? "text-cream" : "text-aubergine"}`}>
      <LogoMark className="h-8 w-8 shrink-0 sm:h-9 sm:w-9 transition-transform duration-500 group-hover:rotate-90" />
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap font-display text-[1.15rem] font-extrabold tracking-tight sm:text-[1.35rem]">Mel Milap</span>
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] sm:text-[0.68rem] sm:tracking-[0.22em] opacity-80">Foundation</span>
      </span>
    </span>
  );
}
