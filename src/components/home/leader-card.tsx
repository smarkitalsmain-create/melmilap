"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { ArrowRight, Plus } from "@/components/ui/icons";
import type { Leader } from "@/content/types";

const tones = {
  founder: { card: "on-dark bg-aubergine text-cream", eyebrow: "text-mango", muted: "text-lilac", rule: "border-cream/15", button: "btn-mango" },
  operations: { card: "on-colour bg-leaf-ink text-white", eyebrow: "text-mango", muted: "text-white/85", rule: "border-white/20", button: "btn-cream" },
};

/**
 * Equal-sized leadership card. Name, title and role are always visible;
 * the introduction and responsibilities open with "Know more".
 */
export function LeaderCard({ leader, eyebrow, portrait }: { leader: Leader; eyebrow: string; portrait: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const t = tones[leader.role];

  return (
    <article aria-labelledby={`home-${leader.slug}`} className={`flex h-full flex-col overflow-hidden rounded-[2rem] ${t.card}`}>
      {portrait}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className={`eyebrow ${t.eyebrow}`}>{eyebrow}</p>
        <h3 id={`home-${leader.slug}`} className="display-md mt-2">
          {leader.name}
        </h3>
        <p className={`mt-2 font-semibold ${t.muted}`}>{leader.title}</p>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className={`mt-6 inline-flex items-center gap-2 self-start border-b-2 border-current pb-0.5 font-bold`}
        >
          {open ? "Show less" : "Know more"}
          <span className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
            <Plus className="h-4 w-4" />
          </span>
          <span className="sr-only"> about {leader.name}</span>
        </button>

        <div id={panelId} hidden={!open} className={`mt-5 border-t pt-5 ${t.rule}`}>
          <p className={t.muted}>{leader.intro}</p>
          <ul className="mt-4 space-y-1.5 text-[0.95rem]">
            {leader.responsibilities.map((r) => (
              <li key={r} className="flex gap-2">
                <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                {r}
              </li>
            ))}
          </ul>
          <Link href={`/about#${leader.slug}`} className={`btn ${t.button} mt-6 !min-h-11 !py-2`}>
            Full profile <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
