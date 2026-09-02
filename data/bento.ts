export type BentoCardVariant = "default" | "featured";

export type BentoCardData = {
  id: string;
  variant: BentoCardVariant;
  image?: string;
  title?: string;
  href?: string;
};

/**
 * Placeholder content for the homepage bento grid. Swap in real project
 * images, titles, and links as they become available.
 */
export const bentoCards: BentoCardData[] = [
  { id: "card-1", variant: "default" },
  { id: "card-2", variant: "default" },
  { id: "card-3", variant: "default" },
  { id: "card-4", variant: "default" },
];
