import type { Metadata } from "next";
import Link from "next/link";
import { DraftMark } from "@/components/layout/preview-banner";
import { ArrowRight } from "@/components/ui/icons";
import { HowWeWork } from "@/components/ui/operating-model";
import { Section } from "@/components/ui/page-parts";
import { Portrait } from "@/components/ui/portrait";
import { gopali, rakhi } from "@/content/leadership";
import { lookingAhead } from "@/content/operating-model";
import { site } from "@/content/site";
import type { Leader } from "@/content/types";
import { isPreview } from "@/lib/config";
import { getFounderNote, visibleBio } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Mel milap means, how the foundation works, and the people leading it: Rakhi Kulshrestha, Founder & Managing Director, and Gopali Verma, Director & Vice President, Operations.",
};

const values = [
  { title: "Dignity", body: "People we support are partners in the work, never props in a story." },
  { title: "Inclusion", body: "We go where support is thinnest and listen to the people who live there." },
  { title: "Care with money", body: "We keep funds raised, funds used and outcomes clearly separate." },
  { title: "Plain reporting", body: "We publish what we did, with dates, and what didn’t go to plan." },
];

const profileTone = {
  founder: { card: "on-dark bg-aubergine text-cream", accent: "text-mango", muted: "text-lilac", chip: "bg-white/10" },
  operations: { card: "on-colour bg-leaf-ink text-white", accent: "text-mango", muted: "text-white/85", chip: "bg-white/15" },
};

/** One profile layout, used identically for both leaders. */
function LeaderProfile({ leader, eyebrow, preview }: { leader: Leader; eyebrow: string; preview: boolean }) {
  const t = profileTone[leader.role];
  return (
    <article id={leader.slug} aria-labelledby={`${leader.slug}-name`} className={`flex scroll-mt-24 flex-col overflow-hidden rounded-[2.5rem] ${t.card}`}>
      <div data-reveal="mask">
        <Portrait leader={leader} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/5] w-full sm:aspect-[4/3]" />
      </div>
      <div className="flex flex-1 flex-col p-7 sm:p-10">
        <p className={`eyebrow ${t.accent}`}>{eyebrow}</p>
        <h3 id={`${leader.slug}-name`} className="display-md mt-2">
          {leader.name}
        </h3>
        <p className={`mt-2 text-lg font-semibold ${t.accent}`}>{leader.title}</p>
        <div className={`prose-reading mt-6 ${t.muted}`}>
          {visibleBio(leader, preview).map((p) => (
            <p key={p.text}>
              {p.pending && <DraftMark>Confirm wording</DraftMark>}
              {p.text}
            </p>
          ))}
          {leader.roleSummary.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <h4 className="mt-7 font-bold">Responsibilities</h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {leader.responsibilities.map((r) => (
            <li key={r} className={`rounded-full px-4 py-2 text-sm ${t.chip}`}>
              {r}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function AboutPage() {
  const preview = isPreview();
  const note = getFounderNote(preview);

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
              We are an Indian social-impact initiative working across education, meals and nutrition, and animal welfare, with a focus on
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

      <section aria-labelledby="leadership-heading" className="bg-cream py-20 sm:py-28">
        <div className="container-site">
          <p className="eyebrow text-hibiscus-ink">Leadership</p>
          <h2 id="leadership-heading" className="display-lg mt-3">Who leads the foundation</h2>
          <p className="mt-5 max-w-2xl text-lg text-plum">
            {gopali.name} reports to {rakhi.name} in her operating role.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <LeaderProfile leader={rakhi} eyebrow="Founder" preview={preview} />
            <LeaderProfile leader={gopali} eyebrow="Operations" preview={preview} />
          </div>

          {note && (
            <section aria-labelledby="founder-note" className="mx-auto mt-20 max-w-3xl">
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
      </section>

      <Section labelledBy="how-we-work-heading" className="border-t border-aubergine/10">
        <HowWeWork headingId="how-we-work-heading" />
        <div className="mt-16 max-w-3xl">
          <h2 className="font-display text-2xl font-bold">{lookingAhead.heading}</h2>
          <p className="mt-3 text-lg text-plum">{lookingAhead.body}</p>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <Link href="/get-involved" className="btn btn-primary">Get involved <ArrowRight /></Link>
          <p className="text-sm text-plum">{site.endorsement}</p>
        </div>
      </Section>
    </>
  );
}
