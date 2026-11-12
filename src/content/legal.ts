import type { LegalDocument } from "./types";

/**
 * Draft legal copy for review by the foundation's legal adviser.
 * Pages show a "draft" notice and are excluded from search engines until
 * approval is set to "approved".
 */

export const legalDocuments: LegalDocument[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    metaDescription: "How Mel Milap Foundation collects, uses and protects personal information shared through this website.",
    approval: "draft",
    lastUpdated: "2026-11-12",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "This website is operated by Mel Milap Foundation. This policy explains what personal information we collect through the website, why we collect it and how we look after it.",
        ],
      },
      {
        heading: "What we collect",
        paragraphs: [
          "We collect the information you choose to give us when you send an enquiry, offer to volunteer, propose a partnership or make a donation. This usually includes your name, email address, phone number, city and anything you write in your message.",
          "When you donate, our payment provider processes your payment details on its own secure page. We do not see or store your full card or bank details.",
          "We do not use advertising trackers. Website analytics are switched off unless and until we update this policy to describe them.",
        ],
      },
      {
        heading: "How we use it",
        paragraphs: [
          "We use your information to reply to you, arrange volunteering or partnerships, process and confirm donations, keep the records the law requires and tell you about work you asked to hear about.",
          "We do not sell or rent your personal information.",
        ],
      },
      {
        heading: "Children and the people we support",
        paragraphs: [
          "We do not knowingly collect personal information from children through this website. We do not publish identifying details or photographs of children we support without appropriate consent, and we keep children in our stories anonymous.",
        ],
      },
      {
        heading: "Keeping and protecting information",
        paragraphs: [
          "We keep personal information only for as long as we need it for the purposes above or as required by law, and we limit access to people who need it.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You can ask us to show, correct or delete the personal information we hold about you, or to stop contacting you, by writing to us through the contact page.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    metaDescription: "The terms that apply when you use the Mel Milap Foundation website.",
    approval: "draft",
    lastUpdated: "2026-11-12",
    sections: [
      {
        heading: "Using this website",
        paragraphs: [
          "By using this website you agree to these terms. If you do not agree, please do not use the website.",
        ],
      },
      {
        heading: "Information on the website",
        paragraphs: [
          "We work to keep information accurate and up to date. Activities and campaigns are described according to their actual status, and figures appear only once verified.",
        ],
      },
      {
        heading: "Our name, logo and content",
        paragraphs: [
          "The Mel Milap Foundation name, logo, illustrations and text belong to the foundation. Please ask before reusing them.",
        ],
      },
      {
        heading: "What you send us",
        paragraphs: [
          "Please make sure anything you send through our forms is accurate and that you are entitled to share it. Do not send sensitive personal information about other people.",
        ],
      },
      {
        heading: "Links to other websites",
        paragraphs: [
          "Where we link to other websites, including our payment provider, their own terms and policies apply.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: ["We may update these terms. The date at the top of this page shows when they last changed."],
      },
    ],
  },
  {
    slug: "donation-policy",
    title: "Donation Policy",
    metaDescription: "How Mel Milap Foundation accepts, confirms, uses and refunds donations.",
    approval: "draft",
    lastUpdated: "2026-11-12",
    sections: [
      {
        heading: "Accepting donations",
        paragraphs: [
          "We accept online donations only through a hosted payment page connected to the foundation’s verified account. We never ask for payment details over email, phone or messaging apps.",
          "Information about tax benefits, receipts that qualify for deductions and foreign contributions will appear here only once the relevant registrations are in place and verified.",
        ],
      },
      {
        heading: "Confirming your donation",
        paragraphs: [
          "We confirm every payment with our payment provider before we show a success message or issue a receipt.",
        ],
      },
      {
        heading: "Campaign donations",
        paragraphs: [
          "If you choose a campaign, we use your donation for that campaign. If a campaign raises more than it needs, or cannot go ahead, we will use the funds for closely related work in the same area and report this openly.",
        ],
      },
      {
        heading: "Refunds",
        paragraphs: [
          "If you donated by mistake or were charged the wrong amount, contact us within 30 days and we will review your request. Approved refunds go back to the original payment method.",
        ],
      },
      {
        heading: "Reporting",
        paragraphs: [
          "We publish programme updates and utilisation summaries on our Transparency page so you can see how funds were used.",
        ],
      },
    ],
  },
];

export function getLegalDocument(slug: LegalDocument["slug"]): LegalDocument {
  const doc = legalDocuments.find((d) => d.slug === slug);
  if (!doc) throw new Error(`Missing legal document: ${slug}`);
  return doc;
}
