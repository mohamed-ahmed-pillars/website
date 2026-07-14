import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type BackgroundVariant = "glow" | "stripes";

const layerStyles: Record<BackgroundVariant, CSSProperties> = {
  glow: {
    backgroundImage:
      "radial-gradient(circle at center, #FFF991 0%, transparent 70%)",
    opacity: 0.6,
    mixBlendMode: "multiply",
  },
  stripes: {
    backgroundImage:
      "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255, 255, 255, 0.05) 2px, rgba(255, 255, 255, 0.05) 4px)",
  },
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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={layerStyles[variant]}
      />
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </div>
  );
}
