/**
 * Site-wide identity, navigation, contact routes and the group endorsement.
 * Edit here; every page reads from this file.
 */

export const site = {
  name: "Mel Milap Foundation",
  shortName: "Mel Milap",
  tagline: "Good begins when we come together.",
  description:
    "Mel Milap Foundation works across education, meals and nutrition, and animal welfare in India.",
  /** Hindi phrase and its meaning, used on About. */
  meaning: {
    phrase: "मेल-मिलाप",
    transliteration: "mel-milap",
    gloss: "coming together; meeting, reconciling and getting along",
  },
  locale: "en_IN",
  /** Discreet supporting credit. Keep at footnote scale. */
  endorsement: "A Smarkitals Group initiative",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { label: "Our Work", href: "/our-work" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "About", href: "/about" },
  { label: "Transparency", href: "/transparency" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Our work",
    items: [
      { label: "Education", href: "/our-work/education" },
      { label: "Meals & Nutrition", href: "/our-work/meals-nutrition" },
      { label: "Animal Welfare", href: "/our-work/animal-welfare" },
      { label: "Campaigns", href: "/campaigns" },
    ],
  },
  {
    heading: "Take part",
    items: [
      { label: "Volunteer", href: "/get-involved/volunteer" },
      { label: "Delivery partners", href: "/get-involved/delivery-partners" },
      { label: "Institutions & CSR", href: "/get-involved/institutions" },
      { label: "Donate", href: "/donate" },
    ],
  },
  {
    heading: "Foundation",
    items: [
      { label: "About", href: "/about" },
      { label: "Transparency", href: "/transparency" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Donation Policy", href: "/donation-policy" },
];

/**
 * Public contact routes. Leave a value null until the team confirms it;
 * pages hide anything that is null.
 */
export const contact: {
  email: string | null;
  phone: string | null;
  /** Only publish an address that matches approved registration documents. */
  address: string | null;
  responseTime: string;
} = {
  email: null,
  phone: null,
  address: null,
  responseTime: "We aim to reply within five working days.",
};

/** Approved social profiles only. Each appears in the footer and in sameAs. */
export const socialLinks: { label: string; href: string }[] = [];
