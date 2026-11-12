import { afterEach, describe, expect, it, vi } from "vitest";
import { getDonationConfig } from "@/lib/config";
import { donationSchema } from "@/lib/payments/donation";

afterEach(() => vi.unstubAllEnvs());

const set = (env: Record<string, string>) => Object.entries(env).forEach(([k, v]) => vi.stubEnv(k, v));

describe("donation gating", () => {
  it("is off by default", () => {
    set({ DONATIONS_ENABLED: "" });
    expect(getDonationConfig()).toMatchObject({ enabled: false, live: false });
  });

  it("allows test mode only with test keys", () => {
    set({ DONATIONS_ENABLED: "true", PAYMENT_PROVIDER: "razorpay", PAYMENT_MODE: "test", RAZORPAY_KEY_ID: "rzp_test_x", RAZORPAY_KEY_SECRET: "s" });
    expect(getDonationConfig()).toMatchObject({ enabled: true, live: false });
    vi.stubEnv("RAZORPAY_KEY_ID", "rzp_live_x");
    expect(getDonationConfig().enabled).toBe(false);
  });

  it("requires a verified account for live payments", () => {
    set({ DONATIONS_ENABLED: "true", PAYMENT_PROVIDER: "razorpay", PAYMENT_MODE: "live", RAZORPAY_KEY_ID: "rzp_live_x", RAZORPAY_KEY_SECRET: "s", DONATION_ACCOUNT_VERIFIED: "false" });
    expect(getDonationConfig().enabled).toBe(false);
    vi.stubEnv("DONATION_ACCOUNT_VERIFIED", "true");
    expect(getDonationConfig()).toMatchObject({ enabled: true, live: true });
  });

  it("never allows the mock provider in production", () => {
    set({ DONATIONS_ENABLED: "true", PAYMENT_PROVIDER: "mock", NODE_ENV: "production" });
    expect(getDonationConfig().enabled).toBe(false);
  });
});

describe("donation amounts", () => {
  const base = { name: "A", email: "a@example.com" };
  it("enforces limits and whole rupees", () => {
    expect(donationSchema.safeParse({ ...base, amount: "1000" }).success).toBe(true);
    expect(donationSchema.safeParse({ ...base, amount: "50" }).success).toBe(false);
    expect(donationSchema.safeParse({ ...base, amount: "100.5" }).success).toBe(false);
    expect(donationSchema.safeParse({ ...base, amount: "9999999" }).success).toBe(false);
    expect(donationSchema.safeParse({ ...base, amount: "abc" }).success).toBe(false);
  });
});
