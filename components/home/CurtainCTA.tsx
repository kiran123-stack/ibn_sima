"use client";

/* ============================================================
 * FINAL CTA SECTION (Home Page)
 * ============================================================
 * FIXED: Removed the buggy curtain animation that hid text.
 * ADDED: A clean, simple fade-up animation.
 * ADDED: A custom top-down airplane shape using clip-path in 
 *        the background to fit the medical travel theme.
 * ============================================================ */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { Button, ArrowRightIcon } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const CurtainCTA = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const airplaneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Simple, reliable fade-up for the main card
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // 2. Gentle continuous floating animation for the background airplane
      if (airplaneRef.current) {
        gsap.to(airplaneRef.current, {
          y: -40,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-[96px] lg:py-[160px] bg-[var(--color-neutral-light)] w-full overflow-hidden"
    >
      {/* 
        AIRPLANE SHAPED BLUE BACKGROUND 
        Uses a custom polygon clip-path to look like a plane from above 
      */}
      <div
        ref={airplaneRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] opacity-[0.06] pointer-events-none z-0"
        style={{
          background: "var(--color-primary)",
          clipPath: "polygon(50% 0%, 55% 30%, 100% 60%, 100% 70%, 55% 65%, 55% 85%, 70% 95%, 70% 100%, 50% 95%, 30% 100%, 30% 95%, 45% 85%, 45% 65%, 0% 70%, 0% 60%, 45% 30%)"
        }}
      />

      {/* CONTENT CARD */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[80px]">
        <div 
          ref={cardRef} 
          className="bg-[var(--color-neutral-white)] rounded-[40px] shadow-[0_24px_80px_rgba(0,0,0,0.06)] px-8 sm:px-16 lg:px-[100px] py-[64px] lg:py-[80px] text-center border border-[var(--color-neutral-border)]"
        >
          <span className="text-[var(--color-primary)] text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-[20px] block">
            {t("common:cta.beginJourney") || "Begin Your Journey"}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[var(--color-neutral-text)] leading-[1.15] tracking-tight mb-[24px] max-w-[700px] mx-auto">
            {t("home:cta.title") || "It starts with a conversation."}
          </h2>

          <p className="text-[var(--color-neutral-p)] text-base sm:text-lg leading-relaxed mb-[44px] max-w-[560px] mx-auto">
            {t("home:cta.description") || "Begin your healthcare journey with guidance, coordination, and compassionate support from our experienced team."}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" onClick={() => router.push('/contact')}>
              {t("home:cta.button") || "Start Your Healthcare Journey"}
            </Button>
            <Button variant="secondary" icon={<ArrowRightIcon />} onClick={() => router.push('/contact')}>
              {t("common:buttons.talkCoordinator") || "Talk to a Patient Coordinator"}
            </Button>
          </div>

          {/* Premium Trust Row with SVGs instead of Emojis */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mt-[48px] flex-wrap">
            
            <div className="flex items-center gap-2 text-[var(--color-neutral-muted)] text-sm font-medium">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>{t("common:cta.confidential") || "100% Confidential"}</span>
            </div>

            <div className="flex items-center gap-2 text-[var(--color-neutral-muted)] text-sm font-medium">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              <span>{t("common:cta.response") || "24 - 48 hr Response"}</span>
            </div>

            <div className="flex items-center gap-2 text-[var(--color-neutral-muted)] text-sm font-medium">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span>{t("common:cta.regions") || "Iraq - UAE - India"}</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};