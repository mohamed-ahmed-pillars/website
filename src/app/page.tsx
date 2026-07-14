import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LogoCloud } from "@/components/logo-cloud";
import { PillarsPanel, type Pillar } from "@/components/pillars-panel";

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
          <p className="mt-8 max-w-md font-mono text-sm leading-6 text-muted-foreground">
            Cloud, ERP, software, infrastructure, and AI — five pillars, one
            partner. We design, build, and run production systems for your
            business.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              variant="stripes"
              className="h-11 px-6 font-mono text-sm font-bold uppercase tracking-wider"
            >
              Get Started
            </Button>
            <Button
              variant="stripes-dark"
              className="h-11 px-6 font-mono text-sm font-bold uppercase tracking-wider has-data-[icon=inline-end]:pe-5"
            >
              Contact Sales
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </div>

        <PillarsPanel pillars={pillars} />
      </div>
    </section>

    <section className="px-6 pb-24 pt-8 lg:px-24">
      <p className="text-center font-mono text-xs uppercase tracking-wider text-foreground">
        Our technology partners
      </p>
      <div className="mt-10">
        <LogoCloud />
      </div>
    </section>
    </>
  );
}
