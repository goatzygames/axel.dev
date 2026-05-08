import Link from "next/link";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/setup", label: "Setup" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: siteConfig.githubUrl, label: "GitHub", external: true }
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand">
        {siteConfig.name}
      </Link>
      <nav className="site-nav" aria-label="Primary">
        {navItems.map((item) =>
          item.external ? (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ) : (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          )
        )}
      </nav>
    </header>
  );
}
