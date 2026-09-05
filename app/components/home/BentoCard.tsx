import Link from "next/link";
import type { Project } from "@/data/projects";
import ImagePlaceholder from "@/app/components/ImagePlaceholder";

type BentoCardProps = {
  project: Project;
};

/**
 * Homepage project card: image slot, title, and short description.
 * The whole card remains a link, matching the previous grid interaction.
 */
export default function BentoCard({ project }: BentoCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white">
        <ImagePlaceholder
          label={project.imageLabel}
          className="h-[240px] w-full"
        />
        <div className="flex flex-col gap-3 px-8 pb-8 pt-7">
          <h3 className="font-sf text-[32px] leading-none text-black">
            {project.cardTitle}
          </h3>
          <p className="font-sf text-base leading-[1.55] text-muted">
            {project.cardDescription}
          </p>
        </div>
      </article>
    </Link>
  );
}
