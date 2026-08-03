"use client";

/* ============================================================
 * TREATMENTS PAGE CLIENT COMPONENT (components/treatments/TreatmentsClient.tsx)
 * ============================================================
 * Shares the same visual system as ContactClient.tsx (tokens,
 * heritage motif, hero pattern) so the two pages read as one site.
 * Specialty cards are icon-led (no photography) in a horizontal
 * scroll-snap slider. No translation keys, copy, or data shape
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
/*  SHARED DESIGN TOKENS — identical to ContactClient.tsx              */
/* ------------------------------------------------------------------ */
const CONTAINER = "max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20";
const SECTION_Y = "py-24 lg:py-36";
const RADIUS_SM = "rounded-2xl"; // 16px — icon badges
const RADIUS_MD = "rounded-3xl"; // 24px — cards
const RADIUS_LG = "rounded-[2.5rem]"; // 40px — image bands, floating panels
const ELEV = "shadow-[0_24px_70px_-16px_rgba(15,23,42,0.16)]";

const EYEBROW = "text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]";
const DISPLAY =
  "text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-[-0.03em] font-semibold";
const HEADING =
  "text-3xl sm:text-4xl lg:text-[40px] leading-[1.1] tracking-[-0.02em] font-semibold";
const CARD_TITLE = "text-xl font-semibold";
const BODY_LG = "text-base sm:text-lg leading-relaxed";

/* Fresh photography — verified free-to-use Unsplash images, distinct
   from anything already used on the Contact page. */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1758691462863-9e1b8a863140?q=80&w=2400&auto=format&fit=crop"; // doctor consulting a patient
const WHY_CHOOSE_BG_IMAGE =
  "https://images.unsplash.com/photo-1690643379665-c11b2c07ffe9?q=80&w=1600&auto=format&fit=crop"; // international air travel — global-care motif

