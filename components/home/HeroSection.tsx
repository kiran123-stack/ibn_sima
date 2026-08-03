"use client";

/* ============================================================
 * HERO SECTION (Home Page — Section 1) — ORIGINAL
 * ============================================================
 * Full viewport height hero with text left, image right.
 * 
 * DESIGN SPECS (from Design.md):
 * - Height: 100vh (min 850px, max 980px)
 * - Layout: Left 42% text | Right 58% image
 * - Background: white + soft gradient from top-right
 * - Floating organic blobs behind image (animated, never stop)
 * - Staggered GSAP entrance: eyebrow → heading → paragraph → buttons → trust → image
 * - Scroll indicator bouncing at bottom center
 * 
 * CONTENT: Reads from home.json → hero section
 * ============================================================ */

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import { Button, ArrowRightIcon } from "@/components/ui/Button";

export const HeroSection = () => {
  const { t } = useLanguage();

  // Refs for GSAP animation targets
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered entrance animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(eyebrowRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.1)
      .fromTo(headingRef.current, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 0.2)
      .fromTo(pRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 0.34)
      .fromTo(btnsRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 0.42)
      .fromTo(trustRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 0.5)
      .fromTo(imgRef.current, { x: 80, scale: 1.08, opacity: 0 }, { x: 0, scale: 1, opacity: 1, duration: 1.5 }, 0.4)
      .fromTo(badge1Ref.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.9)
      .fromTo(badge2Ref.current, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, 1.0)
      .fromTo(badge3Ref.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.1);

    // Floating blob — infinite loop, 12s, yoyo
    gsap.to(blobRef.current, {
      y: "+=30", x: "+=20", rotation: "+=10",
      duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
  }, []);

  return (
    // FIX 1: Removed strict max-heights. Used min-h-screen for mobile to allow natural flowing, and increased pt for mobile navbar clearance.
    <section className="relative min-h-[100dvh] lg:min-h-[850px] w-full flex items-center pt-[120px] lg:pt-[140px] pb-16 lg:pb-0 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-bl from-[var(--color-neutral-light)] to-white -z-20"></div>

      {/* Organic blobs */}
      <div ref={blobRef} className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full blur-[80px] -z-10" style={{ backgroundColor: "rgba(35,206,217,0.08)" }}></div>
      <div className="absolute right-[10%] bottom-0 w-[500px] h-[500px] rounded-full blur-[80px] -z-10" style={{ backgroundColor: "rgba(249,215,121,0.10)" }}></div>

      {/* FIX 2: Changed items-end to items-center on mobile, added gap-10 so text and image don't overlap when stacked */}
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-10 lg:px-[80px] flex flex-col lg:flex-row items-center lg:items-end gap-10 lg:gap-0">
        
        {/* ---- LEFT: Text (42%) ---- */}
        {/* FIX 3: Removed bottom padding on mobile so it flows nicely into the image below it */}
        <div className="w-full lg:w-[42%] pb-0 lg:pb-[80px] flex flex-col items-start relative z-10">
          <span ref={eyebrowRef} className="text-[var(--color-primary)] text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-[24px]" style={{ opacity: 0 }}>
            {t("home:hero.badge")}
          </span>

          <h1 ref={headingRef} className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] lg:leading-[0.95] tracking-[-0.04em] font-semibold text-neutral-900 mb-[24px] lg:mb-[32px] max-w-[620px]" style={{ opacity: 0 }}>
            {t("home:hero.title")}
          </h1>

          <p ref={pRef} className="text-[var(--color-neutral-p)] text-base sm:text-lg leading-relaxed max-w-[560px] mb-[32px] lg:mb-[40px]" style={{ opacity: 0 }}>
            {t("home:hero.subtitle")}
          </p>

          <div ref={btnsRef} className="flex flex-wrap gap-[16px] lg:gap-[20px] mb-[40px] lg:mb-[64px]" style={{ opacity: 0 }}>
            <Button variant="primary">{t("home:hero.buttons.primary")}</Button>
            <Button variant="secondary" icon={<ArrowRightIcon />}>{t("home:hero.buttons.secondary")}</Button>
          </div>

          {/* FIX 4: Added flex-wrap here so the items drop to a new line on very small phones instead of breaking off screen */}
          <div ref={trustRef} className="flex flex-wrap items-center gap-[16px] lg:gap-[32px] text-sm font-medium text-[var(--color-neutral-text)]" style={{ opacity: 0 }}>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[var(--color-surface)]/30 flex items-center justify-center text-[var(--color-primary)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
              </span>
              Top Hospitals
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[var(--color-surface)]/30 flex items-center justify-center text-[var(--color-primary)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
              </span>
              Iraq, UAE &amp; India
            </div>
          </div>
        </div>

        {/* ---- RIGHT: Image (58%) ---- */}
        {/* FIX 5: Adjusted mobile height from 400px down to 350px so it fits better on small screens */}
        <div className="w-full lg:w-[58%] relative lg:-mr-[60px] h-[350px] sm:h-[600px] lg:h-[760px] self-end mt-4 lg:mt-0">
          <div ref={imgRef} className="relative w-full h-full rounded-tl-[40px] rounded-tr-[40px] lg:rounded-tr-none overflow-hidden shadow-2xl transform-gpu" style={{ opacity: 0 }}>
            <Image
              src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=2000&auto=format&fit=crop"
              alt="Premium Medical Consultation"
              fill
              className="object-cover object-center"
              priority
              loading="eager"
              sizes="(max-width: 768px) 100vw, 58vw"
            />
          </div>

          {/* FIX 6: Badges - Added scale-75 for mobile, adjusted coordinates so they don't clip off the left/right edges on small phones */}
          <div ref={badge1Ref} className="absolute top-[8%] lg:top-[12%] -left-2 lg:-left-[28px] bg-white p-3 lg:p-5 rounded-[20px] shadow-[0_16px_48px_rgba(0,0,0,0.10)] z-10 flex items-center gap-2 lg:gap-3 scale-75 lg:scale-100 origin-left" style={{ opacity: 0 }}>
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[var(--color-surface)]/20 rounded-full flex items-center justify-center text-[var(--color-primary)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <p className="text-base lg:text-lg font-black text-neutral-900 leading-none">500+</p>
              <p className="text-[10px] lg:text-xs text-neutral-500 mt-0.5">Patients Helped</p>
            </div>
          </div>

          <div ref={badge2Ref} className="absolute top-[40%] lg:top-[44%] -right-2 lg:-right-[28px] bg-[var(--color-primary)] p-3 lg:p-5 rounded-[20px] shadow-[0_16px_48px_rgba(9,124,135,0.3)] z-10 scale-75 lg:scale-100 origin-right" style={{ opacity: 0 }}>
            <p className="text-lg lg:text-xl font-black text-white leading-none">24/7</p>
            <p className="text-[9px] lg:text-[10px] text-white/80 mt-1 font-medium">Support</p>
          </div>

          <div ref={badge3Ref} className="absolute bottom-[10%] lg:bottom-[20%] -left-2 lg:-left-[28px] bg-white p-3 lg:p-5 rounded-[20px] shadow-[0_16px_48px_rgba(0,0,0,0.10)] z-10 flex items-center gap-2 lg:gap-3 scale-75 lg:scale-100 origin-left" style={{ opacity: 0 }}>
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[var(--color-secondary)]/15 rounded-full flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <div>
              <p className="text-base lg:text-lg font-black text-neutral-900 leading-none">3</p>
              <p className="text-[10px] lg:text-xs text-neutral-500 mt-0.5">Countries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:flex absolute bottom-[40px] left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-neutral-400 text-xs uppercase tracking-widest animate-bounce">
        <span>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
      </div>
    </section>
  );
};
