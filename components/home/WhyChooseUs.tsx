"use client";

/* ============================================================
 * WHY CHOOSE US (Home Page — Section 3)
 * ============================================================
 * Premium layout: large numbered items with elegant icons.
 * Editorial style with rule lines and generous whitespace.
 * CONTENT: Reads from home.json -> whyChoose section
 * ============================================================ */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* High-quality SVG icons mapping to the 5 points in the PDF */
const icons = [
  /* Human Point of Contact */
  <svg key="0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.73 4.27A8 8 0 1 0 7 17a3 3 0 0 0 2.73-1.75"/><path d="M12 8a4 4 0 0 1 0 8"/></svg>,
  /* Access to Expertise */
  <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>,
  /* Support Before Travel */
  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/></svg>,
  /* Support When Arrive */
  <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  /* Support After Treatment */
  <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
];

export const WhyChooseUs = () => {
  const { t, getArray } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Safely fetch items with a strict fallback to the PDF content
  const rawItems = getArray("home:whyChoose.items") as { title: string; description: string }[];
  const fallbackItems = [
    { title: "A Human Point of Contact", description: "Healthcare can be confusing, especially when you are far from home. Our team helps you understand the process and guides you through the next steps." },
    { title: "Access to Medical Expertise", description: "We help international patients explore suitable doctors and hospitals in India according to their medical requirements." },
    { title: "Support Before You Travel", description: "Your journey starts long before you board a flight. We help coordinate medical records, specialist consultations, hospital appointments, and treatment planning." },
    { title: "Support When You Arrive", description: "From hospital coordination to local assistance, our team helps make your stay more manageable." },
    { title: "Support After Treatment", description: "Our relationship does not have to end when you leave the hospital. We can help coordinate follow-up requirements and continued communication." }
  ];

  const items = Array.isArray(rawItems) && rawItems.length >= 5 ? rawItems.slice(0, 5) : fallbackItems;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header fade-in
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      // Card specific animations requested (Scale and Y axis)
      const cards = gsap.utils.toArray<HTMLElement>(".why-card");

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 120,
            scale: .92,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-[96px] lg:py-[144px] bg-[var(--color-neutral-light)] w-full overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[80px]">
        
        {/* ---- Header ---- */}
        <div ref={headerRef} className="mb-[64px] lg:mb-[80px]">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[var(--color-neutral-text)] max-w-[600px] leading-[1.15]">
            {t("home:whyChoose.title") || "Why Patients Choose IBN Sina"}
          </h2>
        </div>

        {/* ---- Editorial List ---- */}
        <div ref={listRef} className="flex flex-col gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="
                why-card 
                group
                relative
                flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8
                rounded-[32px]
                border
                border-white/15
                bg-white/10
                backdrop-blur-2xl
                shadow-[0_20px_80px_rgba(0,0,0,.18)]
                p-8
                lg:p-12
                overflow-hidden
                transition-all
                duration-700
              "
            >
              {/* Glowing Orb Background */}
              <div className="absolute inset-0 overflow-hidden rounded-[32px] pointer-events-none z-0">
                <div
                  className="
                    absolute
                    -top-20
                    -left-20
                    w-60
                    h-60
                    rounded-full
                    bg-[var(--color-primary)]/15
                    blur-[100px]
                  "
                />
              </div>

              {/* Icon Container */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-[var(--color-surface)]/20 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                {icons[i % icons.length]}
              </div>

              {/* Text Content */}
              <div className="relative z-10 flex-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-neutral-text)] mb-3 transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                  {item.title}
                </h3>
                <p className="text-[var(--color-neutral-p)] text-base leading-relaxed max-w-[800px]">
                  {item.description}
                </p>
              </div>

              {/* Subtle Number Indicator */}
              <div className="relative z-10 hidden lg:block text-5xl font-black text-[var(--color-neutral-border)] opacity-50 group-hover:text-[var(--color-primary)] group-hover:opacity-10 transition-colors duration-300 select-none">
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};