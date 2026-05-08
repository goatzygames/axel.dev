import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description:
    "Minimal developer portfolio for Axel: web apps, experimental tools, and small useful software projects.",
  alternates: {
    canonical: siteConfig.url
  },
  openGraph: {
    title: siteConfig.name,
    description:
      "Minimal developer portfolio for Axel: web apps, experimental tools, and small useful software projects.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website"
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description:
      "Minimal developer portfolio for Axel: web apps, experimental tools, and small useful software projects."
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="page-shell">
          <div className="site-frame">
            <SiteHeader />
            <main className="main-content">{children}</main>
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
