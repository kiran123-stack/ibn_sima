"use client";

/* ============================================================
 * STICKY STORY SECTIONS (Home Page — Animation #13)
 * ============================================================
 * One section occupies 300vh. Internal elements animate
 * step by step as user scrolls. "Step 1 → 2 → 3 → Final"
 * 
 * CONTENT: Reads from process.json → steps
 * ============================================================ */

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stepImages = [
  "/IMAGES/doctor_care.png",
  "/IMAGES/MedicalTREATinindia.png",
  "/IMAGES/small_image.png",
  "/IMAGES/travel2.png",
];

export const StickyStory = () => {
  const { getArray, t } = useLanguage();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const steps = (getArray("process:steps") as { number: string; title: string; description: string }[]).slice(0, 4);
  const fallbackSteps = [
    { number: "01", title: "Start a Conversation", description: "Contact our team and tell us about your medical requirement." },
    { number: "02", title: "Share Medical Records", description: "Send relevant reports, scans, prescriptions." },
    { number: "03", title: "Specialist Coordination", description: "We coordinate with appropriate specialists." },
    { number: "04", title: "Travel to India", description: "We support you from arrival to treatment." },
  ];
  const displaySteps = steps.length >= 4 ? steps : fallbackSteps;

  useEffect(() => {
    if (!wrapperRef.current || !stickyRef.current) return;
    const stepEls = Array.from(stepsRef.current?.children || []) as HTMLElement[];
    const imgEls = Array.from(imgWrapRef.current?.children || []) as HTMLElement[];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: stickyRef.current,
          pinSpacing: true,
          scrub: 1.5,
          start: "top top",
          end: "+=300%",
        },
      });

      // Animate through each step
      displaySteps.forEach((_, i) => {
        if (i === 0) return;
        // Fade out previous step text, fade in next
        tl.to(stepEls[i - 1], { opacity: 0.2, y: -30, duration: 1 }, i * 1.5)
          .fromTo(stepEls[i], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, i * 1.5)
          // Clip-path reveal for new image
          .fromTo(
            imgEls[i],
            { clipPath: "inset(0 100% 0 0)", opacity: 1 },
            { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.inOut" },
            i * 1.5
          )
          .to(imgEls[i - 1], { opacity: 0, duration: 0.5 }, i * 1.5 + 0.8);
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative" style={{ height: "400vh" }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex overflow-hidden bg-[#F8F9FA]"
      >
        {/* LEFT: Image side (55%) */}
        <div className="relative w-[55%] h-full overflow-hidden" ref={imgWrapRef}>
          {displaySteps.map((_, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                zIndex: i + 1,
                clipPath: i === 0 ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              }}
            >
              <Image
                src={stepImages[i] || stepImages[0]}
                alt={`Step ${i + 1}`}
                fill
                className="object-cover"
                sizes="55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F8F9FA]/40" />
            </div>
          ))}

          {/* Step counter */}
          <div className="absolute bottom-[60px] left-[60px] z-20 flex gap-3">
            {displaySteps.map((_, j) => (
              <div
                key={j}
                className="w-1.5 h-12 rounded-full bg-white/30 overflow-hidden"
              >
                <div className="w-full h-0 bg-[var(--color-primary)] rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Text side (45%) */}
        <div className="w-[45%] h-full flex flex-col justify-center px-[60px] lg:px-[80px] pb-[180px] relative">
          {/* Section label */}
          <span className="text-[var(--color-primary)] text-xs font-semibold uppercase tracking-[0.2em] mb-12 block">
            {t("process:overview.title")}
          </span>

          <div ref={stepsRef} className="relative">
            {displaySteps.map((step, i) => (
              <div
                key={i}
                className="absolute top-0 left-0 w-full"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <span className="text-[120px] font-black text-[var(--color-primary)]/8 leading-none select-none block -ml-2">
                  {step.number}
                </span>
                <h3 className="text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight mb-4 -mt-8">
                  {step.title}
                </h3>
                <p className="text-[var(--color-neutral-p)] text-base lg:text-lg leading-relaxed max-w-[400px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="absolute bottom-[60px] left-[60px] lg:left-[80px]">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-[var(--color-primary)] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[var(--color-secondary)] transition-colors duration-300"
            >
              {t("home:cta.button")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
