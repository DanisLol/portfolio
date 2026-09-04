type TextLinkProps = {
  href: string;
  children: string;
  external?: boolean;
};

/**
 * Underlined all-caps text link used for secondary actions like Email.
 */
export default function TextLink({ href, children, external }: TextLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex flex-col gap-0.5 transition-opacity hover:opacity-70"
    >
      <span className="font-roboto text-xs font-bold tracking-[0.96px] text-black">
        {children}
      </span>
      <span className="h-px w-full bg-black" />
    </a>
  );
}
