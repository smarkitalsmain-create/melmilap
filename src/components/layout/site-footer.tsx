import Image from "next/image";
import Link from "next/link";
import { contact, footerNav, legalNav, site, socialLinks } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark grain overflow-hidden bg-aubergine text-cream">
      <div className="container-site grid gap-12 pb-10 pt-16 lg:grid-cols-[1.2fr_2fr] lg:pt-24">
        <div className="space-y-5">
          <Link href="/" className="inline-block rounded-lg">
            {/* Official lockup; it carries the "A Smarkitals Group Initiative" endorsement line. */}
            <Image
              src="/brand/Mel-Milap-Foundation-logo-horizontal-reverse-transparent.svg"
              alt={`${site.name} home. ${site.endorsement}`}
              width={379}
              height={128}
              unoptimized
              className="h-auto w-[17rem] sm:w-[19rem]"
            />
          </Link>
          <p className="max-w-sm text-lilac">{site.description}</p>
          {contact.email && (
            <p>
              <a className="link-inline" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </p>
          )}
          {socialLinks.length > 0 && (
            <ul className="flex flex-wrap gap-4">
              {socialLinks.map((s) => (
                <li key={s.href}>
                  <a className="link-draw font-semibold" href={s.href} rel="me noopener" target="_blank">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerNav.map((group) => (
            <div key={group.heading}>
              <h2 className="eyebrow mb-4 text-mango">{group.heading}</h2>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link className="link-draw" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="container-site flex flex-col gap-4 border-t border-cream/15 py-6 text-sm text-lilac sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {legalNav.map((item) => (
            <li key={item.href}>
              <Link className="link-draw" href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
