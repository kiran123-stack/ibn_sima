"use client";

/* ============================================================
 * WHY INDIA PAGE (components/why-india/WhyIndiaClient.tsx)
 * ============================================================
 * Follows design.md constraints for Page 05 - WHY INDIA:
 * - Hero: 55vh, white background, left aligned text.
 * - Reasons Grid: 6 cards, 3x2 on desktop, alternating backgrounds.
 * - Hospital Selection: Split layout, image overlapping by 60px.
 * Uses content from locals/en/why-india.json
 *
 * v2: premium pass — refined motion, layered depth on hero/split
 * imagery, per-card icon variety, replaced stock photography.
 * No copy, font-family, or color-token changes.
 * ============================================================ */

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------
 * Icon set for the Reasons Grid.
 * Six distinct marks (not one icon repeated) so each advantage
 * reads as its own idea. Cycled by index; safe if advantages.length
 * differs from 6 since we modulo against the array length.
 * ---------------------------------------------------------- */
const REASON_ICONS: React.ReactNode[] = [
  // 0 — Accreditation / seal (quality & standards)
  <svg key="seal" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
  </svg>,
  // 1 — Cost / value (rupee-style tag)
  <svg key="value" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.24L3 3v6.59a2 2 0 0 0 .59 1.41l9.59 9.59a2 2 0 0 0 2.82 0l4.59-4.59a2 2 0 0 0 0-2.82Z" />
    <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>,
  // 2 — Care / heart-pulse (clinical outcomes)
  <svg key="pulse" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 5.61a5.5 5.5 0 0 0-7.78 0L12 6.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
    <path d="M7 13h2.5l1.5-3 2 6 1.5-3H17" />
  </svg>,
  // 3 — Speed / calendar-clock (short wait times)
  <svg key="speed" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="17" rx="3" />
    <path d="M3 9h18" />
    <path d="M8 2v4M16 2v4" />
    <circle cx="15.5" cy="15.5" r="3.2" />
    <path d="M15.5 14v1.6l1.1.9" />
  </svg>,
  // 4 — People / expert network
  <svg key="network" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="3" />
    <circle cx="17" cy="7" r="2.4" />
    <path d="M2.5 20c.7-3.6 3-5.6 5.5-5.6s4.8 2 5.5 5.6" />
    <path d="M14.8 15.2c2 .2 3.7 1.9 4.2 4.8" />
  </svg>,
  // 5 — Global reach / compass
  <svg key="compass" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5Z" />
  </svg>,
];

/* ------------------------------------------------------------
 * Icon set for the "why choose us" checklist. A single check
 * still communicates completion clearly, so here we vary the
 * outer motif slightly (check vs. plus vs. star) to avoid
 * repeating the exact same glyph three-plus times in one view.
 * ---------------------------------------------------------- */
const LIST_ICONS: React.ReactNode[] = [
  <svg key="check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>,
  <svg key="plus" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>,
  <svg key="star" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3.5 14 9l5.5.5-4.2 3.6L16.7 19 12 15.9 7.3 19l1.4-5.9L4.5 9.5 10 9l2-5.5Z" />
  </svg>,
];

