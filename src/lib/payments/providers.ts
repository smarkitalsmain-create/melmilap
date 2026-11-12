import "server-only";
import { randomUUID } from "node:crypto";
import { getDonationConfig, getSiteUrl } from "@/lib/config";
import type { DonationInput, PaymentStatus } from "./donation";

export interface CheckoutSession {
  reference: string;
  redirectUrl: string;
}

export interface PaymentProvider {
  createCheckout(input: DonationInput): Promise<CheckoutSession>;
  /** Asks the provider, server-side, for the authoritative payment status. */
  getStatus(reference: string): Promise<PaymentStatus>;
}

/* ---------------- Razorpay hosted Payment Links ---------------- */

function razorpayAuth() {
  const id = process.env.RAZORPAY_KEY_ID!;
  const secret = process.env.RAZORPAY_KEY_SECRET!;
  return `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`;
}

const razorpay: PaymentProvider = {
  async createCheckout(input) {
    const referenceId = `mmf_${randomUUID().replace(/-/g, "").slice(0, 20)}`;
    const res = await fetch("https://api.razorpay.com/v1/payment_links", {
      method: "POST",
      headers: { Authorization: razorpayAuth(), "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: input.amount * 100,
        currency: "INR",
        reference_id: referenceId,
        description: input.campaign ? `Donation: ${input.campaign}` : "Donation to Mel Milap Foundation",
        customer: { name: input.name, email: input.email },
        notify: { email: false, sms: false },
        notes: { campaign: input.campaign ?? "" },
        callback_url: `${getSiteUrl()}/donate/status`,
        callback_method: "get",
      }),
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Razorpay responded ${res.status}`);
    const link = (await res.json()) as { id: string; short_url: string };
    return { reference: link.id, redirectUrl: link.short_url };
  },
  async getStatus(reference) {
    if (!/^plink_[A-Za-z0-9]+$/.test(reference)) return "unknown";
    const res = await fetch(`https://api.razorpay.com/v1/payment_links/${reference}`, {
      headers: { Authorization: razorpayAuth() },
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
    });
    if (!res.ok) return "unknown";
    const link = (await res.json()) as { status: string };
    switch (link.status) {
      case "paid": return "paid";
      case "created": case "partially_paid": return "pending";
      case "cancelled": return "cancelled";
      case "expired": return "failed";
      default: return "unknown";
    }
  },
};

/* ---------------- Mock provider (development only) ---------------- */

type MockStore = Map<string, { status: PaymentStatus; amount: number }>;
const g = globalThis as unknown as { __mmfMockPayments?: MockStore };
export const mockStore: MockStore = (g.__mmfMockPayments ??= new Map());

const mock: PaymentProvider = {
  async createCheckout(input) {
    const reference = `mock_${randomUUID().slice(0, 8)}`;
    mockStore.set(reference, { status: "pending", amount: input.amount });
    return { reference, redirectUrl: `/donate/mock-checkout?ref=${reference}` };
  },
  async getStatus(reference) {
    return mockStore.get(reference)?.status ?? "unknown";
  },
};

export function getPaymentProvider(): PaymentProvider | null {
  const cfg = getDonationConfig();
  if (!cfg.enabled) return null;
  if (cfg.provider === "razorpay") return razorpay;
  if (cfg.provider === "mock" && process.env.NODE_ENV !== "production") return mock;
  return null;
}
