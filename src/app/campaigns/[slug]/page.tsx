import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CampaignDetail } from "@/components/campaign/campaign-detail";
import { isPreview } from "@/lib/config";
import { findCampaign, listCampaigns } from "@/lib/content";

export function generateStaticParams() {
  return listCampaigns(isPreview()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const campaign = findCampaign((await params).slug, isPreview());
  if (!campaign || campaign.fixture) return {};
  return {
    title: campaign.title,
    description: campaign.summary,
    openGraph: { title: campaign.headline, description: campaign.summary },
    robots: campaign.status === "draft" ? { index: false } : undefined,
  };
}

export default async function CampaignPage({ params }: { params: Promise<{ slug: string }> }) {
  const campaign = findCampaign((await params).slug, isPreview());
  if (!campaign || campaign.fixture) notFound();
  return <CampaignDetail campaign={campaign} />;
}
