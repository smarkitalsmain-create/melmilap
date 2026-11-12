# Mel Milap Foundation website

The public website for Mel Milap Foundation, built with Next.js (App Router), TypeScript, Tailwind CSS v4, Motion and GSAP ScrollTrigger.

This app is self-contained in `mel-milap-foundation/`. It shares no code with the rest of this repository and can be moved to its own repository unchanged.

## Run it

```bash
cd mel-milap-foundation
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3200
```

| Command | What it does |
| --- | --- |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest: publication rules, form validation and delivery, donation gating |

Settings are read when the site is built, so rebuild after changing environment variables.

## Where to edit content

All content is typed TypeScript under `src/content/`. Pages read it through `src/lib/content.ts`, which applies the publication rules.

| File | Holds |
| --- | --- |
| `site.ts` | Name, tagline, navigation, **contact details**, **social links** and the Smarkitals endorsement |
| `leadership.ts` | Rakhi and Gopali: titles, bios, portraits and the **founder note** (`approval`) |
| `causes.ts` | The three focus areas, their status and cause-page copy |
| `campaigns.ts` | Campaigns, the **homepage spotlight** slug and its fallback, plus fictional fixtures for reviewing states |
| `records.ts` | Programme updates, transparency documents, utilisation summaries and impact figures (all empty) |
| `process.ts`, `operating-model.ts` | "How the work happens" steps and the phased operating model |
| `legal.ts` | Privacy, Terms and Donation Policy (draft) |

Publication rules:

- **Campaigns.** `status: "draft"` is never public. `planned`, `active` and `completed` are public at `/campaigns/{slug}`. Never change a slug after publishing. Optional fields (dates, location, participation, images, progress, updates) appear only when filled in. Progress needs a target, a current value and a `verifiedOn` date. Completed campaigns lead with `outcome`.
- **Spotlight.** Set `spotlight.campaignSlug`. If that campaign is unpublished, the homepage shows the volunteer and partner invitation instead.
- **Records.** Anything with `approval: "draft"` stays off public pages, the sitemap and structured data.
- **Bios.** A bio paragraph with `confirmed: false` (currently the CBSE line) is hidden publicly.
- **Images.** These render only with `approved: true`. Set `illustrative: true` on generated or commissioned imagery, which gets an "Illustrative image" caption.
- **Preview.** With `CONTENT_PREVIEW=true`, all drafts appear with visible markers, and `/preview/campaigns` shows every campaign state using fictional examples.

**Future NGOSutra connection.** Field names follow NGOSutra's model: campaign `slug`, `status`, `targetMinor` in paise, `currency`; enquiry types `VOLUNTEER`, `PARTNER`, `INSTITUTIONAL`, `GENERAL`. An adapter can therefore replace the sources behind `src/lib/content.ts` without touching pages. Forms already post NGOSutra-shaped enquiry records to the webhook.

## Configuration (`.env.example`)

| Variable | Default | Effect |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | localhost | Canonical URLs, sitemap and share previews |
| `SITE_INDEXING` | `false` | robots.txt and meta robots block search engines until set to `true` |
| `FORMS_WEBHOOK_URL` / `_SECRET` | none | Destination for enquiries. With none set, forms are replaced by an "opens soon" notice. Success is shown only after a 2xx response. |
| `FORMS_STORE=file` | off | Dev only: writes enquiries to `.data/enquiries.jsonl` |
| `DONATIONS_ENABLED`, `PAYMENT_PROVIDER`, `PAYMENT_MODE`, `RAZORPAY_KEY_ID/SECRET`, `DONATION_ACCOUNT_VERIFIED` | off | See below |

**Donations.** Checkout uses Razorpay hosted Payment Links, so card details never touch this site. The status page asks Razorpay for the payment status server-side; parameters in the URL are ignored.

