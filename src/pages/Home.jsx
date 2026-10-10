import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Cpu,
  Layers,
  Award,
  Binary,
  ArrowUpRight,
  Terminal,
  Database,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollStorytelling from "@/components/home/ScrollStorytelling";
import CuratedDomains from "@/components/home/CuratedDomains";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white selection:bg-primary/20 selection:text-white flex flex-col relative overflow-x-clip">
      <Navbar />

      {/* BACKGROUND CIRCUIT TEXTURES */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/[0.03] blur-[140px] pointer-events-none rounded-full" />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: IDENTITY & TYPOGRAPHY */}
          <div className="lg:col-span-7 z-10 space-y-6">
            <div className="space-y-3">
              <h1 className="font-mono text-xs uppercase tracking-widest text-primary font-medium">
                COMPUTER ORGANISATION & ARCHITECTURE
              </h1>
              <p className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.18]">
                Understanding the machine <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-400">
                  behind the code.
                </span>
              </p>
            </div>

            <p className="text-base sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
              A personal academic space exploring computer systems, number systems,
              and the fundamental hardware abstractions powering modern computation.
            </p>

            {/* ACTION BUTTONS */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/coa-lab"
                data-cursor="button"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-black font-semibold text-sm hover:bg-primary-400 hover:shadow-[0_0_24px_rgba(255,184,0,0.3)] transition-all duration-200 group"
              >
                <span>Explore COA Lab</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/projects"
                data-cursor="button"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.04] text-white border border-white/[0.1] font-medium text-sm hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-200"
              >
                <span>View Projects</span>
                <ArrowUpRight size={15} className="text-neutral-400" />
              </Link>
            </div>
          </div>

          {/* RIGHT: PORTRAIT INTEGRATED WITH NATURAL VISIBILITY */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* SUBTLE CORNER TECHNICAL ACCENTS (OUTSIDE THE PHOTO) */}
            <div className="absolute -top-3.5 -left-3 z-20 font-mono text-[9px] text-neutral-400/60 uppercase tracking-widest pointer-events-none select-none border border-white/[0.06] px-2 py-0.5 rounded bg-[#0A0A0C]/90 backdrop-blur-sm">
              CPU :: ALU :: REGISTERS
            </div>

            <div className="absolute -bottom-3 -right-3 z-20 font-mono text-[9px] text-neutral-400/60 pointer-events-none select-none border border-white/[0.06] px-2 py-0.5 rounded bg-[#0A0A0C]/90 backdrop-blur-sm">
              CACHE :: L1/L2/L3 · MEMORY
            </div>

            {/* PORTRAIT CONTAINER: CRISP, RECOGNIZABLE, ORANGE LIGHTING PRESERVED */}
            <div
              data-cursor="image"
              className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/[0.12] bg-[#121217] shadow-2xl group"
            >
              <img
                src="/images/profile_pic.png"
                alt="Ridhi Gupta"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                style={{ objectPosition: "67% 45%" }}
              />

              {/* Only subtle gradient along outer left edge to soften transition */}
              <div className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[#0A0A0C]/35 to-transparent pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.1] rounded-2xl pointer-events-none" />

              {/* Subtle Compact Status Pill */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0A0A0C]/65 backdrop-blur-md border border-white/[0.08]">
                <div>
                  <p className="text-xs font-semibold text-white tracking-wide">Ridhi Gupta</p>
                  <p className="text-[11px] text-neutral-300 font-mono">BE CSE (AI) · Chandigarh University</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SCROLL-DRIVEN STORYTELLING INTRODUCTION */}
      <ScrollStorytelling />

      {/* CURATED DOMAINS WITH SCROLL-LINKED SEQUENCE */}
      <CuratedDomains />

      <Footer />
    </div>
  );
}
