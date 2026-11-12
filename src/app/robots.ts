import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexingAllowed } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexingAllowed()) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/donate/status", "/donate/mock-checkout", "/preview/"] },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
