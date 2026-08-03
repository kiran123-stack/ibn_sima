"use client";

/* ============================================================
 * COUNTRIES SECTION (Home Page)
 * ============================================================
 * Displays the 3 operating countries (Iraq, UAE, India) using
 * content strictly fetched from locals/en/countries.json.
 * Features premium image cards and staggered GSAP animations.
 * ============================================================ */

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { Card } from "@/components/ui/Card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// High-quality regional/medical Unsplash images matching the 3 countries
const countryImages = [
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=800&auto=format&fit=crop", // Iraq / Middle East aesthetic
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop", // UAE (Dubai Skyline)
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop", // India (Iconic architecture)
];

export function CountriesSection() {
  const { t, getArray } = useLanguage();
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Fetch exactly from countries.json
  const countries = getArray("countries:countries") as {
    name: string;
    title: string;
    description: string;
    services: string[];
  }[];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header fade-in
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 75%" },
        }
      );

      // 2. Cards staggered fly-in
      const cards = Array.from(cardsRef.current?.children || []) as HTMLElement[];
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-[120px] lg:py-[160px] bg-[var(--color-neutral-light)] w-full overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[80px]">
        
        {/* ================= HEADER ================= */}
        <div ref={headerRef} className="text-center mb-[80px]">
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-semibold text-neutral-900 mb-[24px]">
            {t("countries:overview.title")}
          </h2>
          <p className="text-[var(--color-neutral-p)] text-lg max-w-[760px] mx-auto leading-relaxed">
            {t("countries:overview.description")}
          </p>
        </div>

        {/* ================= COUNTRY CARDS ================= */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries?.length > 0 && countries.map((country, i) => (
            <Card 
              key={i} 
              className="flex flex-col p-0 overflow-hidden bg-white group hover:-translate-y-[8px] transition-transform duration-[450ms]"
              hoverEffect={false} // Disable default Card hover to apply our custom image scale effect
            >
              {/* Image Section */}
              <div className="relative w-full h-[240px] overflow-hidden">
                <Image
                  src={countryImages[i] || countryImages[0]}
                  alt={country.name}
                  fill
                  className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Subtle gradient overlay to make image pop */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Floating Tag */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                  <span className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-[0.15em]">
                    {country.name}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col p-[32px] flex-1">
                <h3 className="text-xl font-bold text-neutral-900 mb-[16px] leading-snug">
                  {country.title}
                </h3>
                <p className="text-[var(--color-neutral-p)] text-sm leading-relaxed mb-[24px]">
                  {country.description}
                </p>

                {/* Divider */}
                <div className="w-full h-[1px] bg-[var(--color-neutral-border)] mb-[24px]" />

                {/* Services List */}
                <ul className="flex flex-col gap-3 mt-auto">
                  {country.services?.map((service, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-neutral-700">
                      <span className="mt-[2px] w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      <span className="font-medium">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}