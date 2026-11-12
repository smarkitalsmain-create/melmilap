"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Motif } from "@/components/art/motifs";
import { ArrowRight } from "@/components/ui/icons";
import { programmeStatusLabel } from "@/content/causes";
import type { Cause } from "@/content/types";

const cardTone: Record<Cause["colour"], string> = {
  mango: "bg-mango text-aubergine on-mango",
  hibiscus: "bg-hibiscus text-white on-colour",
  leaf: "bg-leaf text-white on-colour",
};

const linkTone: Record<Cause["colour"], string> = {
  mango: "btn-ghost",
  hibiscus: "btn-cream",
  leaf: "btn-cream",
};

/**
 * "Where we focus": the signature scroll-to-build sequence.
 *
 * Desktop (tall enough screens): a brief pinned scene where the three motifs
 * assemble one after another, scrubbed by scroll, then release.
 * Mobile: each card assembles once as it enters, in normal document flow.
 * Reduced motion or no JS: everything is shown assembled.
 */
export function CauseBuild({ causes }: { causes: Cause[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-cause-card]"));

      const scatter = (card: HTMLElement) =>
        Array.from(card.querySelectorAll<SVGGElement>(".piece")).map((piece) => ({
          piece,
          from: {
            x: Number(piece.dataset.dx) * 1.6,
            y: Number(piece.dataset.dy) * 1.6,
            rotation: Number(piece.dataset.r) * 2,
            opacity: 0,
            scale: 0.7,
          },
        }));

      const addCard = (tl: gsap.core.Timeline, card: HTMLElement, at: number) => {
        const pieces = scatter(card);
        pieces.forEach(({ piece, from }, i) =>
          tl.from(piece, { ...from, duration: 0.6, ease: "back.out(1.6)", transformOrigin: "50% 50%" }, at + i * 0.05),
        );
        tl.from(card.querySelectorAll("[data-cause-text]"), { opacity: 0, y: 24, duration: 0.45, stagger: 0.08, ease: "power2.out" }, at + 0.35);
      };

      mm.add("(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.querySelector("[data-pin]"),
            start: () => `top ${document.querySelector("header")?.offsetHeight ?? 0}px`,
            end: "+=110%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });
        cards.forEach((card, i) => addCard(tl, card, i * 0.9));
        tl.to({}, { duration: 0.4 });

        // Keyboard users who tab into a card mid-sequence see it complete.
        const onFocus = () => {
          const st = tl.scrollTrigger;
          if (st && tl.progress() < 1) window.scrollTo({ top: st.end, behavior: "auto" });
        };
        section.addEventListener("focusin", onFocus);
        return () => section.removeEventListener("focusin", onFocus);
      });

      mm.add("(max-width: 1023px), (max-height: 759px)", () => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        cards.forEach((card) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 80%", once: true } });
          addCard(tl, card, 0);
        });
      });

      cleanup = () => mm.revert();
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <section ref={sectionRef} id="where-we-focus" aria-labelledby="focus-heading" className="relative bg-cream">
      <div data-pin className="flex min-h-0 flex-col justify-center py-20 lg:min-h-[calc(100dvh-5rem)] lg:py-8">
        <div className="container-site">
          <div className="mb-10 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow text-hibiscus-ink">Three causes, one table</p>
              <h2 id="focus-heading" className="display-lg mt-3">
                Where we focus
              </h2>
            </div>
            <p className="max-w-md text-lg text-plum">
              All three are at the planning stage. We will start with partners who already know these communities.
            </p>
          </div>

          <ul className="grid gap-5 lg:grid-cols-3 lg:gap-6">
            {causes.map((cause) => (
              <li key={cause.slug}>
                <article
                  data-cause-card
                  aria-labelledby={`cause-${cause.slug}`}
                  className={`group grain flex h-full flex-col overflow-hidden rounded-[2rem] p-6 sm:p-7 ${cardTone[cause.colour]}`}
                >
                  <div className="-mx-2 mb-2 flex h-40 items-center justify-center sm:h-44 lg:h-[clamp(7rem,17vh,10rem)]">
                    <Motif name={cause.motif} className="h-full w-auto max-w-full overflow-visible" />
                  </div>
                  <p data-cause-text className="eyebrow opacity-90">
                    {programmeStatusLabel[cause.status]}
                  </p>
                  <h3 data-cause-text id={`cause-${cause.slug}`} className="display-md mt-1">
                    {cause.name}
                  </h3>
                  <p data-cause-text className="mt-3 text-[1.05rem] leading-snug">
                    {cause.oneLiner}
                  </p>
                  <div data-cause-text className="mt-4">
                    <p className="text-sm font-bold">What we intend to support</p>
                    <ul className="mt-2 space-y-1.5 text-[0.95rem] leading-snug">
                      {cause.intendedSupport.map((s) => (
                        <li key={s} className="flex gap-2">
                          <span aria-hidden="true" className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-current" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div data-cause-text className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
                    <Link href={`/our-work/${cause.slug}`} className={`btn ${linkTone[cause.colour]} !min-h-11 !py-2`}>
                      Learn more<span className="sr-only"> about {cause.name}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href={cause.page.waysToHelp[0].href} className="link-draw font-semibold">
                      Take part<span className="sr-only"> in {cause.name}</span>
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
