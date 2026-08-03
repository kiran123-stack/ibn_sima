"use client";

/* ============================================================
 * PATIENT SERVICES PAGE (components/services/PatientServicesClient.tsx)
 * ============================================================
 * Shares the visual system used across Contact / Treatments
 * (spacing tokens, radius scale, heritage motif). Every photo on
 * this page is newly sourced (verified free-license Unsplash
 * images) — no local project assets are referenced. Every icon
 * badge — the three section markers and the four benefit cards —
 * carries its own distinct hand-drawn SVG instead of one mark
 * repeated. No translation keys, copy, fonts, or color variables
 * were changed.
 * ============================================================ */

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/*  SHARED DESIGN TOKENS — identical to ContactClient.tsx /            */
/*  TreatmentsClient.tsx. Fonts and CSS color variables untouched.     */
/* ------------------------------------------------------------------ */
const CONTAINER = "max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20";
const SECTION_Y = "py-24 lg:py-36";
const RADIUS_SM = "rounded-2xl"; // 16px — icon badges, small photo insets
const RADIUS_MD = "rounded-3xl"; // 24px — cards
const RADIUS_LG = "rounded-[2.5rem]"; // 40px — hero band, large photo panels
const ELEV = "shadow-[0_24px_70px_-16px_rgba(15,23,42,0.16)]";

const EYEBROW = "text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]";
const HEADING = "text-3xl lg:text-[40px] leading-[1.1] tracking-[-0.02em] font-semibold";

/* Fresh photography — verified free-to-use Unsplash images. Nothing
   from the project's own /Images folder is used on this page. */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1758691462878-6edc3d3da1be?q=80&w=1600&auto=format&fit=crop"; // physician consulting a patient, warm tone
const BEFORE_IMAGE =
  "https://images.unsplash.com/photo-1655722723123-c68bdb4f3ce0?q=80&w=1200&auto=format&fit=crop"; // passport + boarding pass — travel prep
const DURING_IMAGE =
  "https://images.unsplash.com/photo-1758691463354-055e4d72e5fc?q=80&w=1200&auto=format&fit=crop"; // doctor caring for a family in-stay
const AFTER_IMAGE =
  "https://images.unsplash.com/photo-1758691462321-9b6c98c40f7e?q=80&w=1200&auto=format&fit=crop"; // follow-up home visit, warm recovery
const AIRPORT_ACCENT_IMAGE =
  "https://images.unsplash.com/photo-1690643379665-c11b2c07ffe9?q=80&w=800&auto=format&fit=crop"; // same photo used on Treatments' Why Choose band

/**
 * Eight-point rosette — the same heritage signature used on the
 * Contact and Treatments pages, kept as a quiet page-signature
 * accent so every route reads as one brand.
 */
function HeritageMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 320" fill="none" className={className} aria-hidden="true">
      <circle cx="160" cy="160" r="150" stroke="currentColor" strokeWidth="1" />
      <circle cx="160" cy="160" r="96" stroke="currentColor" strokeWidth="1" />
      <polygon points="160,20 300,160 160,300 20,160" stroke="currentColor" strokeWidth="1" />
      <polygon points="259,259 61,259 61,61 259,61" stroke="currentColor" strokeWidth="1" />
      <circle cx="160" cy="160" r="3.5" fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  ICON SET — every section marker and every benefit card gets its    */
