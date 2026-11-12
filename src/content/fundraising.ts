/**
 * Fundraising figure, shown only in the dated update on the Transparency page.
 * Funds used and programme outcomes are not published for now.
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
