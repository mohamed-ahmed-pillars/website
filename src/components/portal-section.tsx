"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ActivityIcon,
  BatteryFullIcon,
  BoxesIcon,
  CloudIcon,
  CreditCardIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  SearchIcon,
  SettingsIcon,
  SignalIcon,
  WifiIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboardIcon },
  { id: "cloud", label: "Cloud", icon: CloudIcon },
  { id: "erp", label: "ERP", icon: BoxesIcon },
  { id: "monitoring", label: "Monitoring", icon: ActivityIcon },
  { id: "support", label: "Support", icon: LifeBuoyIcon },
] as const;

const ACCOUNT_TABS = [
  { id: "billing", label: "Billing", icon: CreditCardIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
] as const;

type TabId =
  | (typeof TABS)[number]["id"]
  | (typeof ACCOUNT_TABS)[number]["id"];

/* ------------------------------- data ---------------------------------- */

const OVERVIEW_STATS = [
  { label: "Services", value: "15", delta: "all healthy" },
  { label: "Uptime 30d", value: "99.98%", delta: "+0.02%" },
  { label: "Open incidents", value: "0", delta: "2 resolved this week" },
  { label: "Deploys today", value: "7", delta: "3 pending review" },
];

const OVERVIEW_BARS = [
  42, 58, 40, 66, 52, 74, 60, 82, 68, 90, 76, 96, 70, 84, 62, 78, 88, 72, 94,
  80, 66, 86, 74, 92,
];

const PIPELINE = [
  { name: "erp-core", stage: "deployed", time: "09:41" },
  { name: "web-frontend", stage: "building", time: "09:52" },
  { name: "pos-sync", stage: "queued", time: "10:05" },
  { name: "billing-api", stage: "deployed", time: "08:17" },
];

const ACTIVITY = [
  { text: "Backup completed for prod-erp-db", time: "12m" },
  { text: "Auto-scaling added 2 nodes to web pool", time: "38m" },
  { text: "SSL certificates renewed, 14 domains", time: "2h" },
  { text: "Patch window closed, 0 issues", time: "5h" },
  { text: "New user invited to Finance workspace", time: "8h" },
];

const RESOURCES = [
  { label: "CPU", value: 62 },
  { label: "Memory", value: 71 },
  { label: "Storage", value: 48 },
];

const CLOUD_PROVIDERS = ["All", "AWS", "Azure", "GCP", "On-Prem"] as const;

const CLOUD_ROWS = [
  { name: "prod-web-01", provider: "AWS", region: "eu-central-1", cpu: 34, status: "running" },
  { name: "prod-web-02", provider: "AWS", region: "eu-central-1", cpu: 41, status: "running" },
  { name: "prod-erp-db", provider: "Azure", region: "uae-north", cpu: 58, status: "running" },
  { name: "erp-replica", provider: "Azure", region: "uae-north", cpu: 22, status: "running" },
  { name: "stage-api-02", provider: "GCP", region: "me-west1", cpu: 12, status: "deploying" },
  { name: "onprem-vault", provider: "On-Prem", region: "cairo-dc", cpu: 8, status: "running" },
  { name: "onprem-backup", provider: "On-Prem", region: "cairo-dc", cpu: 63, status: "running" },
];

const ERP_MODULES = [
  { name: "Sales", metric: "1,284 orders / mo" },
  { name: "Inventory", metric: "8,412 SKUs tracked" },
  { name: "POS", metric: "36 terminals live" },
  { name: "HR", metric: "142 employees" },
  { name: "Accounting", metric: "3 entities, 2 currencies" },
  { name: "CRM", metric: "612 active leads" },
];

const REVENUE_BARS = [38, 52, 44, 60, 56, 72, 64, 80, 74, 88, 82, 95];

const TOP_PRODUCTS = [
  { name: "POS License, annual", share: "31%" },
  { name: "Managed hosting, tier 2", share: "24%" },
  { name: "Support plan, gold", share: "18%" },
];

const MONITORING_BARS = Array.from({ length: 30 }, (_, i) =>
  i === 11 || i === 23 ? "degraded" : "ok",
);

const LATENCY_PATH =
  "M0 44 L14 40 L28 42 L42 34 L56 38 L70 30 L84 33 L98 26 L112 30 L126 22 L140 27 L154 18 L168 24 L182 16 L200 20";

const ERROR_BARS = [8, 5, 12, 4, 6, 3, 9, 5, 4, 7, 3, 5];

const ALERTS = [
  { text: "db-primary latency spike, auto-recovered", level: "warn", time: "day 12" },
  { text: "cdn cache purge, planned maintenance", level: "info", time: "day 24" },
  { text: "disk usage above 80% on onprem-backup", level: "warn", time: "today" },
];

const REGIONS = [
  { name: "eu-central-1", status: "operational" },
  { name: "uae-north", status: "operational" },
  { name: "me-west1", status: "operational" },
  { name: "cairo-dc", status: "operational" },
];

const SUPPORT_STATS = [
  { label: "Open", value: "2" },
  { label: "In progress", value: "1" },
  { label: "Avg response", value: "14m" },
];

const SUPPORT_TICKETS = [
  { id: "TP-2214", title: "Add VPN peering for branch office", status: "open" },
  { id: "TP-2210", title: "Increase POS terminal quota", status: "in progress" },
  { id: "TP-2208", title: "Read-only access for auditors", status: "open" },
  { id: "TP-2203", title: "Monthly patching window", status: "resolved" },
  { id: "TP-2199", title: "Restore test from cold backup", status: "resolved" },
];

const INVOICES = [
  { id: "INV-0712", period: "June 2026", amount: "$4,820", status: "paid" },
  { id: "INV-0698", period: "May 2026", amount: "$4,640", status: "paid" },
  { id: "INV-0685", period: "April 2026", amount: "$4,640", status: "paid" },
];

const USAGE_LINES = [
  { label: "Managed compute", value: "$2,940" },
  { label: "Storage and backup", value: "$1,120" },
  { label: "Support plan, gold", value: "$760" },
];

const SETTINGS_ROWS = [
  { label: "Organization", value: "acme-corp" },
  { label: "Default region", value: "eu-central-1" },
  { label: "Two-factor auth", value: "enforced" },
  { label: "SSO", value: "Azure AD, connected" },
  { label: "API keys", value: "4 active" },
  { label: "Audit log retention", value: "365 days" },
];

const MEMBERS = [
  { name: "Mohamed A.", role: "owner" },
  { name: "Sara K.", role: "admin" },
  { name: "Omar F.", role: "engineer" },
];

const MOBILE_ROWS: Record<
  TabId,
  { label: string; value: string; ok?: boolean }[]
> = {
  overview: [
    { label: "Uptime 30d", value: "99.98%", ok: true },
    { label: "Open incidents", value: "0", ok: true },
    { label: "Deploys today", value: "7" },
    { label: "Services", value: "15", ok: true },
  ],
  cloud: [
    { label: "prod-web-01", value: "running", ok: true },
    { label: "prod-erp-db", value: "running", ok: true },
    { label: "stage-api-02", value: "deploying" },
    { label: "onprem-vault", value: "running", ok: true },
  ],
  erp: [
    { label: "Sales", value: "1,284 orders" },
    { label: "Inventory", value: "8,412 SKUs" },
    { label: "POS", value: "36 live", ok: true },
    { label: "HR", value: "142 staff" },
  ],
  monitoring: [
    { label: "p95 latency", value: "132ms" },
    { label: "Errors / hr", value: "5", ok: true },
    { label: "Alerts", value: "1 warn" },
    { label: "Regions", value: "4 ok", ok: true },
  ],
  support: [
    { label: "TP-2214", value: "open" },
    { label: "TP-2210", value: "in progress" },
    { label: "TP-2208", value: "open" },
    { label: "TP-2203", value: "resolved", ok: true },
  ],
  billing: [
    { label: "Plan", value: "Managed Gold" },
    { label: "June invoice", value: "$4,820", ok: true },
    { label: "Status", value: "paid", ok: true },
    { label: "Renews", value: "Aug 1" },
  ],
  settings: [
    { label: "Org", value: "acme-corp" },
    { label: "2FA", value: "enforced", ok: true },
    { label: "API keys", value: "4 active" },
    { label: "Members", value: "12 users" },
  ],
};

/* ------------------------------ pieces ---------------------------------- */

function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  );
}

