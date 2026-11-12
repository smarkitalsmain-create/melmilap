import type { Metadata } from "next";
import { InvolvementPage } from "@/components/forms/involvement-page";

export const metadata: Metadata = {
  title: "Institutions & CSR",
  description: "CSR teams, schools, colleges, foundations and public bodies: make an institutional enquiry with Mel Milap Foundation.",
};

export default function InstitutionsPage() {
  return (
    <InvolvementPage
      kind="institutional"
      eyebrow="Get involved · Institutions"
      title="Partnerships built to be reported on."
      intro="We’re glad to talk with companies, educational institutions, foundations and public bodies about working together."
      tone="cobalt"
      points={[
        { title: "Tell us your goals", body: "The cause, the region and the kind of partnership you have in mind." },
        { title: "A conversation with leadership", body: "Our Managing Director leads key institutional partnerships." },
        { title: "Clear documentation", body: "We’ll share approved documents as they become available." },
      ]}
    />
  );
}
