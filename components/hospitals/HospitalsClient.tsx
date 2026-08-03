"use client";

/* ============================================================
 * HOSPITALS & DOCTORS PAGE (components/hospitals/HospitalsClient.tsx)
 * ============================================================
 * Uses the exact content from locals/en/hospitals.json
 * Supports multi-language translation without hardcoded text.
 * Premium, elegant layout with GSAP scroll animations.
 * ============================================================ */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useRouter } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------
 * A small rotating set of distinct, hand-drawn line icons —
 * one per service card so the grid never repeats itself.
 * All strokes inherit currentColor so they follow the theme.
 * ------------------------------------------------------------ */
const SERVICE_ICONS: React.ReactNode[] = [
  // Pulse / cardiac care
  <svg key="pulse" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>,
  // Stethoscope / diagnostics
  <svg key="stethoscope" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 3v6a4.5 4.5 0 0 0 9 0V3" />
    <path d="M9 13.5V16a5 5 0 0 0 10 0v-2" />
    <circle cx="19.5" cy="12" r="1.75" />
    <circle cx="4.5" cy="3" r="1" />
    <circle cx="9" cy="3" r="1" />
  </svg>,
  // Shield / protective care
  <svg key="shield" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.5 4.5 5.5v6c0 5 3.2 8.4 7.5 10 4.3-1.6 7.5-5 7.5-10v-6L12 2.5Z" />
    <path d="M9.25 12.25 11.25 14.25 15 10" />
  </svg>,
  // Global network / coordination
  <svg key="globe" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.6 2.6 4 5.8 4 9s-1.4 6.4-4 9c-2.6-2.6-4-5.8-4-9s1.4-6.4 4-9Z" />
  </svg>,
  // Building / facility
  <svg key="building" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 21V6.5L12 3l7 3.5V21" />
    <path d="M9 21v-6h6v6" />
    <path d="M9 10h.01M12 10h.01M15 10h.01M9 13.5h.01M15 13.5h.01" />
  </svg>,
  // Care / hand & cross
  <svg key="care" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12.5c0 4.5 3.5 7 8 8 4.5-1 8-3.5 8-8V6l-8-3-8 3v6.5Z" />
    <path d="M12 8.5v6M9 11.5h6" />
  </svg>,
];

