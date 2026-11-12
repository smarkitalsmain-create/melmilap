import { afterEach, describe, expect, it, vi } from "vitest";
import { schemaFor } from "@/lib/forms/definitions";

const valid = {
  name: "Asha", email: "asha@example.com", phone: "", city: "Agra",
  interests: ["Education"], availability: "Weekends", message: "", consent: "yes",
};

describe("form validation", () => {
  it("accepts a valid volunteer submission", () => {
    expect(schemaFor("volunteer").safeParse(valid).success).toBe(true);
  });

  it("reports field-level errors", () => {
    const r = schemaFor("volunteer").safeParse({ ...valid, name: " ", email: "nope", interests: [], availability: "Never", consent: "" });
    expect(r.success).toBe(false);
    const fields = new Set(r.error!.issues.map((i) => i.path[0]));
    ["name", "email", "interests", "availability", "consent"].forEach((f) => expect(fields.has(f)).toBe(true));
  });

  it("rejects unknown checkbox options and bad phone numbers", () => {
    expect(schemaFor("volunteer").safeParse({ ...valid, interests: ["Hacking"] }).success).toBe(false);
    expect(schemaFor("volunteer").safeParse({ ...valid, phone: "call me" }).success).toBe(false);
  });
});

describe("enquiry delivery", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("refuses when no destination is configured", async () => {
    vi.stubEnv("FORMS_WEBHOOK_URL", "");
    vi.stubEnv("FORMS_STORE", "");
    const { deliverEnquiry, DeliveryUnavailable } = await import("@/lib/forms/deliver");
    await expect(deliverEnquiry({ type: "GENERAL", source: "WEBSITE", submittedAt: "", fields: {} })).rejects.toBeInstanceOf(DeliveryUnavailable);
  });

  it("fails when the webhook does not accept the enquiry", async () => {
    vi.stubEnv("FORMS_WEBHOOK_URL", "https://example.test/hook");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("no", { status: 500 })));
    const { deliverEnquiry } = await import("@/lib/forms/deliver");
    await expect(deliverEnquiry({ type: "GENERAL", source: "WEBSITE", submittedAt: "", fields: {} })).rejects.toThrow(/500/);
  });

  it("sends the secret header and succeeds on 2xx", async () => {
    vi.stubEnv("FORMS_WEBHOOK_URL", "https://example.test/hook");
    vi.stubEnv("FORMS_WEBHOOK_SECRET", "s3cret");
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const { deliverEnquiry } = await import("@/lib/forms/deliver");
    await deliverEnquiry({ type: "VOLUNTEER", source: "WEBSITE", submittedAt: "", fields: {} });
    const init = (fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1];
    expect((init.headers as Record<string, string>)["X-Webhook-Secret"]).toBe("s3cret");
  });
});
