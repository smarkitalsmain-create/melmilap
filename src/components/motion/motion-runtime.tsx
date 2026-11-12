"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Lightweight page-wide motion: reveals elements marked [data-reveal] as they
 * enter the viewport and applies gentle desktop parallax to [data-parallax].
 * Content is visible by default; the "js" class on <html> opts into hiding
 * not-yet-revealed elements, and reduced-motion users skip all of it in CSS.
 */
export function MotionRuntime() {
  const pathname = usePathname();
  const [firstPath] = useState(pathname);

  useEffect(() => {
    // The headline must be readable instantly on first load; fade only on later navigations.
    if (pathname !== firstPath) document.documentElement.classList.add("navigated");
  }, [pathname, firstPath]);

  useEffect(() => {
    const reveal = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)"));
    if (!("IntersectionObserver" in window)) {
      reveal.forEach((el) => el.classList.add("is-revealed"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    reveal.forEach((el) => io.observe(el));
    // Never leave content hidden if something keeps it from intersecting.
    const failsafe = window.setTimeout(() => reveal.forEach((el) => el.classList.add("is-revealed")), 6000);
    // Focused content must be visible.
    const onFocus = (e: FocusEvent) => (e.target as HTMLElement).closest?.("[data-reveal]")?.classList.add("is-revealed");
    document.addEventListener("focusin", onFocus);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
      document.removeEventListener("focusin", onFocus);
    };
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let layers: HTMLElement[] = [];
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      for (const el of layers) {
        const speed = Number(el.dataset.parallax) || 0;
        el.style.transform = `translate3d(0, ${(y * speed * 2).toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const setup = () => {
      layers.forEach((el) => (el.style.transform = ""));
      layers = mq.matches ? Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]")) : [];
      if (layers.length) update();
    };
    setup();
    mq.addEventListener("change", setup);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", setup);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
