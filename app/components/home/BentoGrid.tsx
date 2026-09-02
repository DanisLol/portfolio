import { bentoCards } from "@/data/bento";
import BentoCard from "./BentoCard";

/**
 * Two-column grid of featured project cards on the homepage.
 */
export default function BentoGrid() {
  return (
    <section className="grid grid-cols-1 gap-20 sm:grid-cols-2 sm:auto-rows-[338px]">
      {bentoCards.map((card) => (
        <BentoCard key={card.id} card={card} />
      ))}
    </section>
  );
}
