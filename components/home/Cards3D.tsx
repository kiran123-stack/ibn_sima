"use client";

/* ============================================================
 * CARDS FLYING IN 3D (Home Page — Animation #6)
 * + VERTICAL PANELS (#18)
 * ============================================================
 * Cards start at rotateY(60) z:-500 opacity:0, fly into place.
 * Vertical panels expand/collapse on scroll.
 *
 * CONTENT: Reads from why-choose-us.json → reasons
 * ============================================================ */

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cardIcons = [
  // Ear / Listen
  <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.73 4.27A8 8 0 1 0 7 17a3 3 0 0 0 2.73-1.75"/><path d="M12 8a4 4 0 0 1 0 8"/></svg>,
  // Search / Options
  <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>,
  // Shield / Prepare
  <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  // Messages / Connected
  <svg key="3" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  // Heart / Respect
  <svg key="4" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
];

const cardColors = [
  { bg: "from-[#097C87] to-[#23CED9]", light: "rgba(9,124,135,0.1)" },
  { bg: "from-[#1a1a2e] to-[#16213e]", light: "rgba(35,206,217,0.1)" },
  { bg: "from-[#4a0e8f] to-[#7b2d8b]", light: "rgba(123,45,139,0.1)" },
  { bg: "from-[#0f3460] to-[#1a1a4e]", light: "rgba(15,52,96,0.1)" },
  { bg: "from-[#831843] to-[#9d174d]", light: "rgba(131,24,67,0.1)" },
];

export const Cards3D = () => {
  const { getArray, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState<number>(0);

  const reasons = getArray("why-choose-us:reasons") as { title: string; description: string }[];
  const fallbackReasons = [
    { title: "We Listen Before We Guide", description: "We begin by understanding your medical situation." },
    { title: "We Help You Explore Options", description: "Based on your requirements, we coordinate suitable healthcare." },
    { title: "We Help You Prepare", description: "Medical records, specialist consultations, appointments — we help navigate each step." },
    { title: "We Stay Connected", description: "Questions arise at any stage. We remain available throughout." },
    { title: "We Respect Your Decision", description: "Treatment decisions are always yours, made with qualified professionals." },
  ];
  const displayReasons = reasons.length >= 5 ? reasons : fallbackReasons;

  useEffect(() => {
    if (!cardsWrapRef.current) return;
    const cards = Array.from(cardsWrapRef.current.children) as HTMLElement[];

    const ctx = gsap.context(() => {
      // Set initial 3D state
      gsap.set(cards, {
        rotateY: 60,
        z: -500,
        opacity: 0,
        transformOrigin: "left center",
      });

      // Fly into place
      gsap.to(cards, {
        rotateY: 0,
        z: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-[100px] lg:py-[160px] bg-white w-full overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[80px]">
        {/* Header */}
        <div className="text-center mb-[80px]">
          <span className="text-[var(--color-primary)] text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
            {t("why-choose-us:overview.title")}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[60px] font-bold text-neutral-900 leading-[1.05] max-w-[700px] mx-auto">
            {t("why-choose-us:hero.title")}
          </h2>
        </div>

        {/* 3D Cards */}
        <div
          ref={cardsWrapRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ transformStyle: "preserve-3d" }}
        >
          {displayReasons.map((reason, i) => (
            <div
              key={i}
              className={`group relative rounded-[28px] overflow-hidden cursor-pointer transition-all duration-500 ${activePanel === i ? "lg:col-span-1 shadow-2xl" : ""}`}
              onClick={() => setActivePanel(i)}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cardColors[i % cardColors.length].bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`}
              />
              <div
                className="absolute inset-0 z-0 transition-colors duration-500"
                style={{ background: activePanel === i ? undefined : cardColors[i % cardColors.length].light }}
              />

              {/* Content */}
              <div className="relative z-10 p-8 sm:p-10">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 
                    ${activePanel === i ? "bg-white/20 text-white" : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"}
                    group-hover:bg-white/20 group-hover:text-white`}
                >
                  {cardIcons[i % cardIcons.length]}
                </div>

                {/* Number */}
                <span
                  className={`text-xs font-bold uppercase tracking-[0.2em] mb-3 block transition-colors duration-500
                    ${activePanel === i ? "text-white/50" : "text-[var(--color-primary)]/50"}
                    group-hover:text-white/50`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3
                  className={`text-xl font-bold mb-3 transition-colors duration-500
                    ${activePanel === i ? "text-white" : "text-neutral-900"}
                    group-hover:text-white`}
                >
                  {reason.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed transition-colors duration-500
                    ${activePanel === i ? "text-white/80" : "text-[var(--color-neutral-p)]"}
                    group-hover:text-white/80`}
                >
                  {reason.description}
                </p>

                {/* Arrow */}
                <div
                  className={`mt-6 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500
                    ${activePanel === i ? "border-white/30 text-white" : "border-neutral-200 text-neutral-400"}
                    group-hover:border-white/30 group-hover:text-white group-hover:translate-x-1`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `0 0 40px ${cardColors[i % cardColors.length].light}` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
