import Link from "next/link";
import type { ReactNode } from "react";
import { Motif, type MotifName } from "@/components/art/motifs";
import { ArrowRight } from "./icons";

type Tone = "cream" | "aubergine" | "mango" | "hibiscus" | "leaf" | "cobalt";

const toneClass: Record<Tone, string> = {
  cream: "bg-cream text-aubergine",
  aubergine: "on-dark bg-aubergine text-cream",
  mango: "on-mango bg-mango text-aubergine",
  hibiscus: "on-colour bg-hibiscus text-white",
  leaf: "on-colour bg-leaf text-white",
  cobalt: "on-colour bg-cobalt text-white",
};

export function PageHero({
  eyebrow,
  title,
  intro,
  tone = "cream",
  motif,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: Tone;
  motif?: MotifName;
  children?: ReactNode;
}) {
  return (
    <section className={`grain overflow-hidden ${toneClass[tone]}`}>
      <div className={`container-site grid items-center gap-8 py-14 sm:py-20 ${motif ? "lg:grid-cols-[1.4fr_1fr]" : ""}`}>
        <div>
          <p className="eyebrow opacity-90">{eyebrow}</p>
          <h1 className="display-lg mt-4 max-w-4xl">{title}</h1>
          {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">{intro}</div>}
          {children}
        </div>
        {motif && (
          <figure className="mx-auto w-full max-w-sm" data-reveal="mask">
            <Motif name={motif} className="hero-art w-full overflow-visible" decorative />
          </figure>
        )}
      </div>
    </section>
  );
}

export function Section({ children, tone = "cream", className = "", labelledBy }: { children: ReactNode; tone?: Tone; className?: string; labelledBy?: string }) {
  return (
    <section aria-labelledby={labelledBy} className={`${toneClass[tone]} py-16 sm:py-20 ${className}`}>
      <div className="container-site">{children}</div>
    </section>
  );
}

export function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[2rem] border-2 border-dashed border-current/30 p-7 sm:p-9">
      <h3 className="font-display text-2xl font-bold">{title}</h3>
      <div className="mt-3 max-w-2xl text-lg">{children}</div>
    </div>
  );
}

export function RouteCard({
  href,
  title,
  body,
  tone,
  cta = "Start here",
}: {
  href: string;
  title: string;
  body: string;
  tone: Tone;
  cta?: string;
}) {
  return (
    <Link
      href={href}
      className={`group grain flex h-full flex-col rounded-[2rem] p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${toneClass[tone]}`}
    >
      <h3 className="display-md">{title}</h3>
      <p className="mt-3 text-lg">{body}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-6 font-bold">
        <span className="link-draw group-hover:bg-[length:100%_2px]">{cta}</span>
        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-site pt-6 text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-plum">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="link-draw font-semibold text-aubergine">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
