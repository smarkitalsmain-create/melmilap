"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Stages a one-time entrance: returns pending=true only when motion is allowed
 * and the element starts below the fold, then flips to false when it scrolls
 * into view. Server render and no-JS visitors always get the final state.
 */
export function useStagedEntrance<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;
    setPending(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => requestAnimationFrame(() => setPending(false)));
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, pending };
}
