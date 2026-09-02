export type NavItem = {
  label: string;
  href: string;
};

/**
 * Primary site navigation links rendered in the vertical sidebar nav.
 */
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Reads", href: "/reads" },
  { label: "About", href: "/about" },
];
