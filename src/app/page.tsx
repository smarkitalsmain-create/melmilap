import { CampaignSpotlight } from "@/components/home/campaign-spotlight";
import { CauseBuild } from "@/components/home/cause-build";
import { HowItWorks } from "@/components/home/how-it-works";
import { ClosingInvite, Hero, LeadershipIntro, TrustSection } from "@/components/home/sections";
import { causes } from "@/content/causes";
import { getDonationConfig, isPreview } from "@/lib/config";
import { getSpotlight, listUpdates } from "@/lib/content";

export default function HomePage() {
  const { campaign, fallback } = getSpotlight(isPreview());
  return (
    <>
      <Hero />
      <CauseBuild causes={causes} />
      <CampaignSpotlight campaign={campaign} fallback={fallback} />
      <HowItWorks />
      <LeadershipIntro />
      <TrustSection updates={listUpdates()} />
      <ClosingInvite donationsLive={getDonationConfig().live} />
    </>
  );
}
