export type SocialPlatform = "x" | "linkedin" | "email";

export type SocialLinkData = {
  platform: SocialPlatform;
  href: string;
  label: string;
};

/**
 * Social/contact links rendered as icon buttons in the top-right corner.
 * Replace the placeholder hrefs with real profile URLs when ready.
 */
export const socialLinks: SocialLinkData[] = [
  { platform: "x", href: "https://x.com/that_mj_w", label: "X (Twitter)" },
  {
    platform: "linkedin",
    href: "https://www.linkedin.com/in/myeongjin-wang-8034ab259/",
    label: "LinkedIn",
  },
  { platform: "email", href: "mailto:#", label: "Email" },
];
