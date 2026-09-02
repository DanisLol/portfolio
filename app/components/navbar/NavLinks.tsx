"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/navigation";
import { cn } from "@/utils/utils";

/**
 * Vertical primary navigation fixed to the left edge of the viewport.
 * Highlights the link matching the current route.
 */
export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 z-40 flex h-screen w-[100px] flex-col items-center justify-center gap-[25px] font-geneva text-[16px] text-nav-pink max-md:h-auto max-md:w-full max-md:flex-row max-md:justify-start max-md:gap-5 max-md:px-6 max-md:py-4 max-md:text-[13px]">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-center transition-opacity hover:opacity-70",
            pathname === item.href && "underline"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
