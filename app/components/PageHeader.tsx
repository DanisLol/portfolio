type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

/**
 * Inner-page masthead: large serif title with an optional muted subtitle.
 */
export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header>
      <h1 className="font-garamond text-[72px] leading-[0.95] text-black">
        {title}
      </h1>
      {subtitle ? (
        <p className="font-sf text-base text-muted">{subtitle}</p>
      ) : null}
    </header>
  );
}
