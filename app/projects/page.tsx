import type { Metadata } from "next";
import BentoGrid from "@/app/components/home/BentoGrid";
import PageHeader from "@/app/components/PageHeader";
import PageShell from "@/app/components/PageShell";

export const metadata: Metadata = {
  title: "Projects",
};

/**
 * Project listing used by the sidebar Projects link.
 */
export default function ProjectsPage() {
  return (
    <PageShell>
      <PageHeader title="Projects" />
      <div className="mt-24">
        <BentoGrid showHeading={false} />
      </div>
    </PageShell>
  );
}
