export type SectionId =
  | "about"
  | "projects"
  | "research"
  | "resume"
  | "hobbies"
  | "contact"

export type Section = {
  id: SectionId
  title: string
  summary: string
  readMoreHref: string
  displayOrder: number
}

export const SECTIONS: readonly Section[] = [
  {
    id: "about",
    title: "About Me",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    readMoreHref: "/sections/about",
    displayOrder: 0,
  },
  {
    id: "projects",
    title: "Projects",
    summary:
      "Praesent euismod ultrices sem, at vestibulum lectus tincidunt vel. Nulla facilisi. Integer nec odio praesent libero. Sed cursus ante dapibus diam.",
    readMoreHref: "/sections/projects",
    displayOrder: 1,
  },
  {
    id: "research",
    title: "Research",
    summary:
      "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula elementum.",
    readMoreHref: "/sections/research",
    displayOrder: 2,
  },
  {
    id: "resume",
    title: "Resume",
    summary:
      "Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada.",
    readMoreHref: "/sections/resume",
    displayOrder: 3,
  },
  {
    id: "hobbies",
    title: "Hobbies",
    summary:
      "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Mauris blandit aliquet elit.",
    readMoreHref: "/sections/hobbies",
    displayOrder: 4,
  },
  {
    id: "contact",
    title: "Contact",
    summary: "Reach me at hello@example.com",
    readMoreHref: "/sections/contact",
    displayOrder: 5,
  },
]

export function getSectionById(id: string): Section | undefined {
  return SECTIONS.find((s) => s.id === id)
}

// Carousel neighbors: for a given center section, returns the two cards on
// each side (with wraparound). Ordering: farLeft | nearLeft | center | nearRight | farRight.
export function getNeighbors(centerId: string): {
  center: Section
  nearLeft: Section
  nearRight: Section
  farLeft: Section
  farRight: Section
} | null {
  const center = getSectionById(centerId)
  if (!center) return null
  const n = SECTIONS.length
  const at = (i: number): Section => {
    const wrapped = ((i % n) + n) % n
    return SECTIONS.find((s) => s.displayOrder === wrapped)!
  }
  return {
    center,
    nearLeft: at(center.displayOrder - 1),
    nearRight: at(center.displayOrder + 1),
    farLeft: at(center.displayOrder - 2),
    farRight: at(center.displayOrder + 2),
  }
}
