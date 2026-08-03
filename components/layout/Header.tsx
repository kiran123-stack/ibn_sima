"use client";

/* ============================================================
 * HEADER / NAVIGATION
 * ============================================================
 * Floating pill-shaped navigation bar fixed at the top.
 * 
 * DESIGN SPECS (from Design.md):
 * - Height: 88px, floating 24px from top
 * - Max width: 1360px, centered, pill-shaped (999px radius)
 * - Glass effect: bg-white/80 + backdrop-blur 20px
 * - Logo left | Nav links center | Language switch + CTA right
 * - Entrance: slides from y:-60 to y:0, 1.2s Power3.out
 * - Link hover: underline grows left-to-right
 * 
 * LANGUAGE: Uses useLanguage() → reads from common.json
 * ============================================================ */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { t, locale, switchLanguage } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);
  const router = useRouter();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t("common:nav.about"), href: "/about" },
    { name: t("common:nav.treatments"), href: "/treatments" },
    { name: t("common:nav.whyIndia"), href: "/why-india" },
    { name: t("common:nav.services"), href: "/services" },
    { name: t("common:nav.hospitals"), href: "/hospitals" },
    { name: t("common:nav.faq"), href: "/faq" },
  ];

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-[24px] left-[24px] right-[24px] lg:left-[40px] lg:right-[40px] mx-auto z-50 h-[88px] max-w-[1360px] flex items-center justify-between px-6 lg:px-8 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-white/45 backdrop-blur-[20px] bg-white/80"
      style={{ opacity: 0 }}
    >
      {/* ---- Logo ---- */}
      <Link href="/" className="flex-shrink-0 flex items-center group">
        <span className="text-[var(--color-primary)] font-bold text-xl tracking-tight transition-transform duration-300 group-hover:scale-105">
          IBN Sina
        </span>
      </Link>

      {/* ---- Desktop Nav Links ---- */}
      <nav className="hidden lg:flex items-center gap-[40px]">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[var(--color-neutral-text)] font-medium text-sm relative group"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </nav>

      {/* ---- Right: Language Switch, CTA + Mobile Toggle ---- */}
      <div className="flex-shrink-0 flex items-center gap-3">
        {/* Language toggle (Visible on both mobile and desktop) */}
        <button
          onClick={switchLanguage}
          className="h-[40px] px-4 rounded-full border border-[var(--color-neutral-border)] text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-neutral-light)] transition-colors duration-300 cursor-pointer"
          aria-label="Switch language"
        >
          {locale === "en" ? "عربي" : "English"}
        </button>

        {/* FIX: Wrapped the Button in a div with "hidden lg:block" to guarantee it hides on mobile */}
        <div className="hidden lg:block">
          <Button 
            onClick={() => router.push('/contact')}
            className="h-[48px] px-[28px] text-sm"
          >
            {t("common:buttons.contact")}
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="lg:hidden flex items-center justify-center w-10 h-10 text-[var(--color-primary)] ml-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-[100px] left-0 w-full bg-white/95 backdrop-blur-[20px] rounded-[32px] p-6 flex flex-col gap-2 shadow-2xl border border-white/45 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[var(--color-neutral-text)] font-semibold text-lg py-3 px-4 rounded-xl hover:bg-[var(--color-neutral-light)] hover:text-[var(--color-primary)] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <Button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              router.push('/contact');
            }}
            className="w-full mt-4 h-[48px]"
          >
            {t("common:buttons.contact")}
          </Button>
        </div>
      )}
    </header>
  );
};