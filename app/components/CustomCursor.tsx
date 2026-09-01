"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Renders a pink dot that tracks the pointer and smoothly shrinks while a
 * pointer button is held. Requires `cursor: none` on the document.
 */
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useSpring(1, { stiffness: 600, damping: 38 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - 12);
      y.set(e.clientY - 12);
    };
    const shrink = () => scale.set(0.5);
    const grow = () => scale.set(1);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", shrink);
    window.addEventListener("pointerup", grow);
    window.addEventListener("pointercancel", grow);
    window.addEventListener("blur", grow);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", shrink);
      window.removeEventListener("pointerup", grow);
      window.removeEventListener("pointercancel", grow);
      window.removeEventListener("blur", grow);
    };
  }, [x, y, scale]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-6 w-6 rounded-full bg-pink-500"
      style={{ x, y, scale }}
    />
  );
}
