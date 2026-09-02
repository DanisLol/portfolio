import Link from "next/link";

/**
 * "MJ" wordmark shown in the top-left corner of every page. Links back to
 * the homepage.
 */
export default function Logo() {
  return (
    <Link
      href="/"
      className="fixed left-[140px] top-10 z-40 font-geneva text-[32px] uppercase text-black"
    >
      MJ
    </Link>
  );
}
