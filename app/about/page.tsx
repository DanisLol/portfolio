import type { Metadata } from "next";
import ImagePlaceholder from "@/app/components/ImagePlaceholder";
import PageHeader from "@/app/components/PageHeader";
import PageShell from "@/app/components/PageShell";
import TextLink from "@/app/components/TextLink";
import { socialLinks } from "@/data/social";
import UsePresenceData from "../components/UsePresenceData";

export const metadata: Metadata = {
  title: "About",
};

/**
 * Resolves a social platform href from the shared social links list.
 */
function socialHref(platform: "email" | "linkedin"): string {
  return socialLinks.find((link) => link.platform === platform)?.href ?? "#";
}

/**
 * Short bio, contact links, and a photo placeholder.
 */
export default function AboutPage() {
  return (
    <PageShell>
      <div className="mt-24 flex flex-col items-start gap-12 lg:flex-row lg:gap-8">
        <div className="flex max-w-[640px] flex-col gap-6">
          <p className="font-sf text-base leading-[1.55] text-black">
            I study computer science at the University of Toronto, specializing
            in technology leadership and human-computer interaction. The work I
            like sits between deciding what to build and getting it in front of
            people.
          </p>
          <p className="font-sf text-base leading-[1.55] text-black">
            Outside of that I read, I run, and I watch Broadway musicals.
          </p>
        </div>
        <UsePresenceData />
      </div>
    </PageShell>
  );
}
