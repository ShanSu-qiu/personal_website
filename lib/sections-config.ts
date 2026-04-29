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
  /** Body content. Each string is rendered as a separate <p>. */
  paragraphs: string[]
  /** URL for the "Learn more" link. Set to null to hide the link entirely. */
  learnMoreHref: string | null
  /** Reserved for future ordering UI. Currently unused. */
  displayOrder: number
}

// ──────────────────────────────────────────────────────────────────────────────
// EDIT YOUR CONTENT BELOW.
// Each section is one entry. To add a paragraph, add another string to the
// `paragraphs` array. Set `learnMoreHref` to null to hide the "Learn more" link
// for that section.
// ──────────────────────────────────────────────────────────────────────────────

export const SECTIONS: readonly Section[] = [
  {
    id: "about",
    title: "About Me",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    learnMoreHref: "/sections/about",
    displayOrder: 0,
  },
  {
    id: "projects",
    title: "Projects",
    paragraphs: [
      "Praesent euismod ultrices sem, at vestibulum lectus tincidunt vel. Nulla facilisi. Integer nec odio praesent libero.",
      "Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.",
    ],
    learnMoreHref: "/sections/projects",
    displayOrder: 1,
  },
  {
    id: "research",
    title: "Research",
    paragraphs: [
      "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur aliquet quam id dui posuere blandit.",
      "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus.",
    ],
    learnMoreHref: "/sections/research",
    displayOrder: 2,
  },
  {
    id: "resume",
    title: "Resume",
    paragraphs: [
      "Builder-PM with hands-on experience scoping, shipping, and iterating on AI-powered products for real-world workflows. Combines deep user research and customer engagement with metrics-driven iteration to identify high-impact problems and turn ambiguous feedback into clear product direction.",
      "Education: Brown University — M.Sci in Biostatistics (Expected May 2026). University of Michigan, Ann Arbor — B.S. in Mathematics and Economics (May 2024).",
      "Product & Entrepreneurial Experience: Co-founder & Product Lead at Waypoint, an AI-powered career exploration platform launched to 50+ Brown students. Product Lead for a multi-agent DnD AI game. Founder of a Campus Marketplace Platform at UMich.",
      "Work Experience: Risk Analyst Intern at Intelliimpact LLC — developed a Macro-Factor Model that improved risk-adjusted performance by 23% in back-testing.",
      "Skills: LLMs, RAG, Prompt Engineering, Agentic Workflows · PRD, Roadmap, User Research, A/B Testing, Agile/Scrum · Next.js, TypeScript, Supabase, Docker, GCP, Claude Code, Cursor, Vercel · Python, R, SQL, Tableau.",
    ],
    learnMoreHref: "/Shan_Su_Resume.pdf",
    displayOrder: 3,
  },
  {
    id: "hobbies",
    title: "Hobbies",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta.",
      "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula elementum.",
    ],
    learnMoreHref: "/sections/hobbies",
    displayOrder: 4,
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: ["Reach me at hello@example.com"],
    learnMoreHref: null,
    displayOrder: 5,
  },
]

export function getSectionById(id: string): Section | undefined {
  return SECTIONS.find((s) => s.id === id)
}
