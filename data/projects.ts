export type Project = {
  slug: string;
  title: string;
  cardTitle: string;
  cardDescription: string;
  /** Path under `public/`, e.g. `/projects/pethsapp.jpg`. */
  image: string;
  /** External destination opened when the card is clicked. */
  href: string;
};

/**
 * Featured projects shown on the homepage grid.
 * Drop matching images into `public/projects/`.
 */
export const projects: Project[] = [
  {
    slug: "pethsapp-2-0",
    title: "Pethsapp 2.0",
    cardTitle: "Pethsapp",
    cardDescription: "A school information app for 700+ students",
    image: "/projects/pethsapp.jpg",
    href: "https://www.tsac.ca/pethsapp",
  },
  {
    slug: "Embedded Interactive Timer",
    title: "Embedded Interactive Timer",
    cardTitle: "Embedded Interactive Timer",
    cardDescription: "An interactive embedded timer.",
    image: "/projects/timer.jpg",
    href: "https://github.com/DanisLol/ControlSystemTimer",
  },
  {
    slug: "face-search",
    title: "Face Search",
    cardTitle: "Face Search",
    cardDescription:
      "A face recognition pipeline for similarity search across large photo libraries.",
    image: "/projects/face-search.jpg",
    href: "https://github.com/DanisLol/face-recognition",
  },

  {
    slug: "anime-recommender",
    title: "Anime Recommender",
    cardTitle: "Anime Recommender",
    cardDescription:
      "A graph-based recommendation engine across 25,000 anime titles and 12.4M+ user reviews.",
    image: "/projects/anime-recommender.jpeg",
    href: "https://github.com/DanisLol/CSC111-Project2",
  },
  {
    slug: "UofT CS Webring",
    title: "UofT CS Webring",
    cardTitle: "UofT CS Webring",
    cardDescription: "UofT's CS Webring",
    image: "/projects/college-admission-simulator.jpg",
    href: "#",
  },
];
