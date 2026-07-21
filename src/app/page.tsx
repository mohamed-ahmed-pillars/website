import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LogoCloud } from "@/components/logo-cloud";
import { PillarsPanel, type Pillar } from "@/components/pillars-panel";
import { PlatformSection } from "@/components/platform-section";
import { FeaturesSection } from "@/components/features-section";
import { PortalSection } from "@/components/portal-section";
import { EnterpriseSection } from "@/components/enterprise-section";
import { HowWeWorkSection } from "@/components/how-we-work-section";
import { HostingSection } from "@/components/hosting-section";
import { NewsSection } from "@/components/news-section";

const WHATSAPP_URL = "https://wa.me/201101040838";

const pillars: Pillar[] = [
  {
    name: "Cloud Pillar",
    items: ["AWS", "Azure", "GCP", "Huawei Cloud", "TP Public Cloud"],
  },
  {
    name: "ERP Pillar",
    items: ["Odoo", "TP POS"],
  },
  {
    name: "Software Pillar",
    items: ["Web Applications", "Websites", "Omni-channel Customer Service"],
  },
  {
    name: "Infrastructure Pillar",
    items: ["On-premises", "Private Cloud", "Networking"],
  },
  {
    name: "AI Pillar",
    items: ["AI Agents", "Automation"],
  },
];

export default function Home() {
  return (
    <>
    <section className="flex min-h-[calc(100svh-3.5rem)] flex-1 items-center px-6 py-16 lg:px-24">
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h1 className="text-5xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl xl:text-7xl">
            Build Your
            <br />
            Technology Pillars
          </h1>
          <p className="mt-8 max-w-md font-mono text-sm font-bold leading-6 text-foreground/80">
            Cloud, ERP, software, infrastructure, and AI. Five pillars, one
            partner. We design, build, and run production systems for your
            business.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "stripes" }),
                "h-11 px-6 font-mono text-sm font-bold uppercase tracking-wider",
              )}
            >
              Get Started
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "stripes-dark" }),
                "h-11 px-6 font-mono text-sm font-bold uppercase tracking-wider has-data-[icon=inline-end]:pe-5",
              )}
            >
              Contact Sales
              <ArrowRightIcon data-icon="inline-end" />
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Aws-Partner-Logo-Vector.svg-.png"
              alt="AWS Partner"
              className="h-16 w-auto object-contain"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/microsoft.png"
              alt="Microsoft Partner"
              className="h-16 w-auto object-contain"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/huawei.avif"
              alt="Huawei Cloud Partner"
              className="h-16 w-auto rounded-md bg-white object-contain px-2 py-1.5"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Odoo-Official-Partner.webp"
              alt="Odoo Official Partner"
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>

        <PillarsPanel pillars={pillars} />
      </div>
    </section>

    <section className="relative px-6 pb-24 pt-8 lg:px-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent,black_45%)]"
      />
      <p className="text-center font-mono text-base font-bold uppercase tracking-wider text-foreground">
        Our technology partners
      </p>
      <div className="mt-10">
        <LogoCloud />
      </div>
    </section>

    <PlatformSection />

    <PortalSection />

    <FeaturesSection />

    <EnterpriseSection />

    <HowWeWorkSection />

    <HostingSection />

    <NewsSection />
    </>
  );
}
