import HoverPreview from "@/app/components/HoverPreview";

/**
 * Homepage introduction: name, role, interests, and internship status.
 * The UToronto mention keeps the existing hover-preview interaction.
 */
export default function Hero() {
  return (
    <section className="flex max-w-[560px] flex-col gap-6">
      <h1 className="font-garamond text-[72px] leading-[0.95] text-black">
        Myeongjin
      </h1>
      <div className="font-sf text-base leading-[1.55] text-black">
        CS (HCI) @{" "}
        <HoverPreview
          href="https://future.utoronto.ca/data-computer-science"
          className="text-accent-pink"
        >
          UToronto (Main Campus)
        </HoverPreview>
      </div>
      <p className="font-sf text-base text-muted">
        Seeking Winter 2027 Internships
      </p>
    </section>
  );
}
