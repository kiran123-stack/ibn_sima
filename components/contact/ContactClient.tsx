"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/*  LOCAL DESIGN TOKENS — one source of truth for spacing / radius /   */
/*  type across every section. Move to tailwind.config if reused       */
/*  site-wide.                                                         */
/* ------------------------------------------------------------------ */
const CONTAINER = "max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20";
const SECTION_Y = "py-24 lg:py-36";
const RADIUS_SM = "rounded-2xl"; // 16px — inputs, icon badges
const RADIUS_MD = "rounded-3xl"; // 24px — cards, dropzone
const RADIUS_LG = "rounded-[2.5rem]"; // 40px — image bands, form panel, floating panels
const ELEV = "shadow-[0_24px_70px_-16px_rgba(15,23,42,0.16)]";

const EYEBROW = "text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]";
const DISPLAY =
  "text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-[-0.03em] font-semibold";
const HEADING =
  "text-3xl sm:text-4xl lg:text-[40px] leading-[1.1] tracking-[-0.02em] font-semibold";
const CARD_TITLE = "text-xl font-semibold";
const BODY_LG = "text-base sm:text-lg leading-relaxed";

/* Free-to-use Unsplash photography (Unsplash License, no attribution
   required). Served at 2400px so a full-bleed banner never softens. */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1758691461957-474a7686e388?q=80&w=2400&auto=format&fit=crop";
const CONTACT_BG_IMAGE =
  "https://images.unsplash.com/photo-1755995083683-50d08cd83d09?q=80&w=2400&auto=format&fit=crop";

/* ------------------------------------------------------------------ */
/*  ICONS — hand-drawn, single stroke weight, shared proportions       */
/* ------------------------------------------------------------------ */
function IconPhone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7.7 3.5H5.9c-.9 0-1.7.4-2.2 1.1-1.1 1.5-1.2 3.9.1 6.9 1.7 4 5 7.3 9 9 3 1.3 5.4 1.2 6.9.1.7-.5 1.1-1.3 1.1-2.2v-1.8c0-.5-.3-.9-.8-1.1l-3.2-1.2c-.4-.2-.9 0-1.2.3l-1.1 1.2c-2.1-1-3.8-2.7-4.8-4.8l1.2-1.1c.3-.3.4-.8.3-1.2L9.9 5.3c-.1-.5-.6-.8-1.1-.8H7.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 7.5l7.1 5.4c.5.4 1.3.4 1.8 0L20 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChat({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3.5c4.7 0 8.5 3.2 8.5 7.2 0 4-3.8 7.2-8.5 7.2-1 0-1.9-.1-2.8-.4L4.5 19l1.1-3.4C4.6 14.3 3.5 12.6 3.5 10.7c0-4 3.8-7.2 8.5-7.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="8.7" cy="10.7" r="0.9" fill="currentColor" />
      <circle cx="12" cy="10.7" r="0.9" fill="currentColor" />
      <circle cx="15.3" cy="10.7" r="0.9" fill="currentColor" />
    </svg>
  );
}

function IconCheck({ className = "", drawn = false }: { className?: string; drawn?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path
        d="M8 12.3l2.6 2.6L16.3 9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={drawn ? "success-check" : ""}
      />
    </svg>
  );
}

