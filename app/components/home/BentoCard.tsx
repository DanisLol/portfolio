import Image from "next/image";
import type { Project } from "@/data/projects";

type BentoCardProps = {
  project: Project;
};

/**
 * Homepage project card: image with the title and short description below it.
 * The whole card is a link to the project's external page and lifts on hover.
 */
export default function BentoCard({ project }: BentoCardProps) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <article className="flex h-full flex-col gap-5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.015]">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-card-gray transition-shadow duration-300 ease-out group-hover:shadow-[0_20px_45px_-20px_rgba(23,23,23,0.35)]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="flex items-center gap-2 font-sf text-xl font-semibold leading-tight text-black">
            {project.cardTitle}
            <span
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </h3>
          <p className="font-sf text-base leading-[1.55] text-muted">
            {project.cardDescription}
          </p>
        </div>
      </article>
    </a>
  );
}