export function WhyIndiaClient() {
  const { t, getArray } = useLanguage();

  // FIX: Swapped "whyIndia" for "why-india" to match the actual JSON filename
  const advantages = getArray("why-india:advantages") as { title: string; description: string }[];
  const whyIbnSina = getArray("why-india:whyIbnSina.items") as { title: string; description: string }[];

  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        Array.from(heroRef.current.children),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      );
    }

    if (gridRef.current) {
      gsap.fromTo(
        Array.from(gridRef.current.children),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 75%" },
        }
      );
    }

    if (selectionRef.current) {
      gsap.fromTo(
        Array.from(selectionRef.current.children),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: selectionRef.current, start: "top 70%" },
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col w-full bg-white overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[55vh] w-full flex items-center pt-[88px]">
        {/* Faint ambient backdrop — quiet, not decorative-for-its-own-sake */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[var(--color-primary)]/[0.04] blur-3xl" />
        </div>

        <div className="max-w-[1280px] w-full mx-auto px-6 sm:px-10 lg:px-[80px] flex flex-col lg:flex-row items-center gap-12 relative z-10">

          <div ref={heroRef} className="w-full lg:w-[60%] flex flex-col items-start relative z-10">
            <span className="text-[var(--color-primary)] text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-[24px]">
              {t("why-india:hero.badge")}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[56px] leading-[0.95] tracking-[-0.04em] font-semibold text-neutral-900 mb-[32px] max-w-[620px]">
              {t("why-india:hero.title")}
            </h1>
            <p className="text-[var(--color-neutral-p)] text-base sm:text-lg leading-relaxed max-w-[560px]">
              {t("why-india:hero.subtitle")}
            </p>
          </div>

          <div className="hidden lg:block lg:w-[40%] relative h-[340px]">
            {/* Subtle offset frame behind the image for a layered, premium feel */}
            <div className="absolute -inset-3 rounded-[36px] border border-[var(--color-primary)]/10" />
            <Image
              src="/IMAGES/whyIndia.png"
              alt="International patient consultation for medical tourism in India"
              fill
              className="object-cover rounded-[32px] shadow-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* ================= REASONS GRID ================= */}
      <section className="py-[144px] bg-white w-full">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[80px]">

          <div className="text-center mb-[80px] max-w-[800px] mx-auto">
            <h2 className="text-3xl lg:text-[48px] font-semibold text-neutral-900 mb-[24px]">
              {t("why-india:overview.title")}
            </h2>
            <p className="text-[var(--color-neutral-p)] text-lg leading-relaxed">
              {t("why-india:overview.description")}
            </p>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages?.length > 0 && advantages.map((adv, i) => (
              <Card
                key={i}
                className={`group flex flex-col p-[36px] transition-all duration-[450ms] ease-out hover:-translate-y-[8px] hover:scale-[1.02] hover:shadow-[0_28px_80px_rgba(0,0,0,0.09)] ${i % 2 === 1 ? 'bg-[var(--color-neutral-light)]' : 'bg-white'}`}
              >
                <div className="w-[48px] h-[48px] bg-[var(--color-primary)]/10 rounded-[16px] flex items-center justify-center text-[var(--color-primary)] mb-[24px] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
                  {REASON_ICONS[i % REASON_ICONS.length]}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-[16px]">{adv.title}</h3>
                <p className="text-[var(--color-neutral-p)] leading-relaxed text-sm">
                  {adv.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOSPITAL SELECTION (Split Layout) ================= */}
      <section className="py-[144px] bg-[var(--color-neutral-light)] w-full">
        <div ref={selectionRef} className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[80px] flex flex-col lg:flex-row gap-16 items-center">

          <div className="w-full lg:w-[50%] flex flex-col">
            <h2 className="text-3xl lg:text-[40px] leading-[1.1] font-semibold text-neutral-900 mb-[24px]">
              {t("why-india:important.title")}
            </h2>
            <p className="text-[var(--color-neutral-p)] text-lg leading-relaxed mb-[32px]">
              {t("why-india:important.description")}
            </p>

            <div className="flex flex-col gap-6 mb-[48px]">
              {whyIbnSina?.length > 0 && whyIbnSina.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)]">
                    {LIST_ICONS[i % LIST_ICONS.length]}
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900">{item.title}</h4>
                    <p className="text-sm text-[var(--color-neutral-p)]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-l-4 border-[var(--color-accent)] pl-6 py-2">
              <p className="text-xl font-semibold text-[var(--color-primary)] italic">
                {t("why-india:important.highlight")}
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[50%] relative h-[500px] lg:h-[700px] lg:-mt-[120px]">
            {/* Layered depth: soft glow + offset ring behind the frame, matching hero's language */}
            <div className="absolute -inset-4 rounded-[40px] bg-[var(--color-primary)]/[0.06] blur-2xl" />
            <div className="relative h-full w-full rounded-[32px] overflow-hidden shadow-2xl ring-1 ring-black/5">
              <Image
                src="/IMAGES/whyIndia2.png"
                alt="Doctor consulting a medical tourism patient in India"
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="relative w-full bg-[var(--color-primary)] py-[160px] rounded-t-[64px] text-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-white/[0.06] blur-3xl" />
        </div>
        <div className="max-w-[900px] mx-auto px-6 flex flex-col items-center relative z-10">
          <h2 className="text-3xl lg:text-[56px] leading-[1.1] font-semibold text-white mb-[24px]">
            {t("why-india:cta.title")}
          </h2>
          <p className="text-white/80 text-lg mb-[48px] max-w-[560px]">
            {t("why-india:cta.description")}
          </p>
          <div className="flex flex-wrap gap-[20px] justify-center">
            <Button className="bg-black text-white hover:bg-neutral-100 border-none shadow-lg">
              {t("common:buttons.contact")}
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}