export function HospitalsClient() {
  const { t, getArray } = useLanguage();
  const router = useRouter();

  // Extract arrays securely using the hook
  const services = getArray("hospitals:services.items") as { title: string; description: string }[];
  const steps = getArray("hospitals:process.steps") as { number: string; title: string }[];

  // GSAP Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Hero Content Entrance
    if (heroRef.current) {
      gsap.fromTo(
        Array.from(heroRef.current.children),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      );
    }

    // 2. Intro / Approach Section Reveal
    if (introRef.current) {
      gsap.fromTo(
        Array.from(introRef.current.children),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: introRef.current, start: "top 75%" },
        }
      );
    }

    // 3. Services Grid Stagger
    if (servicesRef.current) {
      gsap.fromTo(
        Array.from(servicesRef.current.children),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: servicesRef.current, start: "top 75%" },
        }
      );
    }

    // 4. Process Steps Reveal
    if (processRef.current) {
      gsap.fromTo(
        Array.from(processRef.current.children),
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: processRef.current, start: "top 80%" },
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col w-full bg-white overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[64vh] w-full flex items-center pt-[140px] lg:pt-[168px] pb-[72px] bg-gradient-to-br from-white via-white to-[var(--color-neutral-light)] overflow-hidden">
        {/* Ambient background accents */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-[var(--color-primary)]/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full bg-[var(--color-primary)]/[0.04] blur-3xl" />

        <div className="max-w-[1280px] w-full mx-auto px-6 sm:px-10 lg:px-[80px] flex flex-col lg:flex-row items-center gap-14 relative z-10">

          <div ref={heroRef} className="w-full lg:w-[55%] flex flex-col items-start relative z-10">
            <span className="inline-flex items-center gap-2 text-[var(--color-primary)] text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-[24px]">
              <span className="w-[26px] h-[1.5px] bg-[var(--color-primary)]" />
              {t("hospitals:hero.badge")}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[56px] leading-[1.05] tracking-[-0.03em] font-semibold text-neutral-900 mb-[24px]">
              {t("hospitals:hero.title")}
            </h1>
            <p className="text-xl font-medium text-neutral-800 mb-[16px] max-w-[560px] leading-snug">
              {t("hospitals:hero.subtitle")}
            </p>
            <p className="text-[var(--color-neutral-p)] text-base sm:text-lg leading-relaxed max-w-[560px]">
              {t("hospitals:hero.description")}
            </p>
          </div>

          {/* Custom SVG illustration replaces the raster hero image */}
          <div className="hidden lg:flex lg:w-[45%] relative h-[440px] items-center justify-center">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[var(--color-neutral-light)] to-white shadow-2xl border border-[var(--color-neutral-border)]/60" />
            <svg
              viewBox="0 0 400 400"
              className="relative w-[82%] h-[82%] text-[var(--color-primary)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soft radial backdrop */}
              <circle cx="200" cy="200" r="170" fill="var(--color-primary)" fillOpacity="0.05" />
              <circle cx="200" cy="200" r="128" stroke="var(--color-primary)" strokeOpacity="0.15" strokeWidth="1" />

              {/* Facility silhouette */}
              <path d="M120 260V150l80-40 80 40v110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M150 260v-60h100v60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M190 200h20v60h-20z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M140 180h16M140 200h16M244 180h16M244 200h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

              {/* Cross emblem */}
              <path d="M200 122v28M186 136h28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />

              {/* Ground line */}
              <path d="M95 260h210" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />

              {/* Pulse trace */}
              <path
                d="M70 300h50l14 -22 16 40 14 -60 14 32h122"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.55"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ================= INTRO & APPROACH (Split Layout) ================= */}
      <section className="py-[120px] lg:py-[160px] bg-white w-full">
        <div ref={introRef} className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[80px] flex flex-col lg:flex-row gap-16 justify-between">

          {/* Introduction Block */}
          <div className="w-full lg:w-[45%]">
            <h2 className="text-3xl lg:text-[40px] font-semibold text-neutral-900 mb-[24px] leading-tight">
              {t("hospitals:introduction.title")}
            </h2>
            <p className="text-[var(--color-neutral-p)] text-lg leading-relaxed">
              {t("hospitals:introduction.description")}
            </p>
          </div>

          {/* Approach Block */}
          <div className="w-full lg:w-[45%] relative bg-[var(--color-neutral-light)] p-8 lg:p-12 rounded-[32px] shadow-[0_1px_0_0_rgba(0,0,0,0.03)] border border-[var(--color-neutral-border)]/40">
            <h3 className="text-2xl lg:text-3xl font-semibold text-neutral-900 mb-[20px]">
              {t("hospitals:approach.title")}
            </h3>
            <p className="text-[var(--color-neutral-p)] text-lg leading-relaxed mb-[32px]">
              {t("hospitals:approach.description")}
            </p>
            <div className="border-l-4 border-[var(--color-primary)] pl-6 py-2">
              <p className="text-xl font-bold text-[var(--color-primary)]">
                {t("hospitals:approach.highlight")}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="py-[120px] lg:py-[160px] bg-[var(--color-neutral-light)] w-full">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[80px]">

          <div className="text-center mb-[80px]">
            <h2 className="text-3xl lg:text-[48px] font-semibold text-neutral-900 mb-[24px]">
              {t("hospitals:services.title")}
            </h2>
          </div>

          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.length > 0 && services.map((service, i) => (
              <Card
                key={i}
                className="group flex flex-col p-8 transition-all duration-[450ms] hover:-translate-y-[8px] hover:shadow-xl bg-white border border-transparent hover:border-[var(--color-primary)]/20"
              >
                <div className="w-[56px] h-[56px] bg-[var(--color-surface)]/20 rounded-[16px] flex items-center justify-center text-[var(--color-primary)] mb-[24px] transition-transform duration-[450ms] group-hover:scale-105">
                  {SERVICE_ICONS[i % SERVICE_ICONS.length]}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-[16px]">{service.title}</h3>
                <p className="text-[var(--color-neutral-p)] leading-relaxed text-sm">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* ================= PROCESS STEPS ================= */}
      <section className="py-[120px] lg:py-[160px] bg-white w-full overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[80px]">

          <div className="mb-[80px] lg:mb-[100px]">
            <h2 className="text-3xl lg:text-[40px] font-semibold text-neutral-900">
              {t("hospitals:process.title")}
            </h2>
          </div>

          {/* Horizontal connecting steps for desktop, vertical for mobile */}
          <div ref={processRef} className="flex flex-col lg:flex-row gap-10 lg:gap-6 relative">
            {/* Background connecting line (visible on desktop) */}
            <div className="hidden lg:block absolute top-[28px] left-[20px] right-[20px] h-[2px] bg-[var(--color-neutral-border)] z-0" />

            {steps?.length > 0 && steps.map((step, i) => (
              <div key={i} className="flex-1 relative z-10 flex flex-row lg:flex-col items-start gap-6 lg:gap-8 group">
                <div className="flex-shrink-0 w-[60px] h-[60px] rounded-full bg-white border-2 border-[var(--color-neutral-border)] flex items-center justify-center text-xl font-bold text-[var(--color-neutral-text)] transition-colors duration-300 group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)] shadow-sm">
                  {step.number}
                </div>
                <div className="pt-3 lg:pt-0">
                  <h4 className="text-lg font-bold text-neutral-900 leading-snug">
                    {step.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="relative w-full bg-[var(--color-primary)] py-[140px] lg:py-[160px] rounded-t-[48px] lg:rounded-t-[64px] text-center overflow-hidden">
        <div className="pointer-events-none absolute -top-16 -left-16 w-[280px] h-[280px] rounded-full bg-white/[0.06] blur-2xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full bg-white/[0.05] blur-3xl" />

        <div className="max-w-[900px] mx-auto px-6 flex flex-col items-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-[56px] leading-[1.1] font-semibold text-white mb-[24px]">
            {t("hospitals:cta.title")}
          </h2>
          <p className="text-white/80 text-lg mb-[48px] max-w-[560px]">
            {t("hospitals:cta.description")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              className="bg-primary text-[var(--color-primary)] hover:bg-neutral-100 border-none shadow-lg"
              onClick={() => router.push('/contact')}
            >
              {t("hospitals:cta.primaryButton")}
            </Button>
            <Button
              variant="secondary"
              className="bg-transparent text-black hover:bg-white/10 border border-white/30 shadow-lg"
              onClick={() => router.push('/contact')}
            >
              {t("hospitals:cta.secondaryButton")}
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}