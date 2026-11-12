/**
 * Fundraising figures. Funds raised, funds used and programme outcomes are
 * kept separate; publish used/outcome figures only with supporting records.
 */
export const fundraisingMilestone = {
  /** Public, rounded figure (the amount was supplied as approximate). */
  figure: "₹12.76 lakh",
  label: "raised",
  period: "Over 45 days of operations through 31 October 2026",
  asOf: "2026-10-31",
  daysOfOperation: 45,
  /** Reported amount in paise (₹12,76,343). Show this precision once reconciled. */
  reportedAmountMinor: 127634300,
  reconciled: false,
  /**
   * Entity or partner that collected the funds. Leave null until confirmed;
   * copy must not say the money was received into Mel Milap's own account.
   */
  collectedBy: null as string | null,
  updateHref: "/transparency#fundraising-update-2026-10-31",
};

export interface LabelledFigure {
  label: string;
  /** null = awaiting supporting records. */
  value: string | null;
  asOf?: string;
}

/** Separate labelled figures for Transparency. */
export const financialSummary: Record<"fundsRaised" | "fundsUsed" | "outcomes", LabelledFigure> = {
  fundsRaised: { label: "Funds raised", value: "Approximately ₹12.76 lakh", asOf: "2026-10-31" },
  fundsUsed: { label: "Funds used", value: null },
  outcomes: { label: "Programme outcomes", value: null },
};
