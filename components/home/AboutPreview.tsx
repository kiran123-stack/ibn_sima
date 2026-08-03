"use client";

/* ============================================================
 * ABOUT PREVIEW (Home Page — Section 3) — ORIGINAL
 * ============================================================
 * Editorial section: image left (40%), text right (60%).
 * 
 * DESIGN SPECS: padding 192px, image rounded 36px with clip-path
 * reveal animation, floating accent card, text fades up staggered.
 * 
 * CONTENT: Reads from home.json → about section
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

export const AboutPreview = () => {
  const { t, getArray } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Get paragraphs array from home.json → about.paragraphs
  const paragraphs = getArray("home:about.paragraphs") as string[];

  useEffect(() => {
    if (!sectionRef.current) return;

    // Image clip-path reveal
    gsap.fromTo(imgRef.current, { clipPath: "inset(100% 0 0 0)" }, {
      clipPath: "inset(0% 0 0 0)", duration: 1.6, ease: "power4.inOut",
      scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
    });

    // Text stagger fade up
    if (contentRef.current) {
      gsap.fromTo(Array.from(contentRef.current.children), { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 50%" },
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-[96px] lg:py-[192px] bg-white w-full overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[80px] flex flex-col lg:flex-row items-center gap-10 lg:gap-0 justify-between">
        
        {/* Image Left (40%) */}
        <div className="w-full lg:w-[40%] relative h-[400px] sm:h-[500px] lg:h-[620px]">
          <div ref={imgRef} className="absolute inset-0 rounded-[36px] overflow-hidden">
            <Image
              src="/IMAGES/doctor_care.png"
              alt="IBN Sina Patient Coordinator"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          {/* Floating card */}
          <div className="absolute -bottom-[20px] -right-[20px] lg:-right-[40px] bg-white p-5 sm:p-6 rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] z-10 flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--color-surface)]/20 rounded-full flex items-center justify-center text-[var(--color-primary)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-900">{t("about:floatingCard.title")}</p>
              <p className="text-xs text-neutral-500">{t("about:floatingCard.subtitle")}</p>
            </div>
          </div>
        </div>

        {/* Text Right (60%) */}
        <div className="w-full lg:w-[55%] flex justify-start lg:justify-end">
          <div ref={contentRef} className="max-w-[560px]">
            <span className="text-[var(--color-primary)] text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-[24px] block">
              {t("home:about.title")}
            </span>

            {/* Render paragraphs from home.json */}
            {paragraphs.length > 0 ? (
              paragraphs.map((p, i) => (
                <p key={i} className="text-[var(--color-neutral-p)] text-base sm:text-lg leading-relaxed mb-[24px]">
                  {p}
                </p>
              ))
            ) : (
              <p className="text-[var(--color-neutral-p)] text-base sm:text-lg leading-relaxed mb-[24px]">Loading...</p>
            )}

            {/* Quote */}
            <p className="text-xl font-semibold text-neutral-900 italic mb-[48px] border-l-4 border-[var(--color-primary)] pl-6">
              {t("home:about.quote")}
            </p>

            <Button variant="primary">{t("common:buttons.learnMore")}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
