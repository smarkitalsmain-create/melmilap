import type { Metadata } from "next";
import { InvolvementPage } from "@/components/forms/involvement-page";

export const metadata: Metadata = {
  title: "Delivery Partners",
  description: "Partner with Mel Milap Foundation to deliver education, meals and nutrition or animal welfare programmes in your community.",
};

export default function DeliveryPartnersPage() {
  return (
    <InvolvementPage
      kind="partner"
      eyebrow="Get involved · Delivery partners"
      title="You know the ground. Let’s work together."
      intro="We work with local organisations and community teams already serving their communities, supporting defined projects across our three focus areas."
      tone="hibiscus"
      points={[
        { title: "An introduction", body: "Tell us about your work, the people you serve and where." },
        { title: "Due diligence", body: "We check identity, experience, capacity and financial practices before any agreement." },
        { title: "A written agreement", body: "Activities, budget, safeguarding, milestones and reporting, agreed up front." },
      ]}
    />
  );
}
