import Hero from "./components/home/Hero";
import BentoGrid from "./components/home/BentoGrid";
import Footer from "./components/home/Footer";
import PageShell from "./components/PageShell";

/**
 * Homepage: hero introduction, project grid, and a footer call-to-action.
 */
export default function Home() {
  return (
    <PageShell footer={<Footer />} className="flex flex-col gap-32">
      <Hero />
      <BentoGrid />
    </PageShell>
  );
}
