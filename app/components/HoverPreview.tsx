"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { steps } from "motion";
import { cn } from "@/utils/utils";

export type ImagePreviewMedia = {
  type: "image";
  src: string;
  alt: string;
};

export type VideoPreviewMedia = {
  type: "video";
  src: string;
  poster?: string;
};

export type HoverMedia = ImagePreviewMedia | VideoPreviewMedia;

export type HoverPreviewProps = {
  children: ReactNode;
  href?: string;
  media?: HoverMedia;
  className?: string;
};

const preloadedSources = new Set<string>();

const overlayTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  // mass: 0.65,
  mass: 1,
};

const sketchEase = [0.42, 0, 0.18, 1] as const;

/** How far the sketch stroke sits inside the measured preview box, in px. */
const SKETCH_INSET = 1.2;

/** Irregular offsets so the outline never settles into a loop you can clock. */
const SKETCH_JIGGLE_X = [0, 0.55, -0.4, 0.5, -0.65, 0.3, -0.25, 0.45, 0];
const SKETCH_JIGGLE_Y = [0, -0.45, 0.55, -0.3, 0.4, -0.6, 0.25, -0.35, 0];
const SKETCH_JIGGLE_ROTATE = [0, 0.16, -0.12, 0.2, -0.18, 0.1, -0.08, 0.14, 0];

/**
 * Resolves a possibly-relative href to an absolute URL the screenshot
 * service can fetch.
 */
function toAbsoluteHref(href: string): string {
  if (/^https?:\/\//i.test(href)) {
    return href;
  }
  if (typeof window === "undefined") {
    return href;
  }
  return new URL(href, window.location.origin).toString();
}

/**
 * Returns the hostname of an http(s) URL, or the original string if parsing fails.
 */
