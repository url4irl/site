"use client";

import { LanguageSelector } from "@/components/language-selector";
import Logo from "@/components/logo";
import {
  Monitor,
  Users,
  GraduationCap,
  ArrowRight,
  Github,
  Globe,
  Languages,
  Menu,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function HeaderContainer() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isHome =
    pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/";

  return (
    <header className="relative">
      <div className="flex justify-between items-center p-6 md:p-8">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          {isHome && (
            <>
              <a
                href="#philosophy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("nav.philosophy")}
              </a>
              <a
                href="#pillars"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("nav.pillars")}
              </a>
            </>
          )}
          <a
            href="https://github.com/url4irl"
            target="_blank"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            {t("nav.github")}
          </a>
          <a
            href={`/${locale}/blog`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.blog")}
          </a>
          <LanguageSelector currentLocale={locale} />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-background border-b shadow-lg z-50">
          <div className="flex flex-col p-6 gap-4">
            <a
              href="#philosophy"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.philosophy")}
            </a>
            <a
              href="#pillars"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.pillars")}
            </a>
            <a
              href={`/${locale}/blog`}
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.blog")}
            </a>
            <a
              href="https://github.com/url4irl"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Github className="w-4 h-4" />
              {t("nav.github")}
            </a>
            <div className="pt-2 border-t">
              <LanguageSelector currentLocale={locale} />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
