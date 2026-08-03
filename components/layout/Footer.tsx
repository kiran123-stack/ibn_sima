"use client";

/* ============================================================
 * FOOTER
 * ============================================================
 * REDESIGNED: Premium typography, larger readable fonts, 
 * sleek hover animations, and a sophisticated dark gradient layout.
 * ============================================================ */

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-[#050C14] text-white pt-[120px] pb-[40px] px-6 sm:px-10 lg:px-[80px] rounded-t-[48px] overflow-hidden mt-20 border-t-4 border-[var(--color-primary)]">
      
      {/* Premium Dark Gradient & Image Background */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
        <Image
          src= "/IMAGES/images.png"
          alt="Footer Background"
          fill
          className="object-cover object-center grayscale"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#444d58] via-[#050C14]/80 to-transparent" />

      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* Main Grid: 12 Columns for better proportion control */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-[80px]">
          
          {/* Column 1: Logo & Brand Story (Takes up 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-5 pr-0 lg:pr-8">
            <Link href="/" className="inline-block">
              {/* Changed text-white to your primary brand color */}
              <span className="text-3xl sm:text-4xl font-black text-[var(--color-primary)] tracking-tight">
                {t("common:footer.title")}
                {/* Made the dot white for a premium contrast effect */}
                <span className="text-white">.</span>
              </span>
            </Link>

            {/* NEW: Footer Subtitle */}
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              {/* Ensure you add "subtitle" to your common.json, or replace this with hardcoded text */}
              {t("common:footer.subtitle")}
            </h3>

            {/* Paragraph */}
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-[360px]">
              {t("common:footer.description")}
            </p> 
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-4">
              {[
                { name: "Facebook", icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/> },
                { name: "Twitter", icon: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/> },
                { name: "Instagram", icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></> }
              ].map((social) => (
                <a 
                  key={social.name}
                  href="#" 
                  aria-label={social.name} 
                  className="flex items-center justify-center w-[48px] h-[48px] rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(9,124,135,0.3)] transition-all duration-300"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (Takes up 2 columns) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-lg font-bold text-white tracking-wide">
              {t("common:footer.quickLinks")}
            </h4>
            <div className="flex flex-col gap-4">
              {["about", "treatments", "whyIndia", "services"].map((item) => (
                <Link 
                  key={item} 
                  href={`/${item === 'whyIndia' ? 'why-india' : item}`} 
                  className="text-neutral-400 text-base font-medium hover:text-[var(--color-secondary)] hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t(`common:nav.${item}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Support (Takes up 2 columns) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-lg font-bold text-white tracking-wide">
              {t("common:footer.support")}
            </h4>
            <div className="flex flex-col gap-4">
              {["hospitals", "faq", "contact"].map((item) => (
                <Link 
                  key={item} 
                  href={`/${item}`} 
                  className="text-neutral-400 text-base font-medium hover:text-[var(--color-secondary)] hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t(`common:nav.${item}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Contact Info (Takes up 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6 bg-white/5 p-8 rounded-[32px] border border-white/10 backdrop-blur-sm">
            <h4 className="text-lg font-bold text-white tracking-wide">
              {t("common:footer.contact")}
            </h4>
            
            <div className="flex flex-col gap-6">
              {/* Email Block */}
              <a href="mailto:info@ibnsima.com" className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-secondary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300 shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-neutral-400 font-medium mb-1">Drop us a line</span>
                  <span className="text-lg font-semibold text-white group-hover:text-[var(--color-secondary)] transition-colors">info@ibnsima.com</span>
                </div>
              </a>

              {/* Phone Block */}
              <a href="tel:+971000000000" className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-secondary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300 shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-neutral-400 font-medium mb-1">Call us 24/7</span>
                  <span className="text-xl font-bold text-white group-hover:text-[var(--color-secondary)] transition-colors">+971 00 000 0000</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-neutral-400">
          <p>&copy; {new Date().getFullYear()} {t("common:footer.title")}. {t("common:footer.rights")}</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">{t("common:footer.privacy")}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{t("common:footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};