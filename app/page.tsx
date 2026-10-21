import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import LearningRoadmap from "@/components/LearningRoadmap";
import FocusAreas from "@/components/FocusAreas";
import ResourceVault from "@/components/ResourceVault";
import TerminalDemo from "@/components/TerminalDemo";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Cyber Cell — Cybersecurity Club | SATI Vidisha",
  description:
    "Official Cybersecurity Club at Samrat Ashok Technological Institute (SATI), Vidisha. Hands-on labs, ethical hacking, CTFs, network defense, and practical security education.",
  openGraph: {
    title: "Cyber Cell — Cybersecurity Club | SATI Vidisha",
    description:
      "Official Cybersecurity Club at Samrat Ashok Technological Institute (SATI), Vidisha. Hands-on labs, ethical hacking, CTFs, network defense, and practical security education.",
    url: "https://cybercell.satiengg.in",
    siteName: "Cyber Cell SATI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cyber Cell, SATI Vidisha Official Logo",
        type: "image/png",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Cell — Cybersecurity Club | SATI Vidisha",
    description:
      "Official Cybersecurity Club at Samrat Ashok Technological Institute (SATI), Vidisha. Hands-on labs, ethical hacking, CTFs, network defense, and practical security education.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030303] text-white flex flex-col selection:bg-amber-400/20 selection:text-amber-300">
      {/* 1. Fixed / Sticky Glass Navbar */}
      <Navbar />

      {/* 2. Hero Section (UNTOUCHED & PRESERVED) */}
      <Hero />

      {/* 3. Reference-Inspired Telemetry, Angled Charter, & 3-Column Sentinel Matrix */}
      <AboutSection />

      {/* 4. Leadership Spotlight & Operational Field Reports (Reviews & News Split) */}
      <ProjectsSection />

      {/* 5. 6-Stage Security Mastery Tiers (Row of Shield / Ribbon Cards) */}
      <LearningRoadmap />

      {/* 6. Specialized Trending Top 5 Focus Areas (Horizontal Scroll Deck) */}
      <FocusAreas />

      {/* 7. Curated Resource Vault */}
      <ResourceVault />

      {/* 8. Interactive Simulated Shell */}
      <TerminalDemo />

      {/* 9. Comprehensive Official Footer */}
      <Footer />
    </main>
  );
}
