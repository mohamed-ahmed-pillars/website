"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";

const logos: { src: string; alt: string; name?: string }[] = [
  {
    src: "https://img.icons8.com/androidL/512/FFFFFF/amazon-web-services.png",
    alt: "AWS",
  },
  {
    src: "/Microsoft_Azure_Logo.png",
    alt: "Microsoft Azure",
  },
  {
    src: "https://cdn.simpleicons.org/googlecloud/white",
    alt: "Google Cloud",
    name: "Google Cloud",
  },
  {
    src: "https://cdn.simpleicons.org/huawei/white",
    alt: "Huawei",
    name: "Huawei",
  },
  {
    src: "https://cdn.simpleicons.org/odoo/white",
    alt: "Odoo",
  },
  {
    src: "/Canonical-White-Digital.svg",
    alt: "Canonical",
  },
];

export function LogoCloud() {
  return (
    <div className="relative mx-auto w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[96rem]">
      <InfiniteSlider pauseOnHover gap={56}>
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="group flex items-center gap-2 py-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-14 w-28 object-contain opacity-40 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            />
            {logo.name && (
              <span className="whitespace-nowrap text-xl font-semibold text-foreground/40 transition-colors duration-300 group-hover:text-foreground">
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}
