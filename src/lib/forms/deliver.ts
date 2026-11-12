import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { EnquiryType } from "@/content/types";
import { getFormDestination } from "@/lib/config";

export interface EnquiryRecord {
  /** NGOSutra Enquiry.type compatible. */
  type: EnquiryType;
  source: "WEBSITE";
  submittedAt: string;
  campaign?: string;
  fields: Record<string, unknown>;
}

export class DeliveryUnavailable extends Error {}

/**
 * Delivers an enquiry to the configured destination. Resolves only once the
 * destination has accepted it; throws otherwise so the form never shows a
 * false success.
 */
export async function deliverEnquiry(record: EnquiryRecord): Promise<void> {
  const dest = getFormDestination();
  if (dest.kind === "none") throw new DeliveryUnavailable("No form destination configured");

  if (dest.kind === "webhook") {
    const res = await fetch(dest.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(dest.secret ? { "X-Webhook-Secret": dest.secret } : {}),
      },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Form webhook responded ${res.status}`);
    return;
  }

  // Development-only destination (disabled in production by getFormDestination).
  const file = path.resolve(/*turbopackIgnore: true*/ process.cwd(), dest.path);
  await mkdir(path.dirname(file), { recursive: true });
  await appendFile(file, `${JSON.stringify(record)}\n`, "utf8");
}
