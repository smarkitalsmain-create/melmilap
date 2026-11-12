import type { MetadataRoute } from "next";
import { causes } from "@/content/causes";
import { legalDocuments } from "@/content/legal";
import { getSiteUrl } from "@/lib/config";
import { listCampaigns } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const paths = [
    "", "/about", "/our-work", ...causes.map((c) => `/our-work/${c.slug}`),
    "/campaigns", ...listCampaigns(false).map((c) => `/campaigns/${c.slug}`),
    "/get-involved", "/get-involved/volunteer", "/get-involved/delivery-partners", "/get-involved/institutions",
    "/transparency", "/contact", "/donate",
    ...legalDocuments.filter((d) => d.approval === "approved").map((d) => `/${d.slug}`),
  ];
  return paths.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly", priority: p === "" ? 1 : 0.7 }));
}
