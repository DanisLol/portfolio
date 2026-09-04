export type ExperienceEntry = {
  label: string;
  title: string;
  meta: string;
  body?: string;
  bullets?: string[];
};

export type SkillGroup = {
  label: string;
  tags: string[];
};

/**
 * Education and leadership entries for the Experience page.
 */
export const experienceEntries: ExperienceEntry[] = [
  {
    label: "EDUCATION",
    title: "UNIVERSITY OF TORONTO",
    meta: "Bachelor of Computer Science · Toronto, ON",
    body: "Specialist in Technology Leadership and Human-Computer Interaction. Relevant courses: Data Structures, Algorithms, Object-Oriented Programming, Linear Algebra, Calculus with Proof.",
  },
  {
    label: "SEP 2022 – JUL 2025",
    title: "TSAC",
    meta: "Technology Chair, Grade Representative · Markham, ON",
    bullets: [
      "Developed and publicized a school app (Pethsapp), collaborating across student, teacher, and parent stakeholders to create a centralized communication platform.",
      "Organized 900+ person activities with a team of 25 council members to strengthen school engagement.",
      "Advocated for a cohort of 450+ students, hosting a prom event and reaching out to external vendors.",
    ],
  },
  {
    label: "OCT 2022 – JUL 2025",
    title: "GAME DEVELOPMENT CLUB",
    meta: "Co-President · Markham, ON",
    bullets: [
      "Led 6 club executives to coordinate 90+ person events, including an industry visit to Snowman Game Studio.",
      "Mentored and taught over 100 students in weekly 1-hour lessons, providing guidance and feedback.",
      "Increased the club's social media presence by 300 followers.",
    ],
  },
];
