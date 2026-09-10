export type NavItem = {
  label: string;
  href: string;
};

/**
 * Primary site navigation links rendered in the vertical sidebar nav.
 */
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Shelf", href: "/shelf" },
  { label: "About", href: "/about" },
];
