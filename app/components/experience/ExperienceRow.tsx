import Image from "next/image";
import type { ExperienceEntry } from "@/data/experience";

type ExperienceRowProps = {
  entry: ExperienceEntry;
};

/**
 * One Experience-page card: dates, title, a short summary, and a photo.
 */
export default function ExperienceRow({ entry }: ExperienceRowProps) {
  return (
    <article className="flex min-w-0 flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="font-roboto text-xs font-bold tracking-[0.96px] text-muted">
          {entry.label}
        </p>
        <h2 className="font-garamond text-[40px] leading-none text-black">
          {entry.title}
        </h2>
        <p className="font-sf text-base text-muted">{entry.meta}</p>
      </div>

      <p className="max-w-[560px] font-sf text-base leading-[1.55] text-black">
        {entry.summary}
      </p>

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-card-gray">
        {entry.image.src ? (
          <Image
            src={entry.image.src}
            alt={entry.image.alt}
            fill
            sizes="(max-width: 896px) 100vw, 880px"
            className="object-cover"
          />
        ) : null}
      </div>
    </article>
  );
}
