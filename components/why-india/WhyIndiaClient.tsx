"use client";

/* ============================================================
 * WHY INDIA PAGE (components/why-india/WhyIndiaClient.tsx)
 * ============================================================
 * Follows design.md constraints for Page 05 - WHY INDIA:
 * - Hero: 55vh, white background, left aligned text.
 * - Reasons Grid: 6 cards, 3x2 on desktop, alternating backgrounds.
 * - Hospital Selection: Split layout, image overlapping by 60px.
 * Uses content from locals/en/why-india.json
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
        <div className="max-w-[1280px] w-full mx-auto px-6 sm:px-10 lg:px-[80px] flex flex-col lg:flex-row items-center gap-12">
          
          <div ref={heroRef} className="w-full lg:w-[60%] flex flex-col items-start relative z-10">
            <span className="text-[var(--color-primary)] text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-[24px]">
              {/* FIX: Namespace updated to why-india */}
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
             <Image 
               src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=800&auto=format&fit=crop"
               alt="Healthcare in India"
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
                className={`flex flex-col p-[36px] transition-transform duration-[450ms] hover:-translate-y-[8px] hover:scale-[1.02] hover:shadow-[0_28px_80px_rgba(0,0,0,0.09)] ${i % 2 === 1 ? 'bg-[var(--color-neutral-light)]' : 'bg-white'}`}
              >
                <div className="w-[48px] h-[48px] bg-[var(--color-primary)]/10 rounded-[16px] flex items-center justify-center text-[var(--color-primary)] mb-[24px] transition-transform duration-500 hover:rotate-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
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
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
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

          <div className="w-full lg:w-[50%] relative h-[500px] lg:h-[700px] lg:-mt-[120px] shadow-2xl rounded-[32px] overflow-hidden">
             <Image 
               src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop"
               alt="Premium Hospital Interior"
               fill
               className="object-cover"
             />
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="w-full bg-[var(--color-primary)] py-[160px] rounded-t-[64px] text-center">
        <div className="max-w-[900px] mx-auto px-6 flex flex-col items-center">
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