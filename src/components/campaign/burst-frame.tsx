"use client";

import type { CSSProperties } from "react";
import { useStagedEntrance } from "@/components/motion/use-staged-entrance";

/**
 * Scroll to blast: a handful of paper pieces burst out once from the centre
 * and settle into a frame around the campaign. The frame's resting state is
 * the server-rendered default; the burst only runs when the section is still
 * below the fold, motion is allowed and JS is available.
 */

interface Bit {
  x: string;
  y: string;
  w: number;
  h: number;
  r: number;
  colour: string;
  shape: "circle" | "rect" | "tri" | "arc";
}

const bits: Bit[] = [
  { x: "3%", y: "6%", w: 54, h: 54, r: 0, colour: "#FFBD2E", shape: "circle" },
  { x: "14%", y: "-2%", w: 70, h: 22, r: -12, colour: "#D82A63", shape: "rect" },
  { x: "38%", y: "1%", w: 30, h: 30, r: 20, colour: "#FFF8ED", shape: "tri" },
  { x: "70%", y: "-3%", w: 90, h: 46, r: 8, colour: "#FFBD2E", shape: "arc" },
  { x: "92%", y: "8%", w: 40, h: 40, r: 30, colour: "#D82A63", shape: "tri" },
  { x: "97%", y: "40%", w: 22, h: 80, r: 6, colour: "#FFF8ED", shape: "rect" },
  { x: "94%", y: "78%", w: 60, h: 60, r: 0, colour: "#D82A63", shape: "circle" },
  { x: "72%", y: "96%", w: 80, h: 24, r: -8, colour: "#FFBD2E", shape: "rect" },
  { x: "46%", y: "99%", w: 34, h: 34, r: 45, colour: "#D82A63", shape: "tri" },
  { x: "18%", y: "95%", w: 88, h: 44, r: 180, colour: "#FFF8ED", shape: "arc" },
  { x: "1%", y: "70%", w: 26, h: 26, r: 0, colour: "#FFBD2E", shape: "circle" },
  { x: "-1%", y: "38%", w: 20, h: 70, r: -6, colour: "#D82A63", shape: "rect" },
];

function BitShape({ b }: { b: Bit }) {
  switch (b.shape) {
    case "circle":
      return <span className="block h-full w-full rounded-full" style={{ background: b.colour }} />;
    case "rect":
      return <span className="block h-full w-full rounded-md" style={{ background: b.colour }} />;
    case "tri":
      return <span className="block h-full w-full" style={{ background: b.colour, clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />;
    case "arc":
      return <span className="block h-full w-full rounded-t-full" style={{ background: b.colour }} />;
  }
}

/** Swap the frame's colours to suit the section background. */
const defaultPalette = ["#FFBD2E", "#D82A63", "#FFF8ED"];

export function BurstFrame({ children, palette = defaultPalette }: { children: React.ReactNode; palette?: string[] }) {
  const recolour = (c: string) => palette[defaultPalette.indexOf(c)] ?? c;
  const { ref, pending } = useStagedEntrance<HTMLDivElement>();

  return (
    <div ref={ref} className={`relative ${pending ? "burst-pending" : ""}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {bits.map((b, i) => (
          <span
            key={i}
            className="burst-piece absolute"
            style={
              {
                left: b.x,
                top: b.y,
                width: b.w,
                height: b.h,
                transform: `translate(-50%, -50%) rotate(${b.r}deg)`,
                "--i": i,
              } as CSSProperties
            }
          >
            <BitShape b={{ ...b, colour: recolour(b.colour) }} />
          </span>
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
