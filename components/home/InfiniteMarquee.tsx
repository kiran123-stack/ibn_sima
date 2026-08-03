"use client";

/* ============================================================
 * INFINITE MARQUEE (Home Page — Animation #7)
 * ============================================================
 * Logo wall / trust strip with:
 * - Infinite horizontal scroll
 * - Slight rotation on items
 * - Scale + blur edges on hover
 * - Looks like Stripe's logo wall
 *
 * CONTENT: Reads from home.json → specialties items (used as tags)
 * ============================================================ */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

const trustBadges = [
  { icon: "🏥", label: "Apollo Hospitals" },
  { icon: "🔬", label: "Fortis Healthcare" },
  { icon: "💊", label: "Medanta" },
  { icon: "🧬", label: "AIIMS Delhi" },
  { icon: "❤️", label: "Manipal Hospitals" },
  { icon: "🩺", label: "Max Healthcare" },
  { icon: "⚕️", label: "Narayana Health" },
  { icon: "🏆", label: "Kokilaben Hospital" },
];

export const InfiniteMarquee = () => {
  const { t } = useLanguage();
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!track1Ref.current || !track2Ref.current) return;

    // Continuous scroll left
    gsap.to([track1Ref.current, track2Ref.current], {
      xPercent: -100,
      ease: "none",
      duration: 25,
      repeat: -1,
    });

    // Hover pause
    const el = wrapRef.current;
    const pause = () => gsap.globalTimeline.pause();
    const resume = () => gsap.globalTimeline.resume();
    el?.addEventListener("mouseenter", pause);
    el?.addEventListener("mouseleave", resume);
    return () => {
      el?.removeEventListener("mouseenter", pause);
      el?.removeEventListener("mouseleave", resume);
    };
  }, []);

  const items = [...trustBadges, ...trustBadges];

  return (
    <section className="py-[60px] bg-[var(--color-neutral-light)] overflow-hidden">
      {/* Label */}
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-neutral-muted)] mb-8">
        {t("home:specialties.title")} — India&apos;s Premier Healthcare Network
      </p>

      {/* Blur mask edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--color-neutral-light), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--color-neutral-light), transparent)" }} />

        <div ref={wrapRef} className="flex overflow-hidden">
          {/* Track 1 */}
          <div ref={track1Ref} className="flex gap-4 flex-shrink-0" style={{ width: "max-content" }}>
            {items.map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-neutral-100 group hover:border-[var(--color-primary)] hover:shadow-md transition-all duration-300 cursor-default flex-shrink-0"
                style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
              >
                <span className="text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  {badge.icon}
                </span>
                <span className="text-sm font-semibold text-neutral-700 group-hover:text-[var(--color-primary)] transition-colors duration-300 whitespace-nowrap">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
          {/* Track 2 (duplicate for seamless loop) */}
          <div ref={track2Ref} className="flex gap-4 flex-shrink-0" style={{ width: "max-content" }}>
            {items.map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-neutral-100 group hover:border-[var(--color-primary)] hover:shadow-md transition-all duration-300 cursor-default flex-shrink-0"
                style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
              >
                <span className="text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  {badge.icon}
                </span>
                <span className="text-sm font-semibold text-neutral-700 group-hover:text-[var(--color-primary)] transition-colors duration-300 whitespace-nowrap">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
