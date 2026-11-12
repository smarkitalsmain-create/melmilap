/**
 * Read-side of the content layer. Pages call these helpers instead of reading
 * the content files directly, so publication rules live in one place and a
 * future NGOSutra adapter can replace the sources behind them.
 */
import { campaigns as allCampaigns, campaignFixtures, spotlight } from "@/content/campaigns";
import { founderNote } from "@/content/leadership";
import { impactMetrics, programmeUpdates, transparencyDocuments, utilisationSummaries } from "@/content/records";
import type { BioParagraph, Campaign, CampaignProgress, CampaignStatus, Leader } from "@/content/types";

export const isPublished = (c: Campaign) => c.status !== "draft" && !c.fixture;

export function listCampaigns(preview: boolean): Campaign[] {
  return allCampaigns.filter((c) => !c.fixture && (preview || isPublished(c)));
}

export function findCampaign(slug: string, preview: boolean): Campaign | undefined {
  const fromContent = allCampaigns.find((c) => c.slug === slug);
  if (fromContent && (preview || isPublished(fromContent))) return fromContent;
  if (preview) return campaignFixtures.find((c) => c.slug === slug);
  return undefined;
}

export function getSpotlight(preview: boolean): { campaign: Campaign | null; fallback: typeof spotlight.fallback } {
  const campaign = findCampaign(spotlight.campaignSlug, preview) ?? null;
  return { campaign, fallback: spotlight.fallback };
}

export const statusOrder: CampaignStatus[] = ["active", "planned", "completed", "draft"];

export const campaignStatusLabel: Record<CampaignStatus, string> = {
  draft: "Draft",
  planned: "Planned",
  active: "Open now",
  completed: "Completed",
};

/** Progress renders only with a verified, sane target and current value. */
export function verifiedProgress(c: Campaign): (CampaignProgress & { percent: number }) | null {
  const p = c.progress;
  if (!p || !p.verifiedOn || !(p.target > 0) || p.current < 0) return null;
  return { ...p, percent: Math.min(100, Math.round((p.current / p.target) * 100)) };
}

export function visibleBio(leader: Leader, preview: boolean): (BioParagraph & { pending: boolean })[] {
  return leader.bio
    .filter((p) => p.confirmed || preview)
    .map((p) => ({ ...p, pending: !p.confirmed }));
}

export function getFounderNote(preview: boolean) {
  if (founderNote.approval === "approved" || preview) {
    return { ...founderNote, pending: founderNote.approval !== "approved" };
  }
  return null;
}

const approved = <T extends { approval: string }>(items: T[]) => items.filter((i) => i.approval === "approved");
const byDateDesc = <T,>(get: (t: T) => string) => (a: T, b: T) => get(b).localeCompare(get(a));

export const listUpdates = () => approved(programmeUpdates).sort(byDateDesc((u) => u.date));
export const listDocuments = () => approved(transparencyDocuments).sort(byDateDesc((d) => d.date));
export const listUtilisation = () => approved(utilisationSummaries).sort(byDateDesc((u) => u.publishedOn));
export const listImpact = () => approved(impactMetrics);

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

export function formatINR(minor: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(minor / 100);
}

export function formatProgressValue(p: CampaignProgress, value: number): string {
  return p.unit === "INR" ? formatINR(value) : `${new Intl.NumberFormat("en-IN").format(value)}${p.itemLabel ? ` ${p.itemLabel}` : ""}`;
}
