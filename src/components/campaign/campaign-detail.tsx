import Image from "next/image";
import Link from "next/link";
import { DraftMark } from "@/components/layout/preview-banner";
import { ArrowRight } from "@/components/ui/icons";
import type { Campaign } from "@/content/types";
import { formatDate } from "@/lib/content";
import { CampaignFacts, StatusChip, progressForScene } from "./campaign-bits";
import { WaterScene } from "./water";

/**
 * Reusable campaign template. Renders only the fields a campaign actually has;
 * completed campaigns lead with what happened.
 */
export function CampaignDetail({ campaign }: { campaign: Campaign }) {
  const progress = progressForScene(campaign);
  const images = (campaign.images ?? []).filter((i) => i.approved);
  const updates = (campaign.updates ?? []).filter((u) => u.approved).sort((a, b) => b.date.localeCompare(a.date));
  const completed = campaign.status === "completed";

  return (
    <>
      <section className="on-dark grain overflow-hidden bg-aubergine text-cream">
        <div className="container-site grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm">
              <Link href="/campaigns" className="link-draw font-semibold text-lilac">Campaigns</Link>
            </nav>
            <div className="flex flex-wrap items-center gap-3">
              {campaign.status === "draft" && <DraftMark>Draft · not public</DraftMark>}
              {campaign.fixture && <DraftMark>Example · not real</DraftMark>}
              <StatusChip status={campaign.status} />
            </div>
            <p className="eyebrow mt-6 text-mango">{campaign.title}</p>
            <h1 className="display-lg mt-3">{campaign.headline}</h1>
            <p className="mt-6 max-w-2xl text-lg text-lilac">{campaign.summary}</p>
          </div>
          <div className="glass rounded-[2rem] p-6 sm:p-8">
            <CampaignFacts campaign={campaign} className="!grid-cols-1" />
            {progress && <WaterScene progress={progress} className="mt-6 h-40" />}
            {!completed && campaign.status === "active" && campaign.participation?.action && (
              <Link href={campaign.participation.action.href} className="btn btn-mango mt-6 w-full">
                {campaign.participation.action.label} <ArrowRight />
              </Link>
            )}
          </div>
        </div>
      </section>

      {campaign.pendingConfirmation && campaign.pendingConfirmation.length > 0 && (
        <aside aria-label="Awaiting confirmation" className="border-b-2 border-dashed border-cobalt bg-white">
          <div className="container-site py-6">
            <p className="font-bold text-cobalt">Preview: confirm before publishing</p>
            <ul className="mt-2 list-disc pl-5">{campaign.pendingConfirmation.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </aside>
      )}

      <div className="container-site grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div className="space-y-14">
          {completed && campaign.outcome && (
            <section aria-labelledby="outcome-heading">
              <h2 id="outcome-heading" className="display-md">What happened</h2>
              <div className="prose-reading mt-5 text-lg">{campaign.outcome.map((p) => <p key={p}>{p}</p>)}</div>
              {campaign.evidence && campaign.evidence.length > 0 && (
                <ul className="mt-6 space-y-2">
                  {campaign.evidence.map((e) => (
                    <li key={e.href}><Link href={e.href} className="link-inline font-semibold">{e.label}</Link></li>
                  ))}
                </ul>
              )}
            </section>
          )}
          {campaign.story && (
            <section aria-labelledby="story-heading">
              <h2 id="story-heading" className="display-md">{completed ? "Why we ran it" : "About the campaign"}</h2>
              <div className="prose-reading mt-5 text-lg">{campaign.story.map((p) => <p key={p}>{p}</p>)}</div>
            </section>
          )}
          {images.length > 0 && (
            <section aria-label="Photographs" className="grid gap-5 sm:grid-cols-2">
              {images.map((img) => (
                <figure key={img.src} data-reveal="mask" className="overflow-hidden rounded-[2rem]">
                  <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 30vw, 100vw" className="h-auto w-full" />
                  {(img.caption || img.illustrative) && (
                    <figcaption className="bg-paper px-4 py-3 text-sm">
                      {img.illustrative && <strong>Illustrative image. </strong>}
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </section>
          )}
          {updates.length > 0 && (
            <section aria-labelledby="updates-heading">
              <h2 id="updates-heading" className="display-md">Updates</h2>
              <ol className="mt-6 space-y-6 border-l-4 border-mango pl-6">
                {updates.map((u) => (
                  <li key={u.date + u.title}>
                    <time dateTime={u.date} className="eyebrow text-plum">{formatDate(u.date)}</time>
                    <h3 className="mt-1 font-display text-xl font-bold">{u.title}</h3>
                    <p className="mt-1">{u.body}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        {campaign.participation && !completed && (
          <aside aria-labelledby="take-part-heading" className="self-start rounded-[2rem] bg-mango p-7 on-mango">
            <h2 id="take-part-heading" className="font-display text-2xl font-bold">How to take part</h2>
            <ol className="mt-5 space-y-4">
              {campaign.participation.steps.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-aubergine font-bold text-cream">{i + 1}</span>
                  <span className="pt-1">{s}</span>
                </li>
              ))}
            </ol>
            {campaign.participation.action && (
              <Link href={campaign.participation.action.href} className="btn btn-ghost mt-6">
                {campaign.participation.action.label}
              </Link>
            )}
          </aside>
        )}
      </div>
    </>
  );
}
