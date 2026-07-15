import { Grid2x2PlusIcon } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/201101040838";

const COLUMNS = [
  {
    heading: "Pillars",
    links: [
      { label: "Cloud Pillar", href: "#" },
      { label: "ERP Pillar", href: "#" },
      { label: "Software Pillar", href: "#" },
      { label: "Infrastructure Pillar", href: "#" },
      { label: "AI Pillar", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "News", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Partners", href: "#" },
      { label: "Contact Sales", href: WHATSAPP_URL },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "SLA", href: "#" },
      { label: "DPA", href: "#" },
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
      <div className="mx-auto w-full max-w-[1700px] rounded-[18px] bg-[#0e0e0e] px-8 py-14 sm:px-12 lg:px-16">
        <div className="flex justify-start lg:justify-end">
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
            <Grid2x2PlusIcon className="size-9" />
            <p className="whitespace-nowrap font-mono text-3xl font-bold sm:text-4xl">
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