- **Test mode** needs `rzp_test_` keys and shows a "Test mode" banner.
- **Live mode** needs `rzp_live_` keys and `DONATION_ACCOUNT_VERIFIED=true`. Only live mode switches the header action from "Get Involved" to "Donate".
- **`PAYMENT_PROVIDER=mock`** gives a local test checkout. It is refused in production.

**Analytics** are not installed.

## What was tested

- **Automated:** type check, lint, 20 unit tests and a production build, all passing.
- **Browser, desktop (1440×900):**
  - The pinned scroll-to-build sequence starts below the header and releases into the three cause cards.
  - The campaign burst settles into its frame, and the glass panel and ripple work.
  - The accordion, leadership hierarchy and About page all checked.
- **Browser, phone (360×740):**
  - No horizontal scroll. The message appears before the artwork, and the hero is readable immediately.
  - Cause cards assemble in normal flow.
  - The mobile menu manages focus, locks scrolling and closes on Escape.
- **Routes:** every route returns the expected status. Drafts, fixtures, preview routes and the mock checkout return 404 in public mode.
- **Forms:**
  - Server-side errors show a focused summary, mark fields invalid and keep what was typed.
  - Success appears only after the record was stored.
  - A failing webhook shows an honest failure message, and this also works without JavaScript.
  - With no destination set, the "opens soon" notice replaces the form.
- **Donations (mock provider):**
  - Validation catches out-of-range amounts.
  - The success, failure and unknown-reference states work, and a spoofed `status=paid` URL is rejected.
  - With donations off, the page offers other ways to help.
- **Keyboard:** the skip link appears on the first Tab, focus outlines are visible, and the accordion uses real buttons with `aria-expanded`.
- **Not tested:**
  - Real Razorpay test keys (none were available).
  - A real webhook receiver.
  - Reduced motion under browser emulation. That path was reviewed in code: CSS animations, GSAP sequences, the burst, parallax and ripples are all gated on `prefers-reduced-motion`, and the server-rendered artwork is already in its final state.
  - Screen readers other than through the accessibility tree.

## Needed before launch

1. **Rakhi's portrait.** An approved photograph of Rakhi (`leadership.ts` → `portrait`, with `approved: true`, file in `public/people/`). A cut-paper monogram labelled "Illustration · portrait to come" stands in until then. Gopali's portrait is in place.
2. **CBSE wording.** Confirm the exact wording of Rakhi's CBSE nomination, then set `confirmed: true`.
3. **Founder note.** Rakhi needs to review the draft "From the Founder" note in `leadership.ts`, then set `approval: "approved"`.
4. **Titles and governance.** Confirm the titles against approved governance documents. The October 2026 draft *Incorporation, Governance and Capital Brief* lists Rakhi as Executive Director and **Nidhi Kulshrestha** as the second director, and does not mention Gopali Verma or a "Managing Director" title. The site uses the titles exactly as briefed, but they should match the approved documents before launch.
5. **Blanket drive.** Confirm the Senior Citizen Blanket Drive's status, dates, location, delivery partner and participation instructions, then change `status` from `draft`. The spotlight switches automatically.
6. **Contact details.** An approved email, phone and any address, plus social profiles (`site.ts`).
7. **Form destination.** `FORMS_WEBHOOK_URL`, for example NGOSutra, a CRM or Apps Script.
8. **Payments.** Razorpay credentials and verification of the foundation's own bank account. Also tax-benefit and receipt details, published only once registrations are verified.
9. **Legal copy.** Legal review of the Privacy, Terms and Donation Policy drafts.
10. **Domain and indexing.** The production domain (`NEXT_PUBLIC_SITE_URL`), then `SITE_INDEXING=true` at launch.
11. **Fourth area.** The planning documents also list startup incubation as an objective. The site covers only the three areas in the brief, so decide whether and when to add it.
12. **Smarkitals wording.** Any statement about legal structure, registration or Smarkitals Group support needs verified wording. The site makes no such claims beyond the footer credit "A Smarkitals Group initiative".
