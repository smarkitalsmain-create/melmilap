import type { FounderNote, Leader } from "./types";

/**
 * Leadership. Names and titles must match approved governance documents.
 * Bios stay within supplied facts: no invented achievements, qualifications or dates.
 * Portraits stay null until an approved photograph is supplied.
 */

export const rakhi: Leader = {
  slug: "rakhi-kulshrestha",
  name: "Rakhi Kulshrestha",
  title: "Founder & Managing Director",
  role: "founder",
  initials: "RK",
  colour: "mango",
  intro:
    "A teacher first. Rakhi has spent years teaching children in underserved communities, and that work shapes how the foundation approaches education and community support.",
  bio: [
    {
      text: "Rakhi Kulshrestha has worked with several nonprofit organisations, teaching children in underserved communities, including children living in informal settlements and those whose parents are incarcerated or otherwise unavailable to care for them.",
      confirmed: true,
    },
    {
      text: "She is a CBSE-nominated teacher.",
      confirmed: false,
      confirmationNote: "Confirm the precise wording of the CBSE nomination with Rakhi before publishing.",
    },
    {
      text: "She is also an artist, and dance choreography is one of her passions.",
      confirmed: true,
    },
  ],
  roleSummary: [
    "As Founder & Managing Director of Mel Milap Foundation, Rakhi sets the foundation’s direction, shapes its programme priorities and leads key institutional partnerships.",
    "Her experience working directly with children informs how the foundation approaches education and community support.",
  ],
  responsibilities: [
    "Sets the foundation’s direction",
    "Shapes programme priorities",
    "Leads key institutional partnerships",
  ],
  portrait: {
    src: "/people/rakhi-kulshrestha.jpg",
    alt: "Portrait of Rakhi Kulshrestha, smiling, wearing a grey and gold silk saree against a charcoal background.",
    width: 800,
    height: 1000,
    approved: true,
  },
};

export const gopali: Leader = {
  slug: "gopali-verma",
  name: "Gopali Verma",
  title: "Director & Vice President, Operations",
  role: "operations",
  initials: "GV",
  colour: "leaf",
  intro:
    "A management consultant and an ardent animal lover. Gopali turns the foundation’s priorities into plans and keeps the day-to-day work moving.",
  bio: [
    {
      text: "Gopali Verma is a management consultant with expertise in taxation, finance, business advisory and nonprofit advisory.",
      confirmed: true,
    },
    {
      text: "She is an ardent animal lover and brings a personal commitment to the foundation’s animal welfare work.",
      confirmed: true,
    },
  ],
  roleSummary: [
    "As Director & Vice President, Operations, Gopali turns the foundation’s priorities into programme plans, coordinates delivery partners and volunteers, and oversees day-to-day execution.",
    "Her advisory experience informs budgeting, campaign planning and how programme resources are tracked.",
    "In her operating role, she reports to the Managing Director.",
  ],
  responsibilities: [
    "Turns priorities into programme plans",
    "Coordinates delivery partners and volunteers",
    "Oversees day-to-day execution",
  ],
  reportsTo: "Managing Director",
  portrait: {
    src: "/people/gopali-verma.jpg",
    alt: "Portrait of Gopali Verma, smiling, in a dark blazer against a charcoal background.",
    width: 800,
    height: 1000,
    approved: true,
  },
};

export const leaders = [rakhi, gopali];

/**
 * Draft for Rakhi’s review. Stays unpublished until approval is "approved".
 */
export const founderNote: FounderNote = {
  approval: "draft",
  heading: "From the Founder",
  paragraphs: [
    "For years I have taught children who had every reason to give up and rarely did. Some were growing up in informal settlements. Some had parents who could not be there for them. What they needed was rarely complicated: a book of their own, a meal before class, an adult who came back the next day.",
    "Teaching showed me that no one changes a child’s life alone. It takes a teacher, a neighbour, a cook, a volunteer with an hour to spare. Mel milap means coming together, and that is the whole idea behind this foundation.",
    "We work with partners who know their communities, and we tell you plainly what we do and what it costs. I want Mel Milap to be a place where people who care can find each other, and where children, families and even the dogs on our streets feel the difference.",
  ],
  signOff: "Rakhi Kulshrestha",
};
