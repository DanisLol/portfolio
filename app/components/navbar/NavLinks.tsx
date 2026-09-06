"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { navItems } from "@/data/navigation";
import { cn } from "@/utils/utils";

const MotionLink = motion.create(Link);

/**
 * True when the current route belongs to this nav item, including any nested
 * routes beneath it.
 */
function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Vertical primary navigation anchored near the top-left of the viewport,
 * inset so it does not sit in the extreme corner.
 */
export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed left-12 top-10 z-40 flex flex-col items-start gap-[25px] font-geneva text-[16px] text-nav-pink"
    >
      {navItems.map((item) => (
        <MotionLink
          key={item.href}
          href={item.href}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={cn(
            "inline-block text-left",
            isActivePath(pathname, item.href) && "underline",
          )}
        >
          {item.label}
        </MotionLink>
      ))}
    </nav>
  );
}
