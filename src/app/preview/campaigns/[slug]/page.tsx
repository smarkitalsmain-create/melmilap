import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CampaignDetail } from "@/components/campaign/campaign-detail";
import { campaignFixtures } from "@/content/campaigns";
import { isPreview } from "@/lib/config";

export const metadata: Metadata = { title: "Campaign preview", robots: { index: false, follow: false } };

export default async function CampaignFixturePage({ params }: { params: Promise<{ slug: string }> }) {
  if (!isPreview()) notFound();
  const { slug } = await params;
  const campaign = campaignFixtures.find((c) => c.slug === slug);
  if (!campaign) notFound();
  return <CampaignDetail campaign={campaign} />;
}
