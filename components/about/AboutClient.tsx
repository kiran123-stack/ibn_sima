"use client";

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

/* Distinct, restrained line icons — one per value, no repeats */
const VALUE_ICONS: React.ReactNode[] = [
  <svg key="shield" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,
  <svg key="heart" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.8 8.6c0 5.1-8.8 10.4-8.8 10.4S3.2 13.7 3.2 8.6a4.6 4.6 0 0 1 8.8-1.9 4.6 4.6 0 0 1 8.8 1.9Z" />
  </svg>,
  <svg key="compass" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M15 9l-2 6-6 2 2-6 6-2z" />
  </svg>,
  <svg key="handshake" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l4-4 4 4 3-3 4 4-3 3" />
    <path d="M7 15l3 3 2-2M14 11l3 3 3-3" />
  </svg>,
  <svg key="star" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l2.6 5.7 6.2.6-4.7 4.2 1.4 6.1L12 16.7 6.5 19.6l1.4-6.1L3.2 9.3l6.2-.6L12 3z" />
  </svg>,
  <svg key="globe" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.6 2.6 4 5.8 4 9s-1.4 6.4-4 9c-2.6-2.6-4-5.8-4-9s1.4-6.4 4-9z" />
  </svg>,
];

export function AboutClient() {
  const { t, getArray } = useLanguage();

  const storyParagraphs = getArray("about:introduction.paragraphs") as string[];
  const coreValues = getArray("about:values.items") as { title: string; description: string }[];

  const heroRef = useRef<HTMLDivElement>(null);
  const storyImgRef = useRef<HTMLDivElement>(null);
  const storyContentRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        Array.from(heroRef.current.children),
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out" }
      );
    }

    if (storyImgRef.current) {
      gsap.fromTo(
        storyImgRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.6,
          ease: "power4.inOut",
          scrollTrigger: { trigger: storyImgRef.current, start: "top 70%" },
        }
      );
    }

    if (storyContentRef.current) {
      gsap.fromTo(
        Array.from(storyContentRef.current.children),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: storyContentRef.current, start: "top 60%" },
        }
      );
    }

    if (missionRef.current) {
      gsap.fromTo(
        Array.from(missionRef.current.children),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: missionRef.current, start: "top 80%" },
        }
      );
    }

    if (valuesRef.current) {
      gsap.fromTo(
        Array.from(valuesRef.current.children),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: valuesRef.current, start: "top 80%" },
        }
      );
    }

    if (ctaRef.current) {
      gsap.fromTo(
        Array.from(ctaRef.current.children),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col w-full bg-white overflow-hidden">

      {/* HERO SECTION — asymmetric, editorial */}
      <section className="relative w-full pt-[96px] pb-[64px] lg:pt-[128px] lg:pb-[96px]">
        <div className="max-w-[1280px] w-full mx-auto px-6 sm:px-10 lg:px-[80px]">
          <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">

            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="inline-flex items-center gap-3 text-[var(--color-primary)] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-[28px]">
                <span className="w-[30px] h-[1px] bg-[var(--color-primary)]" />
                {t("about:hero.badge")}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[64px] leading-[0.98] tracking-[-0.03em] font-semibold text-neutral-900 max-w-[680px]">
                {t("about:hero.title")}
              </h1>
            </div>

            <div className="lg:col-span-5 flex flex-col items-start lg:items-end lg:pl-8 lg:border-l lg:border-[var(--color-neutral-border)]">
              <p className="text-[var(--color-neutral-p)] text-base sm:text-lg leading-relaxed lg:text-right max-w-[420px]">
                {t("about:hero.subtitle")}
              </p>
            </div>
          </div>

          {/* Wide, quiet portrait frame — no gradient blobs, just a disciplined edge */}
          <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[460px] mt-[56px] lg:mt-[72px] rounded-[8px] overflow-hidden border border-[var(--color-neutral-border)]">
            <Image
              src="https://images.unsplash.com/photo-1666887360742-974c8fce8e6b?q=80&w=1800&auto=format&fit=crop"
              alt="About IBN Sina"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
          </div>
        </div>
      </section>

      {/* OUR STORY — image with a quiet caption, quote-led copy */}
      <section className="py-[120px] lg:py-[160px] bg-white w-full">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[80px] grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 items-start">

          <div className="lg:col-span-5">
            <div ref={storyImgRef} className="relative w-full h-[440px] lg:h-[560px] rounded-[8px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1400&auto=format&fit=crop"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-between mt-[20px] pt-[20px] border-t border-[var(--color-neutral-border)]">
              <p className="text-sm font-bold text-neutral-900">Established Trust</p>
              <p className="text-xs text-neutral-500 uppercase tracking-[0.12em]">Across 3 Countries</p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <div ref={storyContentRef} className="max-w-[620px]">
              {storyParagraphs?.length > 0 ? (
                storyParagraphs.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-neutral-900 text-xl sm:text-2xl leading-relaxed font-medium mb-[28px]"
                        : "text-[var(--color-neutral-p)] text-base sm:text-lg leading-relaxed mb-[24px]"
                    }
                  >
                    {p}
                  </p>
                ))
              ) : (
                <p>Loading story...</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION — quiet two-column with a hairline divider */}
      <section className="py-[120px] lg:py-[160px] bg-[var(--color-neutral-light)] w-full">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[80px] grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-14 md:divide-x md:divide-[var(--color-neutral-border)]">
          <div className="flex flex-col items-start md:pr-14">
            <div className="w-[52px] h-[52px] rounded-[14px] border border-[var(--color-neutral-border)] bg-white flex items-center justify-center text-[var(--color-primary)] mb-[28px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-[16px]">{t("about:mission.title")}</h3>
            <p className="text-[var(--color-neutral-p)] leading-relaxed">{t("about:mission.description")}</p>
          </div>
          <div className="flex flex-col items-start md:pl-14">
            <div className="w-[52px] h-[52px] rounded-[14px] border border-[var(--color-neutral-border)] bg-white flex items-center justify-center text-[var(--color-primary)] mb-[28px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-[16px]">{t("about:vision.title")}</h3>
            <p className="text-[var(--color-neutral-p)] leading-relaxed">{t("about:vision.description")}</p>
          </div>
        </div>
      </section>

      {/* CORE VALUES — numbered, restrained */}
      <section className="py-[120px] lg:py-[160px] bg-white w-full">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[80px]">
          <div className="mb-[72px] max-w-[560px]">
            <h2 className="text-3xl lg:text-[44px] font-semibold text-neutral-900 leading-tight">{t("about:values.title")}</h2>
          </div>
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0 md:divide-y md:divide-[var(--color-neutral-border)]">
            {coreValues?.length > 0 && coreValues.map((value, i) => (
              <div
                key={i}
                className="flex items-start gap-6 py-[36px] border-b border-[var(--color-neutral-border)] md:border-b-0 md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-[var(--color-neutral-border)] md:[&:nth-child(odd)]:pr-10 md:[&:nth-child(even)]:pl-10"
              >
                <div className="flex-shrink-0 w-[44px] h-[44px] rounded-full bg-[var(--color-neutral-light)] flex items-center justify-center text-[var(--color-primary)]">
                  {VALUE_ICONS[i % VALUE_ICONS.length]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-[10px]">{value.title}</h3>
                  <p className="text-[var(--color-neutral-p)] leading-relaxed text-sm sm:text-base">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION — calm, confident */}
      <section className="relative w-full bg-[var(--color-primary)] py-[140px] lg:py-[168px] text-center">
        <div className="max-w-[820px] mx-auto px-6 flex flex-col items-center relative z-10">
          <h2 className="text-3xl lg:text-[52px] leading-[1.1] font-semibold text-white mb-[24px]">
            {t("about:cta.title")}
          </h2>
          <p className="text-white/75 text-lg mb-[48px] max-w-[540px]">
            {t("about:cta.description")}
          </p>
          <div className="flex flex-wrap gap-[20px] justify-center">
            <Button className="bg-black text-white hover:bg-neutral-100 border-none shadow-lg">
              {t("common:buttons.talkCoordinator")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}