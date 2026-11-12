"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/art/logo";
import { Close, Menu } from "@/components/ui/icons";
import { primaryNav } from "@/content/site";

interface Props {
  /** "Donate" replaces "Get Involved" only once live donations are enabled. */
  primaryAction: { label: string; href: string };
}

export function SiteHeader({ primaryAction }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const button = buttonRef.current;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button?.focus();
      }
      if (e.key === "Tab" && panel) {
        const items = [button, ...panel.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-aubergine/10 bg-cream/95 supports-[backdrop-filter]:bg-cream/85 supports-[backdrop-filter]:backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="group -m-1 rounded-lg p-1" aria-label="Mel Milap Foundation home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 font-semibold">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`link-draw py-2 ${isActive(item.href) ? "bg-[length:100%_2px] text-hibiscus-ink" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link href={primaryAction.href} className="btn btn-hibiscus !min-h-11 whitespace-nowrap !px-3.5 !py-2 text-[0.9rem] sm:!px-5 sm:text-[0.95rem]">
            {primaryAction.label}
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-aubergine lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="on-dark fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-aubergine text-cream lg:hidden"
      >
        <nav aria-label="Mobile" className="container-site flex min-h-full flex-col justify-between gap-10 py-8">
          <ul className="space-y-1">
            {[{ label: "Home", href: "/" }, ...primaryNav, { label: "Get Involved", href: "/get-involved" }, { label: "Contact", href: "/contact" }].map(
              (item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex items-baseline gap-3 py-2 font-display text-4xl font-extrabold tracking-tight aria-[current=page]:text-mango"
                  >
                    <span aria-hidden="true" className="font-sans text-sm font-bold text-lilac">0{i + 1}</span>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <Link href={primaryAction.href} className="btn btn-mango w-full">
            {primaryAction.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
