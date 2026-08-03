/* ============================================================
 * ROOT LAYOUT (app/layout.tsx)
 * ============================================================
 * This is the main layout that wraps the entire website.
 * It includes:
 * - Font loading (Geist Sans + Mono)
 * - Global CSS
 * - ClientProviders (Language, SmoothScroll, Header, Footer)
 *
 * TO CHANGE FONTS: Edit the Geist imports below
 * TO ADD A NEW PROVIDER: Add it inside ClientProviders.tsx
 * ============================================================ */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

/* ----- Font Setup ----- */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ----- SEO Metadata ----- */
export const metadata: Metadata = {
  title: "Medical Tourism in India | IBN Sina – Iraq, UAE & India",
  description:
    "IBN Sina helps patients from Iraq and the UAE access trusted hospitals and specialist healthcare in India with personalised medical tourism and patient support.",
};

/* ----- Layout Component ----- */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[var(--color-neutral-text)]">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
