import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { OrganizationJsonLd } from "@/components/layout/json-ld";
import { PreviewBanner } from "@/components/layout/preview-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionRuntime } from "@/components/motion/motion-runtime";
import { site } from "@/content/site";
import { getDonationConfig, getSiteUrl, isIndexingAllowed, isPreview } from "@/lib/config";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    title: site.name,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: isIndexingAllowed() ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#FFF8ED",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const donations = getDonationConfig();
  const primaryAction = donations.live ? { label: "Donate", href: "/donate" } : { label: "Get Involved", href: "/get-involved" };

  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <OrganizationJsonLd />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-cobalt px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:px-5 focus:py-3"
        >
          Skip to content
        </a>
        {isPreview() && <PreviewBanner />}
        <SiteHeader primaryAction={primaryAction} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <MotionRuntime />
      </body>
    </html>
  );
}
