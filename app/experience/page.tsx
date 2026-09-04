import type { Metadata } from "next";
import PageHeader from "@/app/components/PageHeader";
import PageShell from "@/app/components/PageShell";
import ExperienceRow from "@/app/components/experience/ExperienceRow";

import { experienceEntries } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
};

/**
 * Education, leadership, and skills.
 */
export default function ExperiencePage() {
  return (
    <PageShell>
      <PageHeader title="Experience" />
      <div className="mt-24">
        {experienceEntries.map((entry) => (
          <ExperienceRow key={entry.title} entry={entry} />
        ))}
      </div>
    </PageShell>
  );
}
