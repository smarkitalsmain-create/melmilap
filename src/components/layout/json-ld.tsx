import { contact, site, socialLinks } from "@/content/site";
import { getSiteUrl } from "@/lib/config";

/** Organisation structured data, limited to verified facts. */
export function OrganizationJsonLd() {
  const url = getSiteUrl();
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url,
    logo: `${url}/icon.svg`,
    description: site.description,
    areaServed: { "@type": "Country", name: "India" },
  };
  if (contact.email) data.email = contact.email;
  if (socialLinks.length) data.sameAs = socialLinks.map((s) => s.href);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
