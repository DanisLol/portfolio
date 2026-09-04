import type { Metadata } from "next";
import PageHeader from "@/app/components/PageHeader";
import PageShell from "@/app/components/PageShell";
import PrimaryButton from "@/app/components/PrimaryButton";
import Shelves from "@/app/components/reads/Shelves";
import { goodreadsHref } from "@/data/reads";

export const metadata: Metadata = {
  title: "Reads",
};

/**
 * Current reading list as a pair of decorative bookshelves.
 */
export default function ReadsPage() {
  return (
    <PageShell>
      <PageHeader
        title="Reads"
        subtitle="What I am reading right now. Hover a spine."
      />
      <div className="mt-24">
        <Shelves />
      </div>
      <div className="mt-14">
        <PrimaryButton href={goodreadsHref} external>
          Connect on Goodreads!
        </PrimaryButton>
      </div>
    </PageShell>
  );
}
