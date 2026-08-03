"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const HorizontalStorytelling = () => {
  const { t, getArray } = useLanguage();

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);

  const steps = (getArray("home:journey.steps") || []) as {
    number: string;
    title: string;
    description: string;
  }[];

  const current =
    steps[activeStep] ?? {
      number: "01",
      title: "",
      description: "",
    };

 useEffect(() => {
  if (!sectionRef.current) return;

  const ctx = gsap.context(() => {
    const triggers: ScrollTrigger[] = [];

    steps.forEach((_, index) => {
      const trigger = ScrollTrigger.create({
        trigger: `.story-step-${index}`,
        start: "top center",
        end: "bottom center",

        onEnter: () => {
          setActiveStep(index);
        },

        onEnterBack: () => {
          setActiveStep(index);
        },
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, sectionRef);

  return () => ctx.revert();
}, [steps]);

useEffect(() => {
  if (!contentRef.current) return;

  gsap.fromTo(
    contentRef.current,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
    }
  );
}, [activeStep]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[1000vh] bg-[#050C14]"
    >
      {/* Sticky Area */}

      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background */}

        <Image
          src="/IMAGES/PEOPLE.png"
          alt="Medical Journey"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(9,124,135,.45) 0%, rgba(5,12,20,.82) 100%)",
          }}
        />

        {/* Big Step Number */}

        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 z-20 pointer-events-none">

          <span className="text-[180px] lg:text-[260px] font-black text-white/5">
            {current.number}
          </span>

        </div>

        {/* Text */}

        <div
          ref={contentRef}
          className="relative z-20 h-full flex items-end"
        >
          <div className="px-8 sm:px-12 lg:px-[120px] pb-[90px] max-w-[760px]">

            <span className="text-[var(--color-secondary)] uppercase tracking-[0.22em] text-sm font-semibold mb-5 block">

              Step {current.number}

            </span>

            <h2 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] mb-6">

              {current.title}

            </h2>

            <p className="text-white/70 text-lg leading-relaxed max-w-[560px]">

              {current.description}

            </p>

            <div className="flex gap-2 mt-10">

              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`transition-all duration-300 rounded-full h-2 ${
                    i === activeStep
                      ? "w-8 bg-[var(--color-secondary)]"
                      : "w-2 bg-white/30"
                  }`}
                />
              ))}

            </div>
                        {/* Side Label */}

            <div className="absolute top-[40px] left-[40px] flex items-center gap-3">

              <div className="w-px h-8 bg-white/30" />

              <span className="text-white/50 uppercase tracking-[0.2em] text-xl font-semibold">

                {t("home:journey.title")}

              </span>

            </div>

          </div>
        </div>
      </div>

      {/* Invisible Scroll Sections */}

      <div className="absolute inset-0 pointer-events-none">

        {steps.map((_, index) => (
          <div
            key={index}
            className={`story-step-${index} h-screen`}
          />
        ))}

      </div>

    </section>
  );
};