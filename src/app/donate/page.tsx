import type { Metadata } from "next";
import Link from "next/link";
import { DonateForm } from "@/components/forms/donate-form";
import { PageHero, RouteCard, Section } from "@/components/ui/page-parts";
import { getDonationConfig, isPreview } from "@/lib/config";
import { listCampaigns } from "@/lib/content";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support Mel Milap Foundation. Online donations open once the foundation's payment account is verified.",
};

export default async function DonatePage({ searchParams }: { searchParams: Promise<{ campaign?: string }> }) {
  const cfg = getDonationConfig();
  const { campaign } = await searchParams;

  if (!cfg.enabled) {
    return (
      <>
        <PageHero eyebrow="Donate" tone="hibiscus" title="Online donations open soon."
          intro="We’ll accept donations only once our own payment account is verified and we have a programme ready to fund. Until then, here are other ways to help." />
        <Section>
          <div className="grid gap-5 lg:grid-cols-3">
            <RouteCard href="/get-involved/volunteer" tone="mango" title="Volunteer" body="Give time or a professional skill." />
            <RouteCard href="/get-involved/delivery-partners" tone="cobalt" title="Partner with us" body="Deliver programmes in your community." />
            <RouteCard href="/get-involved/institutions" tone="aubergine" title="Institutions & CSR" body="Talk to us about an institutional partnership." />
          </div>
          <p className="mt-10 max-w-2xl text-plum">
            Please don’t send money to anyone claiming to collect for Mel Milap Foundation by phone, email or messaging app. When donations
            open, they will only be taken on this website. Read our draft <Link href="/donation-policy" className="link-inline">donation policy</Link>.
          </p>
        </Section>
      </>
    );
  }

  const campaigns = listCampaigns(isPreview()).filter((c) => c.status === "active").map((c) => ({ slug: c.slug, title: c.title }));
  return (
    <>
      <PageHero eyebrow="Donate" tone="hibiscus" title="Give where it counts." intro="Every rupee is tracked and reported on our Transparency page." />
      <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
        <section aria-label="Donation form" className="rounded-[2rem] bg-paper p-6 sm:p-10">
          <DonateForm campaigns={campaigns} defaultCampaign={campaign} testMode={!cfg.live} />
        </section>
        <aside className="space-y-4 text-plum">
          <h2 className="font-display text-2xl font-bold text-aubergine">Before you give</h2>
          <p>We confirm every payment with our provider before showing success or issuing a receipt.</p>
          <p>Information on tax benefits will appear here only once the relevant registrations are verified.</p>
          <p><Link className="link-inline" href="/donation-policy">Donation policy</Link></p>
        </aside>
      </div>
    </>
  );
}