/**
 * Eight-point rosette — the same heritage signature used on the
 * Contact page, kept as a quiet page-signature accent so it reads
 * as one brand across routes.
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
/*  SPECIALTY ICONS — single-stroke line marks, one signature shape    */
/*  per field of care. Replaces photography entirely on these cards.   */
/* ------------------------------------------------------------------ */
function IconHeart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 20.2s-7.2-4.4-9.6-8.8C1 8.4 2.6 4.8 6.2 4.8c2.1 0 3.7 1.3 4.3 2.8.6-1.5 2.2-2.8 4.3-2.8 3.6 0 5.2 3.6 3.8 6.6-2.4 4.4-9.6 8.8-9.6 8.8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconRibbon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="7.2" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9.6 9.8 6.5 20l5.5-2.8 5.5 2.8-3.1-10.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBrain({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9.3 4.2C7.4 4.2 6 5.6 6 7.3c0 .6.2 1.2.5 1.7-1.1.5-1.9 1.6-1.9 2.9 0 1.3.8 2.4 2 2.8-.1.4-.2.8-.2 1.2 0 1.9 1.5 3.4 3.4 3.4.5 0 1-.1 1.4-.3V6.1c-.4-1.1-1.3-1.9-1.9-1.9z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.7 4.2c1.9 0 3.3 1.4 3.3 3.1 0 .6-.2 1.2-.5 1.7 1.1.5 1.9 1.6 1.9 2.9 0 1.3-.8 2.4-2 2.8.1.4.2.8.2 1.2 0 1.9-1.5 3.4-3.4 3.4-.5 0-1-.1-1.4-.3V6.1c.4-1.1 1.3-1.9 1.9-1.9z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7.2 7.2 16.8 16.8"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <circle cx="5.6" cy="5.6" r="2.1" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18.4" cy="18.4" r="2.1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconPulse({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M2.5 12h4l2-6 3.5 12 2.5-9 1.5 3h5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconShield({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3.5 19 6v5.4c0 4.6-3.1 7.6-7 8.6-3.9-1-7-4-7-8.6V6l7-2.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.3 12.2l1.9 1.9 3.6-3.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconArrow({ className = "", dir = "right" }: { className?: string; dir?: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ transform: dir === "left" ? "rotate(180deg)" : undefined }}
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Icons assigned in order — first four carry a field-specific mark,
// any additional specialties cycle through the remaining set so every
// card still gets a distinct, deliberate icon rather than a repeat.
const SPECIALTY_ICONS = [IconHeart, IconRibbon, IconBrain, IconBone, IconPulse, IconShield];

export function TreatmentsClient() {
  const { t, getArray } = useLanguage();

  // Load arrays from treatments.json dictionary — unchanged
  const specialties = getArray("treatments:specialties") as { title: string; description: string }[];
  const whyChoose = getArray("treatments:whyChoose.items") as { title: string; description: string }[];

  // Refs for GSAP animation targets
  const heroContentRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const whyChooseGridRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (dir: 1 | -1) => {
    sliderRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  useEffect(() => {
    // 1. Hero Content Staggered Entrance
    if (heroContentRef.current) {
      gsap.fromTo(
        Array.from(heroContentRef.current.children),
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      );
    }

    // 2. Specialties Slider Staggered Reveal
    if (cardsGridRef.current) {
      gsap.fromTo(
        Array.from(cardsGridRef.current.children),
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsGridRef.current,
            start: "top 78%",
          },
        }
      );
    }

    // 3. Why Choose Grid Reveal
    if (whyChooseGridRef.current) {
      gsap.fromTo(
        Array.from(whyChooseGridRef.current.children),
        { y: 36, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: whyChooseGridRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col w-full pt-[100px] lg:pt-[60px]  bg-white overflow-hidden">

      {/* ================= HERO — image band on top, text band below ================= */}
      <section className="relative w-full pt-[88px]">
        <div
          className={`relative w-full h-[52vh] min-h-[400px] max-h-[600px]  overflow-hidden ${RADIUS_LG} rounded-t-none`}
        >
          <Image
            src={HERO_IMAGE}
            alt="Medical Consultation"
            fill
            priority
            className="object-cover object-[center_32%] hero-image-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
          <HeritageMark className="pointer-events-none absolute -top-14 -right-14 w-[260px] h-[260px] text-white opacity-[0.14]" />

          <div className="absolute left-6 sm:left-10 lg:left-20 top-8 fade-slide-up">
            <span
              className={`${EYEBROW} inline-flex items-center gap-2 bg-white/90 backdrop-blur-md text-[var(--color-primary)] px-5 py-2.5 ${RADIUS_SM} shadow-sm border border-white/60`}
            >
              {t("treatments:hero.badge")}
            </span>
          </div>
        </div>

        <div
          ref={heroContentRef}
          className={`${CONTAINER} py-14 lg:py-20 flex flex-col lg:flex-row lg:items-start justify-between gap-10 lg:gap-16 border-b border-[var(--color-neutral-border)]`}
        >
          <h1 className={`${DISPLAY} text-neutral-900 max-w-[620px]`}>
            {t("treatments:hero.title")}
          </h1>
          <div className="flex flex-col gap-6 max-w-[440px] lg:pl-10 lg:border-l lg:border-[var(--color-neutral-border)]">
            <p className={`${BODY_LG} text-[var(--color-neutral-p)]`}>
              {t("treatments:hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ================= SPECIALTIES — icon-led horizontal slider ================= */}
      <section className={`${SECTION_Y} bg-white w-full`}>
        <div className={CONTAINER}>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div className="max-w-[640px]">
              <h2 className={`${HEADING} text-neutral-900 mb-6`}>
                {t("treatments:overview.title")}
              </h2>
              <p className={`${BODY_LG} text-[var(--color-neutral-p)]`}>
                {t("treatments:overview.description")}
              </p>
            </div>

            {/* Slider controls */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                aria-label="Scroll specialties left"
                onClick={() => scrollSlider(-1)}
                className="w-12 h-12 rounded-full border border-[var(--color-neutral-border)] flex items-center justify-center text-neutral-900 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-300"
              >
                <IconArrow dir="left" className="w-5 h-5" />
              </button>
              <button
                type="button"
                aria-label="Scroll specialties right"
                onClick={() => scrollSlider(1)}
                className="w-12 h-12 rounded-full border border-[var(--color-neutral-border)] flex items-center justify-center text-neutral-900 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-300"
              >
                <IconArrow dir="right" className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={(el) => {
    cardsGridRef.current = el;
    sliderRef.current = el;
  }}
            className="slider-track flex gap-8 overflow-x-auto pb-6 -mx-6 px-6 sm:-mx-10 sm:px-10 lg:-mx-20 lg:px-20"
          >
            {specialties?.length > 0 &&
              specialties.map((specialty, i) => {
                const Icon = SPECIALTY_ICONS[i % SPECIALTY_ICONS.length];
                return (
                  <div
                    key={i}
                    className={`slider-card group shrink-0 w-[280px] sm:w-[320px] flex flex-col bg-white ${RADIUS_MD} ${ELEV} border border-[var(--color-neutral-border)]/60 p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_32px_90px_-16px_rgba(15,23,42,0.22)]`}
                  >
                    <div
                      className={`w-16 h-16 bg-[var(--color-surface)]/20 ${RADIUS_SM} flex items-center justify-center text-[var(--color-primary)] mb-8 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className={`${CARD_TITLE} text-neutral-900 mb-3`}>{specialty.title}</h3>
                    <p className="text-[var(--color-neutral-p)] leading-relaxed text-sm">
                      {specialty.description}
                    </p>
                  </div>
                );
              })}
          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US — image background, glass cards ================= */}
      <section className={`relative w-full overflow-hidden ${RADIUS_LG}`}>
        <div className="absolute inset-0">
          <Image
            src={WHY_CHOOSE_BG_IMAGE}
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[var(--color-primary)]/70 to-black/85" />
        </div>
        <HeritageMark className="pointer-events-none absolute -bottom-20 -left-20 w-[320px] h-[320px] text-white opacity-[0.08]" />

        <div className={`relative ${CONTAINER} ${SECTION_Y}`}>
          <div className="mb-16 max-w-[640px]">
            <h2 className={`${HEADING} text-white`}>
              {t("treatments:whyChoose.title")}
            </h2>
          </div>

          <div ref={whyChooseGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChoose?.length > 0 &&
              whyChoose.map((item, i) => (
                <div
                  key={i}
                  className={`group flex flex-row items-start gap-6 p-8 ${RADIUS_MD} bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/15 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-500 ease-out`}
                >
                  <div
                    className={`flex-shrink-0 w-14 h-14 bg-white/15 ${RADIUS_SM} flex items-center justify-center text-white transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-110`}
                  >
                    {i % 2 === 0 ? (
                      <IconShield className="w-6 h-6" />
                    ) : (
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className={`${CARD_TITLE} text-white mb-3`}>{item.title}</h3>
                    <p className="text-white/70 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ================= IMPORTANT NOTE ================= */}
      <section className="py-24 lg:py-28 bg-white w-full text-center">
        <div className="max-w-[900px] mx-auto px-6 border-t border-[var(--color-neutral-border)] pt-24">
          <h3 className="text-4xl font-semibold text-neutral-900 mb-4">
            {t("treatments:note.title")}
          </h3>
          <p className={`${BODY_LG} text-[var(--color-neutral-p)]`}>
            {t("treatments:note.description")}
          </p>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section
        className={`relative w-full bg-[var(--color-primary)] ${SECTION_Y} rounded-t-[2.5rem] text-center overflow-hidden`}
      >
        <HeritageMark className="pointer-events-none absolute -bottom-28 -right-28 w-[380px] h-[380px] text-white opacity-[0.07]" />

        <div className="relative max-w-[900px] mx-auto px-6 flex flex-col items-center">
          <h2 className={`${DISPLAY} text-white mb-6`}>
            {t("treatments:cta.title")}
          </h2>
          <p className="text-white/80 text-lg mb-12 max-w-[560px]">
            {t("treatments:cta.description")}
          </p>
          <div className="flex flex-wrap gap-5 justify-center">
            <Button className="bg-black text-white hover:bg-neutral-100 border-none shadow-lg transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]">
              {t("common:buttons.contact")}
            </Button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes kenburns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.08);
          }
        }
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        :global(.hero-image-kenburns) {
          animation: kenburns 18s ease-out forwards;
        }
        :global(.fade-slide-up) {
          animation: fadeSlideUp 0.8s ease-out 0.2s both;
        }
        :global(.slider-track) {
          scroll-snap-type: x proximity;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        :global(.slider-track::-webkit-scrollbar) {
          display: none;
        }
        :global(.slider-card) {
          scroll-snap-align: start;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.hero-image-kenburns),
          :global(.fade-slide-up) {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}