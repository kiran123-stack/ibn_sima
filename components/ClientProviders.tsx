"use client";

/* ============================================================
 * CLIENT PROVIDERS (components/ClientProviders.tsx)
 * ============================================================
 * This component bundles all client-side providers together:
 * - LanguageProvider (EN/AR translation system)
 * - SmoothScroll (Lenis smooth scrolling)
 * - Header (floating navigation)
 * - Footer (dark bottom section)
 *
 * We need this because Next.js layout.tsx is a Server Component,
 * but LanguageProvider and SmoothScroll need to run on the client.
 * ============================================================ */

import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScroll from "@/components/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </SmoothScroll>
    </LanguageProvider>
  );
}
