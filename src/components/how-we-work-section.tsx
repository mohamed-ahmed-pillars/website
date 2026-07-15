"use client";

import { useState } from "react";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CloudIcon,
  CloudUploadIcon,
  FileCode2Icon,
  GaugeIcon,
  TrendingDownIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const USE_CASES = [
  {
    id: "docs",
    Icon: BookOpenIcon,
    title: "Project Documentation",
    tagline: "Docs delivered with every project, never stale",
    heading: "Documentation that outlives the handover",
    body: "Every project ships with architecture diagrams, runbooks, and admin guides written by the engineers who built it. Docs live next to the code and are updated with every change, so your team always knows how the system works and what to do when it does not.",
    log: [
      "Generating architecture diagrams...",
      "Runbooks written for 12 services",
      "Admin and user guides exported to your wiki",
      "Docs updated with release v2.4",
      "New engineer onboarded in 2 days, not 2 months",
    ],
  },
  {
    id: "iac",
    Icon: FileCode2Icon,
    title: "Infrastructure as Code",
    tagline: "Your whole estate versioned, reviewed, and repeatable",
    heading: "Environments you can rebuild in one command",
    body: "We declare your clouds, networks, and servers as code. Every change is reviewed and applied through pipelines, so nothing drifts and nothing is undocumented. A new environment, a new region, or a full disaster rebuild is a plan and an apply away.",
    log: [
      "Planning changes for production estate...",
      "42 resources checked, 3 to change, 0 to destroy",
      "Change reviewed and approved by 2 engineers",
      "Applied in 2m 14s with zero downtime",
      "Drift check: clean, estate matches code",
    ],
  },
  {
    id: "cost",
    Icon: TrendingDownIcon,
    title: "Cost Optimization",
    tagline: "Cut cloud waste with expert right-sizing",
    heading: "Pay for what you use, not what you forgot",
    body: "Our engineers audit your estate for idle resources, oversized instances, and missed savings plans. We right-size, reserve, and re-architect where it pays off, then keep watching every month so the bill stays down as you grow.",
    log: [
      "Scanning 214 resources across 3 clouds...",
      "Found 18 idle instances and 32 oversized",
      "Right-sizing plan applied, 12 reservations bought",
      "Next cost review scheduled automatically",
      "Projected monthly savings: 31%",
    ],
  },
  {
    id: "performance",
    Icon: GaugeIcon,
    title: "Performance Tuning",
    tagline: "Faster apps and queries with expert profiling",
    heading: "Find the slow path and remove it",
    body: "We profile your applications, databases, and networks to find what is actually slow, then fix it at the source. Caching, indexing, query rewrites, and architecture changes backed by measurements, not guesses.",
    log: [
      "Profiling API under production load...",
      "Slow query found: orders report, 4.2s",
      "Index added and query rewritten: 90ms",
      "Cache layer enabled for catalog reads",
      "p95 latency down from 1.8s to 210ms",
    ],
  },
  {
    id: "migration",
    Icon: CloudUploadIcon,
    title: "Cloud Migration",
    tagline: "Move workloads between clouds or from on-prem",
    heading: "Migrate without the weekend outage",
    body: "We plan, rehearse, and execute migrations from on-premises to cloud, or between providers, with rollback ready at every step. Data moves encrypted, cutover happens in minutes, and your users never notice.",
    log: [
      "Assessment complete: 23 workloads mapped",
      "Rehearsal migration passed in staging",
      "Data synced: 1.8 TB, checksums verified",
      "Old environment decommissioned",
      "Cutover window: 14 minutes, users unaffected",
    ],
  },
  {
    id: "incidents",
    Icon: TriangleAlertIcon,
    title: "Incident Response",
    tagline: "We see incidents before your users do",
    heading: "Minutes to answers, not hours to blame",
    body: "Monitoring pages our engineers the moment something degrades. We triage, find the root cause, fix it, and send you a clear report of what happened and what we changed so it does not happen again.",
    log: [
      "Alert: checkout latency above threshold",
      "Engineer paged and responding in 3 minutes",
      "Root cause: connection pool exhaustion",
      "Fix deployed, latency back to normal",
      "Post-incident report delivered next morning",
    ],
  },
];

export function HowWeWorkSection() {
  const [activeId, setActiveId] = useState(USE_CASES[0].id);
  const active = USE_CASES.find((u) => u.id === activeId) ?? USE_CASES[0];

  return (
    <section className="flex min-h-svh items-center bg-[#0a0a0a] px-6 py-24 lg:px-16">
      <div className="mx-auto w-full max-w-[1500px] border-t border-border pt-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-widest text-foreground/80">
            <span className="size-1.5 rounded-full bg-primary" />
            How we work
          </p>
          <h2 className="mt-6 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Your Technology Pillars can run 24/7
          </h2>
          <p className="mt-5 max-w-[38ch] font-mono text-sm leading-6 text-muted-foreground">
            We handle the engineering work that slows your team down. Every
            practice below comes standard with every project.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 font-mono text-xs text-muted-foreground">
            <CloudIcon className="size-3.5 shrink-0 text-primary/80" strokeWidth={1.5} />
            Cloud agnostic - the right platform for each workload, for speed,
            cost, and reliability
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 grid overflow-hidden rounded-lg border border-border lg:grid-cols-[360px_1fr]"
        >
          {/* Tab list */}
          <div className="flex flex-col border-b border-border lg:border-b-0 lg:border-r">
            {USE_CASES.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => setActiveId(u.id)}
                className={cn(
                  "flex items-start gap-3 border-b border-l-2 border-border px-5 py-4 text-left transition-colors last:border-b-0",
                  u.id === activeId
                    ? "border-l-primary bg-primary/10"
                    : "border-l-transparent hover:bg-white/[0.03]",
                )}
              >
                <u.Icon
                  strokeWidth={1.5}
                  className={cn(
                    "mt-0.5 size-4 shrink-0",
                    u.id === activeId ? "text-primary" : "text-muted-foreground",
                  )}
                />
                <span>
                  <span className="block font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                    {u.title}
                  </span>
                  <span className="mt-1 block font-mono text-xs leading-5 text-muted-foreground">
                    {u.tagline}
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {active.title}
                </p>
                <h3 className="mt-4 max-w-xl text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                  {active.heading}
                </h3>
                <p className="mt-5 max-w-2xl font-mono text-sm leading-7 text-muted-foreground">
                  {active.body}
                </p>

                <div className="mt-8 rounded-lg border border-border bg-black px-5 py-4 sm:px-6 sm:py-5">
                  {active.log.map((line, i) => (
                    <motion.p
                      key={line}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25, delay: 0.15 + i * 0.1 }}
                      className={cn(
                        "flex gap-2.5 py-1 font-mono text-xs sm:text-sm",
                        i === active.log.length - 1
                          ? "font-bold text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      <span className="text-muted-foreground/50">&rsaquo;</span>
                      {line}
                    </motion.p>
                  ))}
                </div>

                <a
                  href="#"
                  className="mt-8 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:text-primary/80"
                >
                  Learn more
                  <ArrowRightIcon className="size-3.5" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
