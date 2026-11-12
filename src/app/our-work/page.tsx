import type { Metadata } from "next";
import Link from "next/link";
import { Motif } from "@/components/art/motifs";
import { ArrowRight } from "@/components/ui/icons";
import { HowWeWork } from "@/components/ui/operating-model";
import { PageHero, Section } from "@/components/ui/page-parts";
import { causes } from "@/content/causes";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Mel Milap Foundation works across education, meals and nutrition, and animal welfare in India, with local organisations and community teams.",
};

const tone = {
  mango: "on-mango bg-mango text-aubergine",
  hibiscus: "on-colour bg-hibiscus text-white",
  leaf: "on-colour bg-leaf text-white",
};

export default function OurWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Three causes, brought together."
        intro="We work across education, meals and nutrition, and animal welfare, with local organisations and community teams."
      />

      <section aria-label="Focus areas" className="bg-cream pb-16 sm:pb-24">
        <div className="container-site space-y-6">
          {causes.map((cause, i) => (
            <article
              key={cause.slug}
              aria-labelledby={`work-${cause.slug}`}
              className={`grain grid items-center gap-6 overflow-hidden rounded-[2.25rem] p-7 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:gap-12 ${tone[cause.colour]}`}
            >
              <div className={`mx-auto w-full max-w-xs ${i % 2 ? "lg:order-last" : ""}`} data-reveal="mask">
                <Motif name={cause.motif} className="w-full overflow-visible" />
              </div>
              <div>
                <h2 id={`work-${cause.slug}`} className="display-lg">
                  {cause.name}
                </h2>
                <p className="mt-4 max-w-xl text-lg">{cause.summary}</p>
                <Link href={`/our-work/${cause.slug}`} className={`btn mt-6 ${cause.colour === "mango" ? "btn-ghost" : "btn-cream"}`}>
                  Explore {cause.name} <ArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Section tone="cream" labelledBy="how-we-work-heading" className="border-t border-aubergine/10">
        <HowWeWork headingId="how-we-work-heading" />
        <p className="mt-10 text-lg">
          Seasonal relief, like winter blankets for elders, runs as{" "}
          <Link href="/campaigns" className="link-inline">
            campaigns
          </Link>{" "}
          alongside these three areas.
        </p>
      </Section>
    </>
  );
}