function StatusDot({ tone }: { tone: "ok" | "warn" }) {
  return (
    <span
      className={cn(
        "size-1.5 shrink-0 rounded-full",
        tone === "ok" ? "bg-emerald-400" : "bg-primary",
      )}
    />
  );
}

function OverviewView() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {OVERVIEW_STATS.map((s) => (
          <div key={s.label} className="rounded-md border bg-background/60 p-4">
            <PanelLabel>{s.label}</PanelLabel>
            <p className="mt-2 text-2xl font-medium text-foreground">{s.value}</p>
            <p className="mt-1 font-mono text-[10px] text-muted-foreground">
              {s.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-md border bg-background/60 p-4">
          <div className="flex items-center justify-between">
            <PanelLabel>Requests / hour</PanelLabel>
            <p className="font-mono text-[10px] text-primary">live</p>
          </div>
          <div className="mt-4 flex h-32 items-end gap-1">
            {OVERVIEW_BARS.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.5, delay: i * 0.02, ease: "easeOut" }}
                className={cn(
                  "flex-1 rounded-sm",
                  i === OVERVIEW_BARS.length - 1 ? "bg-primary" : "bg-muted",
                )}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[9px] text-muted-foreground">
            <span>00:00</span>
            <span>12:00</span>
            <span>now</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-md border bg-background/60 p-4">
            <PanelLabel>Deploy pipeline</PanelLabel>
            <div className="mt-3 space-y-2">
              {PIPELINE.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between font-mono text-[11px]"
                >
                  <span className="text-foreground">{p.name}</span>
                  <span className="flex items-center gap-3 text-muted-foreground">
                    <span
                      className={cn(
                        p.stage === "deployed"
                          ? "text-emerald-400"
                          : p.stage === "building"
                            ? "text-primary"
                            : "text-muted-foreground",
                      )}
                    >
                      {p.stage}
                    </span>
                    {p.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-md border bg-background/60 p-4">
            <PanelLabel>Cluster resources</PanelLabel>
            <div className="mt-3 space-y-3">
              {RESOURCES.map((r) => (
                <div key={r.label}>
                  <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
                    <span>{r.label}</span>
                    <span>{r.value}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${r.value}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border bg-background/60 p-4">
        <PanelLabel>Recent activity</PanelLabel>
        <div className="mt-3 space-y-2">
          {ACTIVITY.map((a) => (
            <div
              key={a.text}
              className="flex items-center justify-between border-b border-border/60 pb-2 font-mono text-[11px] last:border-b-0 last:pb-0"
            >
              <span className="text-foreground/85">{a.text}</span>
              <span className="text-muted-foreground">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CloudView() {
  const [provider, setProvider] =
    useState<(typeof CLOUD_PROVIDERS)[number]>("All");
  const rows =
    provider === "All"
      ? CLOUD_ROWS
      : CLOUD_ROWS.filter((r) => r.provider === provider);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {CLOUD_PROVIDERS.map((p) => (
          <button
            key={p}
            onClick={() => setProvider(p)}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors",
              provider === p
                ? "border-primary/50 bg-accent/40 text-foreground"
                : "text-muted-foreground hover:text-foreground/80",
            )}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-md border bg-background/60">
        <div className="grid grid-cols-[1.4fr_0.7fr_1fr_1fr_0.8fr] gap-2 border-b px-4 py-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          <span>Instance</span>
          <span>Provider</span>
          <span>Region</span>
          <span>CPU</span>
          <span className="text-right">Status</span>
        </div>
        <AnimatePresence initial={false}>
          {rows.map((row) => (
            <motion.div
              key={row.name}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-[1.4fr_0.7fr_1fr_1fr_0.8fr] items-center gap-2 border-b px-4 py-2.5 last:border-b-0"
            >
              <span className="flex items-center gap-2 font-mono text-[11px] text-foreground">
                <StatusDot tone={row.status === "running" ? "ok" : "warn"} />
                {row.name}
              </span>
              <span className="font-mono text-[10px] uppercase text-muted-foreground">
                {row.provider}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {row.region}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-full max-w-24 overflow-hidden rounded-full bg-muted">
                  <span
                    className={cn(
                      "block h-full rounded-full",
                      row.cpu > 55 ? "bg-primary" : "bg-emerald-400/80",
                    )}
                    style={{ width: `${row.cpu}%` }}
                  />
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {row.cpu}%
                </span>
              </span>
              <span
                className={cn(
                  "text-right font-mono text-[10px] uppercase tracking-wider",
                  row.status === "running" ? "text-emerald-400" : "text-primary",
                )}
              >
                {row.status}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <p className="font-mono text-[10px] text-muted-foreground">
        {rows.length} of {CLOUD_ROWS.length} instances · click a provider to
        filter
      </p>
    </div>
  );
}

function ErpView() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {ERP_MODULES.map((m) => (
          <div key={m.name} className="rounded-md border bg-background/60 p-4">
            <p className="text-sm font-medium text-foreground">{m.name}</p>
            <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">
              {m.metric}
            </p>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
              ● online
            </p>
          </div>
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-md border bg-background/60 p-4">
          <PanelLabel>Revenue, last 12 months</PanelLabel>
          <div className="mt-4 flex h-24 items-end gap-1.5">
            {REVENUE_BARS.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
                className={cn(
                  "flex-1 rounded-sm",
                  i === REVENUE_BARS.length - 1 ? "bg-primary" : "bg-muted",
                )}
              />
            ))}
          </div>
        </div>
        <div className="rounded-md border bg-background/60 p-4">
          <PanelLabel>Top products</PanelLabel>
          <div className="mt-3 space-y-2">
            {TOP_PRODUCTS.map((p) => (
              <div
                key={p.name}
                className="flex items-center justify-between font-mono text-[11px]"
              >
                <span className="text-foreground/85">{p.name}</span>
                <span className="text-primary">{p.share}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MonitoringView() {
  return (
    <div className="space-y-3">
      <div className="rounded-md border bg-background/60 p-4">
        <div className="flex items-center justify-between">
          <PanelLabel>Uptime, last 30 days</PanelLabel>
          <p className="font-mono text-[10px] text-emerald-400">
            all systems operational
          </p>
        </div>
        <div className="mt-4 flex gap-1">
          {MONITORING_BARS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.3, delay: i * 0.015 }}
              className={cn(
                "h-10 flex-1 origin-bottom rounded-sm",
                s === "ok" ? "bg-emerald-400/70" : "bg-primary",
              )}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-md border bg-background/60 p-4">
          <PanelLabel>p95 latency, ms</PanelLabel>
          <svg viewBox="0 0 200 60" className="mt-3 w-full">
            <motion.path
              d={LATENCY_PATH}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <line
              x1="0"
              y1="50"
              x2="200"
              y2="50"
              stroke="var(--border)"
              strokeWidth="0.5"
            />
          </svg>
          <div className="flex justify-between font-mono text-[9px] text-muted-foreground">
            <span>avg 84ms</span>
            <span>p95 132ms</span>
          </div>
        </div>
        <div className="rounded-md border bg-background/60 p-4">
          <PanelLabel>Errors / hour</PanelLabel>
          <div className="mt-3 flex h-16 items-end gap-1.5">
            {ERROR_BARS.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h * 7}%` }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="flex-1 rounded-sm bg-muted"
              />
            ))}
          </div>
          <p className="mt-2 font-mono text-[9px] text-muted-foreground">
            error budget: 99.2% remaining
          </p>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-md border bg-background/60 p-4">
          <PanelLabel>Alerts</PanelLabel>
          <div className="mt-3 space-y-2">
            {ALERTS.map((a) => (
              <div
                key={a.text}
                className="flex items-center justify-between font-mono text-[11px]"
              >
                <span className="flex items-center gap-2 text-foreground/85">
                  <StatusDot tone={a.level === "warn" ? "warn" : "ok"} />
                  {a.text}
                </span>
                <span className="text-muted-foreground">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-md border bg-background/60 p-4">
          <PanelLabel>Regions</PanelLabel>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {REGIONS.map((r) => (
              <div
                key={r.name}
                className="rounded border border-border/60 px-2 py-1.5 font-mono text-[10px]"
              >
                <p className="text-foreground/85">{r.name}</p>
                <p className="text-emerald-400">{r.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportView() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {SUPPORT_STATS.map((s) => (
          <div key={s.label} className="rounded-md border bg-background/60 p-4">
            <PanelLabel>{s.label}</PanelLabel>
            <p className="mt-2 text-xl font-medium text-foreground">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="overflow-hidden rounded-md border bg-background/60">
        {SUPPORT_TICKETS.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between border-b px-4 py-2.5 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-primary">{t.id}</span>
              <p className="text-xs text-foreground">{t.title}</p>
            </div>
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                t.status === "resolved"
                  ? "text-emerald-400"
                  : t.status === "in progress"
                    ? "text-primary"
                    : "text-foreground/80",
              )}
            >
              {t.status}
            </span>
          </div>
        ))}
      </div>
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        avg first response: 14 min · SLA met 100% · 24/7 coverage
      </p>
    </div>
  );
}

function BillingView() {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-md border bg-background/60 p-5">
          <PanelLabel>Current plan</PanelLabel>
          <p className="mt-2 text-xl font-medium text-foreground">
            Managed Gold
          </p>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">
            24/7 support · 1h response SLA · monthly patching
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-primary">
            renews Aug 1, 2026
          </p>
        </div>
        <div className="rounded-md border bg-background/60 p-5">
          <PanelLabel>This month</PanelLabel>
          <div className="mt-3 space-y-2">
            {USAGE_LINES.map((u) => (
              <div
                key={u.label}
                className="flex items-center justify-between font-mono text-[11px]"
              >
                <span className="text-foreground/85">{u.label}</span>
                <span className="text-muted-foreground">{u.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t pt-2 font-mono text-[11px]">
              <span className="text-foreground">Total</span>
              <span className="text-primary">$4,820</span>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border bg-background/60">
        {INVOICES.map((inv) => (
          <div
            key={inv.id}
            className="flex items-center justify-between border-b px-4 py-2.5 last:border-b-0"
          >
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="text-primary">{inv.id}</span>
              <span className="text-foreground/85">{inv.period}</span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span className="text-foreground">{inv.amount}</span>
              <span className="text-emerald-400 uppercase">{inv.status}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        payment method: bank transfer, net 30 · invoices sent to
        finance@acme-corp.com
      </p>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-md border bg-background/60">
        {SETTINGS_ROWS.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between border-b px-4 py-2.5 font-mono text-[11px] last:border-b-0"
          >
            <span className="text-muted-foreground">{row.label}</span>
            <span className="text-foreground/90">{row.value}</span>
          </div>
        ))}
      </div>
      <div className="rounded-md border bg-background/60 p-4">
        <PanelLabel>Members</PanelLabel>
        <div className="mt-3 space-y-2">
          {MEMBERS.map((m) => (
            <div
              key={m.name}
              className="flex items-center justify-between font-mono text-[11px]"
            >
              <span className="text-foreground/85">{m.name}</span>
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-wider",
                  m.role === "owner"
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {m.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const VIEWS: Record<TabId, () => React.ReactNode> = {
  overview: OverviewView,
  cloud: CloudView,
  erp: ErpView,
  monitoring: MonitoringView,
  support: SupportView,
  billing: BillingView,
  settings: SettingsView,
};

const PHONE_TABS: {
  icon: (typeof TABS)[number]["icon"];
  ids: TabId[];
}[] = [
  { icon: LayoutDashboardIcon, ids: ["overview"] },
  { icon: CloudIcon, ids: ["cloud", "erp"] },
  { icon: ActivityIcon, ids: ["monitoring", "support"] },
  { icon: SettingsIcon, ids: ["settings", "billing"] },
];

function PhonePreview({
  active,
  onSelect,
}: {
  active: TabId;
  onSelect: (tab: TabId) => void;
}) {
  const rows = MOBILE_ROWS[active];
  const label =
    [...TABS, ...ACCOUNT_TABS].find((t) => t.id === active)?.label ?? "";

  return (
    <div className="relative shrink-0">
      <div className="relative h-[620px] w-72 overflow-hidden rounded-[2.8rem] border-[6px] border-[#262626] bg-card shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
        <div className="absolute left-1/2 top-2.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />

        <div className="flex h-full flex-col px-5 pb-2 pt-3">
          <div className="flex items-center justify-between font-mono text-[10px] text-foreground/80">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <SignalIcon className="size-3" />
              <WifiIcon className="size-3" />
              <BatteryFullIcon className="size-3.5" />
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
              TP Portal
            </p>
            <span className="flex size-5 items-center justify-center rounded-full bg-accent font-mono text-[8px] font-bold text-accent-foreground">
              MA
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-full border px-3 py-1.5">
            <SearchIcon className="size-3 text-muted-foreground" />
            <span className="font-mono text-[10px] text-muted-foreground">
              Search
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-4 min-h-0 flex-1"
            >
              <div className="flex items-center justify-between">
                <PanelLabel>{label}</PanelLabel>
                <span className="animate-pulse font-mono text-[10px] text-primary">
                  ●
                </span>
              </div>
              <div className="mt-2 overflow-hidden rounded-lg border bg-background/60">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between border-b px-3 py-2.5 font-mono text-[10px] last:border-b-0"
                  >
                    <span className="flex items-center gap-2 text-foreground/85">
                      <span
                        className={cn(
                          "size-1 rounded-full",
                          row.ok ? "bg-emerald-400" : "bg-muted-foreground",
                        )}
                      />
                      {row.label}
                    </span>
                    <span
                      className={cn(
                        row.ok ? "text-emerald-400" : "text-muted-foreground",
                      )}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-lg border bg-background/60 p-3">
                <div className="flex justify-between font-mono text-[9px] text-muted-foreground">
                  <span>Last 24h</span>
                  <span className="text-primary">live</span>
                </div>
                <div className="mt-2 flex h-9 items-end gap-1">
                  {OVERVIEW_BARS.slice(8, 20).map((h, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex-1 rounded-sm",
                        i === 11 ? "bg-primary" : "bg-muted",
                      )}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-lg border bg-background/60 px-3 py-2.5 font-mono text-[9px] text-muted-foreground">
                <span>Synced with console</span>
                <span className="text-emerald-400">live</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-2 flex items-center justify-around border-t pt-2">
            {PHONE_TABS.map((t, i) => {
              const isActive = t.ids.includes(active);
              return (
                <button
                  key={i}
                  onClick={() => onSelect(t.ids[0])}
                  className={cn(
                    "rounded-md p-2 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <t.icon className="size-4" />
                </button>
              );
            })}
          </div>
          <div className="mx-auto mt-1 h-1 w-24 rounded-full bg-foreground/30" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ section --------------------------------- */

export function PortalSection() {
  const [active, setActive] = useState<TabId>("overview");
  const ActiveView = VIEWS[active];

  return (
    <section className="bg-black px-6 py-24 lg:px-16">
      <div className="mx-auto w-full max-w-[1900px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            All your work, in one portal.
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-mono text-base leading-7 text-muted-foreground">
            The TP Portal connects everything we run for you. Cloud, ERP,
            monitoring, and support in one place. One login, full visibility.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "relative flex items-center gap-2.5 rounded-md px-5 py-2.5 font-mono text-sm font-bold uppercase tracking-wider transition-colors",
                active === tab.id
                  ? "text-foreground"
                  : "text-foreground/85 hover:text-foreground",
              )}
            >
              {active === tab.id && (
                <motion.span
                  layoutId="portal-tab"
                  className="absolute inset-0 rounded-md bg-accent/40"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <tab.icon className="relative size-5" />
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-8 rounded-3xl bg-[linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px),radial-gradient(ellipse_at_center,#a8a8a8_0%,#818181_70%,#6b6b6b_100%)] bg-[size:40px_40px,40px_40px,100%_100%] p-6 sm:p-12 lg:p-24 2xl:w-fit"
        >
          <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-center gap-10 2xl:flex-row">
          <div className="flex h-[620px] w-full max-w-[980px] flex-col overflow-hidden rounded-xl border bg-card shadow-[0_30px_90px_rgba(0,0,0,0.5)] 2xl:w-[980px] 2xl:shrink-0">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                TP Portal · Console
              </p>
              <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-primary">
                <span className="animate-pulse">●</span> Connected
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 border-b px-4 py-2.5">
              <p className="font-mono text-[11px] text-muted-foreground">
                acme-corp <span className="text-border">/</span>{" "}
                <span className="text-foreground/85">production</span>
              </p>
              <div className="flex min-w-0 max-w-72 flex-1 items-center gap-2 rounded-md border px-3 py-1.5">
                <SearchIcon className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="truncate font-mono text-[10px] text-muted-foreground">
                  Search services, tickets, docs...
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-primary/40 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-primary">
                  prod
                </span>
                <span className="flex size-6 items-center justify-center rounded-full bg-accent font-mono text-[9px] font-bold text-accent-foreground">
                  MA
                </span>
              </div>
            </div>

            <div className="flex min-h-0 flex-1">
              <aside className="hidden w-52 shrink-0 flex-col border-r p-3 sm:flex">
                <PanelLabel>Portal</PanelLabel>
                <div className="mt-2 space-y-0.5">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActive(tab.id)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left font-mono text-[11px] uppercase tracking-wider transition-colors",
                        active === tab.id
                          ? "bg-accent/40 text-foreground"
                          : "text-muted-foreground hover:text-foreground/80",
                      )}
                    >
                      <tab.icon className="size-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="mt-4 border-t pt-3">
                  <PanelLabel>Account</PanelLabel>
                  <div className="mt-2 space-y-0.5">
                    {ACCOUNT_TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActive(tab.id)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left font-mono text-[11px] uppercase tracking-wider transition-colors",
                          active === tab.id
                            ? "bg-accent/40 text-foreground"
                            : "text-muted-foreground hover:text-foreground/80",
                        )}
                      >
                        <tab.icon className="size-3.5" />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-auto rounded-md border border-border/60 p-3">
                  <div className="flex justify-between font-mono text-[9px] text-muted-foreground">
                    <span>Storage</span>
                    <span>48%</span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[48%] rounded-full bg-primary" />
                  </div>
                  <p className="mt-2 font-mono text-[9px] text-muted-foreground">
                    v2.14 · eu-central-1
                  </p>
                </div>
              </aside>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <ActiveView />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center justify-between border-t px-4 py-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
              <span>15 services · 4 environments · 2 regions</span>
              <span className="text-emerald-400">
                all agents reporting
              </span>
            </div>
          </div>

          <PhonePreview active={active} onSelect={setActive} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
