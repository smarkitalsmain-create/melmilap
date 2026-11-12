import type { ImpactMetric, ProgrammeUpdate, TransparencyDocument, UtilisationSummary } from "./types";

/**
 * Programme updates, transparency documents, utilisation summaries and impact
 * figures. Add records with approval: "approved" to make them public.
 */

export const programmeUpdates: ProgrammeUpdate[] = [
  {
    slug: "fundraising-update-2026-10-31",
    date: "2026-10-31",
    kind: "fundraising",
    title: "Fundraising update · 31 October 2026",
    summary: "Approximately ₹12.76 lakh was raised over 45 days of operations through 31 October 2026.",
    body: [
      "Approximately ₹12.76 lakh was raised over 45 days of operations through 31 October 2026.",
      "This figure covers funds raised only. Funds used and programme outcomes will be reported separately once supporting records are available.",
    ],
    approval: "approved",
  },
];

export const transparencyDocuments: TransparencyDocument[] = [];

export const utilisationSummaries: UtilisationSummary[] = [];

export const impactMetrics: ImpactMetric[] = [];
