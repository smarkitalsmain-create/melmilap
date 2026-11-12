import Link from "next/link";
import { BurstFrame } from "@/components/campaign/burst-frame";
import { CampaignFacts, StatusChip, progressForScene } from "@/components/campaign/campaign-bits";
import { WaterScene } from "@/components/campaign/water";
import { DraftMark } from "@/components/layout/preview-banner";
import { ArrowRight } from "@/components/ui/icons";
import type { Campaign } from "@/content/types";
import type { spotlight } from "@/content/campaigns";

interface Props {
  campaign: Campaign | null;
  fallback: typeof spotlight.fallback;
}

/** Editorial campaign feature, driven entirely by content configuration. */
export function CampaignSpotlight({ campaign, fallback }: Props) {
  const progress = campaign ? progressForScene(campaign) : null;

  return (
    <section aria-labelledby="spotlight-heading" className="on-dark grain overflow-hidden bg-aubergine py-20 text-cream lg:py-28">
      <div className="container-site">
        <BurstFrame>
          <div className="grid items-center gap-12 px-2 py-10 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:px-14 lg:py-16">
            <div>
              <p className="eyebrow flex flex-wrap items-center gap-3 text-mango">
                {campaign?.status === "draft" && <DraftMark />}
                {campaign ? "Campaign spotlight" : fallback.eyebrow}
                {campaign && <StatusChip status={campaign.status} />}
              </p>
              <h2 id="spotlight-heading" className="display-lg mt-5">
                {campaign ? campaign.headline : fallback.headline}
              </h2>
              <p className="mt-6 max-w-xl text-lg text-lilac">{campaign ? campaign.summary : fallback.body}</p>
              {campaign && <CampaignFacts campaign={campaign} className="mt-8 max-w-xl" />}
              <div className="mt-9 flex flex-wrap gap-3">
                {campaign ? (
                  <>
                    <Link href={`/campaigns/${campaign.slug}`} className="btn btn-mango">
                      {campaign.status === "completed" ? "See what happened" : "Read about the campaign"}
                      <ArrowRight />
                    </Link>
                    {campaign.status === "active" && campaign.participation?.action && (
                      <Link href={campaign.participation.action.href} className="btn btn-ghost">
                        {campaign.participation.action.label}
                      </Link>
                    )}
                  </>
                ) : (
                  fallback.actions.map((a, i) => (
                    <Link key={a.href} href={a.href} className={`btn ${i === 0 ? "btn-mango" : "btn-ghost"}`}>
                      {a.label}
                      {i === 0 && <ArrowRight />}
                    </Link>
                  ))
                )}
              </div>
            </div>

            <div className="relative">
              <div aria-hidden="true" className="absolute -left-6 top-6 h-48 w-48 rounded-full bg-hibiscus" />
              <div aria-hidden="true" className="absolute -right-4 bottom-0 h-40 w-56 rounded-t-full bg-mango" />
              <div className="glass relative rounded-[2rem] p-6 shadow-2xl shadow-black/30 sm:p-8">
                <h3 className="font-display text-2xl font-bold">
                  {campaign ? (progress ? "Progress so far" : "How to take part") : fallback.panelTitle}
                </h3>
                {campaign?.participation && !progress ? (
                  <ol className="mt-4 space-y-3">
                    {campaign.participation.steps.map((step, i) => (
                      <li key={step} className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mango text-sm font-bold text-aubergine">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  !progress && <p className="mt-3 text-lilac">{fallback.panelBody}</p>
                )}
                <div className="mt-6">
                  {progress ? (
                    <WaterScene progress={progress} className="h-44" />
                  ) : (
                    <div className="flex items-center gap-4">
                      <WaterScene className="h-24 w-24 shrink-0" />
                      <p className="text-sm text-lilac">
                        <span aria-hidden="true">Tap the water.</span> Every ripple starts small.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </BurstFrame>
      </div>
    </section>
  );
}
