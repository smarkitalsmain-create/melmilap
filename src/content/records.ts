import type { ImpactMetric, ProgrammeUpdate, TransparencyDocument, UtilisationSummary } from "./types";

/**
 * Programme updates, transparency documents, utilisation summaries and impact
 * figures. All empty until there is approved, verified material to publish.
 * Add records with approval: "approved" to make them public.
 */

export const programmeUpdates: ProgrammeUpdate[] = [];

export const transparencyDocuments: TransparencyDocument[] = [];

export const utilisationSummaries: UtilisationSummary[] = [];

export const impactMetrics: ImpactMetric[] = [];
