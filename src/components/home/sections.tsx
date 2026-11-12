import Link from "next/link";
import { HeroArt } from "@/components/art/hero-art";
import { ArrowRight } from "@/components/ui/icons";
import { Portrait } from "@/components/ui/portrait";
import { gopali, rakhi } from "@/content/leadership";
import type { ProgrammeUpdate } from "@/content/types";
import { formatDate } from "@/lib/content";
import { fundraisingMilestone } from "@/content/fundraising";
import { GatherFinale } from "./gather-finale";
import { LeaderCard } from "./leader-card";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="grain relative overflow-hidden bg-cream">
      <div className="container-site grid items-center gap-8 pb-14 pt-10 sm:pt-14 lg:min-h-[calc(100dvh-16rem)] lg:grid-cols-[1.08fr_1fr] lg:gap-4 lg:py-6">
        <div className="relative z-10">
          <p className="eyebrow inline-flex items-center gap-2 text-hibiscus-ink">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-hibiscus" />
            Mel milap · coming together
          </p>
          <h1 id="hero-heading" className="display-xl mt-5">
            Good begins when we{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">come together.</span>
              <svg aria-hidden="true" viewBox="0 0 300 24" preserveAspectRatio="none" className="absolute -bottom-1 left-0 z-0 h-[0.32em] w-full">
                <path d="M4 16 C70 4 150 22 296 8" stroke="#FFBD2E" strokeWidth="14" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-plum sm:text-xl">
            Mel Milap Foundation works across education, meals and nutrition, and animal welfare. Explore our work and find a way to
            take part.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/our-work" className="btn btn-primary">
              See our work <ArrowRight />
            </Link>
            <Link href="/get-involved" className="btn btn-ghost">
              Get involved
            </Link>
          </div>
        </div>
        <div className="relative -mx-4 sm:mx-0 lg:-mr-10 lg:-mt-6 xl:-mr-20">
          <HeroArt className="mx-auto block aspect-[660/640] w-full max-w-[34rem] lg:max-h-[calc(100dvh-17rem)] lg:max-w-none" />
        </div>
      </div>
    </section>
  );
}

/**
 * Fundraising milestone, directly below the hero. Server-rendered and never
 * hidden: the optional entrance only moves it, so the figure is always visible.
 */
export function MilestoneStrip() {
  const m = fundraisingMilestone;
  return (
    <section aria-labelledby="milestone-figure" className="on-dark grain overflow-hidden bg-aubergine text-cream">
      <div className="container-site milestone-enter flex flex-col gap-4 py-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-5">
          <p id="milestone-figure" className="display-lg whitespace-nowrap text-mango">
            {m.figure} <span className="text-cream">{m.label}</span>
          </p>
          <p className="text-lg font-semibold sm:text-xl">
            <time dateTime={m.asOf}>{m.period}</time>
          </p>
        </div>
        <Link href={m.updateHref} className="group inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap text-lg font-bold text-mango lg:self-auto">
          <span className="link-draw">Read the fundraising update</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

export function LeadershipIntro() {
  return (
    <section aria-labelledby="leadership-heading" className="bg-cream py-20 lg:py-28">
      <div className="container-site">
        <p className="eyebrow text-hibiscus-ink">Leadership</p>
        <h2 id="leadership-heading" className="display-lg mt-3 max-w-3xl">
          The people bringing us together
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { leader: rakhi, eyebrow: "Founder" },
            { leader: gopali, eyebrow: "Operations" },
          ].map(({ leader, eyebrow }) => (
            <LeaderCard
              key={leader.slug}
              leader={leader}
              eyebrow={eyebrow}
              portrait={<Portrait leader={leader} sizes="(min-width: 768px) 45vw, 100vw" className="aspect-[4/3] w-full [&_figcaption]:hidden" />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustSection({ updates }: { updates: ProgrammeUpdate[] }) {
  return (
    <section aria-labelledby="trust-heading" className="on-dark grain bg-cobalt py-20 text-white lg:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow text-mango">Updates & transparency</p>
          <h2 id="trust-heading" className="display-lg mt-3">
            You’ll see where it goes.
          </h2>
          <p className="mt-6 max-w-md text-lg">
            Every update carries a date. Funds raised, funds used and programme outcomes are reported separately on our
            Transparency page.
          </p>
          <Link href="/transparency" className="btn btn-cream mt-8">
            Visit Transparency <ArrowRight />
          </Link>
        </div>
        <div>
          {updates.length > 0 ? (
            <ul className="space-y-4">
              {updates.slice(0, 3).map((u) => (
                <li key={u.slug} className="rounded-[1.5rem] bg-white/10 p-6">
                  <p className="eyebrow text-mango">
                    {u.kind === "fundraising" ? "Fundraising" : <time dateTime={u.date}>{formatDate(u.date)}</time>}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold">{u.title}</h3>
                  <p className="mt-2">{u.summary}</p>
                  <Link href={`/transparency#${u.slug}`} className="link-inline mt-3 inline-block font-semibold">
                    Read the update<span className="sr-only">: {u.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-[2rem] border-2 border-dashed border-white/50 p-7 sm:p-9">
              <h3 className="font-display text-2xl font-bold">Updates are on their way</h3>
              <p className="mt-3">Dated updates appear here as they are published.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function ClosingInvite({ donationsLive }: { donationsLive: boolean }) {
  const actions = [
    { label: "Volunteer", href: "/get-involved/volunteer", className: "btn-primary" },
    { label: "Partner with us", href: "/get-involved/delivery-partners", className: "btn-hibiscus" },
    { label: "Contact the foundation", href: "/contact", className: "btn-ghost" },
  ];
  if (donationsLive) actions.unshift({ label: "Donate", href: "/donate", className: "btn-mango" });
  return (
    <section aria-labelledby="closing-heading" className="grain overflow-hidden bg-cream py-20 lg:py-28">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <GatherFinale className="order-last mx-auto w-full max-w-md lg:order-first" />
        <div>
          <h2 id="closing-heading" className="display-lg">
            Come together with us.
          </h2>
          <p className="mt-6 max-w-lg text-lg text-plum">
            A book, a bowl, a paw. Each starts with someone deciding to show up. Tell us how you’d like to help.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {actions.map((a) => (
              <Link key={a.href} href={a.href} className={`btn ${a.className}`}>
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
