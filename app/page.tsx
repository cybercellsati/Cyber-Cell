import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import AboutSection from "@/components/AboutSection";
import FocusAreas from "@/components/FocusAreas";
import LearningRoadmap from "@/components/LearningRoadmap";
import UpcomingEvents from "@/components/UpcomingEvents";
import ProjectsSection from "@/components/ProjectsSection";
import ResourceVault from "@/components/ResourceVault";
import TerminalDemo from "@/components/TerminalDemo";
import EarthBelief from "@/components/EarthBelief";
import JoinCTA from "@/components/JoinCTA";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Cyber Cell — Cybersecurity Club | SATI Vidisha",
  description:
    "Official Cybersecurity Club under the Central Coding Club at Samrat Ashok Technological Institute (SATI), Vidisha. Hands-on labs, ethical hacking, CTFs, network defense, and practical security education.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#06080d] text-white flex flex-col selection:bg-[#00e5ff]/20 selection:text-[#00e5ff]">
      {/* 1. Fixed / Sticky Glass Navbar */}
      <Navbar />

      {/* 2. Cinematic Editorial Hero */}
      <Hero />

      {/* 3. Club Pillars (Learn, Practice, Collaborate, Innovate, Create Impact) */}
      <Pillars />

      {/* 4. About Cyber Cell (Story + Architectural Visual + Core Characteristics) */}
      <AboutSection />

      {/* 5. Cybersecurity Domains (8 interactive tracks with drill-down modals) */}
      <FocusAreas />

      {/* 6. Learning Roadmap (01 to 09 progressive student curriculum) */}
      <LearningRoadmap />

      {/* 7. Upcoming Events (Real data only / verified empty state + notifications) */}
      <UpcomingEvents />

      {/* 8. Projects Section (Engineering & Tools with filter tabs) */}
      <ProjectsSection />

      {/* 9. Resource Vault (Learn, Practice, Tools, Cheatsheets) */}
      <ResourceVault />

      {/* 10. Interactive Cyber Terminal (Simulated educational CLI & flag hunt) */}
      <TerminalDemo />

      {/* 11. Our Belief ("A more secure world is a brighter world") */}
      <EarthBelief />

      {/* 12. Join Cyber Cell CTA */}
      <JoinCTA />

      {/* 13. Institutional Footer */}
      <Footer />
    </main>
  );
}
