import React from "react";
import Image from "next/image";

export default function EarthBelief() {
  return (
    <section className="relative min-h-[400px] sm:min-h-[460px] flex items-center justify-center overflow-hidden border-b border-white/[0.07] bg-black">
      {/* Earth Orbit Night Visual */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/earth-orbit.jpg"
          alt="Earth night lights from orbit representing digital global security"
          fill
          className="object-cover object-center opacity-65"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-[#07090e]/90" />
      </div>

      {/* Statement */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <span className="text-xs font-mono font-medium tracking-[0.2em] text-slate-400 uppercase block mb-4">
          OUR BELIEF
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
          &ldquo;A more secure world <br className="hidden sm:inline" />
          is a brighter world.&rdquo;
        </h2>

        {/* Minimal Underline Bar matching reference */}
        <div className="w-14 h-[3px] bg-[#38bdf8] mx-auto rounded-full" />
      </div>
    </section>
  );
}
