import Hero from "./components/home/Hero";
import BentoGrid from "./components/home/BentoGrid";
import Footer from "./components/home/Footer";

/**
 * Homepage: hero introduction, bento grid of featured work, and a footer
 * call-to-action.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-cream">
      <div className="flex-1 pl-[140px] pr-[72px] pt-24">
        <Hero />
        <div className="mt-24">
          <BentoGrid />
        </div>
      </div>
      <Footer />
    </main>
  );
}
