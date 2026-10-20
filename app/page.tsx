import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FocusAreas from "@/components/FocusAreas";
import LearningRoadmap from "@/components/LearningRoadmap";
import UpcomingEvents from "@/components/UpcomingEvents";
import ProjectsSection from "@/components/ProjectsSection";
import ResourceVault from "@/components/ResourceVault";
import TerminalDemo from "@/components/TerminalDemo";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Cyber Cell — Cybersecurity Club | SATI Vidisha",
  description:
    "Official Cybersecurity Club at Samrat Ashok Technological Institute (SATI), Vidisha. Hands-on labs, ethical hacking, CTFs, network defense, and practical security education.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030508] text-white flex flex-col selection:bg-[#00e5ff]/25 selection:text-white">
      {/* 1. Fixed / Sticky Glass Navbar */}
      <Navbar />

      {/* 2. Hero Section (UNTOUCHED & PRESERVED) */}
      <Hero />

      {/* 3. About Cyber Cell */}
      <AboutSection />

      {/* 4. Specialized Focus Areas */}
      <FocusAreas />

      {/* 5. Cybersecurity Learning Roadmap */}
      <LearningRoadmap />

      {/* 6. Upcoming Events */}
      <UpcomingEvents />

      {/* 7. Engineering & Projects */}
      <ProjectsSection />

      {/* 8. Curated Resource Vault */}
      <ResourceVault />

      {/* 9. Interactive Simulated Shell */}
      <TerminalDemo />

      {/* 10. Comprehensive Official Footer */}
      <Footer />
    </main>
  );
}
