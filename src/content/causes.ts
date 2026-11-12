import type { Cause, CauseSlug } from "./types";

/**
 * The three focus areas. Keep `status` honest: every area is "planned" until a
 * partner-led programme is actually running.
 */
export const causes: Cause[] = [
  {
    slug: "education",
    name: "Education",
    shortName: "Education",
    colour: "mango",
    motif: "book",
    oneLiner:
      "Helping children with limited access to books, teaching and guidance keep learning and stay in school.",
    intendedSupport: [
      "Learning materials matched to assessed needs",
      "Supplementary teaching with partner educators",
      "Support that helps children continue in school",
    ],
    status: "planned",
    statusNote: "Planned. We are identifying schools, learning centres and education partners.",
    page: {
      title: "Education",
      intro:
        "Every child deserves a fair chance to learn. We want to help children who are falling behind for reasons that have nothing to do with their ability.",
      whyItMatters: [
        "Financial hardship, too few learning resources, limited digital access and too little academic guidance keep many children from learning well, continuing their studies and preparing for work.",
        "Our founder has taught children in informal settlements and children whose parents cannot care for them. Those classrooms shape how we approach this work.",
      ],
      whoWeAimToSupport: [
        "Children from low-income households",
        "Children who are out of school or at risk of dropping out",
        "Young people who need guidance to take the next step",
      ],
      partnerLedNow:
        "We will begin by working with schools, learning centres, educators and education-focused NGOs, supporting defined projects under written agreements.",
      ownProgrammesLater:
        "As capacity grows, we intend to run our own supplementary learning sessions, distribute materials and coordinate mentoring.",
      waysToHelp: [
        {
          label: "Volunteer as a tutor or mentor",
          href: "/get-involved/volunteer",
          description: "Tell us your subjects and your availability.",
        },
        {
          label: "Partner as a school or learning centre",
          href: "/get-involved/delivery-partners",
          description: "Work with us on a defined, well-reported project.",
        },
      ],
      metaDescription:
        "How Mel Milap Foundation plans to support children's learning in India through partner schools, educators and learning materials.",
    },
  },
  {
    slug: "meals-nutrition",
    name: "Meals & Nutrition",
    shortName: "Meals",
    colour: "hibiscus",
    motif: "bowl",
    oneLiner:
      "Working towards dependable, nutritious meals for people facing food insecurity, served with dignity.",
    intendedSupport: [
      "Recurring meals through verified community kitchens",
      "Food assistance for vulnerable households and elders",
      "Simple, honest tracking of every meal served",
    ],
    status: "planned",
    statusNote: "Planned. Our first initiative will be a small meal pilot with a verified local partner.",
    page: {
      title: "Meals & Nutrition",
      intro:
        "A nutritious meal changes what the rest of the day can hold, for a child in class, a worker on a long shift or an elder living alone.",
      whyItMatters: [
        "Food insecurity leaves people without regular access to nutritious meals, and that affects their health, learning and ability to work.",
        "We intend to start with a meal pilot for a clearly identified community, so we can prove reliable delivery before growing.",
      ],
      whoWeAimToSupport: [
        "Children and families facing food insecurity",
        "Elderly people without adequate support",
        "People experiencing homelessness",
      ],
      partnerLedNow:
        "We will work with community kitchens, food-service organisations and local NGOs, agreeing the menu, cost per meal, food safety and reporting before any pilot begins.",
      ownProgrammesLater:
        "Where scale and resources justify it, we intend to manage beneficiary identification and meal distribution directly.",
      waysToHelp: [
        {
          label: "Volunteer at meal distributions",
          href: "/get-involved/volunteer",
          description: "Help when our first pilot begins.",
        },
        {
          label: "Partner as a community kitchen",
          href: "/get-involved/delivery-partners",
          description: "Tell us about your kitchen and the community you serve.",
        },
      ],
      metaDescription:
        "How Mel Milap Foundation plans to support nutritious meals for people facing food insecurity in India, starting with a partner-led pilot.",
    },
  },
  {
    slug: "animal-welfare",
    name: "Animal Welfare",
    shortName: "Animals",
    colour: "leaf",
    motif: "paw",
    oneLiner:
      "Caring for community dogs through responsible feeding, timely treatment and kinder neighbourhoods.",
    intendedSupport: [
      "Responsible feeding with local caregivers",
      "Help with veterinary treatment, vaccination and sterilisation",
      "Adoption support and community awareness",
    ],
    status: "planned",
    statusNote: "Planned. We are speaking with animal welfare organisations and veterinary professionals.",
    page: {
      title: "Animal Welfare",
      intro:
        "Community dogs are part of our streets and our lives. We want them fed, treated when they are hurt and met with kindness.",
      whyItMatters: [
        "Community and abandoned animals face hunger, injury, disease and neglect, often without timely rescue, treatment or consistent care.",
        "We are starting with community dogs, working alongside the people who already look after them.",
      ],
      whoWeAimToSupport: [
        "Community dogs and their caregivers",
        "Abandoned animals needing rescue or treatment",
        "Neighbourhoods building kinder, safer habits",
      ],
      partnerLedNow:
        "We will work with animal welfare organisations, veterinary professionals and rescue networks on feeding, treatment, vaccination and sterilisation.",
      ownProgrammesLater:
        "As we grow, we intend to coordinate local feeding, treatment assistance, adoption drives and awareness activities ourselves.",
      waysToHelp: [
        {
          label: "Volunteer with community dogs",
          href: "/get-involved/volunteer",
          description: "Feeding, awareness and adoption days.",
        },
        {
          label: "Partner as a vet or rescue group",
          href: "/get-involved/delivery-partners",
          description: "Work with us on treatment and care.",
        },
      ],
      metaDescription:
        "How Mel Milap Foundation plans to support community dogs in India through feeding, veterinary care and adoption, working with animal welfare partners.",
    },
  },
];

export function getCause(slug: string): Cause | undefined {
  return causes.find((c) => c.slug === slug);
}

export const causeHref = (slug: CauseSlug) => `/our-work/${slug}`;

export const programmeStatusLabel: Record<Cause["status"], string> = {
  planned: "Planned",
  piloting: "Pilot under way",
  active: "Active",
};
