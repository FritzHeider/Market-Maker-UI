"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, ArrowUpRight } from "lucide-react";
import { navLinks } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from "@/components/ui/sheet";

export function SiteHeader() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition duration-300",
        scrolled ? "bg-glass backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-subtle">
            MM
          </span>
          <span className="hidden sm:inline-block">Market Maker</span>
        </Link>
        <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-background/70 px-2 py-1 text-sm font-medium text-muted-foreground shadow-subtle sm:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 transition hover:text-foreground",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 -z-10 rounded-full bg-muted/80"
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-4 sm:flex">
          <ThemeToggle />
          <Button asChild size="sm" className="shadow-card">
            <Link href="/contact" className="flex items-center gap-1">
              Talk to us <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-2xl">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-xs border-l border-border bg-background/95">
        <SheetHeader>
          <Link href="/" className="text-lg font-semibold">
            Market Maker
          </Link>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "rounded-xl px-4 py-3 text-base font-semibold",
                  pathname === link.href ? "bg-muted text-foreground" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </div>
        <div className="mt-10 space-y-3">
          <Button asChild className="w-full">
            <Link href="/contact">Talk to us</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/pricing">See pricing</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
