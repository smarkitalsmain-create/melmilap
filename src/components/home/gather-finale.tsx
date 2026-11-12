"use client";

import type { CSSProperties } from "react";
import { useStagedEntrance } from "@/components/motion/use-staged-entrance";

/**
 * Closing illustration: the three cause colours travel in from their corners
 * and gather into one overlapping bloom.
 */
const petals = [
  { colour: "#FFBD2E", cx: 200, cy: 150, from: [-160, -120] },
  { colour: "#D82A63", cx: 150, cy: 236, from: [-170, 150] },
  { colour: "#18845F", cx: 250, cy: 236, from: [170, 150] },
];

const crumbs = [
  { x: 70, y: 70, r: 10, c: "#2546D8", from: [-60, -60] },
  { x: 330, y: 90, r: 7, c: "#D82A63", from: [80, -50] },
  { x: 345, y: 320, r: 12, c: "#FFBD2E", from: [80, 60] },
  { x: 60, y: 330, r: 8, c: "#18845F", from: [-70, 60] },
];

export function GatherFinale({ className = "" }: { className?: string }) {
  const { ref, pending } = useStagedEntrance<HTMLDivElement>(0.4);
  const pieceStyle = (dx: number, dy: number, i: number): CSSProperties => ({
    transformBox: "fill-box",
    transformOrigin: "center",
    transform: pending ? `translate(${dx}px, ${dy}px) scale(0.6)` : "none",
    opacity: pending ? 0 : 1,
    transition: pending ? "none" : `transform 1.1s var(--ease-spring) ${i * 120}ms, opacity 0.5s ease-out ${i * 120}ms`,
  });

  return (
    <div ref={ref} className={className}>
      <svg viewBox="0 0 400 400" role="img" aria-label="Illustration: mango, pink and green circles gather into one overlapping bloom." className="w-full overflow-visible">
        {petals.map((p, i) => (
          <circle key={p.colour} cx={p.cx} cy={p.cy} r={92} fill={p.colour} style={{ ...pieceStyle(p.from[0], p.from[1], i), mixBlendMode: "multiply" }} />
        ))}
        <g style={pieceStyle(0, 40, 3)}>
          <circle cx={200} cy={207} r={30} fill="#2B1538" />
          <path d="M200 186 L205 202 L221 207 L205 212 L200 228 L195 212 L179 207 L195 202Z" fill="#FFF8ED" />
        </g>
        {crumbs.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={c.r} fill={c.c} style={pieceStyle(c.from[0], c.from[1], i + 2)} />
        ))}
      </svg>
    </div>
  );
}
