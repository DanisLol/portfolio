import { cn } from "@/utils/utils";

type ImagePlaceholderProps = {
  label: string;
  className?: string;
};

/**
 * Grey image slot with a small caps label in the bottom-left corner.
 */
export default function ImagePlaceholder({
  label,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-end overflow-hidden bg-card-gray p-4",
        className,
      )}
    >
      <span className="font-roboto text-xs font-bold tracking-[0.96px] text-[#666]">
        {label}
      </span>
    </div>
  );
}
