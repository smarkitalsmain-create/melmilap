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
| `causes.ts` | The three focus areas, cause-page copy and each cause's **dated activities** (public only when `confirmed`) |
| `campaigns.ts` | Campaigns, the **homepage spotlight** slug and its fallback, plus fictional fixtures for reviewing states |
| `records.ts` | Dated programme and fundraising updates, transparency documents, utilisation summaries and impact figures |
| `fundraising.ts` | The homepage milestone (₹12.76 lakh, through 31 October 2026), the reported amount and the separate raised / used / outcomes figures |
| `photos.ts` | Photo register for "In the field": source, permission, date, place, delivering organisation, Mel Milap's role, and cleared/held status |
| `process.ts`, `operating-model.ts` | "How the work happens" steps, "How we work" and the "Looking ahead" note on About |
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

## Fundraising and field photos

**Fundraising milestone.** The homepage strip and the dated update say "₹12.76 lakh raised … over 45 days of operations through 31 October 2026". The reported amount, ₹12,76,343, is stored as `reportedAmountMinor` in `fundraising.ts`. Once it is reconciled, set `reconciled: true` and use the exact figure publicly. `collectedBy` stays null until you confirm which entity or partner collected the funds; no copy names a recipient or implies the money reached Mel Milap's own account. Funds used and programme outcomes show "Published once supporting records are available" until you fill them in.

**In the field.** The gallery shows only photos with `status: "cleared"` and a `file` in `public/field/`. With none cleared, the section is hidden publicly and the paper burst stays on the campaign spotlight; once a photo is cleared, the burst moves to the gallery. In preview mode, held photos appear as labelled placeholders without loading the image. Held photos are deliberately not in the repository, because several show identifiable children.

To clear a photo: confirm its source, publication permission (including guardians' consent for children, or use a crop that protects their identity), date, place, the organisation that delivered the work and Mel Milap's role. Then add the file to `public/field/`, fill those fields in `photos.ts` and set `status: "cleared"`.

## Leadership portraits

`public/people/` holds matched 800×1000 portraits built by `node scripts/crop-portraits.mjs` from the originals in `assets/people-originals/`. Both use the same 4:5 frame and the same head position and scale, on the same charcoal backdrop (Rakhi's flat grey background is replaced). To add or replace a photo, put the original in `assets/people-originals/`, adjust its head top, chin and centre in the script, and run it.

## Brand assets

The official logo files are in `public/brand/` (icon, square and round icons, and the horizontal and stacked lockups with reverse versions). The header uses the official mark (`src/components/art/logo.tsx`, the same geometry as `Mel-Milap-icon.svg`) beside the wordmark. The footer uses the horizontal reverse lockup with its background removed. The favicon is the round icon and the Apple touch icon is the square icon.

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

**Photos held for attribution or permission** (none are public yet; details in `src/content/photos.ts`):

- **Classroom session** (Redmi phone photo, woman in yellow teaching): confirm whether it shows Rakhi, plus the date, place, organisation and consent. Students under 18 are identifiable.
- **IDBI Bank computer donation**: the banner names IDBI Bank RPU-Pune and other charities; confirm Mel Milap's or Rakhi's role, the event date and permission.
- **Rice distribution with register**: looks like professional agency photography; source unknown.
- **Woman serving a schoolgirl a meal** (612×408): a stock-photo preview size; likely licensed stock, not Mel Milap activity.
- **Women's group in a shed** (500×333): source unknown, and the activity doesn't match a focus area.
- **Blanket collage of children**: identifiable children, source unknown. It must not be used as evidence for the Senior Citizen Blanket Drive.
- **Sent in chat only, so no files were received**: food handout to children (masks), thali plates, community-kitchen cauldrons, two dog-care photos, tutor with a boy, teacher reading on a mat, and a park gathering. Each needs its file, source, date, place, delivering organisation and permission.

**Fundraising details awaiting confirmation:**

- Reconcile ₹12,76,343 before using that precision publicly.
- Confirm which entity or partner collected the funds and Mel Milap's role in that, then credit them.
- Funds used, cause-wise allocations and beneficiary figures: publish only with supporting records.

**Other inputs:**

1. **Rakhi's portrait.** Her photo is a 433×577 cut-out, so it looks soft at large sizes. `~/Downloads/IMG_7364.jpg` (3024×4032) appears to be the same photo at full resolution; it could be used for a much sharper portrait.
2. **Activities.** Add dated, confirmed entries for each cause in `causes.ts`, each with who delivered it and Mel Milap's role. Specific services (vaccination, recurring meals, classroom sessions…) appear only this way.
3. **CBSE wording.** Confirm the exact wording of Rakhi's CBSE nomination, then set `confirmed: true`.
4. **Founder note.** Rakhi needs to review the draft "From the Founder" note in `leadership.ts`, then set `approval: "approved"`.
5. **Titles and governance.** The site shows Rakhi as "Founder & Managing Director", per your instruction. The October 2026 draft governance brief lists her as Executive Director and Nidhi Kulshrestha as the second director, and doesn't mention Gopali Verma. Confirm the titles against approved documents.
6. **Blanket drive.** Confirm its status, dates, location, delivery partner and participation instructions, then change `status` from `draft`.
7. **Contact details, form destination and payments.** Approved contact details and social profiles (`site.ts`), `FORMS_WEBHOOK_URL`, and Razorpay credentials with the foundation's verified bank account.
8. **Legal copy.** Legal review of the Privacy, Terms and Donation Policy drafts.
9. **Domain and indexing.** Set `NEXT_PUBLIC_SITE_URL` in Vercel, then `SITE_INDEXING=true` at launch.
10. **Smarkitals wording.** Any statement about legal structure or Smarkitals Group support needs verified wording; the site shows only "A Smarkitals Group initiative".
