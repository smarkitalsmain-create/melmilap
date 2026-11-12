/**
 * Cut-paper motifs: an open book, a meal bowl and a paw print.
 *
 * Each motif is a set of pieces. A piece's resting position is its final,
 * assembled position, so the artwork is complete without JavaScript or motion.
 * The scatter offsets (dx, dy, r) are read by the scroll-to-build animation.
 */
import type { ReactNode } from "react";

export type MotifName = "book" | "bowl" | "paw";

interface PieceDef {
  dx: number;
  dy: number;
  r: number;
  shape: ReactNode;
}

const C = {
  cream: "#FFF8ED",
  aubergine: "#2B1538",
  mango: "#FFBD2E",
  hibiscus: "#D82A63",
  leaf: "#18845F",
  cobalt: "#2546D8",
};

const book: PieceDef[] = [
  { dx: -70, dy: 50, r: -22, shape: <path d="M12 46 L12 140 C48 132 78 134 100 148 C122 134 152 132 188 140 L188 46 C152 38 122 40 100 52 C78 40 48 38 12 46Z" fill={C.aubergine} /> },
  { dx: -90, dy: -30, r: -28, shape: <path d="M100 44 C80 30 50 28 22 34 L22 128 C50 122 80 124 100 138Z" fill={C.cream} /> },
  { dx: 95, dy: -40, r: 26, shape: <path d="M100 44 C120 30 150 28 178 34 L178 128 C150 122 120 124 100 138Z" fill="#FFFDF8" /> },
  {
    dx: -45, dy: 70, r: 16,
    shape: (
      <g stroke={C.aubergine} strokeWidth={4} strokeLinecap="round" fill="none">
        <path d="M34 56 Q58 50 88 58" /><path d="M34 74 Q58 68 88 76" /><path d="M34 92 Q56 86 80 94" />
      </g>
    ),
  },
  {
    dx: 55, dy: 75, r: -14,
    shape: (
      <g stroke={C.aubergine} strokeWidth={4} strokeLinecap="round" fill="none">
        <path d="M112 58 Q136 50 160 56" /><path d="M112 76 Q136 68 160 74" />
      </g>
    ),
  },
  { dx: 40, dy: -80, r: 34, shape: <path d="M140 28 L154 28 L154 86 L147 78 L140 86Z" fill={C.hibiscus} /> },
  { dx: -35, dy: -60, r: 0, shape: <circle cx={34} cy={20} r={7} fill={C.cobalt} /> },
  { dx: 60, dy: -45, r: 60, shape: <path d="M176 4 L179 12 L187 15 L179 18 L176 26 L173 18 L165 15 L173 12Z" fill={C.aubergine} /> },
];

const bowl: PieceDef[] = [
  {
    dx: 0, dy: -55, r: 0,
    shape: (
      <g stroke={C.cream} strokeWidth={5} strokeLinecap="round" fill="none">
        <path d="M80 32 C72 22 88 16 80 6" /><path d="M100 36 C92 24 108 18 100 6" /><path d="M120 32 C112 22 128 16 120 6" />
      </g>
    ),
  },
  { dx: -75, dy: -40, r: -22, shape: <path d="M42 86 C46 56 74 44 100 46 C128 44 154 58 158 86Z" fill={C.mango} /> },
  { dx: 75, dy: -60, r: 40, shape: <path d="M104 50 C112 34 130 30 144 34 C140 48 124 56 104 50Z" fill={C.leaf} /> },
  { dx: -65, dy: 60, r: -16, shape: <path d="M26 88 L174 88 C170 126 140 150 100 150 C60 150 30 126 26 88Z" fill={C.aubergine} /> },
  { dx: 0, dy: 60, r: 0, shape: <path d="M78 149 L122 149 L118 162 L82 162Z" fill={C.aubergine} /> },
  { dx: 65, dy: 70, r: 20, shape: <path d="M40 110 C70 120 130 120 160 110" stroke={C.mango} strokeWidth={6} strokeLinecap="round" fill="none" /> },
  {
    dx: -40, dy: 85, r: 0,
    shape: (
      <g fill={C.cream}>
        <circle cx={66} cy={130} r={3.5} /><circle cx={100} cy={136} r={3.5} /><circle cx={134} cy={130} r={3.5} />
      </g>
    ),
  },
  { dx: 85, dy: 15, r: 12, shape: <ellipse cx={100} cy={88} rx={77} ry={10} fill={C.cream} /> },
];

const paw: PieceDef[] = [
  { dx: 0, dy: 75, r: -10, shape: <path d="M100 80 C126 80 150 106 150 126 C150 146 130 152 100 144 C70 152 50 146 50 126 C50 106 74 80 100 80Z" fill={C.cream} /> },
  { dx: -75, dy: 10, r: -40, shape: <ellipse cx={50} cy={76} rx={14} ry={19} transform="rotate(-25 50 76)" fill={C.mango} /> },
  { dx: -40, dy: -65, r: -20, shape: <ellipse cx={81} cy={42} rx={14} ry={20} transform="rotate(-8 81 42)" fill={C.cream} /> },
  { dx: 40, dy: -65, r: 20, shape: <ellipse cx={119} cy={42} rx={14} ry={20} transform="rotate(8 119 42)" fill={C.cream} /> },
  { dx: 75, dy: 10, r: 40, shape: <ellipse cx={150} cy={76} rx={14} ry={19} transform="rotate(25 150 76)" fill={C.mango} /> },
  { dx: 0, dy: 95, r: 25, shape: <path d="M100 134 C88 125 85 116 92 111 C96 109 99 111 100 114 C101 111 104 109 108 111 C115 116 112 125 100 134Z" fill={C.hibiscus} /> },
  { dx: 55, dy: -45, r: 0, shape: <circle cx={172} cy={28} r={6} fill={C.aubergine} /> },
  { dx: -55, dy: 60, r: 45, shape: <path d="M22 150 L30 136 L38 150Z" fill={C.aubergine} /> },
];

export const motifPieces: Record<MotifName, PieceDef[]> = { book, bowl, paw };

const titles: Record<MotifName, string> = {
  book: "An open book",
  bowl: "A meal bowl",
  paw: "A paw print",
};

export function MotifPieces({ name }: { name: MotifName }) {
  return (
    <>
      {motifPieces[name].map((p, i) => (
        <g
          key={i}
          className="piece"
          data-dx={p.dx}
          data-dy={p.dy}
          data-r={p.r}
          style={{ ["--dx" as string]: `${p.dx}px`, ["--dy" as string]: `${p.dy}px`, ["--r" as string]: `${p.r}deg`, ["--i" as string]: i }}
        >
          {p.shape}
        </g>
      ))}
    </>
  );
}

export function Motif({ name, className, decorative = true }: { name: MotifName; className?: string; decorative?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 170"
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : titles[name]}
      overflow="visible"
    >
      <MotifPieces name={name} />
    </svg>
  );
}
