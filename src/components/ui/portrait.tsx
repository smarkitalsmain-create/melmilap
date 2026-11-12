import Image from "next/image";
import type { Leader } from "@/content/types";

const tone = {
  mango: { bg: "#FFBD2E", a: "#D82A63", b: "#2546D8", text: "#2B1538" },
  leaf: { bg: "#18845F", a: "#FFBD2E", b: "#FFF8ED", text: "#FFF8ED" },
};

/**
 * Approved portrait when supplied; otherwise a cut-paper monogram that is
 * clearly an illustration, never a stand-in photograph.
 */
export function Portrait({ leader, className = "", sizes }: { leader: Leader; className?: string; sizes: string }) {
  if (leader.portrait?.approved) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={leader.portrait.src} alt={leader.portrait.alt} fill sizes={sizes} className="object-cover object-[50%_30%]" />
      </div>
    );
  }
  const t = tone[leader.colour];
  return (
    <figure className={`relative overflow-hidden ${className}`} style={{ background: t.bg }}>
      <svg viewBox="0 0 400 480" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle cx="330" cy="70" r="90" fill={t.a} />
        <path d="M0 480 L0 330 A170 170 0 0 1 220 480Z" fill={t.b} />
        <path d="M40 110 C90 60 160 80 190 40" stroke={t.text} strokeWidth="10" strokeLinecap="round" fill="none" opacity=".7" />
        <text x="200" y="300" textAnchor="middle" fontFamily="var(--font-bricolage), sans-serif" fontWeight="800" fontSize="170" fill={t.text} letterSpacing="-8">
          {leader.initials}
        </text>
      </svg>
      <figcaption className="absolute bottom-3 left-3 rounded-full bg-aubergine/85 px-3 py-1 text-xs font-semibold text-cream">
        Illustration · portrait to come
      </figcaption>
    </figure>
  );
}
