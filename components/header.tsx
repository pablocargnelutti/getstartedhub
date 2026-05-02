"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
                <span className="text-lg font-bold text-primary-foreground">
                  G
                </span>
              </div>
              <span className="hidden font-bold sm:inline-block text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                GetStartedHub
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className={`text-sm font-medium transition-all hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-accent after:transition-all ${
                  pathname === "/"
                    ? "text-primary after:w-full"
                    : "after:w-0 hover:after:w-full"
                }`}
              >
                Home
              </Link>
              <Link
                href="/blog"
                className={`text-sm font-medium transition-all hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-accent after:transition-all ${
                  pathname?.startsWith("/blog")
                    ? "text-primary after:w-full"
                    : "after:w-0 hover:after:w-full"
                }`}
              >
                Blog
              </Link>
              <Link
                href="/categories"
                className={`text-sm font-medium transition-all hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-accent after:transition-all ${
                  pathname?.startsWith("/categories") ||
                  pathname?.startsWith("/categoria")
                    ? "text-primary after:w-full"
                    : "after:w-0 hover:after:w-full"
                }`}
              >
                Categories
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium transition-all hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-accent after:transition-all ${
                  pathname === "/about"
                    ? "text-primary after:w-full"
                    : "after:w-0 hover:after:w-full"
                }`}
              >
                About
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="w-9 h-9">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-9 h-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 animate-slide-up">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/" ? "text-primary font-semibold" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/blog"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname?.startsWith("/blog")
                    ? "text-primary font-semibold"
                    : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/categories"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname?.startsWith("/categories") ||
                  pathname?.startsWith("/categoria")
                    ? "text-primary font-semibold"
                    : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/about" ? "text-primary font-semibold" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
