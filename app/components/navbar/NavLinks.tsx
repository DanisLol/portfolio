"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/navigation";
import { cn } from "@/utils/utils";

/**
 * True when the current route belongs to this nav item, including nested
 * project case-study URLs under /projects.
 */
function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Vertical primary navigation fixed to the left edge of the viewport.
 * Highlights the link matching the current route.
 */
export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 z-40 flex h-screen w-[100px] flex-col items-center justify-center gap-[25px] font-geneva text-[16px] text-nav-pink">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-center transition-opacity hover:opacity-70",
            isActivePath(pathname, item.href) && "underline"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
