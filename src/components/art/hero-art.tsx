/**
 * Hero illustration: cut-paper pieces gathering under a marigold toran into an
 * arched doorway that holds the foundation's motifs. Pure SVG + CSS; the
 * arrival animation is CSS-only and the resting state is the complete picture.
 */
import type { CSSProperties, ReactNode } from "react";
import { MotifPieces } from "./motifs";

const C = {
  cream: "#FFF8ED",
  aubergine: "#2B1538",
  mango: "#FFBD2E",
  hibiscus: "#D82A63",
  leaf: "#18845F",
  cobalt: "#2546D8",
};

function Piece({ i, dx, dy, r = 0, children, float = false }: { i: number; dx: number; dy: number; r?: number; children: ReactNode; float?: boolean }) {
  const style = { "--dx": `${dx}px`, "--dy": `${dy}px`, "--r": `${r}deg`, "--i": i } as CSSProperties;
  return (
    <g className={float ? "piece float" : "piece"} style={style}>
      {children}
    </g>
  );
}

function toranPoints(n: number) {
  const [x0, y0, x1, y1, x2, y2] = [178, 128, 330, 214, 482, 128];
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const a = (1 - t) ** 2, b = 2 * (1 - t) * t, c = t ** 2;
    return { x: a * x0 + b * x1 + c * x2, y: a * y0 + b * y1 + c * y2 };
  });
}

const ringDots = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2 + 0.2;
  return { x: 330 + Math.cos(angle) * 252, y: 330 + Math.sin(angle) * 252, colour: i % 2 ? C.cobalt : C.hibiscus };
});

export function HeroArt({ className }: { className?: string }) {
  const marigolds = toranPoints(9);
  return (
    <svg viewBox="0 0 660 640" className={`hero-art ${className ?? ""}`} role="img" aria-labelledby="hero-art-title" overflow="visible">
      <title id="hero-art-title">
        Illustration: colourful cut-paper shapes gather under a marigold garland into an arched doorway holding a meal bowl
        and an open book, with a paw print beside it.
      </title>
      <defs>
        <filter id="paper-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="0" floodColor={C.aubergine} floodOpacity="0.18" />
        </filter>
      </defs>

      <g data-parallax="-0.04">
        <Piece i={1} dx={140} dy={-110} r={20}>
          <circle cx={548} cy={118} r={84} fill={C.cobalt} />
        </Piece>
        <Piece i={2} dx={-80} dy={-60} r={-30}>
          <path d="M60 150 C110 84 196 96 236 58" stroke={C.aubergine} strokeWidth={15} strokeLinecap="round" fill="none" opacity={0.9} />
        </Piece>
      </g>

      <g filter="url(#paper-shadow)">
        <Piece i={3} dx={0} dy={50}>
          <circle cx={330} cy={330} r={222} fill={C.mango} />
        </Piece>

        <g data-parallax="0.03">
          {ringDots.map((d, i) => (
            <Piece key={i} i={8 + i} dx={(d.x - 330) * 0.6} dy={(d.y - 330) * 0.6}>
              <circle cx={d.x} cy={d.y} r={i % 3 === 0 ? 9 : 6} fill={d.colour} />
            </Piece>
          ))}
        </g>

        <Piece i={5} dx={-130} dy={90} r={-14}>
          <path d="M40 552 A156 156 0 0 1 352 552 Z" fill={C.hibiscus} />
        </Piece>
        <Piece i={6} dx={130} dy={120} r={16}>
          <path d="M640 600 L640 380 A222 222 0 0 0 418 600 Z" fill={C.aubergine} />
        </Piece>

        <Piece i={7} dx={0} dy={110}>
          <path d="M246 520 L246 334 C246 264 288 230 330 208 C372 230 414 264 414 334 L414 520 Z" fill={C.leaf} />
        </Piece>
        <Piece i={8} dx={20} dy={-70}>
          <circle cx={330} cy={290} r={28} fill={C.cream} />
        </Piece>
      </g>

      <g transform="translate(272 322) scale(0.58)">
        <MotifPieces name="bowl" />
      </g>
      <g transform="translate(262 418) scale(0.68)">
        <MotifPieces name="book" />
      </g>
      <g transform="translate(110 420) scale(0.62)">
        <MotifPieces name="paw" />
      </g>

      <Piece i={9} dx={-40} dy={-90}>
        <path d="M178 128 Q330 300 482 128" stroke={C.aubergine} strokeWidth={3} fill="none" />
      </Piece>
      {marigolds.map((m, i) => (
        <Piece key={i} i={20 + i} dx={(m.x - 330) * 0.5} dy={-120 - i * 6} r={i * 25} float>
          <circle cx={m.x} cy={m.y} r={13} fill={i % 2 ? C.hibiscus : "#FF8A1F"} />
          <circle cx={m.x} cy={m.y} r={5} fill={i % 2 ? C.mango : C.hibiscus} />
        </Piece>
      ))}
      <Piece i={11} dx={-90} dy={-40} r={-50}>
        <path d="M170 124 C150 104 150 86 166 74 C178 94 180 110 170 124Z" fill={C.leaf} />
      </Piece>
      <Piece i={12} dx={90} dy={-40} r={50}>
        <path d="M490 124 C510 104 510 86 494 74 C482 94 480 110 490 124Z" fill={C.leaf} />
      </Piece>

      <g data-parallax="0.06">
        <Piece i={13} dx={-120} dy={10} r={-90} float>
          <path d="M60 262 L92 236 L98 276Z" fill={C.cobalt} />
        </Piece>
        <Piece i={14} dx={110} dy={20} r={80} float>
          <path d="M600 300 L628 330 L590 338Z" fill={C.hibiscus} />
        </Piece>
        <Piece i={15} dx={-60} dy={80} float>
          <circle cx={74} cy={600} r={12} fill={C.leaf} />
        </Piece>
        <Piece i={16} dx={60} dy={60} r={30}>
          <path d="M470 560 C500 540 530 580 560 556" stroke={C.cream} strokeWidth={6} strokeLinecap="round" fill="none" />
        </Piece>
      </g>
    </svg>
  );
}
