import type { Metadata } from "next";
import AnimateText from "@/app/components/AnimateText";
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
      <h1 className="font-danhand text-[72px] leading-[0.95] text-black">
        <AnimateText text="Experience" />
      </h1>
      <div className="mt-24 flex max-w-[880px] flex-col gap-24">
        {experienceEntries.map((entry) => (
          <ExperienceRow key={entry.title} entry={entry} />
        ))}
      </div>
    </PageShell>
  );
}
