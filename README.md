# 🌐 IBN Sina — Bilingual Medical Tourism Platform

A production-grade, bilingual (English + Arabic) medical tourism website built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, **GSAP**, and **Lenis**. Designed as a luxury healthcare concierge experience — not a clinical medical website.

> **Live Architecture Demo**[ibn-sima.vercel.app] — This project demonstrates a complete client-side internationalization (i18n) system with RTL support, built without any i18n routing library, proving that bilingual web apps don't require complex middleware setups.

---

## Table of Contents

- [Why This Project Exists](#why-this-project-exists)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Bilingual System — Deep Dive](#bilingual-system--deep-dive)
  - [How It Works (The Big Picture)](#how-it-works-the-big-picture)
  - [Translation File Structure](#translation-file-structure)
  - [The LanguageContext Provider](#the-languagecontext-provider)
  - [Using Translations in Components](#using-translations-in-components)
  - [RTL (Right-to-Left) Support](#rtl-right-to-left-support)
  - [Adding a New Language](#adding-a-new-language)
  - [Adding a New Page's Translations](#adding-a-new-pages-translations)
- [Design System](#design-system)
- [Component Architecture](#component-architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Technical Decisions](#key-technical-decisions)
- [Performance Considerations](#performance-considerations)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Why This Project Exists

Medical tourism patients from Iraq and the UAE need a platform that speaks their language — literally. This project solves the bilingual challenge by building a **zero-dependency i18n system** that:

- Switches between English (LTR) and Arabic (RTL) **instantly** — no page reload
- Loads translations **lazily** from static JSON files — no build-time compilation
- Persists language preference in **localStorage** — remembers the user's choice
- Flips the **entire layout direction** automatically for Arabic
- Works with **any React component** through a simple `useLanguage()` hook

The design philosophy prioritizes a **luxury travel concierge** aesthetic over a clinical medical feel, drawing inspiration from premium travel platforms like [Tripora](https://tripora-wbs.webflow.io/), [Aquvion](https://aquvion.webflow.io/), and [Lumea](https://lumea-rent-template.webflow.io/).

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 16 (App Router) | Server components, file-based routing, image optimization |
| **Language** | TypeScript | Type safety across the entire codebase |
| **Styling** | Tailwind CSS v4 | Utility-first CSS with custom design tokens |
| **Animation** | GSAP + ScrollTrigger | Production-grade scroll animations, timeline sequencing |
| **Scrolling** | Lenis | Buttery smooth scroll experience |
| **i18n** | Custom React Context | Zero-dependency, full control, no middleware required |
| **State** | React Context + localStorage | Language preference persistence across sessions |

---

## Project Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        BROWSER                                │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   Next.js App Router                      │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐    │  │
│  │  │              RootLayout (app/layout.tsx)            │    │  │
│  │  │  • Loads fonts (Geist Sans / Mono)                  │    │  │
│  │  │  • Imports global CSS                               │    │  │
│  │  │  • Wraps everything in <ClientProviders>            │    │  │
│  │  │                                                      │    │  │
│  │  │  ┌────────────────────────────────────────────────┐  │    │  │
│  │  │  │           ClientProviders                       │  │    │  │
│  │  │  │  ┌──────────────────────────────────────────┐   │  │    │  │
│  │  │  │  │        LanguageProvider                   │   │  │    │  │
│  │  │  │  │  • Loads JSON from /public/locals/{lang}/ │   │  │    │  │
│  │  │  │  │  • Provides t() and switchLanguage()      │   │  │    │  │
│  │  │  │  │  • Sets <html dir="rtl|ltr" lang="..">    │   │  │    │  │
│  │  │  │  │                                            │   │  │    │  │
│  │  │  │  │  ┌──────────────────────────────────────┐  │   │  │    │  │
│  │  │  │  │  │         SmoothScroll (Lenis)         │  │   │  │    │  │
│  │  │  │  │  │  ┌──────────────────────────────┐    │  │   │  │    │  │
│  │  │  │  │  │  │  Header + Page + Footer      │    │  │   │  │    │  │
│  │  │  │  │  │  └──────────────────────────────┘    │  │   │  │    │  │
│  │  │  │  │  └──────────────────────────────────────┘  │   │  │    │  │
│  │  │  │  └──────────────────────────────────────────┘   │  │    │  │
│  │  │  └────────────────────────────────────────────────┘  │    │  │
│  │  └────────────────────────────────────────────────────┘    │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘

              ┌──────────────────────────────┐
              │    /public/locals/            │
              │    ├── en/                    │
              │    │   ├── common.json        │
              │    │   ├── home.json          │
              │    │   ├── about.json         │
              │    │   └── ... (14 files)     │
              │    └── ar/                    │
              │        ├── common.json        │
              │        ├── home.json          │
              │        ├── about.json         │
              │        └── ... (14 files)     │
              └──────────────────────────────┘
```

---

## Bilingual System — Deep Dive

### How It Works (The Big Picture)

Most bilingual setups rely on routing middleware (`/en/about`, `/ar/about`) which adds complexity, requires special middleware configuration, and often forces full page reloads on language switch. This project takes a different approach:

```
User clicks "عربي" button
        │
        ▼
switchLanguage() is called
        │
        ▼
State updates: locale = "ar"
        │
        ├──▶ fetch() loads all JSON from /public/locals/ar/
        ├──▶ <html dir="rtl" lang="ar"> is set on the DOM
        ├──▶ localStorage saves "ibnsina-lang" = "ar"
        │
        ▼
All components re-render with Arabic text
(No page reload. No URL change. Instant.)
```

**Why this approach?**
- ✅ **Zero page reload** — language switch is instant
- ✅ **No middleware** — simpler deployment, works on any static host
- ✅ **No build-time compilation** — translations are runtime-loaded JSON
- ✅ **Separation of concerns** — content team edits JSON, dev team edits components
- ✅ **Easy to extend** — adding a 3rd language is just a new folder

---

### Translation File Structure

Translations are organized as **one JSON file per page**, stored in `public/locals/`:

```
public/
└── locals/
    ├── en/                          # English translations
    │   ├── common.json              # Shared: nav links, buttons, footer
    │   ├── home.json                # Home page content
    │   ├── about.json               # About page content
    │   ├── treatments.json          # Treatments page
    │   ├── hospitals.json           # Hospitals page
    │   ├── countries.json           # Countries page
    │   ├── faq.json                 # FAQ page
    │   ├── contact.json             # Contact page
    │   ├── why-india.json           # Why India page
    │   ├── why-choose-us.json       # Why Choose Us page
    │   ├── process.json             # Process page
    │   ├── patient-services.json    # Patient Services page
    │   ├── second-opinion.json      # Second Opinion page
    │   └── seo.json                 # SEO metadata per page
    │
    └── ar/                          # Arabic translations (same structure)
        ├── common.json
        ├── home.json
        └── ... (mirrors /en/ exactly)
```

**Example — `common.json` (English):**

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "treatments": "Treatments",
    "whyIndia": "Why India",
    "services": "Services",
    "hospitals": "Hospitals & Doctors",
    "faq": "FAQ",
    "contact": "Contact"
  },
  "buttons": {
    "contact": "Contact Us",
    "learnMore": "Learn More",
    "sendReports": "Send Your Medical Reports",
    "talkCoordinator": "Talk to a Patient Coordinator"
  },
  "footer": {
    "title": "IBN Sina Medical Tourism",
    "description": "Helping patients from Iraq and the UAE access trusted healthcare in India.",
    "rights": "All Rights Reserved."
  }
}
```

**Same file — `common.json` (Arabic):**

```json
{
  "nav": {
    "home": "الرئيسية",
    "about": "عن الشركة",
    "treatments": "العلاجات",
    "whyIndia": "لماذا الهند",
    "services": "الخدمات",
    "hospitals": "المستشفيات والأطباء",
    "faq": "الأسئلة الشائعة",
    "contact": "اتصل بنا"
  }
}
```

---

### The LanguageContext Provider

The entire i18n system lives in a single file: **`context/LanguageContext.tsx`**

It exposes these values to every component in the app:

| Export | Type | Purpose |
|--------|------|---------|
| `locale` | `"en" \| "ar"` | Current active language |
| `switchLanguage()` | `() => void` | Toggle between English and Arabic |
| `t(key)` | `(string) => string` | Get a translated string by dot-notation key |
| `getArray(key)` | `(string) => unknown[]` | Get a translated array (e.g., list of items) |
| `isLoaded` | `boolean` | Whether translations have finished loading |

**How the `t()` function resolves keys:**

```
t("hero.title")
  → Searches ALL loaded JSON files for the path hero → title
  → Returns the first match found

t("common:nav.about")
  → The "common:" prefix tells it to search ONLY common.json
  → Looks for nav → about inside common.json
  → Returns "About" (en) or "عن الشركة" (ar)

t("home:whyChoose.items.0.title")
  → Searches home.json → whyChoose → items → [0] → title
```

**The explicit prefix syntax (`filename:path`) is recommended** when you know which file a key belongs to. It's faster and prevents accidental collisions.

---

### Using Translations in Components

Here's a real example from the project showing how a component uses the bilingual system:

```tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";

export const HeroSection = () => {
  // Destructure the translation function and array getter
  const { t, getArray } = useLanguage();

  return (
    <section>
      {/* Simple string translation */}
      <span>{t("home:hero.badge")}</span>
      
      {/* Heading translation */}
      <h1>{t("home:hero.title")}</h1>
      
      {/* Paragraph translation */}
      <p>{t("home:hero.subtitle")}</p>
      
      {/* Button text from shared common.json */}
      <button>{t("common:buttons.talkCoordinator")}</button>
      
      {/* Array translation — renders a list */}
      {(getArray("home:hero.questions") as string[]).map((q, i) => (
        <p key={i}>{q}</p>
      ))}
    </section>
  );
};
```

**That's it.** No HOCs, no wrapper functions, no special syntax. Import the hook, call `t()`, done.

---

### RTL (Right-to-Left) Support

Arabic is a right-to-left language. The system handles this automatically:

```tsx
// Inside LanguageContext.tsx — runs whenever locale changes
useEffect(() => {
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  localStorage.setItem("ibnsina-lang", locale);
}, [locale]);
```

**What this does:**
- Sets `<html dir="rtl">` when Arabic is active
- Sets `<html dir="ltr">` when English is active
- Tailwind CSS respects the `dir` attribute automatically
- Flexbox layouts reverse direction in RTL mode
- Text alignment flips from left to right

**Tailwind RTL utilities you can use:**

```html
<!-- Normal: margin-left. RTL: margin-right -->
<div class="ms-4">...</div>

<!-- Normal: padding-right. RTL: padding-left -->
<div class="pe-8">...</div>

<!-- Normal: text-left. RTL: text-right -->
<p class="text-start">...</p>
```

---

### Adding a New Language

Want to add French? Here's the complete process:

**Step 1:** Create the translation folder and files:
```
public/locals/fr/
├── common.json
├── home.json
├── about.json
└── ... (copy structure from /en/, translate values)
```

**Step 2:** Update the type in `LanguageContext.tsx`:
```tsx
// Before
type Locale = "en" | "ar";

// After
type Locale = "en" | "ar" | "fr";
```

**Step 3:** Update the `switchLanguage` function (or build a language selector dropdown):
```tsx
const switchLanguage = useCallback(() => {
  setLocale((prev) => {
    if (prev === "en") return "ar";
    if (prev === "ar") return "fr";
    return "en";
  });
}, []);
```

**Step 4:** Handle direction if the new language needs RTL:
```tsx
document.documentElement.dir = ["ar", "he", "fa"].includes(locale) ? "rtl" : "ltr";
```

That's it. No routing changes. No middleware. No rebuild required.

---

### Adding a New Page's Translations

**Step 1:** Create the JSON files:
```
public/locals/en/pricing.json
public/locals/ar/pricing.json
```

**Step 2:** Register the file in `LanguageContext.tsx`:
```tsx
const PAGE_FILES = [
  "common",
  "home",
  "about",
  // ... existing files
  "pricing",  // ← Add this line
];
```

**Step 3:** Use it in your component:
```tsx
const { t } = useLanguage();
<h1>{t("pricing:hero.title")}</h1>
```

---

## Design System

The design system is documented in [Design.md](./Design.md) and implemented through CSS custom properties in `globals.css`.

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#097C87` | Buttons, links, icons, accent lines |
| `--color-secondary` | `#23CED9` | Hover states, interactive elements, gradients |
| `--color-accent` | `#FCA47C` | Small highlights, badges, arrows (never large bg) |
| `--color-highlight` | `#F9D779` | Feature backgrounds, statistics, soft sections |
| `--color-surface` | `#A1CCA6` | Cards, illustrations, background layers |
| `--color-neutral-text` | `#1A1A1A` | Primary text |
| `--color-neutral-p` | `#5B5B5B` | Paragraph text |
| `--color-neutral-muted` | `#8A8A8A` | Muted/secondary text |

### Spacing Scale

Only these values are used — never arbitrary numbers:

```
8 → 16 → 24 → 32 → 40 → 48 → 64 → 80 → 96 → 120 → 144 → 192
```

### Component Specifications

| Component | Height | Padding | Radius | Shadow | Hover |
|-----------|--------|---------|--------|--------|-------|
| **Button** | 56px | 32px horizontal | 18px | Subtle | Lift 4px + shadow + color (0.35s) |
| **Card** | Auto | 32px | 28px | `0 20px 60px rgba(0,0,0,.06)` | translateY(-8px) scale(1.02) (0.45s) |
| **Image** | — | — | 32px | Almost invisible | — |
| **Badge** | — | — | 999px | — | — |

---

## Component Architecture

```
components/
├── ClientProviders.tsx          # Bundles all client-side providers
├── SmoothScroll.tsx             # Lenis smooth scrolling wrapper
│
├── layout/
│   ├── Header.tsx               # Floating glass navigation + language toggle
│   └── Footer.tsx               # Dark 4-column footer
│
├── ui/
│   ├── Button.tsx               # Primary/Secondary button with hover effects
│   └── Card.tsx                 # Reusable hover-lift card
│
├── home/
│   ├── HeroSection.tsx          # Full-viewport hero with GSAP animations
│   ├── TrustStrip.tsx           # Overlapping trust indicators
│   ├── AboutPreview.tsx         # Editorial image+text with clip-path reveal
│   ├── WhyChooseUs.tsx          # Premium feature cards
│   ├── CountriesSection.tsx     # Countries we serve with images
│   ├── ServicesSection.tsx      # Medical services showcase
│   ├── Cards3D.tsx              # 3D perspective cards
│   ├── InfiniteMarquee.tsx      # Infinite scrolling text marquee
│   ├── PinnedGallery.tsx        # ScrollTrigger pinned image gallery
│   ├── StickyStory.tsx          # Sticky scroll storytelling
│   ├── HorizontalStorytelling.tsx # Horizontal scroll section
│   └── CurtainCTA.tsx           # Final call-to-action with curtain reveal
│
├── about/                       # About page components
├── contact/                     # Contact page components
├── treatments/                  # Treatments page components
├── hospitals/                   # Hospitals page components
├── faq/                         # FAQ page components
├── services/                    # Services page components
└── why-india/                   # Why India page components
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.17
- **npm** ≥ 9.0

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ibnsima.git
cd ibnsima

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint across the codebase |

---

## Project Structure

```
ibnsima/
├── app/                         # Next.js App Router pages
│   ├── layout.tsx               # Root layout (fonts, providers)
│   ├── page.tsx                 # Home page (assembles sections)
│   ├── globals.css              # Design system tokens + base styles
│   ├── about/                   # /about route
│   ├── contact/                 # /contact route
│   ├── faq/                     # /faq route
│   ├── hospitals/               # /hospitals route
│   ├── services/                # /services route
│   ├── treatments/              # /treatments route
│   └── why-india/               # /why-india route
│
├── components/                  # All UI components (see Component Architecture)
├── context/
│   └── LanguageContext.tsx       # The bilingual system (single file)
│
├── public/
│   └── locals/                  # Translation JSON files
│       ├── en/                  # English (14 files)
│       └── ar/                  # Arabic (14 files)
│
├── Design.md                    # Complete design specification
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

---

## Key Technical Decisions

### Why Custom i18n Instead of next-intl or react-intl?

| Factor | Custom Context | next-intl | react-intl |
|--------|---------------|-----------|------------|
| Bundle size | 0 KB (built-in React) | ~45 KB | ~60 KB |
| Middleware required | ❌ No | ✅ Yes | ❌ No |
| URL-based routing | ❌ No | ✅ Yes (`/en/`, `/ar/`) | ❌ No |
| Page reload on switch | ❌ No | ✅ Yes (navigation) | ❌ No |
| Server components | ⚠️ Client only | ✅ Full support | ⚠️ Client only |
| Learning curve | Very low | Medium | Medium |
| Control over loading | Full | Limited | Limited |

**Tradeoff:** This approach doesn't support SEO-optimized locale URLs (`/en/about`, `/ar/about`). For a marketing site where SEO per-locale matters, consider migrating to `next-intl` with App Router middleware. For this project — a patient-facing service platform — instant switching and simplicity were prioritized.

### Why GSAP Over Framer Motion?

- GSAP's `ScrollTrigger` provides pixel-precise scroll-linked animations
- Timeline sequencing allows orchestrated entrance animations
- Better performance for complex, multi-element animations
- Industry standard — used by Apple, Google, Nike

### Why Lenis for Smooth Scrolling?

- Native-feel smooth scrolling without hijacking scroll behavior
- Works seamlessly with GSAP ScrollTrigger
- Respects accessibility preferences (`prefers-reduced-motion`)
- Lightweight (~5 KB gzipped)

---

## Performance Considerations

- **Translation loading** — All JSON files for the active language are fetched in parallel using `Promise.all()`, minimizing load time
- **Lazy sections** — Below-the-fold sections use `ScrollTrigger` for deferred animation initialization
- **Image optimization** — Next.js `<Image>` component handles responsive sizing, lazy loading, and format conversion
- **Font loading** — Google Fonts loaded via `next/font` for zero layout shift
- **CSS** — Tailwind CSS v4 with tree-shaking removes unused styles at build time

---

## Deployment

The project builds as a standard Next.js application and can be deployed to:

- **Vercel** (recommended) — `vercel deploy`
- **Netlify** — With Next.js adapter
- **AWS Amplify** — Native Next.js support
- **Docker** — Standard Node.js container

```bash
# Build for production
npm run build

# Preview the production build locally
npm run start
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/add-kurdish-language`)
3. Follow the existing code style and comment conventions
4. Ensure `npm run build` passes without errors
5. Submit a pull request with a clear description

### Code Style

- Every file has a header comment block explaining its purpose
- Components use descriptive variable names
- Design specs from `Design.md` are referenced in comments
- Translation keys use the `filename:path.to.key` convention

---

## License

This project is proprietary. All rights reserved.

---

<p align="center">
  <strong>Built by a developer who believes healthcare should have no language barriers.</strong>
</p>