function IconUpload({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7.5 17.5a4.5 4.5 0 0 1-.9-8.9A5.5 5.5 0 0 1 17 8a4 4 0 0 1-.6 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20v-7m0 0-2.5 2.5M12 13l2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFileDone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12" />
      <path
        d="M8 12.3l2.6 2.6L16.3 9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Eight-point rosette — a nod to Ibn Sina's era of Islamic geometric
 * design and manuscript ornament. Used at low opacity as a page
 * signature, never as foreground decoration.
 */
function HeritageMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 320" fill="none" className={className} aria-hidden="true">
      <circle cx="160" cy="160" r="150" stroke="currentColor" strokeWidth="1" />
      <circle cx="160" cy="160" r="96" stroke="currentColor" strokeWidth="1" />
      <polygon points="160,20 300,160 160,300 20,160" stroke="currentColor" strokeWidth="1" />
      <polygon points="259,259 61,259 61,61 259,61" stroke="currentColor" strokeWidth="1" />
      <circle cx="160" cy="160" r="3.5" fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

const contactMethods = [
  { Icon: IconPhone, title: "Phone & WhatsApp", value: "+971 00 000 0000", action: "Call Now" },
  { Icon: IconMail, title: "Email Us", value: "info@ibnsina.com", action: "Send Email" },
  { Icon: IconChat, title: "Live Chat", value: "Talk to a Coordinator", action: "Start Chat" },
];

export function ContactClient() {
  const { t, getArray } = useLanguage();
  const whyContact = getArray("contact:whyContact.items") as { title: string; description: string }[];

  const heroRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // File Upload & Form State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        Array.from(heroRef.current.children),
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      );
    }

    if (optionsRef.current) {
      gsap.fromTo(
        Array.from(optionsRef.current.children),
        { y: 36, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: optionsRef.current, start: "top 80%" },
        }
      );
    }

    if (formRef.current) {
      gsap.fromTo(
        Array.from(formRef.current.children),
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: formRef.current, start: "top 78%" },
        }
      );
    }
  }, []);

  // --- File Upload Handlers ---
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col w-full bg-white overflow-hidden">
      {/* ================= HERO — image band on top, text band below ================= */}
      <section className="relative w-full pt-[88px]">
        {/* full-bleed image band */}
        <div
          className={`relative w-full h-[56vh] min-h-[440px] max-h-[640px] overflow-hidden ${RADIUS_LG} rounded-t-none`}
        >
          <Image
            src={HERO_IMAGE}
            alt="IBN Sina physician consulting warmly with a patient"
            fill
            priority
            className="object-cover object-[center_35%] hero-image-kenburns"
          />
          {/* single, quiet gradient — legible badge, honest photo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
          <HeritageMark className="pointer-events-none absolute -top-14 -right-14 w-[260px] h-[260px] text-white opacity-[0.14]" />

          <div className="absolute left-6 sm:left-10 lg:left-20 top-8 fade-slide-up">
            <span
              className={`${EYEBROW} inline-flex items-center gap-2 bg-white/90 backdrop-blur-md text-[var(--color-primary)] px-5 py-2.5 ${RADIUS_SM} shadow-sm border border-white/60`}
            >
              {t("contact:hero.badge")}
            </span>
          </div>
        </div>

        {/* text band */}
        <div
          ref={heroRef}
          className={`${CONTAINER} py-14 lg:py-20 flex flex-col lg:flex-row lg:items-start justify-between gap-10 lg:gap-16 border-b border-[var(--color-neutral-border)]`}
        >
          <h1 className={`${DISPLAY} text-neutral-900 max-w-[620px]`}>{t("contact:hero.title")}</h1>
          <div className="flex flex-col gap-6 max-w-[440px] lg:pl-10 lg:border-l lg:border-[var(--color-neutral-border)]">
            <p className={`${BODY_LG} text-neutral-900 font-medium`}>{t("contact:hero.subtitle")}</p>
            <p className="text-sm sm:text-base text-[var(--color-neutral-p)] leading-relaxed">
              {t("contact:hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT OPTIONS — image background, glass cards ================= */}
      <section
        ref={optionsRef}
        className={`relative w-full overflow-hidden ${RADIUS_LG}`}
      >
        <div className="absolute inset-0">
          <Image  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=800&auto=format&fit=crop" alt="" fill className="object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[var(--color-primary)]/70 to-black/85" />
        </div>

        <div className={`relative ${CONTAINER} ${SECTION_Y}`}>
          <div className="text-center mb-16 max-w-[640px] mx-auto">
            <span className={`${EYEBROW} text-white/70`}>{t("contact:contactInfo.title")}</span>
            <h2 className={`${HEADING} text-white mt-4`}>{t("contact:contactInfo.description")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map(({ Icon, title, value, action }) => (
              <div
                key={title}
                className={`group flex flex-col items-center text-center p-10 ${RADIUS_MD} bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/15 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-500 ease-out`}
              >
                <div
                  className={`w-16 h-16 bg-white/15 ${RADIUS_SM} flex items-center justify-center text-white mb-6 transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-110`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className={`${CARD_TITLE} text-white mb-2`}>{title}</h3>
                <p className="text-white/70 mb-6">{value}</p>
                <Button
                  className="w-full bg-transparent border border-white/30 text-white hover:bg-white hover:text-[var(--color-primary)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FORM SECTION ================= */}
      <section className={`${SECTION_Y} bg-[var(--color-neutral-light)] w-full`}>
        <div ref={formRef} className={`${CONTAINER} flex flex-col lg:flex-row gap-16`}>
          {/* Left: Trust Content — pinned alongside the taller form */}
          <div className="w-full lg:w-[38%] flex flex-col lg:sticky lg:top-32 lg:self-start">
            <span className={`${EYEBROW} text-[var(--color-primary)] mb-5`}>
              {t("contact:whyContact.title")}
            </span>
            <h2 className={`${HEADING} text-neutral-900 mb-6`}>{t("contact:form.title")}</h2>
            <p className={`${BODY_LG} text-[var(--color-neutral-p)] mb-12`}>
              {t("contact:form.description")}
            </p>

            <div className="flex flex-col gap-6">
              {whyContact?.length > 0 &&
                whyContact.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <IconCheck className="mt-0.5 w-6 h-6 shrink-0 text-[var(--color-primary)]" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">{item.title}</h4>
                      <p className="text-sm text-[var(--color-neutral-p)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Right: Premium Form */}
          <div className="w-full lg:w-[62%]">
            <div className={`bg-white p-8 lg:p-12 ${RADIUS_LG} ${ELEV}`}>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 lg:py-20 success-pop">
                  <div className="w-20 h-20 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center text-[var(--color-primary)] mb-6">
                    <IconCheck className="w-10 h-10" drawn />
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                    {t("contact:successMessage.title")}
                  </h3>
                  <p className={`${BODY_LG} text-[var(--color-neutral-p)]`}>
                    {t("contact:successMessage.description")}
                  </p>
                </div>
              ) : (
                <form
                  className="flex flex-col gap-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsSubmitted(true);
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-900">
                        {t("contact:form.fields.name.label")}{" "}
                        <span className="text-[var(--color-accent)]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        title={t("contact:validation.nameRequired")}
                        placeholder={t("contact:form.fields.name.placeholder")}
                        className={`h-14 px-4 ${RADIUS_SM} bg-[var(--color-neutral-light)] border border-transparent focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-colors duration-300`}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-900">
                        {t("contact:form.fields.country.label")}{" "}
                        <span className="text-[var(--color-accent)]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        title={t("contact:validation.countryRequired")}
                        placeholder={t("contact:form.fields.country.placeholder")}
                        className={`h-14 px-4 ${RADIUS_SM} bg-[var(--color-neutral-light)] border border-transparent focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-colors duration-300`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-900">
                        {t("contact:form.fields.phone.label")}{" "}
                        <span className="text-[var(--color-accent)]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        title={t("contact:validation.phoneRequired")}
                        placeholder={t("contact:form.fields.phone.placeholder")}
                        className={`h-14 px-4 ${RADIUS_SM} bg-[var(--color-neutral-light)] border border-transparent focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-colors duration-300`}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-neutral-900">
                        {t("contact:form.fields.email.label")}{" "}
                        <span className="text-[var(--color-accent)]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        title={t("contact:validation.emailRequired")}
                        placeholder={t("contact:form.fields.email.placeholder")}
                        className={`h-14 px-4 ${RADIUS_SM} bg-[var(--color-neutral-light)] border border-transparent focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-colors duration-300`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-neutral-900">
                      {t("contact:form.fields.medicalCondition.label")}{" "}
                      <span className="text-[var(--color-accent)]">*</span>
                    </label>
                    <textarea
                      required
                      title={t("contact:validation.conditionRequired")}
                      placeholder={t("contact:form.fields.medicalCondition.placeholder")}
                      className={`h-32 p-4 ${RADIUS_SM} bg-[var(--color-neutral-light)] border border-transparent focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none resize-none transition-colors duration-300`}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-neutral-900">
                      {t("contact:form.fields.message.label")}{" "}
                      <span className="text-[var(--color-accent)]">*</span>
                    </label>
                    <textarea
                      required
                      title={t("contact:validation.messageRequired")}
                      placeholder={t("contact:form.fields.message.placeholder")}
                      className={`h-32 p-4 ${RADIUS_SM} bg-[var(--color-neutral-light)] border border-transparent focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none resize-none transition-colors duration-300`}
                    />
                  </div>

                  {/* FUNCTIONAL DRAG AND DROP UPLOAD AREA */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-neutral-900">
                      {t("contact:form.fields.reports.label")}
                    </label>
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <div
                      onClick={triggerFileInput}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed ${RADIUS_MD} p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-300 ${
                        isDragging
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10"
                          : "border-[var(--color-neutral-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
                      }`}
                    >
                      {selectedFile ? (
                        <>
                          <IconFileDone className="w-12 h-12 text-[var(--color-primary)] mb-4" />
                          <p className="font-semibold text-neutral-900 mb-1 line-clamp-1 break-all px-4">
                            {selectedFile.name}
                          </p>
                          <p className="text-sm text-[var(--color-neutral-p)]">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </>
                      ) : (
                        <>
                          <div
                            className={`w-12 h-12 bg-white ${RADIUS_SM} flex items-center justify-center text-[var(--color-primary)] shadow-sm mb-4 transition-transform duration-300`}
                          >
                            <IconUpload className="w-6 h-6" />
                          </div>
                          <p className="font-semibold text-neutral-900 mb-1 max-w-[280px]">
                            {t("contact:form.fields.reports.placeholder")}
                          </p>
                          <p className="text-sm text-[var(--color-neutral-p)]">PDF, JPG, PNG up to 10MB</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Button
                      type="submit"
                      className="w-full sm:w-auto transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {t("contact:form.buttons.submit")}
                    </Button>
                    <Button
                      type="button"
                      className={`w-full sm:w-auto bg-black border border-[var(--color-neutral-border)] text-neutral-900 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300`}
                    >
                      {t("contact:form.buttons.coordinator")}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section
        className={`relative w-full bg-[var(--color-primary)] ${SECTION_Y} rounded-t-[2.5rem] text-center overflow-hidden`}
      >
        <HeritageMark className="pointer-events-none absolute -bottom-28 -left-28 w-[380px] h-[380px] text-white opacity-[0.07]" />

        <div className="relative max-w-[900px] mx-auto px-6 flex flex-col items-center">
          <h2 className={`${DISPLAY} text-white mb-6`}>{t("contact:cta.title")}</h2>
          <p className="text-white/80 text-lg mb-12 max-w-[560px]">{t("contact:cta.description")}</p>
          <div className="flex flex-wrap gap-5 justify-center">
            <Button className="bg-black text-white hover:bg-neutral-100 border-none shadow-lg transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]">
              {t("contact:cta.primaryButton")}
            </Button>
            <Button className="bg-transparent text-white hover:bg-white/10 border border-white/30 shadow-lg transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]">
              {t("contact:cta.secondaryButton")}
            </Button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes kenburns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.08);
          }
        }
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          60% {
            opacity: 1;
            transform: scale(1.04);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes checkDraw {
          from {
            stroke-dashoffset: 20;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        :global(.hero-image-kenburns) {
          animation: kenburns 18s ease-out forwards;
        }
        :global(.fade-slide-up) {
          animation: fadeSlideUp 0.8s ease-out 0.2s both;
        }
        :global(.success-pop) {
          animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        :global(.success-check) {
          stroke-dasharray: 20;
          stroke-dashoffset: 20;
          animation: checkDraw 0.6s ease-out 0.3s forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.hero-image-kenburns),
          :global(.fade-slide-up),
          :global(.success-pop),
          :global(.success-check) {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}