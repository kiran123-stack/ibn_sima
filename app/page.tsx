/* ============================================================
 * HOME PAGE (app/page.tsx)
 * ============================================================
 * Landing page section order:
 *
 * 1.  HeroSection            — Original hero (white bg, Unsplash img, 3 badges)
 * 2.  TrustStrip             — Original overlap trust strip
 * 3.  AboutPreview           — Original about section (image left, text right)
 * 4.  ServicesSection        — Clip-path reveal effect × 3 services (Before/During/After)
 * 5.  WhyChooseUs            — Original why choose us cards
 * 6.  ImageStackReveal       — Stacked images sliding (#1)
 * 7.  HorizontalStorytelling — Horizontal scroll journey (#2)
 * 8.  Cards3D                — Cards fly from 3D (#6 + #18)
 * 9.  StickyStory            — 300vh pinned story (#13)
 * 10. PinnedGallery          — Pinned image + clip-path reveals (#5 #8 #16)
 * 11. JourneyTimeline        — Timeline + plane + slices (#19 #15)
 * 12. FloatingGallery        — Explosion + float + shuffle (#11 #12 #20)
 * 13. CountriesSection       — Iraq / UAE / India (no images, brand colors)
 * 14. CurtainCTA             — Clean on-brand CTA with curtain transition (#14)
 *
 * CONTENT: All text from public/locals/{en|ar}/*.json
 * IMAGES:  Only ServicesSection / JourneyTimeline / PinnedGallery / FloatingGallery
 *          use images from public/IMAGES/
 * ============================================================ */

import { HeroSection } from "@/components/home/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

import { HorizontalStorytelling } from "@/components/home/HorizontalStorytelling";
import { Cards3D } from "@/components/home/Cards3D";
import { StickyStory } from "@/components/home/StickyStory";
import { PinnedGallery } from "@/components/home/PinnedGallery";


import { CountriesSection } from "@/components/home/CountriesSection";
import { CurtainCTA } from "@/components/home/CurtainCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">

      {/* 1. HERO — white bg, Unsplash image, 3 floating stat badges */}
      <HeroSection />

      {/* 2. TRUST STRIP — overlaps hero by -60px, 5 trust indicators */}
      <TrustStrip />

      {/* 3. ABOUT PREVIEW — original clip-path reveal, Unsplash image, floating card */}
      <AboutPreview />

      {/* 5. WHY CHOOSE US — original premium cards */}
      <WhyChooseUs />
       
       <CountriesSection/>
      

      {/* 6. IMAGE STACK REVEAL — stacked pages turning effect 
      <ImageStackReveal />*/}

      {/* 7. HORIZONTAL STORYTELLING — horizontal scroll journey steps */}
      <HorizontalStorytelling />

      {/* 8. CARDS 3D — cards fly from rotateY(60) z:-500 
      <Cards3D />*/}

      {/* 9. STICKY STORY — 300vh pinned step-by-step sections 
      <StickyStory />*/}

      {/* 10. PINNED GALLERY — fixed image + clip-path + circular reveal 
      <PinnedGallery />*/}

      {/* 11. JOURNEY TIMELINE — animated route + plane + image slices 
      <JourneyTimeline />
*/}
      {/* 12. FLOATING GALLERY — explosion + float + shuffle 
      <FloatingGallery />*/}

      {/* 13. COUNTRIES — Iraq / UAE / India, no images, brand colors 
      <CountriesSection />*/}

      {/* 14. CURTAIN CTA — clean on-brand CTA, curtain transition */}
      <CurtainCTA />
    </div>
  );
}
