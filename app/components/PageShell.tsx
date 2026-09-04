import type { ReactNode } from "react";
import { cn } from "@/utils/utils";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
};

/**
 * Shared page chrome: cream canvas, left offset for the vertical nav, and
 * top padding that clears the social icons.
 */
export default function PageShell({
  children,
  className,
  footer,
}: PageShellProps) {
  return (
    <main className="flex min-h-screen flex-col bg-cream">
      <div
        className={cn(
          "flex-1 pl-[140px] pr-[72px] pt-24",
          footer ? undefined : "pb-32",
          className,
        )}
      >
        {children}
      </div>
      {footer}
    </main>
  );
}
