/**
 * Content model for the Mel Milap Foundation website.
 *
 * Every record that could be mistaken for a public claim carries an explicit
 * approval or verification flag. Pages only render what has been approved;
 * preview mode (CONTENT_PREVIEW=true) shows drafts with a visible banner.
 *
 * Field names deliberately line up with the NGOSutra data model (campaign
 * slug/status/targetMinor/currency, enquiry types) so a future adapter can
 * replace these files without changing page components.
 */

export type CauseSlug = "education" | "meals-nutrition" | "animal-welfare";

export type CauseColour = "mango" | "hibiscus" | "leaf";

/** Lifecycle of a programme area. Describe each cause by its actual state. */
export type ProgrammeStatus = "planned" | "piloting" | "active";

export interface Cause {
  slug: CauseSlug;
  name: string;
  shortName: string;
  colour: CauseColour;
  motif: "book" | "bowl" | "paw";
  /** One sentence used on the homepage feature. */
  oneLiner: string;
  /** The kind of work the foundation intends to support (homepage bullets). */
  intendedSupport: string[];
  status: ProgrammeStatus;
  statusNote: string;
  page: {
    title: string;
    intro: string;
    whyItMatters: string[];
    whoWeAimToSupport: string[];
    partnerLedNow: string;
    ownProgrammesLater: string;
    waysToHelp: { label: string; href: string; description: string }[];
    metaDescription: string;
  };
}

/** Publication state for any record that can appear on the site. */
export type Approval = "draft" | "approved";

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Required true before the image appears publicly (consent-cleared, approved). */
  approved: boolean;
  /** Generated or commissioned imagery that could be mistaken for documentation. */
  illustrative?: boolean;
  caption?: string;
  credit?: string;
  /** CSS object-position focal point used when the frame crops the image, e.g. "50% 20%". */
  focus?: string;
}

export type CampaignStatus = "draft" | "planned" | "active" | "completed";

export type CampaignCategory =
  | { kind: "cause"; cause: CauseSlug }
  | { kind: "seasonal"; label: string };

export interface CampaignProgress {
  /** "INR" amounts are stored in paise (minor units), like NGOSutra's targetMinor. */
  unit: "INR" | "items";
  itemLabel?: string;
  target: number;
  current: number;
  /** ISO date the figures were last verified. Progress never renders without it. */
  verifiedOn: string;
  source: "manual" | "ngosutra";
}

export interface CampaignUpdate {
  date: string;
  title: string;
  body: string;
  approved: boolean;
}

export interface Campaign {
  /** Stable URL: /campaigns/{slug}. Never change after publishing. */
  slug: string;
  title: string;
  headline: string;
  summary: string;
  category: CampaignCategory;
  status: CampaignStatus;
  /** Only set when confirmed by the team. Omitted fields are hidden. */
  timeframe?: { start?: string; end?: string; label: string };
  location?: string;
  participation?: {
    steps: string[];
    action?: { label: string; href: string };
  };
  story?: string[];
  /** Completed campaigns lead with this. */
  outcome?: string[];
  evidence?: { label: string; href: string }[];
  images?: ImageAsset[];
  progress?: CampaignProgress;
  updates?: CampaignUpdate[];
  /** Internal notes listing what still needs confirmation. Shown only in preview. */
  pendingConfirmation?: string[];
  /** Example records used to review campaign states. Never published. */
  fixture?: boolean;
  externalIds?: { ngosutra?: string };
}

export interface BioParagraph {
  text: string;
  /** False keeps the paragraph out of public pages until confirmed. */
  confirmed: boolean;
  confirmationNote?: string;
}

export interface Leader {
  slug: string;
  name: string;
  title: string;
  role: "founder" | "operations";
  initials: string;
  colour: "mango" | "leaf";
  intro: string;
  bio: BioParagraph[];
  roleSummary: string[];
  responsibilities: string[];
  reportsTo?: string;
  portrait: ImageAsset | null;
}

export interface FounderNote {
  approval: Approval;
  heading: string;
  paragraphs: string[];
  signOff: string;
}

export interface ProgrammeUpdate {
  slug: string;
  date: string;
  title: string;
  summary: string;
  body: string[];
  cause?: CauseSlug;
  campaignSlug?: string;
  approval: Approval;
}

export interface TransparencyDocument {
  title: string;
  kind: "registration" | "governance" | "policy" | "annual-report" | "audit";
  date: string;
  href: string;
  fileType: "PDF" | "Web page";
  approval: Approval;
}

export interface UtilisationSummary {
  slug: string;
  period: string;
  campaignSlug?: string;
  /** Paise. */
  receivedMinor: number;
  utilisedMinor: number;
  notes: string;
  documentHref?: string;
  publishedOn: string;
  approval: Approval;
  externalIds?: { ngosutra?: string };
}

export interface ImpactMetric {
  label: string;
  value: number;
  suffix?: string;
  verifiedOn: string;
  approval: Approval;
}

export interface LegalDocument {
  slug: "privacy" | "terms" | "donation-policy";
  title: string;
  metaDescription: string;
  approval: Approval;
  lastUpdated: string;
  sections: { heading: string; paragraphs: string[] }[];
}

export type EnquiryType = "VOLUNTEER" | "PARTNER" | "INSTITUTIONAL" | "GENERAL";
