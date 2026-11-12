/**
 * Official Mel Milap mark: two figures (a large and a small "m") standing
 * together on a mango line. Geometry copied from public/brand/Mel-Milap-icon.svg.
 * The full lockups (with the endorsement line) live in public/brand/.
 */
export const brandColours = {
  navy: "#1E2A78",
  pink: "#C8185A",
  pinkOnDark: "#FF7AAB",
  mango: "#F5A623",
};

export function LogoMark({ className, tone = "dark", size }: { className?: string; tone?: "dark" | "light"; size?: number }) {
  const main = tone === "light" ? "#FFFFFF" : brandColours.navy;
  const small = tone === "light" ? brandColours.pinkOnDark : brandColours.pink;
  return (
    <svg viewBox="0 0 88 88" width={size} height={size} className={className} aria-hidden="true">
      <g transform="translate(-7 -11)">
        <g fill="none" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 76 V 54 Q 12 42 23 42 Q 34 42 34 54 V 76 M 34 54 Q 34 42 45 42 Q 56 42 56 54 V 76" stroke={main} />
          <path d="M62 64 Q 62 56 69 56 Q 76 56 76 64 V 76 M 76 64 Q 76 56 83 56 Q 90 56 90 64 V 76" stroke={small} />
        </g>
        <circle cx={34} cy={30} r={5.5} fill={main} />
        <circle cx={76} cy={46} r={4} fill={small} />
        <path d="M12 84 H 90" stroke={brandColours.mango} strokeWidth={2.5} strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** Compact header lockup: official mark with the wordmark set in the site's display face. */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${tone === "light" ? "text-white" : "text-[#1E2A78]"}`}>
      <LogoMark tone={tone} className="h-10 w-10 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 sm:h-12 sm:w-12" />
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap font-display text-[1.15rem] font-extrabold tracking-tight sm:text-[1.35rem]">Mel Milap</span>
        <span className="mt-0.5 text-[0.6rem] font-bold uppercase tracking-[0.3em] opacity-75 sm:text-[0.68rem]">Foundation</span>
      </span>
    </span>
  );
}
