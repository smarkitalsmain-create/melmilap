import Link from "next/link";
import { DraftMark } from "@/components/layout/preview-banner";
import { ArrowRight } from "@/components/ui/icons";
import type { Campaign } from "@/content/types";
import { StatusChip, categoryLabel } from "./campaign-bits";

export function CampaignCard({ campaign, hrefBase = "/campaigns" }: { campaign: Campaign; hrefBase?: string }) {
  return (
    <article className="flex h-full flex-col rounded-[2rem] border-2 border-aubergine/15 bg-paper p-7">
      <div className="flex flex-wrap items-center gap-2">
        {campaign.status === "draft" && <DraftMark>Draft · preview only</DraftMark>}
        <StatusChip status={campaign.status} />
        <span className="text-sm font-semibold text-plum">{categoryLabel(campaign)}</span>
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold">
        <Link href={`${hrefBase}/${campaign.slug}`} className="link-draw">{campaign.title}</Link>
      </h3>
      <p className="mt-2">{campaign.summary}</p>
      {(campaign.timeframe || campaign.location) && (
        <p className="mt-3 text-sm font-semibold text-plum">{[campaign.timeframe?.label, campaign.location].filter(Boolean).join(" · ")}</p>
      )}
      <span aria-hidden="true" className="mt-auto pt-5 text-cobalt"><ArrowRight /></span>
    </article>
  );
}
