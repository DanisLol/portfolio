"use client";

import Image from "next/image";
import { AnimatePresence, motion, usePresenceData, wrap } from "motion/react";
import { forwardRef, SVGProps, useState } from "react";
import { aboutPhotos } from "@/data/about";

/**
 * About-page photo carousel with directional enter/exit animation.
 */
export default function UsePresenceData() {
  const [selectedItem, setSelectedItem] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  /**
   * Advances the carousel by one slide in the given direction.
   */
  function setSlide(newDirection: 1 | -1) {
    const nextItem = wrap(0, aboutPhotos.length, selectedItem + newDirection);
    setSelectedItem(nextItem);
    setDirection(newDirection);
  }

  const photo = aboutPhotos[selectedItem];

  return (
    <div className="relative flex shrink-0 items-center gap-2.5">
      <PrefetchedSlides />
      <motion.button
        initial={false}
        aria-label="Previous"
        className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-full bg-accent-pink text-black outline-offset-2"
        onClick={() => setSlide(-1)}
        whileFocus={{ outline: "2px solid var(--accent-pink)" }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft />
      </motion.button>
      <AnimatePresence custom={direction} initial={false} mode="popLayout">
        <Slide
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          priority={selectedItem === 0}
        />
      </AnimatePresence>
      <motion.button
        initial={false}
        aria-label="Next"
        className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-full bg-accent-pink text-black outline-offset-2"
        onClick={() => setSlide(1)}
        whileFocus={{ outline: "2px solid var(--accent-pink)" }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowRight />
      </motion.button>
    </div>
  );
}

type SlideProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

/**
 * Loads every carousel photo offscreen so slide changes hit the browser cache.
 */
function PrefetchedSlides() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute h-[350px] w-[350px] overflow-hidden opacity-0"
    >
      {aboutPhotos.map((photo) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt=""
          fill
          sizes="350px"
          unoptimized
        />
      ))}
    </div>
  );
}

/**
 * Single carousel frame that slides in and out using presence direction.
 */
const Slide = forwardRef(function Slide(
  { src, alt, priority = false }: SlideProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const direction = usePresenceData();
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          visualDuration: 0.3,
          bounce: 0.4,
        },
      }}
      exit={{ opacity: 0, x: direction * -50 }}
      className="relative h-[350px] w-[350px] overflow-hidden rounded-[10px] bg-card-gray"
    >
      {failed ? null : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="350px"
          priority={priority}
          unoptimized
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </motion.div>
  );
});

const iconsProps: SVGProps<SVGSVGElement> = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/**
 * Left-pointing chevron used by the previous-slide control.
 */
function ArrowLeft() {
  return (
    <svg {...iconsProps}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

/**
 * Right-pointing chevron used by the next-slide control.
 */
function ArrowRight() {
  return (
    <svg {...iconsProps}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
