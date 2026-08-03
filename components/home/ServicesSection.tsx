"use client";

/* ============================================================
 * SERVICES SECTION (Home Page)
 * ============================================================
 * Uses the same clip-path reveal + floating card effect from
 * AboutPreview, but for patient services (before/during/after).
 * Alternates image-left / text-right layout per service.
 * NO external images — uses project images from /IMAGES/
 *
 * CONTENT: Reads from patient-services.json → services
 * ============================================================ */

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceBlockProps {
  image: string;
  title: string;
  description: string;
  items: string[];
  icon: React.ReactNode;
  badgeLabel: string;
  flip?: boolean;
  floatingLabel: string;
  floatingSubLabel: string;
}

const ServiceBlock = ({
  image,
  title,
  description,
  items,
  icon,
  badgeLabel,
  flip = false,
  floatingLabel,
  floatingSubLabel,
}: ServiceBlockProps) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blockRef.current) return;

    // Clip-path reveal on image (same effect as AboutPreview)
    gsap.fromTo(
      imgRef.current,
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.6,
        ease: "power4.inOut",
        scrollTrigger: { trigger: blockRef.current, start: "top 65%" },
      }
    );

    // Text stagger fade up
    if (contentRef.current) {
      gsap.fromTo(
        Array.from(contentRef.current.children),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: blockRef.current, start: "top 55%" },
        }
      );
    }
  }, []);

  return (
    <div
      ref={blockRef}
      className={`flex flex-col ${flip ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-0 justify-between mb-[120px] lg:mb-[180px] last:mb-0`}
    >
      {/* Image column */}
      <div className="w-full lg:w-[42%] relative h-[380px] sm:h-[460px] lg:h-[540px]">
        <div ref={imgRef} className="absolute inset-0 rounded-[36px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 42vw"
          />
        </div>
        {/* Floating accent card — same style as AboutPreview */}
        <div className={`absolute -bottom-[20px] ${flip ? "-left-[20px] lg:-left-[40px]" : "-right-[20px] lg:-right-[40px]"} bg-white p-5 rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] z-10 flex items-center gap-4`}>
          <div className="w-12 h-12 bg-[var(--color-surface)]/20 rounded-full flex items-center justify-center text-[var(--color-primary)]">
            {icon}
          </div>
          <div>
            <p className="text-sm font-bold text-neutral-900">{floatingLabel}</p>
            <p className="text-xs text-neutral-500">{floatingSubLabel}</p>
          </div>
        </div>
      </div>

      {/* Text column */}
      <div className={`w-full lg:w-[52%] flex ${flip ? "justify-start" : "justify-start lg:justify-end"}`}>
        <div ref={contentRef} className="max-w-[540px] w-full">
          <span className="text-[var(--color-primary)] text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-[16px] block">
            {badgeLabel}
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-[38px] leading-tight font-semibold text-neutral-900 mb-[20px]">
            {title}
          </h3>
          <p className="text-[var(--color-neutral-p)] text-base leading-relaxed mb-[28px]">
            {description}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-neutral-700">
                <span className="w-5 h-5 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-[var(--color-primary)]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const serviceIcons = [
  // Before — calendar / clipboard
  <svg key="b" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/></svg>,
  // During — heart
  <svg key="d" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>,
  // After — refresh
  <svg key="a" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
];

const serviceImages = [
  "/IMAGES/SupportBeforArive.png",
  "/IMAGES/doctor_care.png",
  "/IMAGES/SupportAfterTREAT.png",
];

export const ServicesSection = () => {
  const { t, getArray } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      Array.from(headerRef.current.children),
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 70%" },
      }
    );
  }, []);

  const serviceKeys = ["beforeTreatment", "duringTreatment", "afterTreatment"] as const;
  
  const serviceTitles = [
    t("patient-services:services.beforeTreatment.title") || "Before Treatment",
    t("patient-services:services.duringTreatment.title") || "During Your Stay",
    t("patient-services:services.afterTreatment.title") || "After Treatment",
  ];
  
  const serviceDescs = [
    t("patient-services:services.beforeTreatment.description") || "We help you prepare for your healthcare journey.",
    t("patient-services:services.duringTreatment.description") || "Once you arrive in India, our team supports you throughout.",
    t("patient-services:services.afterTreatment.description") || "Our support continues even after your treatment is completed.",
  ];

  const serviceItems = [
    getArray("patient-services:services.beforeTreatment.items") as string[],
    getArray("patient-services:services.duringTreatment.items") as string[],
    getArray("patient-services:services.afterTreatment.items") as string[],
  ];

  const floatingCards = [
    {
      label: t("patient-services:floatingCards.before.label") || "Fully Coordinated",
      sub: t("patient-services:floatingCards.before.sub") || "Before you travel"
    },
    {
      label: t("patient-services:floatingCards.during.label") || "We Are With You",
      sub: t("patient-services:floatingCards.during.sub") || "Throughout your stay"
    },
    {
      label: t("patient-services:floatingCards.after.label") || "Ongoing Support",
      sub: t("patient-services:floatingCards.after.sub") || "Even after you return"
    }
  ];

  return (
    <section ref={sectionRef} className="py-[96px] lg:py-[140px] bg-[var(--color-neutral-light)] w-full overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[80px]">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-[100px] lg:mb-[140px]">
          <span className="text-[var(--color-primary)] text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-[16px] block">
            {t("patient-services:overview.title")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[52px] leading-tight font-semibold text-neutral-900 max-w-[680px] mx-auto">
            {t("patient-services:hero.title")}
          </h2>
        </div>

        {/* Service Blocks */}
        {serviceKeys.map((key, i) => (
          <ServiceBlock
            key={key}
            image={serviceImages[i]}
            title={serviceTitles[i]}
            description={serviceDescs[i]}
            items={serviceItems[i] || []}
            icon={serviceIcons[i]}
            badgeLabel={`${t("common:trust.patientSupport")} — ${i + 1} / 3`}
            flip={i % 2 !== 0}
            floatingLabel={floatingCards[i].label}
            floatingSubLabel={floatingCards[i].sub}
          />
        ))}
      </div>
    </section>
  );
};
