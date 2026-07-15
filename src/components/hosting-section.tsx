"use client";

import {
  ArchiveRestoreIcon,
  ArrowRightIcon,
  BoxesIcon,
  Building2Icon,
  ContainerIcon,
  DatabaseIcon,
  GlobeIcon,
} from "lucide-react";
import { motion } from "motion/react";

const APPS = [
  {
    Icon: Building2Icon,
    title: "SAP",
    desc: "Enterprise SAP workloads on dedicated resources, sized, tuned, and monitored for production.",
  },
  {
    Icon: BoxesIcon,
    title: "Odoo",
    desc: "The same setup you get on Odoo.sh: staging branches, automatic backups, and one-click upgrades on our cloud.",
  },
  {
    Icon: GlobeIcon,
    title: "Websites & WordPress",
    desc: "WordPress and custom sites with CDN, SSL, and daily backups, managed end to end.",
  },
  {
    Icon: DatabaseIcon,
    title: "Databases & Migrations",
    desc: "Managed PostgreSQL, MySQL, and SQL Server with zero-downtime migrations from wherever you run today.",
  },
  {
    Icon: ContainerIcon,
    title: "Kubernetes",
    desc: "Managed K8s clusters with autoscaling, monitoring, and upgrades handled by our team.",
  },
  {
    Icon: ArchiveRestoreIcon,
    title: "Backup & DR",
    desc: "Custom backup plans and rehearsed disaster recovery. Restores are tested, not assumed.",
  },
];

export function HostingSection() {
  return (
    <section className="flex min-h-svh items-center bg-black px-6 py-24 lg:px-12">
      <div className="mx-auto w-full max-w-[1700px] rounded-[18px] bg-[linear-gradient(to_bottom_right,#fcfcfc,#e7e7e7)] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:p-12 lg:p-16">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-widest text-neutral-800">
              <span className="size-1.5 rounded-full bg-primary" />
              TP Public Cloud
            </p>
            <h2 className="mt-8 max-w-xl text-4xl font-medium leading-[1.15] tracking-tight text-neutral-900 sm:text-5xl">
              Host what you already run. For a fraction of the cost.
            </h2>
            <p className="mt-6 max-w-md font-mono text-sm leading-6 text-neutral-600">
              Websites, ERP, databases, and Kubernetes on TP Public Cloud.
              Production reliability for a fraction of AWS, Azure, or Huawei
              Cloud pricing.
            </p>
            <a
              href="#"
              className="mt-10 inline-flex items-center gap-2 font-mono text-sm font-bold text-neutral-900 transition-colors hover:text-neutral-600"
            >
              TP Public Cloud
              <ArrowRightIcon className="size-4" />
            </a>
          </motion.div>

          <div className="grid gap-x-10 sm:grid-cols-2">
            {APPS.map((app, i) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.1 }}
                className="border-t border-neutral-900/15 pb-12 pt-5 last:pb-0 sm:[&:nth-last-child(-n+2)]:pb-0"
              >
                <app.Icon
                  strokeWidth={1.25}
                  className="size-7 text-neutral-800"
                />
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-neutral-900">
                  {app.title}
                </h3>
                <p className="mt-3 max-w-sm font-mono text-sm leading-6 text-neutral-600">
                  {app.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
