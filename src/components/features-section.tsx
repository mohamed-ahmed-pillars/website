"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/* Isometric wireframe helpers. Standard projection:
   (x, y, z) -> (cx + (x - y) * 0.866, cy + (x + y) * 0.5 - z) */
function iso(
  x: number,
  y: number,
  z: number,
  cx: number,
  cy: number,
): [number, number] {
  return [
    +(cx + (x - y) * 0.866).toFixed(1),
    +(cy + (x + y) * 0.5 - z).toFixed(1),
  ];
}

function isoBox(
  cx: number,
  cy: number,
  w: number,
  d: number,
  h: number,
): string {
  const v: [number, number, number][] = [
    [-w / 2, -d / 2, 0],
    [w / 2, -d / 2, 0],
    [w / 2, d / 2, 0],
    [-w / 2, d / 2, 0],
    [-w / 2, -d / 2, h],
    [w / 2, -d / 2, h],
    [w / 2, d / 2, h],
    [-w / 2, d / 2, h],
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];
  return edges
    .map(([a, b]) => {
      const A = iso(...v[a], cx, cy);
      const B = iso(...v[b], cx, cy);
      return `M${A[0]} ${A[1]}L${B[0]} ${B[1]}`;
    })
    .join("");
}

function cylinder(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  h: number,
): string {
  return [
    `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0`,
    `M${cx - rx} ${cy}v${h}`,
    `M${cx + rx} ${cy}v${h}`,
    `M${cx - rx} ${cy + h}a${rx} ${ry} 0 0 0 ${rx * 2} 0`,
  ].join("");
}

const wire = {
  stroke: "white",
  strokeWidth: 1.3,
  fill: "none",
  strokeLinejoin: "round" as const,
};

function ArtCloudEstate() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <path {...wire} d={isoBox(130, 118, 46, 46, 38)} />
      <path {...wire} d={isoBox(76, 150, 28, 28, 22)} />
      <path {...wire} d={isoBox(184, 152, 34, 34, 12)} />
      <path {...wire} d={isoBox(152, 62, 18, 18, 14)} />
    </svg>
  );
}

function ArtErpStack() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <path {...wire} d={isoBox(130, 158, 64, 46, 14)} />
      <path {...wire} d={isoBox(130, 134, 54, 38, 14)} />
      <path {...wire} d={isoBox(130, 110, 44, 30, 14)} />
      <path {...wire} d={isoBox(130, 84, 18, 18, 14)} />
    </svg>
  );
}

function ArtMonitoring() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <path {...wire} d={isoBox(88, 158, 22, 22, 32)} />
      <path {...wire} d={isoBox(130, 166, 22, 22, 58)} />
      <path {...wire} d={isoBox(172, 174, 22, 22, 86)} />
      <path {...wire} d={isoBox(172, 66, 13, 13, 10)} />
    </svg>
  );
}

function ArtDeploy() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <path {...wire} d={isoBox(130, 172, 58, 58, 24)} />
      <path {...wire} d={isoBox(130, 78, 26, 26, 22)} />
      <path
        {...wire}
        strokeDasharray="4 5"
        d="M108 92 L108 136 M152 92 L152 136 M130 104 L130 148"
      />
    </svg>
  );
}

function ArtSecurity() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <path
        {...wire}
        d="M130 42 C152 60 176 66 194 66 C194 118 176 160 130 184 C84 160 66 118 66 66 C84 66 108 60 130 42 Z"
      />
      <path
        {...wire}
        d="M130 56 C148 70 168 76 182 76 C182 118 168 152 130 172 C92 152 78 118 78 76 C92 76 112 70 130 56 Z"
      />
      <circle {...wire} cx="130" cy="108" r="12" />
      <path {...wire} d="M124 118 L136 118 L132 140 L128 140 Z" />
    </svg>
  );
}

function ArtData() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <path {...wire} d={cylinder(130, 62, 48, 15, 34)} />
      <path {...wire} d={cylinder(130, 108, 48, 15, 34)} />
      <path {...wire} d={cylinder(130, 154, 48, 15, 34)} />
    </svg>
  );
}

const FEATURES = [
  {
    title: "One Estate, Many Clouds",
    desc: "AWS, Azure, GCP, Huawei, and your own hardware under one control plane. One inventory, one bill, one team to call.",
    Art: ArtCloudEstate,
  },
  {
    title: "ERP That Fits Your Flow",
    desc: "Odoo and TP POS shaped around how you actually operate. Sales, inventory, accounting, and HR in one system.",
    Art: ArtErpStack,
  },
  {
    title: "Monitored Around the Clock",
    desc: "Every service watched 24/7. We see incidents before your users do, and most are resolved before anyone notices.",
    Art: ArtMonitoring,
  },
  {
    title: "Deploy Without Drama",
    desc: "Pipelines, staged rollouts, and instant rollbacks. Ship on a Tuesday afternoon without holding your breath.",
    Art: ArtDeploy,
  },
  {
    title: "Secure and Private by Default",
    desc: "Hardened baselines, least-privilege access, and isolated environments. Air-gapped when your compliance demands it.",
    Art: ArtSecurity,
  },
  {
    title: "Data You Can Trust",
    desc: "Automated backups, tested restores, and disaster recovery drills. Your data survives anything, including us.",
    Art: ArtData,
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-black px-6 py-24 lg:px-16">
      <div className="mx-auto w-full max-w-[1350px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-mono text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Everything Built In
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-mono text-base font-bold leading-7 text-foreground/80">
            TP is not just a provider; it is your technology partner. Six ways
            we carry your estate from day one.
          </p>
        </motion.div>

        <div className="mt-14 grid border-2 border-dashed border-border lg:grid-cols-5">
          {FEATURES.map((f, i) => {
            const wide = [true, false, false, true, true, false][i];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.12 }}
                className={cn(
                  "flex flex-col border-b-2 border-dashed border-border",
                  wide ? "lg:col-span-3" : "lg:col-span-2",
                  i % 2 === 0 && "lg:border-r-2",
                  i >= 4 && "lg:border-b-0",
                  i === 5 && "border-b-0",
                )}
              >
                <div className="min-h-[168px] px-8 pb-6 pt-8">
                  <h3 className="font-mono text-xl font-bold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-3 max-w-xl font-mono text-sm font-bold leading-6 text-foreground/75">
                    {f.desc}
                  </p>
                </div>
                <div
                  className="flex h-[460px] items-center justify-center border-t border-dashed border-border bg-[linear-gradient(45deg,rgba(255,255,255,0.14)_12.5%,transparent_12.5%,transparent_50%,rgba(255,255,255,0.14)_50%,rgba(255,255,255,0.14)_62.5%,transparent_62.5%,transparent)] p-8"
                  style={{ backgroundSize: wide ? "10px 10px" : "6px 6px" }}
                >
                  <f.Art />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