/*  own single-stroke mark, none repeated.                             */
/* ------------------------------------------------------------------ */
function IconPlane({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M2.5 15.5 21 8.2c.9-.35.9-1.65 0-2L2.5 8.5v3l6 1.6-6 1.7v.7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 13.1 11 20l1.6-1 .4-4.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconClipboard({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="5.5" y="4.5" width="13" height="16" rx="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 4.5V4a2 2 0 0 1 4 0v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.5 11.5h7M8.5 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconHeartPulse({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 19.4s-6.6-4-8.7-7.9C1.9 8.6 3.3 5.4 6.5 5.4c1.9 0 3.3 1.2 3.9 2.6.6-1.4 2-2.6 3.9-2.6 3.2 0 4.6 3.2 3.2 6.1-.4.8-1 1.6-1.6 2.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 13h3l1.5-3 2 5 1.5-3.5 1 1.5h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCompass({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 9l-2 5-4.5 1.5L10.5 10 15 9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function IconShieldCheck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3.3 18.5 6v5.2c0 4.4-3 7.3-6.5 8.3-3.5-1-6.5-3.9-6.5-8.3V6L12 3.3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9.2 12l1.9 1.9 3.7-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconHeadset({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="3" y="13" width="4" height="6" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M19 19.5v.5a3 3 0 0 1-3 3h-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconGlobe({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12h18M12 3a14 14 0 0 1 3.3 9A14 14 0 0 1 12 21 14 14 0 0 1 8.7 12 14 14 0 0 1 12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconHandHeart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3.5 13.5v6M3.5 14l4.3-1.2c.7-.2 1.4-.1 2 .2l3.4 1.6c.9.4.9 1.7-.1 2l-6 1.7-3.6-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 12.8 17 10.4c.8-.4 1.7 0 1.9.8.2.6-.1 1.2-.7 1.5l-4.4 2.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 8.4c-1.4-1.4-1.5-3.4-.2-4.6.9-.8 2.2-.6 2.9.2.7-.8 2-1 2.9-.2 1.3 1.2 1.2 3.2-.2 4.6L18 10 15 8.4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

// Cycled for the benefits grid so every card gets a distinct mark
// regardless of how many items the dictionary defines.
const BENEFIT_ICONS = [IconShieldCheck, IconHeadset, IconGlobe, IconHandHeart];

export function PatientServicesClient() {
  const { t, getArray } = useLanguage();

  // Safely extract arrays from our JSON dictionary — unchanged
  const beforeItems = getArray("patient-services:services.beforeTreatment.items") as string[];
  const duringItems = getArray("patient-services:services.duringTreatment.items") as string[];
  const afterItems = getArray("patient-services:services.afterTreatment.items") as string[];
  const benefits = getArray("patient-services:benefits.items") as { title: string; description: string }[];

  const heroRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const duringRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const promiseRef = useRef<HTMLDivElement>(null);
  const beforeImgRef = useRef<HTMLDivElement>(null);
  const duringImgRef = useRef<HTMLDivElement>(null);
  const afterImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Hero Content Entrance
    if (heroRef.current) {
      gsap.fromTo(
        Array.from(heroRef.current.children),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      );
    }

    const revealImage = (
      imageRef: React.RefObject<HTMLDivElement | null>,
      triggerRef: React.RefObject<HTMLDivElement | null>
    ) => {
      if (!imageRef.current || !triggerRef.current) return;

      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.6,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 65%",
          },
        }
      );
    };

    // Generic reveal function for alternating sections
    const revealSection = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current) {
        gsap.fromTo(
          Array.from(ref.current.children),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: { trigger: ref.current, start: "top 75%" },
          }
        );
      }
    };

    revealSection(beforeRef);
    revealSection(duringRef);
    revealSection(afterRef);
    revealImage(beforeImgRef, beforeRef);
    revealImage(duringImgRef, duringRef);
    revealImage(afterImgRef, afterRef);

    // Support Promise Card Reveal
    if (promiseRef.current) {
      gsap.fromTo(
        promiseRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: promiseRef.current, start: "top 80%" },
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col w-full bg-white overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[55vh] w-full flex items-center pt-[88px]">
        <div className={`${CONTAINER} w-full flex flex-col lg:flex-row items-center gap-12`}>
          <div ref={heroRef} className="w-full lg:w-[60%] flex flex-col items-start relative z-10">
            <span className={`${EYEBROW} text-[var(--color-primary)] mb-6`}>
              {t("patient-services:hero.badge")}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[56px] leading-[0.95] tracking-[-0.04em] font-semibold text-neutral-900 mb-8 max-w-[620px]">
              {t("patient-services:hero.title")}
            </h1>
            <p className="text-[var(--color-neutral-p)] text-base sm:text-lg leading-relaxed max-w-[560px]">
              {t("patient-services:hero.subtitle")}
            </p>
          </div>

          <div className="hidden lg:block lg:w-[40%] relative h-[340px]">
            <div className={`relative w-full h-full overflow-hidden ${RADIUS_LG} ${ELEV}`}>
              <Image
                src={HERO_IMAGE}
                alt="Coordinator supporting a patient"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            <HeritageMark className="pointer-events-none absolute -top-10 -right-10 w-[180px] h-[180px] text-[var(--color-primary)] opacity-[0.08]" />

            {/* Floating "we bring you here" travel accent — reuses the
                same airport photo as the Treatments page for continuity. */}
            <div className={`absolute -bottom-8 -left-8 w-[128px] h-[104px] ${RADIUS_SM} overflow-hidden border-4 border-white ${ELEV} z-20`}>
              <Image src={AIRPORT_ACCENT_IMAGE} alt="" fill className="object-cover" aria-hidden="true" />
            </div>
            <div className="absolute -bottom-8 -left-8 translate-x-[104px] translate-y-[-14px] w-11 h-11 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white shadow-lg z-30">
              <IconPlane className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= BEFORE TREATMENT (45/55 Image Left) ================= */}
      <section className={`${SECTION_Y} bg-white w-full`}>
        <div ref={beforeRef} className={`${CONTAINER} flex flex-col lg:flex-row gap-16 items-center`}>
          <div className={`w-full lg:w-[45%] relative h-[400px] lg:h-[560px] ${RADIUS_LG} overflow-hidden ${ELEV}`}>
            <div ref={beforeImgRef} className="absolute inset-0">
              <Image src={BEFORE_IMAGE} alt="Preparing travel documents before treatment" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </div>
          <div className="w-full lg:w-[55%] flex flex-col">
            <div className={`w-12 h-12 bg-[var(--color-primary)]/10 ${RADIUS_SM} flex items-center justify-center text-[var(--color-primary)] mb-6`}>
              <IconClipboard className="w-6 h-6" />
            </div>
            <h2 className={`${HEADING} text-neutral-900 mb-6`}>
              {t("patient-services:services.beforeTreatment.title")}
            </h2>
            <p className="text-[var(--color-neutral-p)] text-lg leading-relaxed mb-12 max-w-[500px]">
              {t("patient-services:services.beforeTreatment.description")}
            </p>
            {/* Premium Checklist Container */}
            <div className={`bg-[var(--color-neutral-light)] p-8 ${RADIUS_MD}`}>
              <ul className="flex flex-col gap-5">
                {beforeItems?.length > 0 && beforeItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <span className="text-[var(--color-neutral-text)] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DURING YOUR STAY (55/45 Image Right, Grey Background) ================= */}
      <section className={`${SECTION_Y} bg-[var(--color-neutral-light)] w-full`}>
        <div ref={duringRef} className={`${CONTAINER} flex flex-col-reverse lg:flex-row gap-16 items-center`}>
          <div className="w-full lg:w-[55%] flex flex-col">
            <div className={`w-12 h-12 bg-[var(--color-primary)]/10 ${RADIUS_SM} flex items-center justify-center text-[var(--color-primary)] mb-6`}>
              <IconHeartPulse className="w-6 h-6" />
            </div>
            <h2 className={`${HEADING} text-neutral-900 mb-6`}>
              {t("patient-services:services.duringTreatment.title")}
            </h2>
            <p className="text-[var(--color-neutral-p)] text-lg leading-relaxed mb-12 max-w-[500px]">
              {t("patient-services:services.duringTreatment.description")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              {duringItems?.length > 0 && duringItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] flex-shrink-0"></div>
                  <span className="text-[var(--color-neutral-text)] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[45%] relative h-[400px] lg:h-[560px]">
            <div ref={duringImgRef} className={`absolute inset-0 ${RADIUS_LG} overflow-hidden ${ELEV}`}>
              <Image src={DURING_IMAGE} alt="During Treatment" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>
            {/* Floating Support Card Overlapping Image */}
            <div className={`absolute -bottom-6 -left-6 bg-white p-5 ${RADIUS_MD} shadow-[0_20px_60px_rgba(0,0,0,0.12)] flex items-center gap-4 z-20`}>
              <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center text-[var(--color-primary)]">
                <IconHeadset className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= AFTER TREATMENT (45/55 Image Left, Timeline Right) ================= */}
      <section className={`${SECTION_Y} bg-white w-full`}>
        <div ref={afterRef} className={`${CONTAINER} flex flex-col lg:flex-row gap-16 items-center`}>
          <div className={`w-full lg:w-[45%] relative h-[400px] lg:h-[560px] ${RADIUS_LG} overflow-hidden ${ELEV}`}>
            <div ref={afterImgRef} className="absolute inset-0">
              <Image src={AFTER_IMAGE} alt="After Treatment" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>
          </div>
          <div className="w-full lg:w-[55%] flex flex-col">
            <div className={`w-12 h-12 bg-[var(--color-primary)]/10 ${RADIUS_SM} flex items-center justify-center text-[var(--color-primary)] mb-6`}>
              <IconCompass className="w-6 h-6" />
            </div>
            <h2 className={`${HEADING} text-neutral-900 mb-6`}>
              {t("patient-services:services.afterTreatment.title")}
            </h2>
            <p className="text-[var(--color-neutral-p)] text-lg leading-relaxed mb-12 max-w-[500px]">
              {t("patient-services:services.afterTreatment.description")}
            </p>
            {/* Vertical Numbered Connector Line */}
            <div className="flex flex-col gap-0 border-l-2 border-[var(--color-neutral-border)] ml-[14px]">
              {afterItems?.length > 0 && afterItems.map((item, i) => (
                <div key={i} className="relative pl-8 pb-8 last:pb-0">
                  <div className="absolute left-[-15px] top-0 w-7 h-7 rounded-full bg-white border-2 border-[var(--color-primary)] flex items-center justify-center text-[10px] font-bold text-[var(--color-primary)]">
                    0{i + 1}
                  </div>
                  <p className="text-[var(--color-neutral-text)] font-medium -mt-1">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SUPPORT PROMISE (Full-width Premium Card) ================= */}
      <section className="py-24 bg-white w-full">
        <div className={CONTAINER}>
          <div
            ref={promiseRef}
            className={`relative w-full bg-[var(--color-primary)]/5 ${RADIUS_LG} p-10 lg:p-16 flex flex-col items-center overflow-hidden`}
          >
            <HeritageMark className="pointer-events-none absolute -top-16 -right-16 w-[260px] h-[260px] text-[var(--color-primary)] opacity-[0.06]" />
            <h2 className="relative text-2xl lg:text-[36px] font-semibold text-neutral-900 mb-12 text-center">
              {t("patient-services:benefits.title")}
            </h2>
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
              {benefits?.length > 0 && benefits.map((benefit, i) => {
                const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
                return (
                  <div
                    key={i}
                    className={`flex flex-col items-center text-center bg-white p-8 ${RADIUS_MD} ${ELEV} transition-all duration-500 ease-out hover:-translate-y-1.5`}
                  >
                    <div className={`w-11 h-11 bg-[var(--color-primary)]/10 ${RADIUS_SM} flex items-center justify-center text-[var(--color-primary)] mb-5`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-neutral-900 mb-2">{benefit.title}</h4>
                    <p className="text-sm text-[var(--color-neutral-p)] leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className={`relative w-full bg-[var(--color-primary)] ${SECTION_Y} rounded-t-[2.5rem] text-center overflow-hidden`}>
        <HeritageMark className="pointer-events-none absolute -bottom-28 -right-28 w-[380px] h-[380px] text-white opacity-[0.07]" />
        <div className="relative max-w-[900px] mx-auto px-6 flex flex-col items-center">
          <h2 className="text-3xl lg:text-[56px] leading-[1.1] font-semibold text-white mb-6">
            {t("patient-services:cta.title")}
          </h2>
          <p className="text-white/80 text-lg mb-12 max-w-[560px]">
            {t("patient-services:cta.description")}
          </p>
          <div className="flex flex-wrap gap-5 justify-center">
            <Button className="bg-black text-white hover:bg-neutral-100 border-none shadow-lg transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]">
              {t("common:buttons.contact")}
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}