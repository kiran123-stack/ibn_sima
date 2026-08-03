"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FaqClient() {
  const { t, getArray } = useLanguage();
  const rawFaqs = getArray("faq:faqs") as { question: string; answer: string }[];
  const router = useRouter();
  
  // React State for Accordion (defaults to opening the first item)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const faqContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        Array.from(heroRef.current.children),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      );
    }

    if (faqContainerRef.current) {
      gsap.fromTo(
        faqContainerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: faqContainerRef.current, start: "top 75%" },
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col w-full bg-white overflow-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[55vh] w-full flex items-center pt-[88px] bg-gradient-to-br from-white to-[var(--color-neutral-light)]">
        <div className="max-w-[1280px] w-full mx-auto px-6 sm:px-10 lg:px-[80px] flex flex-col lg:flex-row items-center gap-12">
          <div ref={heroRef} className="w-full lg:w-[60%] flex flex-col items-start relative z-10">
            <span className="text-[var(--color-primary)] text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-[24px]">
              {t("faq:hero.badge")}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[56px] leading-[0.95] tracking-[-0.04em] font-semibold text-neutral-900 mb-[32px] max-w-[620px]">
              {t("faq:hero.title")}
            </h1>
            <p className="text-[var(--color-neutral-p)] text-base sm:text-lg leading-relaxed max-w-[560px]">
              {t("faq:hero.subtitle")}
            </p>
          </div>
          <div className="hidden lg:block lg:w-[40%] relative h-[340px]">
             <Image 
               src="/IMAGES/travel.png"
               alt="FAQ Support"
               fill
               className="object-cover rounded-[32px] shadow-lg"
               priority
             />
          </div>
        </div>
      </section>

      {/* ================= FAQ ACCORDION LAYOUT ================= */}
      <section className="py-[144px] bg-white w-full">
        <div ref={faqContainerRef} className="max-w-[900px] mx-auto px-6 sm:px-10 flex flex-col gap-[20px]">
          
          <div className="mb-[40px] text-center">
            <h2 className="text-3xl lg:text-[40px] font-semibold text-neutral-900 mb-[16px]">
              {t("faq:introduction.title")}
            </h2>
            <p className="text-[var(--color-neutral-p)] text-lg max-w-[600px] mx-auto">
              {t("faq:introduction.description")}
            </p>
          </div>

          {rawFaqs?.length > 0 ? (
            rawFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-white border border-[var(--color-neutral-border)] rounded-[28px] overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <button 
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left bg-white focus:outline-none"
                  >
                    <span className="font-bold text-lg text-neutral-900 pr-8">{faq.question}</span>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[var(--color-primary)] text-white' : 'bg-[var(--color-neutral-light)] text-neutral-500'}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                    </span>
                  </button>
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-6 sm:p-8 pt-0 text-[var(--color-neutral-p)] leading-relaxed border-t border-[var(--color-neutral-light)]">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-[var(--color-neutral-p)] text-center">No FAQs available.</p>
          )}

        </div>
      </section>

      {/* ================= STILL HAVE QUESTIONS ================= */}
      <section className="py-[96px] bg-white w-full">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="w-full bg-[var(--color-primary)]/5 rounded-[40px] p-10 lg:p-16 flex flex-col items-center text-center">
            <div className="w-[64px] h-[64px] bg-white rounded-full flex items-center justify-center text-[var(--color-primary)] mb-[24px] shadow-sm">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </div>
            <h2 className="text-2xl lg:text-[36px] font-semibold text-neutral-900 mb-[16px]">
              {t("faq:contactSupport.title")}
            </h2>
            <p className="text-[var(--color-neutral-p)] text-lg leading-relaxed mb-[32px] max-w-[600px]">
              {t("faq:contactSupport.description")}
            </p>
            <Button 
              variant="secondary"
              onClick={() => router.push('/contact')}
            >
              {t("faq:contactSupport.primaryButton")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}