"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=88",
    alt: "Sunlit concrete architecture with strong geometric shadows",
    title: "Concrete poetry",
    detail: "Lisbon · 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=88",
    alt: "A winding road through a sunlit mountain landscape",
    title: "Take the long way",
    detail: "Dolomites · 2023",
  },
  {
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=88",
    alt: "Misty evergreen forest with a narrow path",
    title: "A quiet reset",
    detail: "Olympic · 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=88",
    alt: "Modern building facade in warm afternoon light",
    title: "Made of details",
    detail: "Copenhagen · 2022",
  },
  {
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=88",
    alt: "Snowy mountain peaks beneath a deep blue sky",
    title: "Out past familiar",
    detail: "Iceland · 2021",
  },
];

function wrap(index: number) {
  return (index + slides.length) % slides.length;
}

export default function AboutCarousel() {
  const [active, setActive] = useState(2);
  const [direction, setDirection] = useState<1 | -1>(1);

  const goTo = useCallback((index: number) => {
    setActive((current) => {
      const next = wrap(index);
      setDirection(next > current || (current === slides.length - 1 && next === 0) ? 1 : -1);
      return next;
    });
  }, []);

  const visibleSlides = useMemo(() =>
    [-2, -1, 0, 1, 2].map((offset) => ({
      offset,
      slide: slides[wrap(active + offset)],
    })), [active]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goTo(active + 1);
      if (event.key === "ArrowLeft") goTo(active - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, goTo]);

  return (
    <section aria-label="Image carousel" className="about-carousel">
      <div className="carousel-stage" aria-live="polite">
        {visibleSlides.map(({ offset, slide }) => (
          <button
            key={`${slide.title}-${offset}`}
            type="button"
            className={`carousel-card carousel-card-${offset === 0 ? "active" : Math.abs(offset)}`}
            data-direction={direction}
            aria-label={offset === 0 ? `Current image: ${slide.title}` : `Show ${slide.title}`}
            aria-current={offset === 0 ? "true" : undefined}
            onClick={() => goTo(active + offset)}
          >
            <img src={slide.image} alt={slide.alt} />
            <span className="carousel-card-shine" aria-hidden="true" />
          </button>
        ))}
        <div className="carousel-floor" aria-hidden="true" />
      </div>

      <div className="carousel-controls">
        <button type="button" onClick={() => goTo(active - 1)} className="carousel-arrow" aria-label="Previous image">←</button>
        <div className="carousel-caption">
          <p>{slides[active].title}</p>
          <span>{slides[active].detail}</span>
        </div>
        <button type="button" onClick={() => goTo(active + 1)} className="carousel-arrow" aria-label="Next image">→</button>
      </div>

      <div className="carousel-dots" aria-label="Choose image">
        {slides.map((slide, index) => (
          <button key={slide.title} type="button" aria-label={`Show ${slide.title}`} aria-current={index === active ? "true" : undefined} onClick={() => goTo(index)}>
            <span />
          </button>
        ))}
      </div>
    </section>
  );
}
