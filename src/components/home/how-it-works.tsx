"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useId, useState } from "react";
import { Plus } from "@/components/ui/icons";
import { processSteps } from "@/content/process";

const stepColours = ["bg-aubergine text-cream", "bg-hibiscus-ink text-white", "bg-cobalt text-white", "bg-leaf-ink text-white"];

/** Accessible accordion: buttons with aria-expanded controlling labelled regions. */
export function HowItWorks() {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="how-heading" className="on-mango grain bg-mango py-20 text-aubergine lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">How the work will happen</p>
            <h2 id="how-heading" className="display-lg mt-3">
              Four steps, done carefully.
            </h2>
            <p className="mt-6 max-w-md text-lg">
              We are putting these steps in place now. Every campaign will follow them, and you will be able to see each one.
            </p>
            <ol aria-hidden="true" className="mt-10 hidden items-center gap-3 lg:flex">
              {processSteps.map((s, i) => (
                <li key={s.title} className="flex items-center gap-3">
                  <motion.span
                    animate={{ scale: open === i ? 1.15 : 1, rotate: open === i ? -6 : 0 }}
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl font-display text-2xl font-extrabold ${stepColours[i]} ${open === i ? "shadow-[0_5px_0_0_rgba(43,21,56,.9)]" : "opacity-70"}`}
                  >
                    {i + 1}
                  </motion.span>
                  {i < processSteps.length - 1 && <span className="h-1 w-6 rounded-full bg-aubergine/40" />}
                </li>
              ))}
            </ol>
          </div>

          <ol className="space-y-4">
            {processSteps.map((step, i) => {
              const isOpen = open === i;
              const buttonId = `${baseId}-b${i}`;
              const panelId = `${baseId}-p${i}`;
              return (
                <li key={step.title} className="overflow-hidden rounded-[1.75rem] border-2 border-aubergine bg-cream shadow-[0_5px_0_0_rgba(43,21,56,.9)]">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                    >
                      <span aria-hidden="true" className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-xl font-extrabold ${stepColours[i]}`}>
                        {i + 1}
                      </span>
                      <span className="flex-1">
                        <span className="block font-display text-2xl font-bold leading-tight">{step.title}</span>
                        <span className="mt-1 block text-plum">{step.short}</span>
                      </span>
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="shrink-0">
                        <Plus className="h-6 w-6" />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-5 pb-6 text-lg sm:px-6 sm:pl-[5.25rem]">{step.detail}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </MotionConfig>
  );
}
