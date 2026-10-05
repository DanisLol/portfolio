import type { Metadata } from "next";
import AnimateText from "@/app/components/AnimateText";
import PageShell from "@/app/components/PageShell";
import PhotoCarousel from "@/app/components/about/PhotoCarousel";

export const metadata: Metadata = {
  title: "About",
};

/**
 * Short bio and a photo carousel.
 */
export default function AboutPage() {
  return (
    <PageShell>
      <h1 className="font-danhand text-[72px] leading-[0.95] text-black">
        <AnimateText text="About" />
      </h1>
      <div className="mt-24 grid max-w-[880px] grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-16">
        <div className="flex flex-col gap-6">
          <p className="font-sf text-base leading-[1.55] text-black">
            I study computer science at the University of Toronto, specializing
            in technology leadership and human-computer interaction.
          </p>
          <p className="font-sf text-base leading-[1.55] text-black">
            Outside of that I read, I run, and I watch Broadway musicals.
          </p>
        </div>
        <PhotoCarousel />
      </div>
    </PageShell>
  );
}
