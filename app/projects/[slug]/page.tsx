import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/app/components/PageShell";
import ProjectDetail from "@/app/components/projects/ProjectDetail";
import { getProject, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Emits a static path for every featured project.
 */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/**
 * Sets the document title from the matched project.
 */
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project?.title ?? "Project",
  };
}

/**
 * Individual project case-study page.
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageShell>
      <ProjectDetail project={project} />
    </PageShell>
  );
}
