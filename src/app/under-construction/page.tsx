import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, ConstructionIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Under Construction | Technology Pillars",
};

const WHATSAPP_URL = "https://wa.me/201101040838";

export default function UnderConstructionPage() {
  return (
    <section className="flex min-h-[calc(100svh-3.5rem)] flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-[14px] border border-border bg-[#0d0d0d] p-10 text-center shadow-[0_0_32px_rgba(255,255,255,0.08)]">
        <div className="mx-auto flex size-14 items-center justify-center rounded-lg border border-primary/25 bg-gradient-to-b from-[#1c1c1c] to-[#0c0c0c] shadow-[0_0_18px_-6px_var(--primary)]">
          <ConstructionIcon
            className="size-7 text-primary"
            strokeWidth={1.5}
          />
        </div>

        <p className="mt-8 flex items-center justify-center gap-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          In progress
        </p>

        <h1 className="mt-4 font-mono text-2xl font-bold uppercase tracking-wider text-foreground sm:text-3xl">
          Under Construction
        </h1>
        <p className="mt-4 font-mono text-sm leading-6 text-muted-foreground">
          This page is being built. Check back soon, or reach us any time on
          WhatsApp.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "stripes" }),
              "h-10 px-5 font-mono text-xs font-bold uppercase tracking-wider",
            )}
          >
            <ArrowLeftIcon />
            Back to Home
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "stripes-dark" }),
              "h-10 px-5 font-mono text-xs font-bold uppercase tracking-wider",
            )}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
