import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CampaignCard } from "@/components/campaign/campaign-card";
import { PageHero, Section } from "@/components/ui/page-parts";
import { campaignFixtures } from "@/content/campaigns";
import { isPreview } from "@/lib/config";

export const metadata: Metadata = { title: "Campaign states (preview)", robots: { index: false, follow: false } };

/** Fictional campaigns for reviewing every campaign state. Preview mode only. */
export default function CampaignStatesPreview() {
  if (!isPreview()) notFound();
  return (
    <>
      <PageHero eyebrow="Preview" title="Campaign states" intro="Fictional examples of each campaign state, for review only. They never appear on the public site." />
      <Section>
        <ul className="grid gap-5 md:grid-cols-2">
          {campaignFixtures.map((c) => <li key={c.slug}><CampaignCard campaign={c} hrefBase="/preview/campaigns" /></li>)}
        </ul>
      </Section>
    </>
  );
}
