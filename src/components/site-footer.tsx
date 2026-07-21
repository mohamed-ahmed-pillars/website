import { TpLogo } from "@/components/logo";

const WHATSAPP_URL = "https://wa.me/201101040838";

const COLUMNS = [
  {
    heading: "Pillars",
    links: [
      { label: "Cloud Pillar", href: "/under-construction" },
      { label: "ERP Pillar", href: "/under-construction" },
      { label: "Software Pillar", href: "/under-construction" },
      { label: "Infrastructure Pillar", href: "/under-construction" },
      { label: "AI Pillar", href: "/under-construction" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/under-construction" },
      { label: "News", href: "/under-construction" },
      { label: "Careers", href: "/under-construction" },
      { label: "Partners", href: "/under-construction" },
      { label: "Contact Sales", href: WHATSAPP_URL },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/under-construction" },
      { label: "Terms of Service", href: "/under-construction" },
      { label: "SLA", href: "/under-construction" },
      { label: "DPA", href: "/under-construction" },
    ],
  },
];

const SOCIALS = [
  { label: "WhatsApp", href: WHATSAPP_URL },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/technology-pillars/",
  },
  { label: "Facebook", href: "https://www.facebook.com/share/18rUd4TWZJ/" },
];

export function SiteFooter() {
  return (
    <footer className="bg-black px-6 pb-10 pt-24 lg:px-12">
      <div className="mx-auto w-full max-w-[1900px] rounded-[18px] bg-[#0e0e0e] px-8 py-14 sm:px-12 lg:px-16">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-wrap items-center gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Aws-Partner-Logo-Vector.svg-.png"
              alt="AWS Partner"
              className="h-20 w-auto object-contain"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/microsoft.png"
              alt="Microsoft Partner"
              className="h-20 w-auto object-contain"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/huawei.avif"
              alt="Huawei Cloud Partner"
              className="h-20 w-auto rounded-md bg-white object-contain px-2.5 py-2"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Odoo-Official-Partner.webp"
              alt="Odoo Official Partner"
              className="h-20 w-auto object-contain"
            />
          </div>
          <div className="grid w-full grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3 lg:w-auto lg:gap-x-24">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="text-sm font-medium text-foreground">
                  {col.heading}
                </p>
                <ul className="mt-5 space-y-3.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-between gap-x-12 gap-y-8">
          <div className="flex items-center gap-3 text-foreground">
            <TpLogo className="size-7 text-primary sm:size-9" />
            <p className="whitespace-nowrap font-mono text-xl font-bold sm:text-3xl lg:text-4xl">
              Technology Pillars
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {SOCIALS.map((social, i) => (
              <span key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {social.label}
                </a>
                {i < SOCIALS.length - 1 && <span>,&nbsp; </span>}
              </span>
            ))}
          </p>
          <p className="text-sm text-muted-foreground">
            © Technology Pillars 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
