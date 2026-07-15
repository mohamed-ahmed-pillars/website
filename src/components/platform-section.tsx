"use client";

import { motion } from "motion/react";
import { CheckIcon } from "lucide-react";

const RADAR_AXES = ["AWS", "AZURE", "GCP", "HUAWEI", "ON-PREM", "TP CLOUD"];

const CX = 120;
const CY = 110;
const R = 72;

function radarXY(axis: number, f: number) {
  const angle = ((axis * 60 - 90) * Math.PI) / 180;
  return {
    x: +(CX + f * R * Math.cos(angle)).toFixed(2),
    y: +(CY + f * R * Math.sin(angle)).toFixed(2),
  };
}

function radarPoint(axis: number, f: number) {
  const { x, y } = radarXY(axis, f);
  return `${x},${y}`;
}

function radarPolygon(values: number[]) {
  return values.map((v, i) => radarPoint(i, v)).join(" ");
}

const RINGS = [1, 0.66, 0.33].map((f) =>
  RADAR_AXES.map((_, i) => radarPoint(i, f)).join(" "),
);

const PROVIDER_A = radarPolygon([0.55, 0.7, 0.45, 0.6, 0.5, 0.65]);
const PROVIDER_B = radarPolygon([0.7, 0.5, 0.65, 0.45, 0.6, 0.5]);
const MULTI_VALUES = [0.9, 0.9, 0.9, 0.9, 0.9, 0.9];
const MULTI_CLOUD = radarPolygon(MULTI_VALUES);

const environments = [
  { title: "Public Cloud", desc: "AWS, Azure, GCP, Huawei Cloud" },
  { title: "Private Cloud", desc: "Your own dedicated cloud" },
  { title: "Multi-Cloud", desc: "One estate across providers" },
  { title: "On-Prem", desc: "Entirely in your data center" },
  { title: "Hybrid", desc: "Cloud and on-prem, connected" },
];

const CYCLE_NODES = [
  "PLAN",
  "PROVISION",
  "DEPLOY",
  "MONITOR",
  "ALERT",
  "PATCH",
  "SCALE",
  "BACKUP",
];

