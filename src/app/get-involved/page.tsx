import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, RouteCard, Section } from "@/components/ui/page-parts";
import { getDonationConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Volunteer, become a delivery partner or make an institutional enquiry with Mel Milap Foundation.",
};

export default function GetInvolvedPage() {
  const donations = getDonationConfig();
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="There’s a place for you at the table."
        intro="Choose the route that fits you. Each one is a short form, and a real person will reply."
      />
      <Section className="!pt-0">
        <div className="grid gap-5 lg:grid-cols-3">
          <RouteCard href="/get-involved/volunteer" tone="mango" title="Volunteer" body="Give time to teaching, meal days, community dogs or seasonal campaigns, or lend a professional skill." cta="Volunteer with us" />
          <RouteCard href="/get-involved/delivery-partners" tone="hibiscus" title="Delivery partners" body="NGOs, community kitchens, schools, vets and rescue groups who deliver on the ground." cta="Partner with us" />
          <RouteCard href="/get-involved/institutions" tone="cobalt" title="Institutions & CSR" body="Companies, colleges, foundations and public bodies looking for an accountable partner." cta="Make an enquiry" />
        </div>
        <div className="mt-10 rounded-[2rem] border-2 border-dashed border-aubergine/30 p-7">
          <h2 className="font-display text-2xl font-bold">Donations</h2>
          {donations.live ? (
            <p className="mt-2 text-lg"><Link href="/donate" className="link-inline">Make a donation</Link> through our secure payment page.</p>
          ) : (
            <p className="mt-2 text-lg">
              Online donations through this website open once our payment account is verified. Until then, volunteering and partnerships
              are the best ways to help.
            </p>
          )}
        </div>
      </Section>
    </>
  );
}