function hostnameFromHref(href: string): string {
  try {
    return new URL(toAbsoluteHref(href)).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

/**
 * Microlink screenshot URL for a destination page. Sites like U of T send
 * X-Frame-Options: SAMEORIGIN, so a live iframe would render blank.
 */
function pageScreenshotSrc(href: string): string {
  const endpoint = new URL("https://api.microlink.io/");
  endpoint.searchParams.set("url", toAbsoluteHref(href));
  endpoint.searchParams.set("screenshot", "true");
  endpoint.searchParams.set("meta", "false");
  endpoint.searchParams.set("embed", "screenshot.url");
  endpoint.searchParams.set("viewport.width", "1280");
  endpoint.searchParams.set("viewport.height", "800");
  return endpoint.toString();
}

/**
 * True when the href points at a same-origin App Router path rather than an
 * external URL.
 */
function isInternalHref(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * Warms the browser cache for the preview image, video, or linked-page
 * screenshot so later hovers do not wait on the network.
 */
function preloadPreview(media: HoverMedia | undefined, href?: string): void {
  if (media?.type === "video") {
    if (!preloadedSources.has(media.src)) {
      preloadedSources.add(media.src);
      const video = document.createElement("video");
      video.preload = "auto";
      video.src = media.src;
    }
    if (media.poster && !preloadedSources.has(media.poster)) {
      preloadedSources.add(media.poster);
      const poster = new window.Image();
      poster.src = media.poster;
    }
    return;
  }

  const src =
    media?.type === "image"
      ? media.src
      : href
        ? pageScreenshotSrc(href)
        : undefined;

  if (!src || preloadedSources.has(src)) {
    return;
  }
  preloadedSources.add(src);
  const image = new window.Image();
  image.src = src;
}

/**
 * Tracks whether the current pointer can hover, so touch devices never leave
 * a stuck overlay behind.
 */
function useCanHover(): boolean {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    const update = () => setCanHover(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return canHover;
}

/**
 * Measures an element's box so the sketch path can be drawn in pixels
 * and sit on the preview edges instead of stretching a 100×100 blob.
 */
function useElementSize<T extends HTMLElement>(): [
  RefObject<T | null>,
  { width: number; height: number },
] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const target = element;

    /**
     * Writes the element's current border box to state.
     */
    function measure() {
      setSize({
        width: target.offsetWidth,
        height: target.offsetHeight,
      });
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
}

/**
 * Closed, slightly wobbly rectangle in the preview's pixel space.
 * Control points stay within ~2px of each edge so the stroke hugs the media.
 */
function sketchFramePath(width: number, height: number): string {
  const l = SKETCH_INSET;
  const t = SKETCH_INSET;
  const r = width - SKETCH_INSET;
  const b = height - SKETCH_INSET;

  return [
    `M ${l + 0.3} ${t + 0.9}`,
    `C ${width * 0.24} ${t - 1.1}, ${width * 0.54} ${t + 1.4}, ${width * 0.8} ${t + 0.15}`,
    `C ${r - 0.1} ${t + 0.4}, ${r + 1.05} ${height * 0.2}, ${r - 0.25} ${height * 0.46}`,
    `C ${r + 1.15} ${height * 0.7}, ${r - 0.9} ${height * 0.88}, ${r - 0.35} ${b - 0.45}`,
    `C ${width * 0.76} ${b + 1.15}, ${width * 0.46} ${b - 1.05}, ${width * 0.2} ${b + 0.35}`,
    `C ${width * 0.07} ${b + 0.7}, ${l - 0.15} ${b - 0.25}, ${l + 0.4} ${b - 0.7}`,
    `C ${l - 1.1} ${height * 0.7}, ${l + 1.25} ${height * 0.42}, ${l - 0.2} ${height * 0.2}`,
    `C ${l + 0.7} ${height * 0.09}, ${l - 0.45} ${t + 3.4}, ${l + 0.3} ${t + 0.9}`,
    "Z",
  ].join(" ");
}

/**
 * Faint inner stroke along the top edge, matching the frame's wobble.
 */
function sketchHighlightPath(width: number): string {
  const t = SKETCH_INSET + 4;
  return `M ${SKETCH_INSET + 6} ${t} C ${width * 0.32} ${t - 1.8}, ${width * 0.62} ${t + 1.2}, ${width - SKETCH_INSET - 8} ${t + 0.4}`;
}

type PencilOutlineProps = {
  width: number;
  height: number;
  reduceMotion: boolean;
};

/**
 * Pencil frame drawn in pixel space to the measured preview size.
 * Motion traces the stroke, then the line keeps boiling and shaking in place.
 */
function PencilOutline({ width, height, reduceMotion }: PencilOutlineProps) {
  const rawId = useId();
  const filterId = `${rawId.replace(/:/g, "")}-pencil`;
  const framePath = sketchFramePath(width, height);
  const highlightPath = sketchHighlightPath(width);
  const filterRef = `url(#${filterId})`;

  const drawTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.62, ease: sketchEase };

  const secondPassTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.4, delay: 0.28, ease: sketchEase };

  const highlightTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.32, delay: 0.38, ease: sketchEase };

  const jiggleAnimate = reduceMotion
    ? undefined
    : {
        x: SKETCH_JIGGLE_X,
        y: SKETCH_JIGGLE_Y,
        rotate: SKETCH_JIGGLE_ROTATE,
      };

  const jiggleTransition = reduceMotion
    ? undefined
    : {
        x: { duration: 0.28, repeat: Infinity, ease: "linear" as const },
        y: { duration: 0.37, repeat: Infinity, ease: "linear" as const },
        rotate: { duration: 0.46, repeat: Infinity, ease: "linear" as const },
      };

  return (
    <motion.svg
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-visible"
      fill="none"
      height={height}
      width={width}
      viewBox={`0 0 ${width} ${height}`}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.08 }}
    >
      <defs>
        <filter
          id={filterId}
          x="-14%"
          y="-14%"
          width="128%"
          height="128%"
          filterUnits="objectBoundingBox"
        >
          <motion.feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            result="grain"
            seed={3}
            animate={
              reduceMotion ? undefined : { seed: [1, 2, 3, 4, 5, 6, 7, 8] }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 0.4,
                    repeat: Infinity,
                    ease: steps(7),
                  }
            }
          />
          <motion.feDisplacementMap
            in="SourceGraphic"
            in2="grain"
            xChannelSelector="R"
            yChannelSelector="G"
            animate={
              reduceMotion
                ? { scale: 1.05 }
                : { scale: [1.15, 1.9, 1.35, 2.15, 1.2, 1.75, 1.15] }
            }
            transition={
              reduceMotion
                ? undefined
                : { duration: 0.32, repeat: Infinity, ease: "linear" }
            }
          />
        </filter>
      </defs>
      <motion.g
        animate={jiggleAnimate}
        filter={filterRef}
        style={{ originX: 0.5, originY: 0.5 }}
        transition={jiggleTransition}
      >
        <motion.path
          d={framePath}
          stroke="#171717"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition}
        />
        <motion.path
          d={framePath}
          stroke="#171717"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.7"
          vectorEffect="non-scaling-stroke"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={secondPassTransition}
        />
        <motion.path
          d={highlightPath}
          stroke="#171717"
          strokeLinecap="round"
          strokeWidth="0.65"
          vectorEffect="non-scaling-stroke"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.28 }}
          transition={highlightTransition}
        />
      </motion.g>
    </motion.svg>
  );
}

/**
 * Still image that fills the preview frame.
 */
function ImageFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="relative block aspect-[3/2] w-56 overflow-hidden">
      <Image src={src} alt={alt} fill sizes="224px" className="object-cover" />
    </span>
  );
}

