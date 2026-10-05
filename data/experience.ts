export type ExperienceImage = {
  /** Path under `public/`, or omit to show a grey placeholder slot. */
  src?: string;
  alt: string;
};

export type ExperienceEntry = {
  label: string;
  title: string;
  meta: string;
  summary: string;
  image: ExperienceImage;
};

export type SkillGroup = {
  label: string;
  tags: string[];
};

/**
 * Education and leadership entries for the Experience page.
 * Drop matching images into `public/experience/` and set each `src`.
 */
export const experienceEntries: ExperienceEntry[] = [
  {
    label: "2022 – 2025",
    title: "TSAC",
    meta: "Technology Chair, Grade Representative",
    summary:
      "Built Pethsapp, a school app that gave students, teachers, and parents one place to communicate, and helped run the student council behind it.",
    image: { src: "/projects/pethsapp.jpg", alt: "Pethsapp" },
  },
  {
    label: "2022 – 2025",
    title: "GAME DEVELOPMENT CLUB",
    meta: "Co-President",
    summary:
      "Led the club executive team, taught weekly lessons, and took members to visit Snowman Game Studio.",
    image: { alt: "Snowman Game Studio visit" },
  },
];