const CYCLE_R = 138;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export function PlatformSection() {
  return (
    <section className="flex min-h-svh items-center bg-black px-6 py-24 lg:px-16">
      <div className="mx-auto w-full max-w-[1900px]">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl"
        >
          Defining your Technology Pillars
        </motion.h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* 01 - Platform Independence (radar) */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex min-h-[480px] flex-col rounded-xl border bg-card p-8"
          >
            <p className="font-mono text-xs text-primary">01</p>
            <h3 className="mt-2 text-xl font-medium text-foreground">
              Platform Independence
            </h3>
            <svg viewBox="0 0 240 220" className="mx-auto my-auto mt-6 w-full max-w-[400px]">
              {RINGS.map((points, i) => (
                <polygon
                  key={i}
                  points={points}
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
              ))}
              {RADAR_AXES.map((_, i) => (
                <line
                  key={i}
                  x1={CX}
                  y1={CY}
                  x2={radarPoint(i, 1).split(",")[0]}
                  y2={radarPoint(i, 1).split(",")[1]}
                  stroke="var(--border)"
                  strokeWidth="0.5"
                />
              ))}
              <motion.polygon
                points={PROVIDER_A}
                fill="rgba(255, 255, 255, 0.09)"
                stroke="var(--chart-3)"
                strokeOpacity="0.8"
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
              <motion.polygon
                points={PROVIDER_B}
                fill="rgba(255, 255, 255, 0.09)"
                stroke="var(--chart-3)"
                strokeOpacity="0.8"
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
              <motion.g
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6 }}
                style={{
                  transformOrigin: `${CX}px ${CY}px`,
                  transformBox: "view-box",
                }}
              >
                <polygon
                  points={MULTI_CLOUD}
                  fill="var(--accent)"
                  fillOpacity="0.3"
                />
                <motion.polygon
                  points={MULTI_CLOUD}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeDasharray="3 4"
                  animate={{ strokeDashoffset: [0, -21] }}
                  transition={{
                    duration: 1.4,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                />
              </motion.g>
              {MULTI_VALUES.map((v, i) => {
                const { x, y } = radarXY(i, v);
                return (
                  <motion.circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="3"
                    fill="var(--primary)"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.8 + i * 0.08,
                    }}
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  />
                );
              })}
              {RADAR_AXES.map((label, i) => {
                // Anchor by side so every label keeps the same gap to its
                // vertex: right-side labels grow rightward, left leftward.
                const layout = [
                  { anchor: "middle", f: 1.2 },
                  { anchor: "start", f: 1.1 },
                  { anchor: "start", f: 1.1 },
                  { anchor: "middle", f: 1.2 },
                  { anchor: "end", f: 1.1 },
                  { anchor: "end", f: 1.1 },
                ][i] as { anchor: "middle" | "start" | "end"; f: number };
                const { x, y } = radarXY(i, layout.f);
                return (
                  <text
                    key={label}
                    x={x}
                    y={y}
                    textAnchor={layout.anchor}
                    dominantBaseline="middle"
                    fill="var(--muted-foreground)"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="var(--font-mono)"
                  >
                    {label}
                  </text>
                );
              })}
            </svg>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-mono text-xs uppercase tracking-wider text-foreground/75">
              <span>- Provider A</span>
              <span>- Provider B</span>
              <span className="text-primary">--- TP Multi-Cloud</span>
            </div>
          </motion.div>

          {/* 02 - Any Environment (checklist) */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex min-h-[480px] flex-col rounded-xl border bg-card p-8"
          >
            <p className="font-mono text-xs text-primary">02</p>
            <h3 className="mt-2 text-xl font-medium text-foreground">
              Any Environment
            </h3>
            <ul className="mt-4">
              {environments.map((env, i) => (
                <li
                  key={env.title}
                  className="flex items-center justify-between border-b py-4 last:border-b-0"
                >
                  <div>
                    <p className="text-base font-medium text-foreground">
                      {env.title}
                    </p>
                    <p className="mt-1 font-mono text-sm text-muted-foreground">
                      {env.desc}
                    </p>
                  </div>
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                      delay: 0.4 + i * 0.15,
                    }}
                  >
                    <CheckIcon className="size-4 text-primary" />
                  </motion.span>
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-6 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
              AWS · Azure · GCP · Huawei. We meet you where you are
            </p>
          </motion.div>

          {/* 03 - Operations Lifecycle (cycle) */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex min-h-[480px] flex-col rounded-xl border bg-card p-8"
          >
            <p className="font-mono text-xs text-primary">03</p>
            <h3 className="mt-2 text-xl font-medium text-foreground">
              Operations Lifecycle
            </h3>
            <div className="relative mx-auto my-auto mt-8 aspect-square w-full max-w-[360px]">
              <div
                aria-hidden
                className="absolute inset-[42px] rounded-full border border-dashed border-border"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-center font-mono text-[11px] font-bold uppercase leading-relaxed tracking-wider text-foreground">
                  Managed
                  <br />
                  24/7
                </p>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                className="absolute inset-0"
              >
              {CYCLE_NODES.map((node, i) => {
                const angle = ((i * 45 - 90) * Math.PI) / 180;
                const x = Math.cos(angle) * CYCLE_R;
                const y = Math.sin(angle) * CYCLE_R;
                return (
                  <motion.div
                    key={node}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.3 + i * 0.1,
                    }}
                    className="absolute flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/40 bg-background"
                    style={{
                      left: `calc(50% + ${x.toFixed(1)}px)`,
                      top: `calc(50% + ${y.toFixed(1)}px)`,
                    }}
                  >
                    <motion.span
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 60,
                        ease: "linear",
                        repeat: Infinity,
                      }}
                      className="font-mono text-[11px] font-bold uppercase tracking-wide text-foreground"
                    >
                      {node}
                    </motion.span>
                  </motion.div>
                );
              })}
              </motion.div>
            </div>
            <p className="mt-auto pt-6 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Not just delivery. Every stage strengthens every other.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-24 max-w-2xl text-center"
        >
          <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            One estate, every platform your business runs on.
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-mono text-base leading-7 text-muted-foreground">
            We connect multi-cloud and on-prem as one, and handle deployments,
            monitoring, and maintenance. End to end.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
