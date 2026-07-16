"use client";

import {
  BotIcon,
  BoxesIcon,
  ClockIcon,
  CloudIcon,
  CodeIcon,
  ServerIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const ITEMS = [
  {
    Icon: CloudIcon,
    title: "Cloud Pillar",
    desc: "AWS, Azure, GCP, Huawei Cloud, and TP Public Cloud managed as one estate",
    compliance: [
      { name: "ISO 27001", featured: true },
      { name: "SOC 2" },
      { name: "GDPR" },
    ],
  },
  {
    Icon: BoxesIcon,
    title: "ERP Pillar",
    desc: "Odoo and TP POS implemented, customized, and supported end to end",
    compliance: [
      { name: "PCI DSS", featured: true },
      { name: "IFRS" },
      { name: "GDPR" },
    ],
  },
  {
    Icon: CodeIcon,
    title: "Software Pillar",
    desc: "Web applications, websites, and omni-channel customer service built to spec",
    compliance: [
      { name: "OWASP", featured: true },
      { name: "WCAG 2.1" },
      { name: "GDPR" },
    ],
  },
  {
    Icon: ServerIcon,
    title: "Infrastructure Pillar",
    desc: "On-premises, private cloud, and networking, air-gapped when compliance demands it",
    compliance: [
      { name: "ISO 27001", featured: true },
      { name: "ISO 22301" },
      { name: "PCI DSS" },
    ],
  },
  {
    Icon: BotIcon,
    title: "AI Pillar",
    desc: "AI agents and automation working on your data, under your policies",
    compliance: [
      { name: "ISO 42001", featured: true },
      { name: "GDPR" },
      { name: "SOC 2" },
    ],
  },
  {
    Icon: ClockIcon,
    title: "Managed 24/7",
    desc: "Monitoring, backups, and support around the clock from a single team",
    compliance: [
      { name: "ISO 20000", featured: true },
      { name: "SOC 2" },
      { name: "ISO 27001" },
    ],
  },
];

export function EnterpriseSection() {
  return (
    <section className="flex min-h-svh items-center bg-black px-6 py-24 lg:px-12">
      <div className="relative isolate mx-auto w-full max-w-[1700px] px-2 py-16 sm:px-8 lg:px-16 lg:py-24">
        {/* Faded panel: soft light at the top edge, dissolves into black at the sides and bottom. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_22%),radial-gradient(120%_150%_at_50%_0%,#141414_0%,#0a0a0a_55%,transparent_100%)]"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-widest text-foreground/80">
            <span className="size-1.5 rounded-full bg-primary" />
            Enterprise
          </p>
          <h2 className="mt-6 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Build for the enterprise from day one
          </h2>
          <p className="mt-4 max-w-2xl font-mono text-sm leading-6 text-muted-foreground">
            {"Security, compliance, and control aren't afterthoughts. Every pillar ships enterprise-ready."}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.1 }}
              className="rounded-2xl border border-border/70 bg-black/30 p-7 lg:p-8"
            >
              <div className="flex items-center gap-3.5">
                <item.Icon
                  strokeWidth={1.5}
                  className="size-6 shrink-0 text-foreground/80"
                />
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                  {item.title}
                </h3>
              </div>
              <p className="mt-6 max-w-md font-mono text-sm leading-6 text-muted-foreground">
                {item.desc}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.compliance.map((c) => (
                  <span
                    key={c.name}
                    className={cn(
                      "rounded-md border px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider",
                      c.featured
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border/70 bg-white/[0.03] text-muted-foreground",
                    )}
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
