import type { Metadata } from "next";
import PageShell from "@/app/components/PageShell";

export const metadata: Metadata = {
  title: "Reads",
};

/**
 * Placeholder Reads page while the reading list is being rebuilt.
 */
export default function ReadsPage() {
  return (
    <PageShell className="flex items-center justify-center py-0">
      <p className="font-garamond text-[48px] leading-none text-black">
        coming soon
      </p>
    </PageShell>
  );
}
