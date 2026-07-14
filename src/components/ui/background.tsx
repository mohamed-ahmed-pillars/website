import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type BackgroundVariant = "glow" | "stripes" | "image";

const glowLayer: CSSProperties = {
  backgroundImage:
    "radial-gradient(circle at center, #FFF991 0%, transparent 70%)",
  opacity: 0.6,
  mixBlendMode: "multiply",
};

const stripesLayer: CSSProperties = {
  backgroundImage:
    "linear-gradient(45deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.05) 75%, transparent 75%, transparent)",
  backgroundSize: "6px 6px",
};

const imageLayer: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(/gradient-11.webp)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

// Layers render in order: first = bottom, last = top.
const layersByVariant: Record<BackgroundVariant, CSSProperties[]> = {
  glow: [glowLayer],
  stripes: [stripesLayer],
  image: [imageLayer, stripesLayer],
};

export function Background({
  variant = "glow",
  className,
  children,
}: {
  variant?: BackgroundVariant;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col bg-background",
        className,
      )}
    >
      {layersByVariant[variant].map((style, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={style}
        />
      ))}
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </div>
  );
}
