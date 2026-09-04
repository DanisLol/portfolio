import type { Metadata } from "next";
import ImagePlaceholder from "@/app/components/ImagePlaceholder";
import PageHeader from "@/app/components/PageHeader";
import PageShell from "@/app/components/PageShell";
import TextLink from "@/app/components/TextLink";
import { socialLinks } from "@/data/social";

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
      <PageHeader
        title="About"
        subtitle="Myeongjin Wang, and everyone calls me MJ."
      />
      <div className="mt-24 flex flex-col gap-20 lg:flex-row lg:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <p className="max-w-[640px] font-sf text-base leading-[1.55] text-black">
            I study computer science at the University of Toronto, specializing
            in technology leadership and human-computer interaction. The work I
            like sits between deciding what to build and getting it in front of
            people.
          </p>
          <p className="max-w-[640px] font-sf text-base leading-[1.55] text-black">
            Outside of that I read, I run, and I watch Broadway musicals.
          </p>
          <div className="flex gap-6">
            <TextLink href={socialHref("email")}>EMAIL</TextLink>
            <TextLink href={socialHref("linkedin")} external>
              LINKEDIN
            </TextLink>
          </div>
        </div>
        <ImagePlaceholder
          label="PHOTO — TO DECIDE"
          className="h-[420px] w-full flex-1 rounded-3xl p-5"
        />
      </div>
    </PageShell>
  );
}
