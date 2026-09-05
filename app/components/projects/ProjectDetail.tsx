import Link from "next/link";
import type { Project } from "@/data/projects";
import ImagePlaceholder from "@/app/components/ImagePlaceholder";
import Tag from "@/app/components/Tag";
import TextLink from "@/app/components/TextLink";

type ProjectDetailProps = {
  project: Project;
};

/**
 * Case-study layout shared by every project page: back link, title, tags,
 * write-up, optional stats, and an image slot.
 */
export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="flex flex-col">
      <Link
        href="/projects"
        className="font-roboto text-xs font-bold tracking-[0.96px] text-footer-brown transition-opacity hover:opacity-70"
      >
        ← ALL PROJECTS
      </Link>
      <h1 className="mt-8 max-w-[900px] font-garamond text-[72px] leading-[0.95] text-black">
        {project.title}
      </h1>
      <p className="mt-3 font-sf text-base text-muted">{project.subtitle}</p>
      <div className="mt-12 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="mt-[72px] flex flex-col gap-[72px] lg:flex-row lg:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          {project.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-[640px] font-sf text-base leading-[1.55] text-black"
            >
              {paragraph}
            </p>
          ))}
          {project.stats ? (
            <div className="flex flex-wrap gap-6">
              {project.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex w-[140px] flex-col gap-2.5"
                >
                  <p className="font-garamond text-[48px] leading-none text-black">
                    {stat.value}
                  </p>
                  <p className="font-roboto text-xs font-bold tracking-[0.96px] text-footer-brown">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
          {project.links ? (
            <div className="flex gap-6">
              {project.links.map((link) => (
                <TextLink key={link.label} href={link.href} external>
                  {link.label}
                </TextLink>
              ))}
            </div>
          ) : null}
        </div>
        <ImagePlaceholder
          label={project.imageLabel}
          className="h-[420px] w-full flex-1 rounded-3xl p-5 lg:min-w-0"
        />
      </div>
    </article>
  );
}
