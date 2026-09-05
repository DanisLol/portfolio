export type ProjectStat = {
  value: string;
  label: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  cardTitle: string;
  cardDescription: string;
  imageLabel: string;
  subtitle: string;
  tags: string[];
  paragraphs: string[];
  stats?: ProjectStat[];
  links?: ProjectLink[];
};

/**
 * Featured projects shown on the homepage grid and individual case-study pages.
 */
export const projects: Project[] = [
  {
    slug: "pethsapp-2-0",
    title: "Pethsapp 2.0",
    cardTitle: "PETHSAPP 2.0",
    cardDescription:
      "A school information app for 700+ students, where I decided what shipped and ran the launch myself.",
    imageLabel: "APP SCREENSHOTS",
    subtitle:
      "School information app · de facto product manager on a 3-person team",
    tags: ["REACT NATIVE", "FIREBASE", "EXPO", "SANITY", "GIT"],
    paragraphs: [
      "A mobile app streamlining school information for Pierre Elliott Trudeau High School, built with a three-person cross-functional team. I decided which features shipped, added components, and defined the team's goals, constraints, and plan, alongside development work.",
      "Then I publicized it myself: a school assembly and a social media push. That is where the numbers came from.",
    ],
    stats: [
      { value: "#139", label: "APP STORE RANK" },
      { value: "700+", label: "USERS" },
      { value: "2.7k+", label: "APP STORE IMPRESSIONS" },
      { value: "8.5k+", label: "VIEWS ACROSS SOCIAL" },
    ],
    links: [
      { label: "DEMO VIDEO", href: "#" },
      { label: "MARKETING PAGE", href: "#" },
    ],
  },
  {
    slug: "anime-recommender",
    title: "Anime Recommender",
    cardTitle: "ANIME RECOMMENDER",
    cardDescription:
      "A graph-based recommendation engine across 25,000 anime titles and 12.4M+ user reviews.",
    imageLabel: "IMAGE SLOT",
    subtitle: "Graph-based recommendation engine · 25,000 titles, 12.4M+ reviews",
    tags: ["PYTHON", "GRAPHS", "CUSTOMTKINTER", "PILLOW"],
    paragraphs: [
      "A graph-based recommendation engine modeling 25,000 anime titles and 12.4M+ user reviews as a weighted graph, generating recommendations from reviewer similarity rather than raw rating overlap.",
      "A custom multi-factor scoring algorithm weighs reviewer coverage, trustworthiness, and popularity to balance relevance against overfitting toward niche titles. The desktop GUI takes up to five titles at once, with autocomplete search and live filtering by genre, studio, and age rating.",
    ],
  },
  {
    slug: "face-search",
    title: "Face Search",
    cardTitle: "FACE SEARCH",
    cardDescription:
      "A face recognition pipeline for similarity search across large photo libraries.",
    imageLabel: "IMAGE SLOT",
    subtitle:
      "Face recognition pipeline · similarity search across large photo libraries",
    tags: ["POSTGRESQL", "PYTHON", "OPENCV", "MEDIAPIPE"],
    paragraphs: [
      "An end-to-end, large-scale face recognition pipeline combining MediaPipe BlazeFace detection with InsightFace ArcFace embeddings, for similarity-based search across large photo libraries using PostgreSQL and pgvector.",
      "Cosine similarity search runs over 512-dimensional embeddings, with per-photo deduplication and configurable similarity thresholds.",
    ],
  },
  {
    slug: "college-admission-simulator",
    title: "College Admission Simulator",
    cardTitle: "COLLEGE ADMISSION SIMULATOR",
    cardDescription:
      "An interactive Java simulation of how student choices shape admission outcomes.",
    imageLabel: "IMAGE SLOT",
    subtitle: "Interactive simulation · object-oriented design in Java",
    tags: ["JAVA", "GREENFOOT", "GIT"],
    paragraphs: [
      "An interactive college-admissions simulation applying object-oriented programming and software design to model student GPA, happiness, productivity, and admission outcomes.",
      "A multi-world interface handles student configuration, simulation, and results, with interactive UI elements, animations, sound effects, and event-driven gameplay effects.",
    ],
  },
];

/**
 * Finds a project by its URL slug.
 */
export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
