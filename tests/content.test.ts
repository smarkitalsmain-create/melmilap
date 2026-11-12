import { describe, expect, it } from "vitest";
import { campaignFixtures, campaigns } from "@/content/campaigns";
import { causes } from "@/content/causes";
import { gopali, rakhi } from "@/content/leadership";
import { legalDocuments } from "@/content/legal";
import { findCampaign, getFounderNote, getSpotlight, listCampaigns, verifiedProgress, visibleBio } from "@/lib/content";

describe("publication rules", () => {
  it("keeps draft campaigns and fixtures off the public site", () => {
    const pub = listCampaigns(false);
    expect(pub.every((c) => c.status !== "draft" && !c.fixture)).toBe(true);
    expect(findCampaign("senior-citizen-blanket-drive-2026", false)).toBeUndefined();
    expect(findCampaign("example-active", false)).toBeUndefined();
  });

  it("shows drafts and fixtures in preview", () => {
    expect(findCampaign("senior-citizen-blanket-drive-2026", true)?.status).toBe("draft");
    expect(findCampaign("example-active", true)?.fixture).toBe(true);
  });

  it("falls back when the spotlight campaign is unpublished", () => {
    expect(getSpotlight(false).campaign).toBeNull();
    expect(getSpotlight(true).campaign?.headline).toBe("Help an elder stay warm this winter.");
  });

  it("only renders progress with verified, sane figures", () => {
    const active = campaignFixtures.find((c) => c.slug === "example-active")!;
    expect(verifiedProgress(active)?.percent).toBe(41);
    expect(verifiedProgress({ ...active, progress: { ...active.progress!, verifiedOn: "" } })).toBeNull();
    expect(verifiedProgress({ ...active, progress: { ...active.progress!, target: 0 } })).toBeNull();
    expect(verifiedProgress({ ...active, progress: undefined })).toBeNull();
  });

  it("keeps campaign slugs unique and URL-safe", () => {
    const slugs = [...campaigns, ...campaignFixtures].map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9-]+$/));
  });
});

describe("leadership", () => {
  it("uses the exact approved titles", () => {
    expect(rakhi.title).toBe("Founder, Managing Director & Executive Director");
    expect(gopali.title).toBe("Director & Vice President, Operations");
  });

  it("withholds the unconfirmed CBSE line and draft founder note publicly", () => {
    expect(visibleBio(rakhi, false).some((p) => p.text.includes("CBSE"))).toBe(false);
    expect(visibleBio(rakhi, true).find((p) => p.text.includes("CBSE"))?.pending).toBe(true);
    expect(getFounderNote(false)).toBeNull();
    expect(getFounderNote(true)?.pending).toBe(true);
  });
});

describe("causes and legal", () => {
  it("describes every cause honestly as planned until a programme runs", () => {
    expect(causes.map((c) => c.slug)).toEqual(["education", "meals-nutrition", "animal-welfare"]);
    causes.forEach((c) => expect(c.status).toBe("planned"));
  });

  it("has all three legal documents", () => {
    expect(legalDocuments.map((d) => d.slug).sort()).toEqual(["donation-policy", "privacy", "terms"]);
  });
});
