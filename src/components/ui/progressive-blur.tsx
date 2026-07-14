"use client";

import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

type ProgressiveBlurProps = {
  direction?: "left" | "right" | "top" | "bottom";
  blurLayers?: number;
  className?: string;
};

export function ProgressiveBlur({
  direction = "left",
  blurLayers = 8,
  className,
}: ProgressiveBlurProps) {
  const isHorizontal = direction === "left" || direction === "right";
  const isReverse = direction === "right" || direction === "bottom";

  const layers = Array.from({ length: blurLayers }, (_, index) => {
    const blur = Math.pow(2, index);
    const start = (index / blurLayers) * 100;
    const midStart = ((index + 0.5) / blurLayers) * 100;
    const midEnd = ((index + 1) / blurLayers) * 100;
    const end = ((index + 1.5) / blurLayers) * 100;

    const gradient = isHorizontal
      ? `linear-gradient(to ${isReverse ? "left" : "right"}, transparent ${start}%, black ${midStart}%, black ${midEnd}%, transparent ${end}%)`
      : `linear-gradient(to ${isReverse ? "top" : "bottom"}, transparent ${start}%, black ${midStart}%, black ${midEnd}%, transparent ${end}%)`;

    return (
      <div
        key={index}
        className="pointer-events-none absolute inset-0"
        style={
          {
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            maskImage: gradient,
            WebkitMaskImage: gradient,
          } as CSSProperties
        }
      />
    );
  });

  return (
    <div
      className={cn(
        "pointer-events-none absolute",
        isHorizontal ? "inset-y-0 w-[100px]" : "inset-x-0 h-[100px]",
        {
          "left-0": direction === "left",
          "right-0": direction === "right",
          "top-0": direction === "top",
          "bottom-0": direction === "bottom",
        },
        className,
      )}
    >
      {layers}
    </div>
  );
}
