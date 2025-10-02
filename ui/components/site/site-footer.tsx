import Link from "next/link";
import { ArrowUpRight, Linkedin, Twitter, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/" },
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/about#careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
];

const socials = [
  { label: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { label: "Email", icon: Mail, href: "mailto:hello@marketmaker.com" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-background/90">
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr]">
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 text-lg font-semibold">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                MM
              </span>
              Market Maker
            </Link>
            <p className="max-w-xl text-balance text-muted-foreground">
              Operational confidence for modern liquidity teams. Build, govern, and scale algorithmic market making with human-grade oversight.
            </p>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Stay in the loop</p>
              <form className="mt-3 flex max-w-md items-center gap-3" action="/api/subscribe" method="post">
                <Input
                  type="email"
                  name="email"
                  placeholder="work.email@company.com"
                  aria-label="Email address"
                  required
                />
                <Button type="submit" size="sm" variant="primary">
                  Join <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </Button>
              </form>
            </div>
            <div className="flex items-center gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:text-foreground"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-4">
                <p className="text-sm font-semibold text-muted-foreground">{group.title}</p>
                <ul className="space-y-3 text-sm">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground transition hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Market Maker Labs. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="#" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
