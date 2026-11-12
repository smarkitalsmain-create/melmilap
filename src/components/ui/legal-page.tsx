import type { Metadata } from "next";
import { getLegalDocument } from "@/content/legal";
import type { LegalDocument } from "@/content/types";
import { formatDate } from "@/lib/content";

export function legalMetadata(slug: LegalDocument["slug"]): Metadata {
  const doc = getLegalDocument(slug);
  return {
    title: doc.title,
    description: doc.metaDescription,
    // Draft legal copy stays out of search results until approved.
    robots: doc.approval === "approved" ? undefined : { index: false, follow: true },
  };
}

export function LegalPage({ slug }: { slug: LegalDocument["slug"] }) {
  const doc = getLegalDocument(slug);
  return (
    <article className="container-site max-w-3xl py-14 sm:py-20">
      {doc.approval !== "approved" && (
        <p role="note" className="mb-8 rounded-2xl border-2 border-dashed border-cobalt bg-white p-4 font-semibold text-cobalt">
          Draft: this text is awaiting approval and may change before launch.
        </p>
      )}
      <h1 className="display-lg">{doc.title}</h1>
      <p className="mt-3 text-plum">Last updated {formatDate(doc.lastUpdated)}</p>
      <div className="mt-10 space-y-10">
        {doc.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-2xl font-bold">{s.heading}</h2>
            <div className="prose-reading mt-3 text-lg">{s.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
          </section>
        ))}
      </div>
    </article>
  );
}
