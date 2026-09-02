import Image from "next/image";
import Link from "next/link";
import type { BentoCardData } from "@/data/bento";
import { cn } from "@/utils/utils";

type BentoCardProps = {
  card: BentoCardData;
};

/**
 * Single bento grid cell. Renders the card's image when one is supplied,
 * otherwise falls back to an empty placeholder box ready for future
 * project content.
 */
export default function BentoCard({ card }: BentoCardProps) {
  const content = (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-3xl",
        card.variant === "featured" ? "bg-white" : "bg-card-gray"
      )}
    >
      {card.image && (
        <Image
          src={card.image}
          alt={card.title ?? ""}
          fill
          className="object-cover"
        />
      )}
    </div>
  );

  if (card.href) {
    return (
      <Link href={card.href} className="block h-full w-full">
        {content}
      </Link>
    );
  }

  return content;
}
