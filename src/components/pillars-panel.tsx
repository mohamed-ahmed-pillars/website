"use client";

import { motion } from "motion/react";
import {
  BotIcon,
  BoxesIcon,
  CloudIcon,
  CodeIcon,
  ServerIcon,
} from "lucide-react";

export type Pillar = {
  name: string;
  items: string[];
};

const icons = [CloudIcon, BoxesIcon, CodeIcon, ServerIcon, BotIcon];

export function PillarsPanel({ pillars }: { pillars: Pillar[] }) {
  const totalServices = pillars.reduce((n, p) => n + p.items.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="overflow-hidden rounded-lg border bg-background shadow-[0_0_32px_rgba(255,255,255,0.08)]"
    >
      <div className="flex items-center justify-between border-b px-6 py-4">
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-foreground/80">
          Your Technology Pillars
        </p>
        <p className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-primary">
          <span className="animate-pulse">●</span> Live
        </p>
      </div>

      <ul>
        {pillars.map((pillar, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.li
              key={pillar.name}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.12, ease: "easeOut" }}
              className="flex items-center gap-5 border-b px-6 py-5"
            >
              <span className="font-mono text-xs text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-medium text-foreground">
                  {pillar.name}
                </p>
                <p className="mt-1.5 font-mono text-xs font-bold leading-5 text-foreground/75">
                  {pillar.items.join(" · ")}
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.4 + i * 0.12,
                  ease: "easeOut",
                }}
                className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-gradient-to-b from-[#1c1c1c] to-[#0c0c0c] shadow-[0_0_18px_-6px_var(--primary)]"
              >
                <Icon className="size-5 text-primary" strokeWidth={1.5} />
              </motion.div>
            </motion.li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between px-6 py-3">
        <p className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-foreground/75">
          <span className="animate-pulse text-primary">●</span>
          {pillars.length} pillars active
        </p>
        <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-foreground/75">
          {totalServices} services monitored
        </p>
      </div>
    </motion.div>
  );
}
