type TagProps = {
  children: string;
};

/**
 * Compact uppercase chip used for tech stacks and skills.
 */
export default function Tag({ children }: TagProps) {
  return (
    <span className="rounded-xl bg-card-gray px-3 py-[7px] font-roboto text-xs font-bold tracking-[0.72px] text-black">
      {children}
    </span>
  );
}
