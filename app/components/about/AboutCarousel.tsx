"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1000&q=85",
    alt: "Sunlit concrete architecture with strong geometric shadows",
    title: "Concrete poetry",
    detail: "Lisbon · 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
    alt: "A winding road through a sunlit mountain landscape",
    title: "Take the long way",
    detail: "Dolomites · 2023",
  },
  {
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1000&q=85",
    alt: "Misty evergreen forest with a narrow path",
    title: "A quiet reset",
    detail: "Olympic · 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=85",
    alt: "Modern building facade in warm afternoon light",
    title: "Made of details",
    detail: "Copenhagen · 2022",
  },
];

export default function AboutCarousel() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  const goTo = (index: number) => {
    setActive((index + slides.length) % slides.length);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goTo(active + 1);
      if (event.key === "ArrowLeft") goTo(active - 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <section aria-label="Image carousel" className="flex w-full flex-col gap-6">
      <div className="relative mx-auto flex aspect-square w-full max-w-[540px] items-center justify-center sm:aspect-[1.08/1]">
        <div className="record record-back" aria-hidden="true">
          <div className="record-grooves" />
          <div className="record-label record-label-back" />
          <div className="record-hole" />
        </div>
        <div className="record record-front" aria-live="polite">
          <div className="record-grooves" />
          <div className="record-artwork">
            <img src={slide.image} alt={slide.alt} />
          </div>
          <div className="record-label">
            <span>side {String.fromCharCode(65 + active)}</span>
          </div>
          <div className="record-hole" />
        </div>
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/45">
          frame {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      <div className="flex items-end justify-between gap-4 border-t border-foreground/20 pt-4">
        <div>
          <p className="font-geneva text-lg font-bold tracking-tight">{slide.title}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55">{slide.detail}</p>
        </div>
        <div className="flex items-center gap-2" aria-label="Choose image">
          {slides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Show ${item.title}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goTo(index)}
              className={`size-2.5 rounded-full border border-foreground transition-colors ${index === active ? "bg-accent-pink" : "bg-transparent"}`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={() => goTo(active - 1)} className="carousel-button" aria-label="Previous image">←</button>
        <button type="button" onClick={() => goTo(active + 1)} className="carousel-button" aria-label="Next image">→</button>
      </div>
    </section>
  );
}
