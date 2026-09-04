import { projects } from "@/data/projects";
import BentoCard from "./BentoCard";

type BentoGridProps = {
  showHeading?: boolean;
};

/**
 * Two-column grid of featured project cards.
 */
export default function BentoGrid({ showHeading = true }: BentoGridProps) {
  return (
    <section id="projects" className="flex scroll-mt-24 flex-col gap-12">
      {showHeading ? (
        <h2 className="font-sf text-[32px] text-black">PROJECTS</h2>
      ) : null}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {projects.map((project) => (
          <BentoCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
