import type { Metadata } from "next";
import Link from "next/link";
import { DraftMark } from "@/components/layout/preview-banner";
import { ArrowRight } from "@/components/ui/icons";
import { OperatingModel } from "@/components/ui/operating-model";
import { Section } from "@/components/ui/page-parts";
import { Portrait } from "@/components/ui/portrait";
import { gopali, rakhi } from "@/content/leadership";
import { site } from "@/content/site";
import { isPreview } from "@/lib/config";
import { getFounderNote, visibleBio } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Mel milap means, how the foundation will work, and the people leading it: founder Rakhi Kulshrestha and Gopali Verma, Director & Vice President, Operations.",
};

const values = [
  { title: "Dignity", body: "People we support are partners in the work, never props in a story." },
  { title: "Inclusion", body: "We go where support is thinnest and listen to the people who live there." },
  { title: "Care with money", body: "Funds are released in stages against agreed milestones." },
  { title: "Plain reporting", body: "We publish what we did, what it cost and what didn’t work." },
];

export default function AboutPage() {
  const preview = isPreview();
  const note = getFounderNote(preview);
  const rakhiBio = visibleBio(rakhi, preview);
  const gopaliBio = visibleBio(gopali, preview);

  return (
    <>
      <section className="grain overflow-hidden bg-cream">
        <div className="container-site grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-hibiscus-ink">About Mel Milap</p>
            <h1 className="display-xl mt-4">
              <span lang="hi" className="block text-[0.55em] font-bold tracking-normal text-hibiscus-ink">
                {site.meaning.phrase}
              </span>
              Coming together.
            </h1>
          </div>
          <div className="text-lg sm:text-xl">
            <p>
              <em>Mel milap</em> is a Hindi phrase for {site.meaning.gloss}. It is the whole idea behind the foundation: good work happens when
              people who care find one another.
            </p>
            <p className="mt-4 text-plum">
              We are a new Indian social-impact initiative focused on education, meals and nutrition, and animal welfare, starting with
              community dogs.
            </p>
          </div>
        </div>
      </section>

      <Section tone="mango" labelledBy="values-heading">
        <h2 id="values-heading" className="display-md">What we hold to</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <li key={v.title} data-reveal style={{ ["--i" as string]: i }} className="rounded-[1.75rem] bg-cream p-6">
              <h3 className="font-display text-2xl font-bold">{v.title}</h3>
              <p className="mt-2">{v.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Leadership: the founder feature and the operations profile use deliberately different layouts. */}
      <section aria-labelledby="leadership-heading" className="bg-cream pt-20 sm:pt-28">
        <div className="container-site">
          <p className="eyebrow text-hibiscus-ink">Leadership</p>
          <h2 id="leadership-heading" className="display-lg mt-3">Who leads the foundation</h2>
          <div aria-label="Leadership structure" role="group" className="mt-8 flex flex-wrap items-center gap-3 text-sm font-semibold">
            <span className="rounded-full bg-aubergine px-4 py-2 text-cream">{rakhi.name} · {rakhi.title}</span>
            <span aria-hidden="true">←</span>
            <span className="rounded-full border-2 border-leaf-ink px-4 py-2 text-leaf-ink">{gopali.name} · {gopali.title}</span>
            <span className="sr-only">{gopali.name} reports to {rakhi.name} in her operating role.</span>
          </div>
        </div>
      </section>

      <article id={rakhi.slug} aria-labelledby="rakhi-name" className="scroll-mt-24 bg-cream py-12 sm:py-16">
        <div className="container-site">
          <div className="on-dark grid overflow-hidden rounded-[2.5rem] bg-aubergine text-cream lg:grid-cols-[1fr_1.25fr]">
            <div data-reveal="mask" className="min-h-[24rem] lg:min-h-[40rem]">
              <Portrait leader={rakhi} sizes="(min-width: 1024px) 45vw, 100vw" className="h-full min-h-[24rem] lg:min-h-[40rem]" />
            </div>
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="eyebrow text-mango">Founder</p>
              <h3 id="rakhi-name" className="display-lg mt-3">{rakhi.name}</h3>
              <p className="mt-3 text-lg font-semibold text-mango">{rakhi.title}</p>
              <div className="prose-reading mt-8 text-lg text-lilac">
                {rakhiBio.map((p) => (
                  <p key={p.text}>
                    {p.pending && <DraftMark>Confirm wording</DraftMark>}
                    {p.text}
                  </p>
                ))}
                {rakhi.roleSummary.map((p) => <p key={p}>{p}</p>)}
              </div>
              <h4 className="mt-8 font-bold text-cream">Responsibilities</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {rakhi.responsibilities.map((r) => (
                  <li key={r} className="rounded-full bg-white/10 px-4 py-2 text-sm">{r}</li>
                ))}
              </ul>
            </div>
          </div>

          {note && (
            <section aria-labelledby="founder-note" className="mx-auto mt-16 max-w-3xl">
              {note.pending && <DraftMark>Draft · awaiting Rakhi’s approval</DraftMark>}
              <h3 id="founder-note" className="display-md mt-3">{note.heading}</h3>
              <blockquote className="mt-8 border-l-8 border-mango pl-6 sm:pl-10">
                <div className="space-y-5 font-display text-xl leading-snug sm:text-2xl">
                  {note.paragraphs.map((p) => <p key={p}>{p}</p>)}
                </div>
                <footer className="mt-6 font-semibold">— {note.signOff}</footer>
              </blockquote>
            </section>
          )}
        </div>
      </article>

      <article id={gopali.slug} aria-labelledby="gopali-name" className="scroll-mt-24 bg-cream pb-20 sm:pb-28">
        <div className="container-site">
          <div className="grid gap-8 rounded-[2.5rem] border-2 border-leaf-ink/30 bg-paper p-6 sm:p-10 md:grid-cols-[14rem_1fr] lg:grid-cols-[16rem_1fr_1fr] lg:gap-12">
            <Portrait leader={gopali} sizes="16rem" className="aspect-[4/5] w-full max-w-[16rem] rounded-[1.75rem]" />
            <div>
              <p className="eyebrow text-leaf-ink">Operations</p>
              <h3 id="gopali-name" className="display-md mt-2">{gopali.name}</h3>
              <p className="mt-2 font-semibold text-plum">{gopali.title}</p>
              <div className="prose-reading mt-5">
                {gopaliBio.map((p) => <p key={p.text}>{p.text}</p>)}
              </div>
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <h4 className="font-bold">In her role</h4>
              <div className="prose-reading mt-3">
                {gopali.roleSummary.map((p) => <p key={p}>{p}</p>)}
              </div>
              <ul className="mt-5 space-y-2">
                {gopali.responsibilities.map((r) => (
                  <li key={r} className="flex gap-3"><span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-leaf" />{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>

      <Section labelledBy="model-heading" className="border-t border-aubergine/10">
        <p className="eyebrow text-hibiscus-ink">How we will work</p>
        <h2 id="model-heading" className="display-md mt-3 max-w-3xl">Partners first, our own programmes as we grow</h2>
        <div className="mt-10"><OperatingModel /></div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <Link href="/get-involved" className="btn btn-primary">Get involved <ArrowRight /></Link>
          <p className="text-sm text-plum">{site.endorsement}</p>
        </div>
      </Section>
    </>
  );
}
