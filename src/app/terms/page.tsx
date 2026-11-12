import { LegalPage, legalMetadata } from "@/components/ui/legal-page";

export const metadata = legalMetadata("terms");

export default function TermsPage() {
  return <LegalPage slug="terms" />;
}