/**
 * Muted looping video that starts playback when mounted (hover open) and
 * pauses when the overlay unmounts.
 */
function VideoFrame({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    void video.play();
    return () => {
      video.pause();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      className="aspect-[3/2] w-56 object-cover"
    />
  );
}

/**
 * Scaled screenshot of a destination page, cropped from the top so the
 * site header stays visible inside the hover frame.
 */
function PageFrame({ href }: { href: string }) {
  return (
    <span className="relative block aspect-[16/10] w-48 overflow-hidden bg-card-gray">
      <Image
        src={pageScreenshotSrc(href)}
        alt={`Preview of ${hostnameFromHref(href)}`}
        fill
        unoptimized
        sizes="192px"
        className="object-cover object-top"
      />
    </span>
  );
}

/**
 * Inner content of the hover card: a custom image or video when supplied,
 * otherwise a screenshot of the linked page.
 */
function PreviewBody({ media, href }: { media?: HoverMedia; href?: string }) {
  if (media?.type === "image") {
    return <ImageFrame src={media.src} alt={media.alt} />;
  }

  if (media?.type === "video") {
    return <VideoFrame src={media.src} poster={media.poster} />;
  }

  if (href) {
    return <PageFrame href={href} />;
  }

  return null;
}

type PreviewCardProps = {
  media?: HoverMedia;
  href?: string;
  reduceMotion: boolean;
};

/**
 * Sizes the pencil sketch to the media box, clips the preview to that
 * path, and draws the outline on with Motion when the overlay mounts.
 */
function PreviewCard({ media, href, reduceMotion }: PreviewCardProps) {
  const [frameRef, size] = useElementSize<HTMLSpanElement>();
  const framePath =
    size.width > 0 && size.height > 0
      ? sketchFramePath(size.width, size.height)
      : undefined;

  return (
    <span className="relative inline-block overflow-visible">
      <motion.span
        ref={frameRef}
        className="relative block"
        style={framePath ? { clipPath: `path('${framePath}')` } : undefined}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.28, delay: 0.12, ease: sketchEase }
        }
      >
        <PreviewBody media={media} href={href} />
      </motion.span>
      {size.width > 0 && size.height > 0 ? (
        <PencilOutline
          width={size.width}
          height={size.height}
          reduceMotion={reduceMotion}
        />
      ) : null}
    </span>
  );
}

/**
 * Inline word or phrase that reveals a floating preview on hover and
 * keyboard focus. Linked text shows the destination page; pass media to
 * show a custom image or video instead. Disabled on devices that cannot hover.
 */
export default function HoverPreview({
  children,
  media,
  href,
  className,
}: HoverPreviewProps) {
  const canHover = useCanHover();
  const shouldReduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);

  const hasPreview = Boolean(media) || Boolean(href);
  const open = canHover && hasPreview && (hovered || keyboardFocused);
  const reduceMotion = shouldReduceMotion === true;

  const warmCache = useCallback(() => {
    preloadPreview(media, href);
  }, [media, href]);

  /**
   * Opens the overlay on pointer enter and starts media preload.
   */
  function handlePointerEnter() {
    warmCache();
    setHovered(true);
  }

  /**
   * Closes the overlay when the pointer leaves the trigger.
   */
  function handlePointerLeave() {
    setHovered(false);
  }

  /**
   * Opens the overlay for keyboard users who tab onto the trigger.
   */
  function handleFocus(event: FocusEvent<HTMLElement>) {
    if (event.currentTarget.matches(":focus-visible")) {
      warmCache();
      setKeyboardFocused(true);
    }
  }

  /**
   * Closes the overlay when keyboard focus leaves the trigger.
   */
  function handleBlur() {
    setKeyboardFocused(false);
  }

  const triggerClassName = cn(
    "underline decoration-dotted decoration-current underline-offset-[5px]",
    className,
  );

  const triggerProps = {
    className: triggerClassName,
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  const label = href ? (
    isInternalHref(href) ? (
      <Link href={href} {...triggerProps}>
        {children}
      </Link>
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...triggerProps}
      >
        {children}
      </a>
    )
  ) : (
    <span tabIndex={0} {...triggerProps}>
      {children}
    </span>
  );

  return (
    <span className="relative inline-block">
      {label}
      <AnimatePresence>
        {open ? (
          <motion.span
            key="hover-preview"
            aria-hidden
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={reduceMotion ? { duration: 0 } : overlayTransition}
            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1 block origin-bottom -translate-x-1/2 [@media(hover:none)]:hidden"
          >
            <PreviewCard
              media={media}
              href={href}
              reduceMotion={reduceMotion}
            />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}
