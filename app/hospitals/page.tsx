import { HospitalsClient } from "@/components/hospitals/HospitalsClient";
import { Metadata } from "next";

// This applies the exact SEO data from your seo.json file
export const metadata: Metadata = {
  title: "Hospitals & Specialist Doctors in India for International Patients | IBN Sina",
  description: "IBN Sina helps international patients explore suitable hospitals and specialist doctors in India based on their medical condition and treatment requirements.",
  keywords: [
    "hospitals in India for international patients",
    "specialist doctors in India",
    "doctors for international patients",
    "Indian hospitals medical tourism",
    "best hospital for medical treatment in India"
  ]
};

export default function HospitalsPage() {
  return (
    // We simply render the client component here. 
    // Your ClientProviders in layout.tsx will automatically wrap this with the Header and Footer.
    <HospitalsClient />
  );
}