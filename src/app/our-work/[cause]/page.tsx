import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CampaignCard } from "@/components/campaign/campaign-card";
import { ArrowRight } from "@/components/ui/icons";
import { EmptyState, PageHero, RouteCard, Section } from "@/components/ui/page-parts";
import { causes, confirmedActivities, getCause } from "@/content/causes";
import { isPreview } from "@/lib/config";
import { formatDate, listCampaigns } from "@/lib/content";

export function generateStaticParams() {
  return causes.map((c) => ({ cause: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ cause: string }> }): Promise<Metadata> {
  const cause = getCause((await params).cause);
  if (!cause) return {};
  return { title: cause.page.title, description: cause.page.metaDescription, openGraph: { title: cause.page.title, description: cause.page.metaDescription } };
}

const heroTone = { mango: "mango", hibiscus: "hibiscus", leaf: "leaf" } as const;
const accent = { mango: "bg-mango", hibiscus: "bg-hibiscus", leaf: "bg-leaf" };

export default async function CausePage({ params }: { params: Promise<{ cause: string }> }) {
  const cause = getCause((await params).cause);
  if (!cause) notFound();
  const related = listCampaigns(isPreview()).filter((c) => c.category.kind === "cause" && c.category.cause === cause.slug);
  const others = causes.filter((c) => c.slug !== cause.slug);
  const activities = confirmedActivities(cause);

  return (
    <>
      <PageHero eyebrow="Our work" title={cause.page.title} intro={cause.page.intro} tone={heroTone[cause.colour]} motif={cause.motif} />

      <Section labelledBy="why-heading">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <h2 id="why-heading" className="display-md">Why it matters</h2>
            <div className="prose-reading mt-6 text-lg">
              {cause.page.whyItMatters.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
          <aside aria-labelledby="support-heading" className="self-start rounded-[2rem] bg-paper p-7">
            <h2 id="support-heading" className="font-display text-2xl font-bold">Who we support</h2>
            <ul className="mt-4 space-y-2">
              {cause.page.whoWeSupport.map((w) => (
                <li key={w} className="flex gap-3"><span aria-hidden="true" className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${accent[cause.colour]}`} />{w}</li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      <Section tone="aubergine" labelledBy="activities-heading">
        <p className="eyebrow text-mango">Activities</p>
        <h2 id="activities-heading" className="display-md mt-3 max-w-3xl">What’s happening in {cause.name}</h2>
        {activities.length ? (
          <ol className="mt-10 space-y-6 border-l-4 border-mango pl-6">
            {activities.map((a) => (
              <li key={a.date + a.title}>
                <p className="eyebrow flex flex-wrap items-center gap-3 text-mango">
                  <time dateTime={a.date}>{formatDate(a.date)}</time>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-cream">{a.status === "ongoing" ? "Ongoing" : "Completed"}</span>
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold">{a.title}</h3>
                <p className="mt-2 max-w-2xl text-lilac">{a.summary}</p>
                <dl className="mt-3 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-3">
                  <div><dt className="font-bold">Delivered by</dt><dd className="text-lilac">{a.deliveredBy}</dd></div>
                  <div><dt className="font-bold">Mel Milap’s role</dt><dd className="text-lilac">{a.melMilapRole}</dd></div>
                  {a.location && <div><dt className="font-bold">Where</dt><dd className="text-lilac">{a.location}</dd></div>}
                </dl>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-6 max-w-2xl text-lg text-lilac">
            Dated activity entries appear here as details are confirmed, each with who delivered the work and Mel Milap’s role.
          </p>
        )}
      </Section>

      <Section labelledBy="help-heading">
        <h2 id="help-heading" className="display-md">Ways to take part</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {cause.page.waysToHelp.map((w, i) => (
            <RouteCard key={w.label} href={w.href} title={w.label} body={w.description} tone={i === 0 ? "cobalt" : heroTone[cause.colour]} />
          ))}
        </div>
        <h2 className="display-md mt-16">Campaigns in {cause.name}</h2>
        <div className="mt-8">
          {related.length ? (
            <ul className="grid gap-5 md:grid-cols-2">{related.map((c) => <li key={c.slug}><CampaignCard campaign={c} /></li>)}</ul>
          ) : (
            <EmptyState title="No campaigns yet">
              <p>When a {cause.name.toLowerCase()} campaign is confirmed, it appears here with its dates and how to take part.</p>
            </EmptyState>
          )}
        </div>
        <nav aria-label="Other causes" className="mt-16 flex flex-wrap gap-3">
          {others.map((o) => (
            <Link key={o.slug} href={`/our-work/${o.slug}`} className="btn btn-ghost">{o.name} <ArrowRight /></Link>
          ))}
        </nav>
      </Section>
    </>
  );
}
