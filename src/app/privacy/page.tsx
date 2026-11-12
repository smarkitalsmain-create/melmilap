import { LegalPage, legalMetadata } from "@/components/ui/legal-page";

export const metadata = legalMetadata("privacy");

export default function PrivacyPage() {
  return <LegalPage slug="privacy" />;
}
