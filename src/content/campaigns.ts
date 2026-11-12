import type { Campaign } from "./types";

/**
 * Campaigns. Each gets a stable URL at /campaigns/{slug}.
 *
 * Status rules:
 *  - "draft": not public. Visible only in preview mode.
 *  - "planned": public, announced but not yet open for participation.
 *  - "active": public and open.
 *  - "completed": public; the page leads with `outcome`.
 *
 * Fill optional fields only once the team confirms them. Progress needs a
 * verified target and current value plus a verification date.
 */
export const campaigns: Campaign[] = [
  {
    slug: "senior-citizen-blanket-drive-2026",
    title: "Senior Citizen Blanket Drive",
    headline: "Help an elder stay warm this winter.",
    summary:
      "A seasonal drive to bring warm blankets to senior citizens who need them as the cold sets in.",
    category: { kind: "seasonal", label: "Seasonal relief" },
    status: "draft",
    timeframe: { label: "November 2026 (proposed)" },
    story: [
      "Winter nights are hardest on elders who live alone or without enough support. A good blanket is a small thing that makes a long night easier.",
      "This drive will bring people together to collect and deliver blankets through a delivery partner who already works with senior citizens.",
    ],
    participation: {
      steps: [
        "Read how the drive works and where blankets will go.",
        "Sign up to volunteer for collection or distribution.",
        "Share the drive with friends, colleagues and your housing society.",
      ],
      action: { label: "Volunteer for the drive", href: "/get-involved/volunteer?campaign=senior-citizen-blanket-drive-2026" },
    },
    pendingConfirmation: [
      "Campaign status (planned or active)",
      "Exact dates",
      "Location and delivery partner",
      "Participation instructions and whether blanket donations in kind are accepted",
    ],
  },
];

/**
 * Example campaigns for reviewing every campaign state at /preview/campaigns.
 * They are fictional, never published and never included in feeds or the sitemap.
 */
export const campaignFixtures: Campaign[] = [
  {
    slug: "example-planned",
    title: "Example: Back-to-school kits",
    headline: "Example planned campaign",
    summary: "A fictional planned campaign used to review the layout. Not real.",
    category: { kind: "cause", cause: "education" },
    status: "planned",
    timeframe: { start: "2027-06-01", end: "2027-06-30", label: "June 2027" },
    location: "Example city",
    fixture: true,
  },
  {
    slug: "example-active",
    title: "Example: Community meal pilot",
    headline: "Example active campaign with verified progress",
    summary: "A fictional active campaign used to review the progress display. Not real.",
    category: { kind: "cause", cause: "meals-nutrition" },
    status: "active",
    timeframe: { start: "2027-01-05", end: "2027-02-05", label: "5 January to 5 February 2027" },
    location: "Example city",
    participation: {
      steps: ["Choose a shift.", "Attend a short briefing.", "Help serve and record meals."],
      action: { label: "Volunteer", href: "/get-involved/volunteer" },
    },
    progress: { unit: "items", itemLabel: "meals served", target: 1500, current: 620, verifiedOn: "2027-01-20", source: "manual" },
    updates: [{ date: "2027-01-20", title: "Example update", body: "Fictional update text.", approved: true }],
    fixture: true,
  },
  {
    slug: "example-completed",
    title: "Example: Vaccination day for community dogs",
    headline: "Example completed campaign",
    summary: "A fictional completed campaign used to review the outcome-first layout. Not real.",
    category: { kind: "cause", cause: "animal-welfare" },
    status: "completed",
    timeframe: { start: "2026-09-14", end: "2026-09-14", label: "14 September 2026" },
    location: "Example neighbourhood",
    outcome: ["Fictional outcome paragraph describing what happened."],
    evidence: [{ label: "Example utilisation summary", href: "/transparency" }],
    fixture: true,
  },
  {
    slug: "example-draft",
    title: "Example: Draft campaign",
    headline: "Example draft campaign",
    summary: "A fictional draft used to review the preview banner. Not real.",
    category: { kind: "seasonal", label: "Seasonal relief" },
    status: "draft",
    pendingConfirmation: ["Everything"],
    fixture: true,
  },
];

/** Which campaign leads the homepage spotlight. Change the slug, not the components. */
export const spotlight = {
  campaignSlug: "senior-citizen-blanket-drive-2026",
  /** Shown when the spotlight campaign is not yet published. */
  fallback: {
    eyebrow: "Campaign spotlight",
    headline: "Our next campaign is being confirmed.",
    body: "We’ll share its dates, location and how to take part here as soon as the details are confirmed. In the meantime, you can lend your time or your organisation’s reach.",
    actions: [
      { label: "Volunteer with us", href: "/get-involved/volunteer" },
      { label: "Partner with us", href: "/get-involved/delivery-partners" },
    ],
    panelTitle: "What you’ll find here",
    panelBody:
      "For each campaign: its dates, location and how to take part, plus verified progress once there is any to report.",
  },
};
