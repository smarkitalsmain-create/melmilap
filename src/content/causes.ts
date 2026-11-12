import type { Cause, CauseSlug } from "./types";

/**
 * The three focus areas. Descriptions are general and present tense; any
 * specific service goes in `activities` as a dated entry once confirmed,
 * with who delivered it and what Mel Milap's role was.
 */
export const causes: Cause[] = [
  {
    slug: "education",
    name: "Education",
    shortName: "Education",
    colour: "mango",
    motif: "book",
    summary: "We work to improve access to learning and educational support for children in underserved communities.",
    page: {
      title: "Education",
      intro:
        "We work to improve access to learning and educational support for children in underserved communities, so that their circumstances don’t decide how far they can go.",
      whyItMatters: [
        "Financial hardship, too few learning resources, limited digital access and too little academic guidance keep many children from learning well and continuing their studies.",
        "Our founder has taught children in informal settlements and children whose parents cannot care for them. Those classrooms shape how we approach this work.",
      ],
      whoWeSupport: [
        "Children from low-income households",
        "Children who are out of school or at risk of dropping out",
        "Young people who need guidance to take the next step",
      ],
      waysToHelp: [
        { label: "Volunteer as a tutor or mentor", href: "/get-involved/volunteer", description: "Tell us your subjects and your availability." },
        { label: "Partner as a school or learning centre", href: "/get-involved/delivery-partners", description: "Work with us on a defined, well-reported project." },
      ],
      metaDescription:
        "Mel Milap Foundation works to improve access to learning and educational support for children in underserved communities in India.",
    },
    activities: [],
  },
  {
    slug: "meals-nutrition",
    name: "Meals & Nutrition",
    shortName: "Meals",
    colour: "hibiscus",
    motif: "bowl",
    summary:
      "We work to improve access to meals for people facing food insecurity, with dignity at the centre of how support is delivered.",
    page: {
      title: "Meals & Nutrition",
      intro:
        "We work to improve access to meals for people facing food insecurity, with dignity at the centre of how support is delivered.",
      whyItMatters: [
        "Food insecurity leaves people without regular access to nutritious meals, and that affects their health, learning and ability to work.",
        "How a meal is offered matters as much as the meal itself. We work with people who serve their own communities with respect.",
      ],
      whoWeSupport: [
        "Children and families facing food insecurity",
        "Elderly people without adequate support",
        "People experiencing homelessness",
      ],
      waysToHelp: [
        { label: "Volunteer at meal distributions", href: "/get-involved/volunteer", description: "Tell us when you’re free to help." },
        { label: "Partner as a community kitchen", href: "/get-involved/delivery-partners", description: "Tell us about your kitchen and the community you serve." },
      ],
      metaDescription:
        "Mel Milap Foundation works to improve access to meals for people facing food insecurity in India, with dignity at the centre of how support is delivered.",
    },
    activities: [],
  },
  {
    slug: "animal-welfare",
    name: "Animal Welfare",
    shortName: "Animals",
    colour: "leaf",
    motif: "paw",
    summary: "We work to support the care and welfare of community dogs.",
    page: {
      title: "Animal Welfare",
      intro: "We work to support the care and welfare of community dogs, alongside the people who already look after them.",
      whyItMatters: [
        "Community and abandoned dogs face hunger, injury, disease and neglect, often without timely help or consistent care.",
        "Caring neighbours, feeders and animal welfare groups already do a great deal. We work to support them.",
      ],
      whoWeSupport: [
        "Community dogs and their caregivers",
        "Abandoned dogs that need help",
        "Neighbourhoods building kinder, safer habits",
      ],
      waysToHelp: [
        { label: "Volunteer with community dogs", href: "/get-involved/volunteer", description: "Feeding, awareness and adoption days." },
        { label: "Partner as a vet or rescue group", href: "/get-involved/delivery-partners", description: "Work with us on care for community dogs." },
      ],
      metaDescription: "Mel Milap Foundation works to support the care and welfare of community dogs in India.",
    },
    activities: [],
  },
];

export function getCause(slug: string): Cause | undefined {
  return causes.find((c) => c.slug === slug);
}

export const causeHref = (slug: CauseSlug) => `/our-work/${slug}`;

/** Confirmed activities only, newest first. */
export const confirmedActivities = (cause: Cause) =>
  cause.activities.filter((a) => a.confirmed).sort((a, b) => b.date.localeCompare(a.date));
