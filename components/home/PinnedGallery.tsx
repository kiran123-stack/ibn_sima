"use client";

/* ============================================================
 * PINNED IMAGE GALLERY (Home Page — Animations #5, #8, #16)
 * ============================================================
 * #5  Pinned Image Gallery — image stays fixed, text changes
 * #8  Clip-path Image Reveal — polygon grows to reveal image
 * #16 Circular Reveal — circle grows from center
 *
 * CONTENT: Reads from home.json → whyChoose.items
 * Images show one at a time while text scrolls on right
 * ============================================================ */

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const galleryItems = [
  {
    img: "/IMAGES/AcessWorldClassDOCTOR.png",
    color: "rgba(9,124,135,0.15)",
    revealType: "clip-path" as const,
  },
  {
    img: "/IMAGES/humanPointOFCONTACT.png",
    color: "rgba(35,206,217,0.1)",
    revealType: "circle" as const,
  },
  {
    img: "/IMAGES/SupportBeforArive.png",
    color: "rgba(252,164,124,0.1)",
    revealType: "clip-path" as const,
  },
  {
    img: "/IMAGES/SupportWhenarrive.png",
    color: "rgba(249,215,121,0.08)",
    revealType: "circle" as const,
  },
  {
    img: "/IMAGES/SupportAfterTREAT.png",
    color: "rgba(161,204,166,0.1)",
    revealType: "clip-path" as const,
  },
];

export const PinnedGallery = () => {
  const { t, getArray } = useLanguage();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const items = getArray("home:whyChoose.items") as { title: string; description: string }[];
  const fallback = [
    { title: "Access to World-Class Hospitals", description: "We connect you with top-rated hospitals across India." },
    { title: "A Human Point of Contact", description: "Our team guides you through every step of the process." },
    { title: "Support Before You Travel", description: "Medical records, specialist consultations, appointments — all coordinated." },
    { title: "Support When You Arrive", description: "From airport to hospital, we're by your side." },
    { title: "Support After Treatment", description: "Follow-up care and continuous coordination." },
  ];
  const displayItems = items.length >= 5 ? items : fallback;

  useEffect(() => {
    if (!wrapperRef.current || !stickyRef.current) return;

    const ctx = gsap.context(() => {
      displayItems.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: `${(i / displayItems.length) * 100}% top`,
          end: `${((i + 1) / displayItems.length) * 100}% top`,
          onEnter: () => {
            setActiveIndex(i);
            // Circular / clip-path reveal
            const item = galleryItems[i];
            if (item.revealType === "circle") {
              gsap.fromTo(
                `#gallery-img-${i}`,
                { clipPath: "circle(0% at 50% 50%)" },
                { clipPath: "circle(75% at 50% 50%)", duration: 1, ease: "power3.out" }
              );
            } else {
              gsap.fromTo(
                `#gallery-img-${i}`,
                { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
                { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", duration: 1, ease: "power3.out" }
              );
            }
          },
          onLeaveBack: () => {
            if (i > 0) setActiveIndex(i - 1);
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative bg-white" style={{ height: `${displayItems.length * 100}vh` }}>
      {/* Sticky container */}
      <div ref={stickyRef} className="sticky top-0 h-screen flex overflow-hidden">
        
        {/* LEFT: Pinned Image (50%) */}
        <div className="relative w-[50%] h-full overflow-hidden bg-[#F8F9FA]" ref={imgContainerRef}>
          {galleryItems.map((item, i) => (
            <div
              key={i}
              id={`gallery-img-${i}`}
              className="absolute inset-[24px] rounded-[32px] overflow-hidden"
              style={{
                clipPath: i === 0 ? "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)" : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
                zIndex: i + 1,
              }}
            >
              <Image
                src={item.img}
                alt={displayItems[i]?.title || `Service ${i + 1}`}
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${item.color} 0%, transparent 60%)` }}
              />
            </div>
          ))}

          {/* Index counter */}
          <div className="absolute bottom-[40px] left-[40px] z-30">
            <span className="text-6xl font-black text-white/10 select-none">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* RIGHT: Scrolling text (50%) */}
        <div className="w-[50%] overflow-y-auto scrollbar-none">
          <div className="px-[60px] lg:px-[80px] py-[80px]">
            <span className="text-[var(--color-primary)] text-xs font-semibold uppercase tracking-[0.2em] mb-10 block">
              {t("home:whyChoose.title")}
            </span>

            {displayItems.map((item, i) => (
              <div
                key={i}
                className={`mb-[80px] transition-all duration-500 cursor-default
                  ${activeIndex === i ? "opacity-100" : "opacity-30"}`}
                onClick={() => setActiveIndex(i)}
              >
                {/* Progress bar */}
                <div className="w-full h-[2px] bg-neutral-100 mb-6 overflow-hidden rounded">
                  {activeIndex === i && (
                    <div className="h-full bg-[var(--color-primary)] rounded animate-[progress_3s_linear_forwards]" />
                  )}
                </div>
                <span className="text-xs font-bold text-[var(--color-primary)]/40 uppercase tracking-[0.2em] block mb-3">
                  {String(i + 1).padStart(2, "0")} / {String(displayItems.length).padStart(2, "0")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[var(--color-neutral-p)] leading-relaxed text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
