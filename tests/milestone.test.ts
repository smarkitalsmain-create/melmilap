import { describe, expect, it } from "vitest";
import { fieldPhotos, publicFieldPhotos } from "@/content/photos";
import { fundraisingMilestone } from "@/content/fundraising";
import { listUpdates } from "@/lib/content";

describe("fundraising milestone", () => {
  it("is dated, approximate in public copy and keeps the reported amount", () => {
    expect(fundraisingMilestone.figure).toBe("₹12.76 lakh");
    expect(fundraisingMilestone.period).toContain("31 October 2026");
    expect(fundraisingMilestone.reportedAmountMinor).toBe(127634300);
    expect(fundraisingMilestone.collectedBy).toBeNull();
  });

  it("publishes the dated fundraising update", () => {
    const update = listUpdates().find((u) => u.slug === "fundraising-update-2026-10-31");
    expect(update?.date).toBe("2026-10-31");
    expect(update?.summary).toBe("Approximately ₹12.76 lakh was raised over 45 days of operations through 31 October 2026.");
  });
});

describe("photo register", () => {
  it("publishes only cleared photos that have a file", () => {
    expect(publicFieldPhotos().every((p) => p.status === "cleared" && p.file)).toBe(true);
    fieldPhotos.filter((p) => p.status === "held").forEach((p) => expect(p.holdReason).toBeTruthy());
  });
});
