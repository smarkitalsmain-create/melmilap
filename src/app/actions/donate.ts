"use server";

import { redirect } from "next/navigation";
import { donationSchema } from "@/lib/payments/donation";
import { getPaymentProvider, mockStore } from "@/lib/payments/providers";
import { isPreview } from "@/lib/config";
import { findCampaign } from "@/lib/content";

export interface DonateState {
  status: "idle" | "invalid" | "failed" | "unavailable";
  message?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
}

export async function startDonation(_prev: DonateState, data: FormData): Promise<DonateState> {
  const preset = String(data.get("preset") ?? "");
  const custom = String(data.get("customAmount") ?? "").replace(/[,\s₹]/g, "");
  const raw = {
    amount: preset === "custom" || !preset ? custom : preset,
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    campaign: String(data.get("campaign") ?? "") || undefined,
  };
  const values = { ...raw, preset, customAmount: custom, campaign: raw.campaign ?? "" } as Record<string, string>;

  const provider = getPaymentProvider();
  if (!provider) return { status: "unavailable", message: "Online donations aren’t open yet.", values };

  const parsed = donationSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) fieldErrors[String(i.path[0])] ??= i.message;
    return { status: "invalid", message: "Please check the highlighted fields.", fieldErrors, values };
  }
  // Only attribute to campaigns that are public and open.
  const campaign = parsed.data.campaign ? findCampaign(parsed.data.campaign, isPreview()) : undefined;
  const input = { ...parsed.data, campaign: campaign?.status === "active" ? campaign.slug : undefined };

  let redirectUrl: string;
  try {
    redirectUrl = (await provider.createCheckout(input)).redirectUrl;
  } catch (err) {
    console.error("[donate] checkout creation failed", err instanceof Error ? err.message : err);
    return { status: "failed", message: "We couldn’t start the payment. You have not been charged. Please try again.", values };
  }
  redirect(redirectUrl);
}

/** Development-only: completes a mock hosted checkout. */
export async function completeMockCheckout(data: FormData) {
  if (process.env.NODE_ENV === "production") return;
  const ref = String(data.get("ref"));
  const outcome = String(data.get("outcome"));
  const entry = mockStore.get(ref);
  if (entry && (outcome === "paid" || outcome === "failed" || outcome === "cancelled")) entry.status = outcome;
  redirect(`/donate/status?ref=${encodeURIComponent(ref)}`);
}
