import type { Metadata } from "next";
import { InvolvementPage } from "@/components/forms/involvement-page";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Volunteer with Mel Milap Foundation in education, meals and nutrition, animal welfare or seasonal campaigns.",
};

export default async function VolunteerPage({ searchParams }: { searchParams: Promise<{ campaign?: string }> }) {
  const { campaign } = await searchParams;
  return (
    <InvolvementPage
      kind="volunteer"
      eyebrow="Get involved · Volunteer"
      title="Lend a hand, an hour or a skill."
      intro="Tell us what you enjoy and when you’re free. We’ll get in touch when there’s a role that fits."
      tone="mango"
      campaign={campaign && /^[a-z0-9-]{1,120}$/.test(campaign) ? campaign : undefined}
      points={[
        { title: "We read every form", body: "Someone from the team will reply by email." },
        { title: "A short conversation", body: "We’ll talk about what you’d like to do and where." },
        { title: "A safe start", body: "Roles involving children or animals include a briefing and safeguarding checks." },
      ]}
    />
  );
}
