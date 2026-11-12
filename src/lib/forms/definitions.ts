/**
 * Enquiry forms. One definition drives the rendered fields (client) and the
 * validation schema (server), so they cannot drift apart. Keep forms short.
 */
import { z } from "zod";
import type { EnquiryType } from "@/content/types";

export type FormKind = "volunteer" | "partner" | "institutional" | "contact";

export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "checkboxes";
  required?: boolean;
  autoComplete?: string;
  hint?: string;
  options?: string[];
  maxLength?: number;
  width?: "half" | "full";
}

const name: FieldDef = { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name", maxLength: 120, width: "half" };
const email: FieldDef = { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", maxLength: 200, width: "half" };
const phone: FieldDef = { name: "phone", label: "Phone (optional)", type: "tel", autoComplete: "tel", maxLength: 20, width: "half", hint: "Include the country code if you are outside India." };
const city: FieldDef = { name: "city", label: "City", type: "text", required: true, autoComplete: "address-level2", maxLength: 80, width: "half" };
const organisation: FieldDef = { name: "organisation", label: "Organisation", type: "text", required: true, autoComplete: "organization", maxLength: 160, width: "half" };

export const forms: Record<FormKind, { enquiryType: EnquiryType; title: string; submitLabel: string; fields: FieldDef[] }> = {
  volunteer: {
    enquiryType: "VOLUNTEER",
    title: "Volunteer with us",
    submitLabel: "Send volunteer details",
    fields: [
      name,
      email,
      phone,
      city,
      {
        name: "interests",
        label: "What would you like to help with?",
        type: "checkboxes",
        required: true,
        options: ["Education", "Meals & Nutrition", "Animal Welfare", "Seasonal campaigns", "Skills (design, finance, legal, tech)"],
      },
      { name: "availability", label: "When are you usually free?", type: "select", required: true, options: ["Weekdays", "Weekends", "Evenings", "Flexible", "Occasional, for specific campaigns"], width: "half" },
      { name: "message", label: "Anything else we should know? (optional)", type: "textarea", maxLength: 1500 },
    ],
  },
  partner: {
    enquiryType: "PARTNER",
    title: "Become a delivery partner",
    submitLabel: "Send partnership details",
    fields: [
      organisation,
      { ...name, label: "Contact person" },
      email,
      phone,
      { ...city, label: "Where you work", hint: "City, district or region." },
      { name: "focus", label: "Focus area", type: "select", required: true, options: ["Education", "Meals & Nutrition", "Animal Welfare", "More than one"], width: "half" },
      { name: "registration", label: "Registration details (optional)", type: "text", maxLength: 200, hint: "For example, registration type and number. We verify every partner before any agreement." },
      { name: "message", label: "Tell us about your work and the community you serve", type: "textarea", required: true, maxLength: 2000 },
    ],
  },
  institutional: {
    enquiryType: "INSTITUTIONAL",
    title: "Institutional enquiry",
    submitLabel: "Send enquiry",
    fields: [
      organisation,
      { ...name, label: "Your name" },
      { name: "role", label: "Your role", type: "text", maxLength: 120, autoComplete: "organization-title", width: "half" },
      email,
      phone,
      { name: "enquiryType", label: "Type of enquiry", type: "select", required: true, options: ["CSR partnership", "School, college or university", "Government or public body", "Foundation or grant-maker", "Other"], width: "half" },
      { name: "message", label: "How would you like to work together?", type: "textarea", required: true, maxLength: 2000 },
    ],
  },
  contact: {
    enquiryType: "GENERAL",
    title: "Contact the foundation",
    submitLabel: "Send message",
    fields: [
      name,
      email,
      { name: "subject", label: "Subject", type: "text", required: true, maxLength: 160 },
      { name: "message", label: "Message", type: "textarea", required: true, maxLength: 2000 },
    ],
  },
};

export const consentField = {
  name: "consent",
  label: "I agree that Mel Milap Foundation may store these details and contact me about this enquiry.",
};

/** Hidden field bots tend to fill. Real visitors never see it. */
export const honeypotField = "website";

const phonePattern = /^[+()\-\s\d]{7,20}$/;

export function schemaFor(kind: FormKind) {
  const shape: Record<string, z.ZodType> = {};
  for (const f of forms[kind].fields) {
    if (f.type === "checkboxes") {
      const base = z.array(z.enum(f.options as [string, ...string[]], { message: "Choose from the listed options." }));
      shape[f.name] = f.required ? base.min(1, `Choose at least one option.`) : base;
      continue;
    }
    if (f.type === "select") {
      shape[f.name] = z.enum(f.options as [string, ...string[]], { message: "Choose an option." });
      continue;
    }
    let s = z.string().trim();
    if (f.required) s = s.min(1, `${f.label.replace(/\s*\(.*\)$/, "")} is required.`);
    if (f.maxLength) s = s.max(f.maxLength, `Please keep this under ${f.maxLength} characters.`);
    let field: z.ZodType = s;
    if (f.type === "email") field = s.pipe(z.email("Enter a valid email address, like name@example.com."));
    if (f.type === "tel") field = s.refine((v) => v === "" || phonePattern.test(v), "Enter a valid phone number.");
    shape[f.name] = field;
  }
  shape[consentField.name] = z.literal("yes", { message: "Please confirm we can store your details." });
  shape.campaign = z.string().trim().max(120).regex(/^[a-z0-9-]*$/).optional();
  return z.object(shape);
}

export function formDataToObject(kind: FormKind, data: FormData) {
  const out: Record<string, unknown> = {};
  for (const f of forms[kind].fields) {
    out[f.name] = f.type === "checkboxes" ? data.getAll(f.name).map(String) : String(data.get(f.name) ?? "");
  }
  out[consentField.name] = String(data.get(consentField.name) ?? "");
  const campaign = data.get("campaign");
  if (campaign) out.campaign = String(campaign);
  return out;
}
