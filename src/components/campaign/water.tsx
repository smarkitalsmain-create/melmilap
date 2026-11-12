"use client";

import { useEffect, useRef, useState } from "react";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Waves({ fill, back }: { fill: string; back: string }) {
  const d = "M0 14 C 50 0, 100 28, 150 14 S 250 0, 300 14 S 400 28, 450 14 S 550 0, 600 14 V 60 H 0 Z";
  return (
    <>
      <svg viewBox="0 0 600 60" preserveAspectRatio="none" className="wave-drift-slow absolute -top-3 left-0 h-6 w-[200%]" aria-hidden="true">
        <path d={d} fill={back} />
      </svg>
      <svg viewBox="0 0 600 60" preserveAspectRatio="none" className="wave-drift absolute -top-2 left-0 h-5 w-[200%]" aria-hidden="true">
        <path d={d} fill={fill} />
      </svg>
    </>
  );
}

/**
 * A contained water scene. With verified progress it fills to the real
 * percentage and exposes an accessible progressbar; without it, it is a
 * purely decorative pond. Tapping or clicking adds a soft ripple.
 */
export function WaterScene({
  progress,
  className = "",
}: {
  progress?: { percent: number; label: string; valueText: string } | null;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [level, setLevel] = useState(progress ? 0 : 100);

  useEffect(() => {
    if (!progress) return;
    const el = ref.current;
    if (!el) return;
    if (reducedMotion() || !("IntersectionObserver" in window)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync to the user's motion preference
      setLevel(progress.percent);
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLevel(progress.percent);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [progress]);

  const ripple = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion()) return;
    const host = ref.current;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const ring = document.createElement("span");
    ring.className = "ripple-ring";
    ring.style.left = `${e.clientX - rect.left}px`;
    ring.style.top = `${e.clientY - rect.top}px`;
    ring.addEventListener("animationend", () => ring.remove(), { once: true });
    host.appendChild(ring);
  };

  const water = (
    <div
      ref={ref}
      onPointerDown={ripple}
      aria-hidden="true"
      className={`relative isolate cursor-pointer touch-manipulation overflow-hidden ${progress ? "rounded-[1.75rem] bg-cream/10" : "rounded-full"} ${className}`}
    >
      <div
        className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-[#3d63ff] to-cobalt transition-[height] duration-[1600ms] ease-[var(--ease-out-soft)]"
        style={{ height: `${level}%` }}
      >
        <Waves fill="#3d63ff" back="#6c87ff" />
        <span className="absolute left-[18%] top-[30%] h-3 w-3 rounded-full bg-white/50" />
        <span className="absolute left-[62%] top-[55%] h-2 w-2 rounded-full bg-white/40" />
      </div>
      {progress && (
        <span className="absolute inset-x-0 top-4 text-center font-display text-4xl font-extrabold text-cream mix-blend-normal">
          {progress.percent}%
        </span>
      )}
    </div>
  );

  if (!progress) return water;

  return (
    <div>
      {water}
      <div
        role="progressbar"
        aria-label={progress.label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress.percent}
        aria-valuetext={progress.valueText}
        className="mt-4 h-2 overflow-hidden rounded-full bg-cream/20"
      >
        <div className="h-full rounded-full bg-mango" style={{ width: `${progress.percent}%` }} />
      </div>
      <p className="mt-2 text-sm text-lilac">{progress.valueText}</p>
    </div>
  );
}
