import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/ui/page-parts";
import type { PaymentStatus } from "@/lib/payments/donation";
import { getPaymentProvider } from "@/lib/payments/providers";

export const metadata: Metadata = { title: "Donation status", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const copy: Record<PaymentStatus, { tone: "leaf" | "mango" | "hibiscus" | "cream"; title: string; body: string }> = {
  paid: { tone: "leaf", title: "Thank you. Your donation is confirmed.", body: "Our payment provider has confirmed your payment. Please keep the reference below for your records; we’ll use it if you contact us about this donation." },
  pending: { tone: "mango", title: "Your payment is still processing.", body: "We haven’t received confirmation yet. Please don’t pay again; refresh this page in a few minutes." },
  failed: { tone: "hibiscus", title: "The payment didn’t go through.", body: "You have not been charged. You can try again, or choose another way to help." },
  cancelled: { tone: "cream", title: "Payment cancelled.", body: "You have not been charged." },
  unknown: { tone: "cream", title: "We couldn’t find this payment.", body: "If money left your account, please contact us with the time and amount and we’ll look into it." },
};

export default async function DonationStatusPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const reference = sp.razorpay_payment_link_id ?? sp.ref ?? "";
  const provider = getPaymentProvider();
  // Status always comes from the provider, never from the URL.
  const status: PaymentStatus = provider && reference ? await provider.getStatus(reference) : "unknown";
  const c = copy[status];
  return (
    <>
      <PageHero eyebrow="Donation" tone={c.tone} title={c.title} intro={<p role="status">{c.body}</p>} />
      <Section>
        {reference && <p className="text-plum">Reference: <code className="font-semibold text-aubergine">{reference}</code></p>}
        <div className="mt-6 flex flex-wrap gap-3">
          {status !== "paid" && status !== "pending" && <Link href="/donate" className="btn btn-hibiscus">Try again</Link>}
          <Link href="/" className="btn btn-ghost">Back to the homepage</Link>
          <Link href="/contact" className="btn btn-ghost">Contact us</Link>
        </div>
      </Section>
    </>
  );
}
