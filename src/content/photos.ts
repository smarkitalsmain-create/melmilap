import type { CauseSlug } from "./types";

/**
 * Photo register for "In the field" and founder imagery.
 *
 * A photo is public only when `status` is "cleared" AND `file` is set. Clear a
 * photo only when its source, publication permission (including consent for
 * anyone identifiable, and guardians' consent for children), the delivering
 * organisation and Mel Milap's role are confirmed. Put cleared files in
 * public/field/ (wide originals become features, small ones tiles).
 */
export interface FieldPhoto {
  id: string;
  cause: CauseSlug | "founder" | "other";
  /** Public path under /field/, set once the file is added. */
  file: string | null;
  width?: number;
  height?: number;
  alt: string;
  /** Short factual caption. Must not claim more than is confirmed. */
  caption: string;
  source: string;
  permission: "confirmed" | "unconfirmed";
  activityDate?: string;
  location?: string;
  deliveredBy?: string;
  melMilapRole?: string;
  credit?: string;
  /** Faces of children must be cropped or blurred unless consent is confirmed. */
  showsChildren: boolean;
  status: "cleared" | "held";
  /** Why it is held, for the handover. */
  holdReason?: string;
}

const held = (p: Omit<FieldPhoto, "status" | "permission"> & { holdReason: string }): FieldPhoto => ({
  ...p,
  permission: "unconfirmed",
  status: "held",
});

export const fieldPhotos: FieldPhoto[] = [
  held({
    id: "classroom-session",
    cause: "education",
    file: null,
    width: 2048,
    height: 1152,
    alt: "A teacher in a yellow kurta speaks to a classroom of seated students.",
    caption: "A classroom session.",
    source: "Supplied 12 November 2026; phone photo (Redmi Note 9 Pro Max). Downloads/image(20261112-170342).png",
    showsChildren: true,
    holdReason: "Who is teaching (Rakhi?), when, where and for which organisation are unconfirmed; students under 18 are identifiable.",
  }),
  held({
    id: "idbi-computer-donation",
    cause: "education",
    file: null,
    width: 2048,
    height: 1032,
    alt: "Students and officials stand in front of an IDBI Bank banner about a donation of computers to charitable organisations.",
    caption: "Computer donation event.",
    source: "Supplied 12 November 2026. Downloads/image(20261112-170405).png",
    showsChildren: true,
    holdReason: "Banner names IDBI Bank RPU-Pune and other charities; Mel Milap's or Rakhi's role, event date and permission are unconfirmed.",
  }),
  held({
    id: "rice-distribution",
    cause: "meals-nutrition",
    file: null,
    width: 2048,
    height: 1365,
    alt: "Women measure rice from a sack and record it in a register while a group of villagers watches.",
    caption: "Food distribution.",
    source: "Supplied 12 November 2026. Downloads/image(20261112-170106).png",
    showsChildren: true,
    holdReason: "Looks like professional agency photography; source, photographer and any link to Mel Milap are unknown.",
  }),
  held({
    id: "school-meal-serving",
    cause: "meals-nutrition",
    file: null,
    width: 612,
    height: 408,
    alt: "A woman serves a meal onto a schoolgirl's plate from a large pot.",
    caption: "A meal being served.",
    source: "Supplied 12 November 2026. Downloads/image(20261112-170206).png",
    showsChildren: true,
    holdReason: "612×408 is a stock-photo preview size; likely a licensed stock image, not Mel Milap activity.",
  }),
  held({
    id: "women-group-shed",
    cause: "other",
    file: null,
    width: 500,
    height: 333,
    alt: "A group of women in saris stand together in a workshop shed.",
    caption: "Community group.",
    source: "Supplied 12 November 2026. Downloads/image(20261112-170215).png",
    showsChildren: false,
    holdReason: "Source unknown (small web-sized image); the activity doesn't match a Mel Milap focus area.",
  }),
  held({
    id: "blanket-collage",
    cause: "other",
    file: null,
    width: 1024,
    height: 720,
    alt: "Collage of children wrapped in grey blankets.",
    caption: "Blanket distribution.",
    source: "Supplied 12 November 2026. Downloads/image(20261112-170119).png",
    showsChildren: true,
    holdReason: "Identifiable children; source and date unknown. Not to be used as evidence for the Senior Citizen Blanket Drive.",
  }),
  held({
    id: "food-handout-masks",
    cause: "meals-nutrition",
    file: null,
    alt: "A man in a mask hands food packets to children in a queue.",
    caption: "Food handout.",
    source: "Supplied in chat 12 November 2026; file not yet provided.",
    showsChildren: true,
    holdReason: "File, source, date and permission needed; identifiable children.",
  }),
  held({
    id: "thali-plates",
    cause: "meals-nutrition",
    file: null,
    alt: "Rows of steel thalis with rotis, rice, dal, vegetables and cucumber.",
    caption: "Meals ready to serve.",
    source: "Supplied in chat 12 November 2026; file not yet provided.",
    showsChildren: false,
    holdReason: "File, source, date and kitchen/partner needed.",
  }),
  held({
    id: "community-kitchen",
    cause: "meals-nutrition",
    file: null,
    alt: "Cooks in masks and hairnets stir large cauldrons in a community kitchen.",
    caption: "Cooking in a community kitchen.",
    source: "Supplied in chat 12 November 2026; file not yet provided.",
    showsChildren: false,
    holdReason: "File, source, date and kitchen/partner needed.",
  }),
  held({
    id: "dog-feeding",
    cause: "animal-welfare",
    file: null,
    alt: "A woman feeds a group of dogs in a kitchen area lined with steel bowls.",
    caption: "Feeding time for rescued dogs.",
    source: "Supplied in chat 12 November 2026; file not yet provided.",
    showsChildren: false,
    holdReason: "File, source, date, place and who is pictured needed.",
  }),
  held({
    id: "dog-care-embrace",
    cause: "animal-welfare",
    file: null,
    alt: "A woman hugs a dog inside a fenced enclosure, surrounded by other dogs.",
    caption: "Care for community dogs.",
    source: "Supplied in chat 12 November 2026; file not yet provided.",
    showsChildren: false,
    holdReason: "File, source, date, place and who is pictured needed.",
  }),
  held({
    id: "tutor-and-child",
    cause: "education",
    file: null,
    alt: "A volunteer writes in a notebook while a young boy looks on.",
    caption: "One-to-one learning support.",
    source: "Supplied in chat 12 November 2026; file not yet provided.",
    showsChildren: true,
    holdReason: "File, source, date and permission needed; identifiable child.",
  }),
  held({
    id: "reading-on-mat",
    cause: "education",
    file: null,
    alt: "A teacher reads a picture book with young children on a woven mat.",
    caption: "Reading together.",
    source: "Supplied in chat 12 November 2026; file not yet provided.",
    showsChildren: true,
    holdReason: "Small web-sized image; may be stock. File, source and permission needed.",
  }),
  held({
    id: "park-gathering",
    cause: "education",
    file: null,
    alt: "A large group of young volunteers and children pose together in a park.",
    caption: "A day out with children.",
    source: "Supplied in chat 12 November 2026; file not yet provided.",
    showsChildren: true,
    holdReason: "File, source, date, organiser and permission needed; identifiable children.",
  }),
];

export const publicFieldPhotos = () => fieldPhotos.filter((p) => p.status === "cleared" && p.file);

/** In preview, held photos appear as labelled placeholders (never the image). */
export const previewFieldPhotos = () => fieldPhotos;
