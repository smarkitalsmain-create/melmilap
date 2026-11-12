import "server-only";

/**
 * Feature flags and integration settings, read from environment variables.
 * See .env.example for every option. Defaults keep the site safe for launch:
 * donations off, forms off, analytics off, search indexing off.
 */

const env = (key: string) => process.env[key]?.trim() || undefined;
const flag = (key: string) => env(key) === "true";
const isProduction = () => process.env.NODE_ENV === "production";

export type PaymentMode = "test" | "live";

export interface DonationConfig {
  /** True when visitors can start a checkout (test or live). */
  enabled: boolean;
  /** True only for live, verified, approved payments. Drives the header "Donate" action. */
  live: boolean;
  mode: PaymentMode;
  provider: "razorpay" | "mock" | null;
  /** Why donations are unavailable, for logs and the handover. Never shown verbatim. */
  reason?: string;
}

export function getDonationConfig(): DonationConfig {
  const off = (reason: string): DonationConfig => ({ enabled: false, live: false, mode: "test", provider: null, reason });

  if (!flag("DONATIONS_ENABLED")) return off("DONATIONS_ENABLED is not true");

  const provider = env("PAYMENT_PROVIDER");
  const mode: PaymentMode = env("PAYMENT_MODE") === "live" ? "live" : "test";

  if (provider === "mock") {
    if (isProduction()) return off("The mock provider is unavailable in production");
    return { enabled: true, live: false, mode: "test", provider: "mock" };
  }

  if (provider === "razorpay") {
    const keyId = env("RAZORPAY_KEY_ID");
    if (!keyId || !env("RAZORPAY_KEY_SECRET")) return off("Razorpay keys are missing");
    if (mode === "test") {
      if (!keyId.startsWith("rzp_test_")) return off("Test mode requires a rzp_test_ key");
      return { enabled: true, live: false, mode, provider };
    }
    if (!keyId.startsWith("rzp_live_")) return off("Live mode requires a rzp_live_ key");
    if (!flag("DONATION_ACCOUNT_VERIFIED")) return off("The foundation payment account is not marked as verified");
    return { enabled: true, live: true, mode, provider };
  }

  return off("No supported PAYMENT_PROVIDER configured");
}

export type FormDestination =
  | { kind: "webhook"; url: string; secret?: string }
  | { kind: "file"; path: string }
  | { kind: "none" };

export function getFormDestination(): FormDestination {
  const url = env("FORMS_WEBHOOK_URL");
  if (url) return { kind: "webhook", url, secret: env("FORMS_WEBHOOK_SECRET") };
  if (env("FORMS_STORE") === "file" && !isProduction()) {
    return { kind: "file", path: env("FORMS_FILE_PATH") ?? ".data/enquiries.jsonl" };
  }
  return { kind: "none" };
}

export const isPreview = () => flag("CONTENT_PREVIEW");

/** Search indexing stays off until launch is approved. */
export const isIndexingAllowed = () => flag("SITE_INDEXING") && !isPreview();

export function getSiteUrl(): string {
  return (env("NEXT_PUBLIC_SITE_URL") ?? "http://localhost:3200").replace(/\/$/, "");
}
