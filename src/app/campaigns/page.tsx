import type { Metadata } from "next";
import { CampaignCard } from "@/components/campaign/campaign-card";
import { EmptyState, PageHero, RouteCard, Section } from "@/components/ui/page-parts";
import { isPreview } from "@/lib/config";
import { campaignStatusLabel, listCampaigns, statusOrder } from "@/lib/content";

export const metadata: Metadata = {
  title: "Campaigns",
  description: "Time-bound campaigns from Mel Milap Foundation, including seasonal relief, with their status, dates and how to take part.",
};

const groupHeading = { active: "Open now", planned: "Coming up", completed: "Completed", draft: "Drafts (preview only)" };

export default function CampaignsPage() {
  const campaigns = listCampaigns(isPreview());
  const groups = statusOrder.map((s) => ({ status: s, items: campaigns.filter((c) => c.status === s) })).filter((g) => g.items.length);

  return (
    <>
      <PageHero
        eyebrow="Campaigns"
        tone="hibiscus"
        title="Small, focused efforts with a clear start and finish."
        intro="Each campaign has its own page with its status, dates, location and how to take part. We publish a campaign only once these details are confirmed."
      />
      <Section labelledBy="campaign-list-heading">
        <h2 id="campaign-list-heading" className="sr-only">All campaigns</h2>
        {groups.length ? (
          <div className="space-y-14">
            {groups.map((g) => (
              <section key={g.status} aria-labelledby={`group-${g.status}`}>
                <h3 id={`group-${g.status}`} className="display-md">{groupHeading[g.status]}</h3>
                <p className="sr-only">{campaignStatusLabel[g.status]}</p>
                <ul className="mt-6 grid gap-5 md:grid-cols-2">
                  {g.items.map((c) => <li key={c.slug}><CampaignCard campaign={c} /></li>)}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <EmptyState title="Our first campaign is being confirmed">
            <p>We’ll publish it here once its dates, location and participation details are settled. Until then, you can help us get ready.</p>
          </EmptyState>
        )}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <RouteCard href="/get-involved/volunteer" title="Volunteer" body="Be ready to help when a campaign opens near you." tone="cobalt" />
          <RouteCard href="/get-involved/delivery-partners" title="Partner on a campaign" body="Bring your organisation’s reach to a campaign." tone="mango" />
        </div>
      </Section>
    </>
  );
}
