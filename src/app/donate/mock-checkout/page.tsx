import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { completeMockCheckout } from "@/app/actions/donate";
import { getDonationConfig } from "@/lib/config";
import { mockStore } from "@/lib/payments/providers";

export const metadata: Metadata = { title: "Test checkout", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

/** Stands in for a hosted checkout page during development. Never available in production. */
export default async function MockCheckout({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  if (process.env.NODE_ENV === "production" || getDonationConfig().provider !== "mock") notFound();
  const { ref = "" } = await searchParams;
  const entry = mockStore.get(ref);
  if (!entry) notFound();
  return (
    <div className="container-site max-w-xl py-20">
      <p className="eyebrow text-cobalt">Test checkout · not a real payment</p>
      <h1 className="display-md mt-3">Pay ₹{entry.amount.toLocaleString("en-IN")}</h1>
      <form action={completeMockCheckout} className="mt-8 flex flex-wrap gap-3">
        <input type="hidden" name="ref" value={ref} />
        <button name="outcome" value="paid" className="btn btn-primary">Simulate success</button>
        <button name="outcome" value="failed" className="btn btn-hibiscus">Simulate failure</button>
        <button name="outcome" value="cancelled" className="btn btn-ghost">Cancel</button>
      </form>
    </div>
  );
}
