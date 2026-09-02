import Link from "next/link";

/**
 * Bottom footer band with a "Guest Board" call-to-action button.
 */
export default function Footer() {
  return (
    <footer className="mt-32 ml-[100px] flex h-[230px] items-end justify-end bg-footer-brown pb-[18px] pr-[15px]">
      <Link
        href="/guest-board"
        className="rounded-lg bg-accent-pink px-[57px] py-[14px] font-roboto text-base font-bold uppercase text-black"
      >
        Guest Board
      </Link>
    </footer>
  );
}
