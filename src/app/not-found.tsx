import type { Metadata } from "next";
import Link from "next/link";
import { Motif } from "@/components/art/motifs";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="container-site grid items-center gap-10 py-20 lg:grid-cols-[1fr_1fr]">
      <div>
        <p className="eyebrow text-hibiscus-ink">Page not found</p>
        <h1 className="display-lg mt-3">This page wandered off.</h1>
        <p className="mt-5 text-lg text-plum">It may have moved, or it isn’t published yet.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">Go home</Link>
          <Link href="/our-work" className="btn btn-ghost">Explore our work</Link>
        </div>
      </div>
      <Motif name="paw" className="hero-art mx-auto w-full max-w-xs" />
    </div>
  );
}
