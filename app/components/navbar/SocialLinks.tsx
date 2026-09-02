import { FaEnvelope, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { socialLinks, type SocialPlatform } from "@/data/social";

const platformIcons: Record<SocialPlatform, typeof FaXTwitter> = {
  x: FaXTwitter,
  linkedin: FaLinkedin,
  email: FaEnvelope,
};

/**
 * Row of social/contact icon links shown in the top-right corner of every
 * page. Icon glyphs come from react-icons since Figma only exported these
 * as a single flattened image.
 */
export default function SocialLinks() {
  return (
    <div className="fixed right-[72px] top-10 z-40 flex items-center gap-5 text-black">
      {socialLinks.map((social) => {
        const Icon = platformIcons[social.platform];
        return (
          <a
            key={social.platform}
            href={social.href}
            aria-label={social.label}
            target={social.platform === "email" ? undefined : "_blank"}
            rel={social.platform === "email" ? undefined : "noopener noreferrer"}
            className="transition-opacity hover:opacity-70"
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
}
