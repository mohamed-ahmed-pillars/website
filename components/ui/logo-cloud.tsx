"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export function LogoCloud() {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <InfiniteSlider durationOnHover={75} gap={112}>
        <img
          src="https://img.icons8.com/androidL/512/FFFFFF/amazon-web-services.png"
          alt="AWS"
          className="h-[80px] w-auto opacity-80"
        />
        <img
          src="https://cdn.simpleicons.org/googlecloud/white"
          alt="Google Cloud"
          className="h-[80px] w-auto opacity-80"
        />
        <img
          src="https://cdn.simpleicons.org/huawei/white"
          alt="Huawei"
          className="h-[80px] w-auto opacity-80"
        />
        <img
          src="https://cdn.simpleicons.org/Anthropic/white"
          alt="Anthropic"
          className="h-[80px] w-auto opacity-80"
        />
        <img
          src="https://cdn.simpleicons.org/odoo/white"
          alt="Odoo"
          className="h-[80px] w-auto opacity-80"
        />
        <img
          src="https://cdn.simpleicons.org/nutanix/white"
          alt="Nutanix"
          className="h-[80px] w-auto opacity-80"
        />
      </InfiniteSlider>
      <ProgressiveBlur
        className="pointer-events-none absolute inset-y-0 left-0 w-[80px]"
        direction="left"
        blurLayers={4}
      />
      <ProgressiveBlur
        className="pointer-events-none absolute inset-y-0 right-0 w-[80px]"
        direction="right"
        blurLayers={4}
      />
    </div>
  );
}
