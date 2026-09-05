"use client";

import { useEffect, useId, useRef } from "react";
import Vara from "vara";

/** Vara JSON generated from DanHand-Regular.ttf */
const DANHAND_FONT_URL = "/fonts/DanHand.json";

const FONT_SIZE = 100;
const STROKE_WIDTH = 1.5;

/**
 * Reads the scale Vara applied to character groups from an SVG transform.
 */
function readVaraScale(svg: SVGSVGElement): number {
  const charGroup = svg.querySelector("g.outer g g");
  const transform = charGroup?.getAttribute("transform") ?? "";
  const match = transform.match(/scale\(([^)]+)\)/);
  return match ? Number(match[1]) : 1;
}

/**
 * Pads the SVG so stroke paint past getBBox (e.g. i/j dots) is not clipped.
 */
function padSvgForStroke(svg: SVGSVGElement, strokeWidth: number): void {
  const scale = readVaraScale(svg);
  const pad = (strokeWidth * scale) / 2;
  const currentHeight = Number(svg.getAttribute("height")) || 0;

  svg.setAttribute("height", String(currentHeight + pad * 2));
  svg.style.overflow = "visible";

  const outer = svg.querySelector("g.outer");
  if (outer) {
    const existing = outer.getAttribute("transform") ?? "translate(0,0)";
    outer.setAttribute("transform", `translate(0, ${pad}) ${existing}`);
  }
}

/**
 * Draws `text` with a Vara.js stroke animation using the Dan Hand typeface.
 */
export default function AnimateText({ text }: { text: string }) {
  const reactId = useId().replace(/:/g, "");
  const containerId = `vara-container-${reactId}`;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.replaceChildren();

    const vara = new Vara(`.${containerId}`, DANHAND_FONT_URL, [
      {
        text,
        fontSize: FONT_SIZE,
        strokeWidth: STROKE_WIDTH,
      },
    ]);

    vara.ready(() => {
      const svg = container.querySelector("svg");
      if (svg) {
        padSvgForStroke(svg, STROKE_WIDTH);
      }
    });

    return () => {
      container.replaceChildren();
    };
  }, [containerId, text]);

  return <div ref={containerRef} className={`${containerId} z-[20] overflow-visible`} />;
}
