import type { Metadata } from "next";
import { Background } from "@/components/ui/background";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechnologyPillars",
  description:
    "Cloud, ERP, software, infrastructure, and AI. Five pillars, one partner. We design, build, and run production systems for your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Background variant="image">
          <SiteHeader />
          {children}
          <SiteFooter />
        </Background>
      </body>
    </html>
  );
}
