"use client";

import { useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { TpLogo } from "@/components/logo";

type NewsBanner =
  | { type: "lockup"; text: string }
  | { type: "logo"; src: string; alt: string; light?: boolean };

const NEWS: {
  banner: NewsBanner;
  tags: string[];
  isNew?: boolean;
  title: string;
  desc: string;
}[] = [
  {
    banner: {
      type: "logo",
      src: "/huawei.avif",
      alt: "Huawei Cloud",
      light: true,
    },
    tags: ["Company"],
    isNew: true,
    title: "Technology Pillars is now an official Huawei Cloud Partner",
    desc: "Certified Huawei Cloud expertise for hosting, migrations, and managed workloads across the region.",
  },
  {
    banner: { type: "lockup", text: "TP ✕ EL EMPERATOR" },
    tags: ["Partnership"],
    isNew: true,
    title: "Technology Pillars signs El Emperator",
    desc: "A multi-year deal covering cloud hosting, Odoo ERP, and 24/7 managed operations across all El Emperator branches.",
  },
  {
    banner: { type: "lockup", text: "TP ✕ AL AHLYA" },
    tags: ["Partnership"],
    isNew: true,
    title: "Al Ahlya moves its estate to Technology Pillars",
    desc: "Migration from on-premises to TP Public Cloud, with networking, backups, and disaster recovery managed end to end.",
  },
  {
    banner: {
      type: "logo",
      src: "https://cdn.simpleicons.org/odoo/white",
      alt: "Odoo",
    },
    tags: ["Company"],
    title: "Technology Pillars is now an official Odoo Partner",
    desc: "Certified implementation, customization, and support for Odoo, delivered by our ERP Pillar team.",
  },
  {
    banner: {
      type: "logo",
      src: "https://img.icons8.com/androidL/512/FFFFFF/amazon-web-services.png",
      alt: "AWS",
    },
    tags: ["Company"],
    title: "Technology Pillars is now an official AWS Partner",
    desc: "Recognized expertise for AWS migrations, managed workloads, and cost optimization projects.",
  },
];

function Banner({ banner }: { banner: NewsBanner }) {
  if (banner.type === "lockup") {
    return (
      <div className="flex h-52 items-center justify-center border-b border-border bg-[linear-gradient(to_bottom_right,#fbfbfb,#e3e3e3)] px-4">
        <p className="text-center font-mono text-xl font-bold tracking-[0.2em] text-neutral-900">
          {banner.text}
        </p>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex h-52 flex-col items-center justify-center gap-4 border-b border-border",
        banner.light
          ? "bg-[linear-gradient(to_bottom_right,#fbfbfb,#e3e3e3)]"
          : "bg-[#0a0a0a]",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={banner.src}
        alt={banner.alt}
        className={cn(
          "w-auto object-contain",
          banner.light ? "h-28" : "h-14",
        )}
      />
      <p
        className={cn(
          "font-mono text-[10px] font-bold uppercase tracking-[0.25em]",
          banner.light ? "text-neutral-500" : "text-foreground/50",
        )}
      >
        Official Partner
      </p>
    </div>
  );
}

export function NewsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: number) =>
    trackRef.current?.scrollBy({ left: dir * 420, behavior: "smooth" });

  return (
    <section className="bg-black px-6 py-24 lg:px-12">
      <div className="mx-auto w-full max-w-[1900px] border-t border-border pt-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-widest text-foreground/80">
            <span className="size-1.5 rounded-full bg-primary" />
            News
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Technology Pillars news &amp; updates
            </h2>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous news"
                onClick={() => scrollByCard(-1)}
                className="flex size-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-white/5 hover:text-foreground"
              >
                <ArrowLeftIcon className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next news"
                onClick={() => scrollByCard(1)}
                className="flex size-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-white/5 hover:text-foreground"
              >
                <ArrowRightIcon className="size-4" />
              </button>
              <a
                href="/under-construction"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-[#141414] px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-foreground/80 transition-colors hover:bg-[#1c1c1c] hover:text-foreground"
              >
                All news
                <ArrowRightIcon className="size-3" />
              </a>
            </div>
          </div>
        </motion.div>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x gap-5 overflow-x-auto pb-2"
        >
          {NEWS.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-[10px] border border-border bg-[#0d0d0d] sm:w-[400px]"
            >
              <Banner banner={item.banner} />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border/70 bg-[#161616] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.isNew && (
                    <span className="rounded-md bg-primary px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
                      New
                    </span>
                  )}
                </div>
                <h3 className="mt-5 text-xl font-medium leading-snug text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 line-clamp-2 font-mono text-[15px] leading-7 text-muted-foreground">
                  {item.desc}
                </p>
                <a
                  href="/under-construction"
                  className="mt-auto inline-flex items-center gap-1.5 pt-8 font-mono text-[11px] font-bold uppercase tracking-widest text-foreground/80 transition-colors hover:text-foreground"
                >
                  Read more
                  <ArrowRightIcon className="size-3" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className={cn(
            "mt-20 flex min-h-[520px] w-full max-w-[640px] flex-col justify-between rounded-[14px] p-6",
            "bg-[url(/light-gradient-texture.webp)] bg-cover bg-center",
          )}
        >
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-widest text-neutral-800">
              <span className="size-1.5 rounded-full bg-primary" />
              Work with us
            </p>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
              Contact us
            </p>
          </div>

          <div>
            <TpLogo className="size-9 text-neutral-900" />
            <h3 className="mt-6 max-w-sm text-3xl font-medium leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl">
              Ready to build your technology pillars?
            </h3>
            <a
              href="https://wa.me/201101040838"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "stripes-dark" }),
                "mt-8 h-10 w-fit px-5 font-mono text-xs font-bold uppercase tracking-wider",
              )}
            >
              Contact us
              <ArrowRightIcon data-icon="inline-end" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
