import { getCause } from "@/content/causes";
import type { Campaign, CampaignStatus } from "@/content/types";
import { campaignStatusLabel, formatProgressValue, verifiedProgress, formatDate } from "@/lib/content";

const statusTone: Record<CampaignStatus, string> = {
  draft: "border-2 border-dashed border-cobalt bg-white text-cobalt",
  planned: "bg-mango text-aubergine",
  active: "bg-hibiscus-ink text-white",
  completed: "bg-leaf-ink text-white",
};

export function StatusChip({ status }: { status: CampaignStatus }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${statusTone[status]}`}>
      {status === "active" && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-white" />}
      <span className="sr-only">Status: </span>
      {campaignStatusLabel[status]}
    </span>
  );
}

export function categoryLabel(c: Campaign): string {
  return c.category.kind === "cause" ? (getCause(c.category.cause)?.name ?? "") : c.category.label;
}

export function CampaignFacts({ campaign, className = "" }: { campaign: Campaign; className?: string }) {
  const facts = [
    { term: "Category", value: categoryLabel(campaign) },
    campaign.timeframe && { term: "When", value: campaign.timeframe.label },
    campaign.location && { term: "Where", value: campaign.location },
  ].filter(Boolean) as { term: string; value: string }[];
  return (
    <dl className={`grid gap-x-8 gap-y-3 sm:grid-cols-3 ${className}`}>
      {facts.map((f) => (
        <div key={f.term}>
          <dt className="eyebrow opacity-75">{f.term}</dt>
          <dd className="mt-1 font-semibold">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function progressForScene(campaign: Campaign) {
  const p = verifiedProgress(campaign);
  if (!p) return null;
  return {
    percent: p.percent,
    label: `${campaign.title} progress`,
    valueText: `${p.unit === "INR" ? formatProgressValue(p, p.current) : new Intl.NumberFormat("en-IN").format(p.current)} of ${formatProgressValue(p, p.target)}, verified ${formatDate(p.verifiedOn)}`,
  };
}
