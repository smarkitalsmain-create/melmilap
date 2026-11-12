import type { Metadata } from "next";
import Link from "next/link";
import { Motif } from "@/components/art/motifs";
import { ArrowRight } from "@/components/ui/icons";
import { OperatingModel } from "@/components/ui/operating-model";
import { PageHero, Section } from "@/components/ui/page-parts";
import { causes, programmeStatusLabel } from "@/content/causes";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Mel Milap Foundation's three focus areas: education, meals and nutrition, and animal welfare. What we intend to support and how we will work.",
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
        intro="We focus on children’s learning, nutritious meals and the welfare of community dogs. All three are at the planning stage: we will begin with trusted delivery partners and build our own programmes as we grow."
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
                <p className="eyebrow opacity-90">{programmeStatusLabel[cause.status]}</p>
                <h2 id={`work-${cause.slug}`} className="display-lg mt-2">
                  {cause.name}
                </h2>
                <p className="mt-4 max-w-xl text-lg">{cause.oneLiner}</p>
                <p className="mt-3 max-w-xl text-[0.95rem] opacity-90">{cause.statusNote}</p>
                <Link href={`/our-work/${cause.slug}`} className={`btn mt-6 ${cause.colour === "mango" ? "btn-ghost" : "btn-cream"}`}>
                  Explore {cause.name} <ArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Section tone="cream" labelledBy="model-heading" className="border-t border-aubergine/10">
        <p className="eyebrow text-hibiscus-ink">How we will grow</p>
        <h2 id="model-heading" className="display-md mt-3 max-w-3xl">
          Partners first. Our own programmes as capacity grows.
        </h2>
        <div className="mt-10">
          <OperatingModel />
        </div>
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
