/** Donation amounts and validation, shared by the form and the server. Amounts in rupees. */
import { z } from "zod";

export const presetAmounts = [500, 1000, 2500, 5000];
export const MIN_AMOUNT = 100;
export const MAX_AMOUNT = 500000;

export const donationSchema = z.object({
  amount: z.coerce
    .number({ message: "Enter an amount in rupees." })
    .int("Enter a whole number of rupees.")
    .min(MIN_AMOUNT, `The minimum donation is ₹${MIN_AMOUNT}.`)
    .max(MAX_AMOUNT, `For donations above ₹${MAX_AMOUNT.toLocaleString("en-IN")}, please contact us.`),
  name: z.string().trim().min(1, "Your name is required for the receipt.").max(120),
  email: z.string().trim().pipe(z.email("Enter a valid email address.")),
  campaign: z.string().trim().regex(/^[a-z0-9-]*$/).max(120).optional(),
});

export type DonationInput = z.infer<typeof donationSchema>;

export type PaymentStatus = "paid" | "pending" | "failed" | "cancelled" | "unknown";
