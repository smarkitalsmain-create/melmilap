import { LegalPage, legalMetadata } from "@/components/ui/legal-page";

export const metadata = legalMetadata("donation-policy");

export default function DonationPolicyPage() {
  return <LegalPage slug="donation-policy" />;
}
