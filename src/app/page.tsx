import { CampaignSpotlight } from "@/components/home/campaign-spotlight";
import { CauseBuild } from "@/components/home/cause-build";
import { FieldGallery } from "@/components/home/field-gallery";
import { HowItWorks } from "@/components/home/how-it-works";
import { ClosingInvite, Hero, LeadershipIntro, TrustSection } from "@/components/home/sections";
import { causes } from "@/content/causes";
import { previewFieldPhotos, publicFieldPhotos } from "@/content/photos";
import { getDonationConfig, isPreview } from "@/lib/config";
import { getSpotlight, listUpdates } from "@/lib/content";

export default function HomePage() {
  const preview = isPreview();
  const { campaign, fallback } = getSpotlight(preview);
  const photos = preview ? previewFieldPhotos() : publicFieldPhotos();
  return (
    <>
      <Hero />
      <CauseBuild causes={causes} />
      <FieldGallery photos={photos} />
      <CampaignSpotlight campaign={campaign} fallback={fallback} burst={photos.length === 0} />
      <HowItWorks />
      <LeadershipIntro />
      <TrustSection updates={listUpdates()} />
      <ClosingInvite donationsLive={getDonationConfig().live} />
    </>
  );
}
