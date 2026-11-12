"use server";

import { DeliveryUnavailable, deliverEnquiry } from "@/lib/forms/deliver";
import { type FormKind, formDataToObject, forms, honeypotField, schemaFor } from "@/lib/forms/definitions";

export interface EnquiryState {
  status: "idle" | "invalid" | "success" | "failed" | "unavailable";
  message?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string | string[]>;
}

const kinds = Object.keys(forms) as FormKind[];

export async function submitEnquiry(_prev: EnquiryState, data: FormData): Promise<EnquiryState> {
  const kind = String(data.get("formKind")) as FormKind;
  if (!kinds.includes(kind)) return { status: "failed", message: "This form could not be identified. Please reload the page." };

  const raw = formDataToObject(kind, data);
  const values = raw as Record<string, string | string[]>;

  // Bots fill hidden fields; real visitors never see this one.
  if (String(data.get(honeypotField) ?? "") !== "") return { status: "success" };

  const parsed = schemaFor(kind).safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return {
      status: "invalid",
      message: `Please check ${Object.keys(fieldErrors).length === 1 ? "the highlighted field" : "the highlighted fields"}.`,
      fieldErrors,
      values,
    };
  }

  const { campaign, ...rest } = parsed.data as Record<string, unknown>;
  const fields = Object.fromEntries(Object.entries(rest).filter(([k]) => k !== "consent"));
  try {
    await deliverEnquiry({
      type: forms[kind].enquiryType,
      source: "WEBSITE",
      submittedAt: new Date().toISOString(),
      campaign: typeof campaign === "string" && campaign ? campaign : undefined,
      fields,
    });
    return { status: "success" };
  } catch (err) {
    console.error("[enquiry] delivery failed", err instanceof Error ? err.message : err);
    if (err instanceof DeliveryUnavailable) {
      return { status: "unavailable", message: "Our enquiry form isn’t accepting messages yet.", values };
    }
    return {
      status: "failed",
      message: "We couldn’t send your message just now. Nothing was saved. Please try again in a few minutes.",
      values,
    };
  }
}
