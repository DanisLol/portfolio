import AboutCarousel from "../components/about/AboutCarousel";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream pl-[140px] pr-[72px] pt-24 text-foreground max-md:pl-6 max-md:pr-6 max-md:pt-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 pb-20 lg:grid lg:grid-cols-[minmax(280px,0.78fr)_minmax(420px,1.22fr)] lg:items-center lg:gap-20">
        <section className="max-w-xl">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-accent-pink">About / selected frames</p>
          <h1 className="max-w-lg font-geneva text-5xl font-bold leading-[0.98] tracking-[-0.07em] sm:text-7xl">A little context behind the work.</h1>
          <p className="mt-8 max-w-md font-geneva text-base leading-7 text-foreground/70 sm:text-lg">
            I&apos;m a designer and developer interested in the space where useful things become memorable. This is a small collection of places, textures, and details I keep coming back to.
          </p>
          <div className="mt-12 max-w-md border border-accent-pink px-5 py-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-pink">Currently listening</p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <p className="font-geneva text-xl font-bold">Nurture</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55">Porter Robinson · 2021</p>
            </div>
            <div className="mt-4 h-px w-full bg-foreground/15">
              <div className="h-px w-[42%] bg-accent-pink" />
            </div>
          </div>
        </section>
        <AboutCarousel />
      </div>
    </main>
  );
}
