import Link from "next/link";

type PrimaryButtonProps = {
  href: string;
  children: string;
  external?: boolean;
};

/**
 * Pink filled button used for primary calls to action.
 */
export default function PrimaryButton({
  href,
  children,
  external,
}: PrimaryButtonProps) {
  const className =
    "inline-flex items-center justify-center rounded-lg bg-accent-pink px-[57px] py-[14px] font-roboto text-base font-bold uppercase text-black transition-opacity hover:opacity-90";
  const isInternal = href.startsWith("/") && !href.startsWith("//");

  if (external || !isInternal) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
