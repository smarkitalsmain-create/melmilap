import type { ReactNode } from "react";
import { PageHero } from "@/components/ui/page-parts";
import type { FormKind } from "@/lib/forms/definitions";
import { EnquirySection } from "./enquiry-section";

export function InvolvementPage({
  kind, eyebrow, title, intro, tone, points, campaign,
}: {
  kind: FormKind; eyebrow: string; title: string; intro: ReactNode;
  tone: "mango" | "hibiscus" | "cobalt" | "cream"; points: { title: string; body: string }[]; campaign?: string;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} tone={tone} />
      <div className="container-site grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <aside aria-labelledby="what-heading">
          <h2 id="what-heading" className="display-md">What to expect</h2>
          <ul className="mt-6 space-y-5">
            {points.map((p, i) => (
              <li key={p.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-aubergine font-bold text-cream">{i + 1}</span>
                <div><h3 className="font-bold">{p.title}</h3><p className="mt-1 text-plum">{p.body}</p></div>
              </li>
            ))}
          </ul>
        </aside>
        <section aria-label="Enquiry form" className="rounded-[2rem] bg-paper p-6 sm:p-10">
          <EnquirySection kind={kind} campaign={campaign} />
        </section>
      </div>
    </>
  );
}
