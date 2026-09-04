import type { ExperienceEntry } from "@/data/experience";

type ExperienceRowProps = {
  entry: ExperienceEntry;
};

/**
 * One Experience-page row: brown label on the left, title and body on the right.
 */
export default function ExperienceRow({ entry }: ExperienceRowProps) {
  return (
    <article className="flex gap-14 border-b border-black/12 py-[72px]">
      <p className="w-[200px] shrink-0 font-roboto text-xs font-bold tracking-[0.96px] text-footer-brown">
        {entry.label}
      </p>
      <div className="flex min-w-0 flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-sf text-[32px] leading-none text-black">
            {entry.title}
          </h2>
          <p className="font-sf text-base text-muted">{entry.meta}</p>
        </div>
        {entry.body ? (
          <p className="max-w-[680px] font-sf text-base leading-[1.55] text-black">
            {entry.body}
          </p>
        ) : null}
        {entry.bullets ? (
          <ul className="flex max-w-[680px] flex-col gap-3 font-sf text-base leading-[1.55] text-black">
            {entry.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
