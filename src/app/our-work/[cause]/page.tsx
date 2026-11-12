import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CampaignCard } from "@/components/campaign/campaign-card";
import { ArrowRight } from "@/components/ui/icons";
import { EmptyState, PageHero, RouteCard, Section } from "@/components/ui/page-parts";
import { causes, getCause, programmeStatusLabel } from "@/content/causes";
import { isPreview } from "@/lib/config";
import { listCampaigns } from "@/lib/content";

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

  return (
    <>
      <PageHero eyebrow={`Our work · ${programmeStatusLabel[cause.status]}`} title={cause.page.title} intro={cause.page.intro} tone={heroTone[cause.colour]} motif={cause.motif} />

      <Section labelledBy="why-heading">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <h2 id="why-heading" className="display-md">Why it matters</h2>
            <div className="prose-reading mt-6 text-lg">
              {cause.page.whyItMatters.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
          <aside aria-labelledby="status-heading" className="self-start rounded-[2rem] bg-paper p-7">
            <p className="eyebrow text-plum">Current status</p>
            <h2 id="status-heading" className="mt-2 font-display text-2xl font-bold">{programmeStatusLabel[cause.status]}</h2>
            <p className="mt-3">{cause.statusNote}</p>
            <h3 className="mt-6 font-bold">Who we aim to support</h3>
            <ul className="mt-3 space-y-2">
              {cause.page.whoWeAimToSupport.map((w) => (
                <li key={w} className="flex gap-3"><span aria-hidden="true" className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${accent[cause.colour]}`} />{w}</li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      <Section tone="aubergine" labelledBy="intend-heading">
        <p className="eyebrow text-mango">What we intend to support</p>
        <h2 id="intend-heading" className="display-md mt-3 max-w-3xl">Planned support, delivered with partners</h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {cause.intendedSupport.map((s, i) => (
            <li key={s} data-reveal style={{ ["--i" as string]: i }} className="rounded-[1.75rem] bg-white/8 p-6 text-lg ring-1 ring-cream/15">
              <span className="font-display text-4xl font-extrabold text-mango">0{i + 1}</span>
              <p className="mt-3">{s}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-bold">To begin: with partners</h3>
            <p className="mt-3 text-lilac">{cause.page.partnerLedNow}</p>
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold">Later: our own programmes</h3>
            <p className="mt-3 text-lilac">{cause.page.ownProgrammesLater}</p>
          </div>
        </div>
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
              <p>When a {cause.name.toLowerCase()} campaign is confirmed, it will appear here with its dates and how to take part.</p>
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
