"use client";

/* ============================================================
 * TRUST STRIP (Home Page — Section 2)
 * ============================================================
 * Overlaps the hero by -60px. Shows 5 trust indicators.
 * Premium minimal style — no emoji, consistent SVGs.
 *
 * DESIGN: 1180px wide, white, rounded 32px, soft shadow.
 * i18n: All text from common.json → trust
 * ============================================================ */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const icons = [
  /* Hospital / network */
  <svg key="h" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>,
  /* Globe / countries */
  <svg key="g" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>,
  /* Heart / patient */
  <svg key="p" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
  </svg>,
  /* Clipboard / coordination */
  <svg key="c" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
    <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
  </svg>,
  /* Clock / 24-7 */
  <svg key="t" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>,
];

const labelKeys = [
  "common:trust.hospitals",
  "common:trust.countries",
  "common:trust.patientSupport",
  "common:trust.medicalCoordination",
  "common:trust.assistance",
] as const;

export const TrustStrip = () => {
  const { t } = useLanguage();
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stripRef.current) return;
    gsap.fromTo(
      Array.from(stripRef.current.children),
      { y: 16, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power2.out",
        scrollTrigger: {
          trigger: stripRef.current,
          start: "top bottom-=80",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div
      className="relative z-20 max-w-[1180px] mx-auto bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] -mt-[60px] px-8 py-6 sm:py-0 sm:h-[108px] flex items-center"
      role="list"
      aria-label="Trust indicators"
    >
      <div
        ref={stripRef}
        className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:divide-x sm:divide-neutral-100"
      >
        {labelKeys.map((key, i) => (
          <div
            key={i}
            role="listitem"
            className="flex flex-col items-center justify-center gap-2 py-2 group cursor-default transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="w-[44px] h-[44px] rounded-[14px] bg-[var(--color-surface)]/15 flex items-center justify-center text-[var(--color-primary)] transition-all duration-300 group-hover:bg-[var(--color-primary)] group-hover:text-white">
              {icons[i]}
            </span>
            <span className="text-xs sm:text-[13px] font-medium text-[var(--color-neutral-text)] text-center leading-tight">
              {t(key)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
