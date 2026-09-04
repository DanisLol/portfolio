import { shelves } from "@/data/reads";
import type { BookSpine } from "@/data/reads";

type SpineProps = {
  spine: BookSpine;
};

/**
 * Single pink book spine. Lifts slightly on hover as hinted in the design.
 */
function Spine({ spine }: SpineProps) {
  return (
    <div
      className="rounded-[2px] bg-accent-pink transition-transform duration-200 hover:-translate-y-1"
      style={{ width: spine.width, height: spine.height }}
    />
  );
}

/**
 * Two brown rails of book spines for the Reads page.
 */
export default function Shelves() {
  return (
    <div className="flex w-full max-w-[1000px] flex-col gap-14">
      {shelves.map((shelf, shelfIndex) => (
        <div key={shelfIndex} className="flex flex-col">
          <div
            className="flex items-end gap-3.5 pl-6"
            style={{
              height: Math.max(...shelf.spines.map((spine) => spine.height)) + 20,
            }}
          >
            {shelf.spines.map((spine, spineIndex) => (
              <Spine key={spineIndex} spine={spine} />
            ))}
          </div>
          <div className="h-4 w-full rounded-[2px] bg-footer-brown" />
        </div>
      ))}
    </div>
  );
}
