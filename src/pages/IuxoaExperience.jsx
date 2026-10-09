import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const IUXOA_PROJECTS = [
  {
    number: "01",
    name: "TRAPMATE",
    tag: "Strategy Board Game",
    description: "Chess-inspired multiplayer strategy game. A new version is currently under active development.",
    status: "New Version Under Development",
    route: "/projects/trapmate",
  },
  {
    number: "02",
    name: "WOINK",
    tag: "Multiplayer Platform",
    description: "Multiplayer party and arcade gaming platform with real-time matchmaking",
    route: "/projects/woink",
  },
  {
    number: "03",
    name: "RUNOX",
    tag: "Fitness & Maps",
    description: "Fitness and milestone tracking application featuring precise map integration",
    route: "/projects/runox",
  },
  {
    number: "04",
    name: "PARADOX",
    tag: "Accessible Puzzle UI",
    description: "Accessible puzzle game interface spanning 15+ gameplay screens",
    route: "/projects/paradox",
  },
];

const FOCUS_AREAS = [
  "Software Development",
  "Full-Stack Development",
  "AI / Intelligent Systems",
  "Game Development",
  "Product Engineering",
];

export default function IuxoaExperience() {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white selection:bg-primary/20 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 md:pt-36 pb-24 px-6 max-w-5xl mx-auto w-full">
        {/* TOP: BACK TO ACHIEVEMENTS */}
        <div className="mb-10">
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-primary transition-colors group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Achievements</span>
          </Link>
        </div>

        {/* HERO / INTRODUCTION */}
        <section className="mb-14 pb-10 border-b border-white/[0.08]">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium block mb-3">
            01 / EXPERIENCE
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-2">
            IuXoa Studio
          </h1>
          <h2 className="text-xl sm:text-2xl text-neutral-300 font-semibold tracking-tight mb-6">
            Engineering Experience
          </h2>

          <div className="space-y-4 max-w-3xl">
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              I work with IuXoa Studio as a part-time full stack developer, building and contributing to software projects across web development, AI-driven applications, game development, and experimental products.
            </p>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              Through this experience, I have worked across different types of projects, gaining practical experience in building interfaces, application logic, backend systems, product features, and collaborative software development.
            </p>
          </div>
        </section>

        {/* ROLE SUMMARY */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              My Role
            </h3>
          </div>

          <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/[0.06]">
              <div>
                <h4 className="text-xl font-bold text-white mb-1">
                  Full Stack Developer
                </h4>
                <p className="font-mono text-sm text-primary">
                  IuXoa Studio
                </p>
              </div>

              {/* Compact metadata tags */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-neutral-300">
                  Role: Full Stack Developer
                </span>
                <span className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-neutral-300">
                  Type: Part-time
                </span>
                <span className="px-3 py-1 rounded-md bg-primary/10 border border-primary/30 text-primary">
                  Software · AI · Games · Product
                </span>
              </div>
            </div>

            {/* Subtle list of focus areas */}
            <div>
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block mb-3">
                Core Contribution Areas
              </span>
              <div className="flex flex-wrap gap-2.5">
                {FOCUS_AREAS.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-white/[0.02] border border-white/[0.06] text-neutral-300"
                  >
                    <CheckCircle2 size={12} className="text-primary" />
                    <span>{area}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section className="mb-16">
          <div className="mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium block mb-2">
              02 / SELECTED WORK
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              Projects I've worked on at IuXoa Studio.
            </h2>
            <p className="text-sm text-neutral-400 font-normal">
              Click any project bar to view its complete architecture, technical stack, and contribution details.
            </p>
          </div>

          {/* HORIZONTAL FULL-WIDTH PROJECT BARS */}
          <div className="space-y-4">
            {IUXOA_PROJECTS.map((proj) => (
              <Link
                key={proj.number}
                to={proj.route}
                aria-label={`View ${proj.name} project details`}
                data-cursor="project"
                className="group relative block w-full p-6 sm:p-7 rounded-2xl bg-[#111114] border border-white/[0.08] hover:border-primary/40 hover:bg-white/[0.03] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* LEFT & CENTER CONTENT */}
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                    {/* Project Number */}
                    <span className="font-mono text-sm sm:text-base text-primary/80 group-hover:text-primary font-semibold tracking-wider transition-colors shrink-0">
                      {proj.number}
                    </span>

                    {/* Name, Tag, Description */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5">
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors tracking-tight">
                          {proj.name}
                        </h3>
                        <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                          · {proj.tag}
                        </span>
                        {proj.status && (
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            {proj.status}
                          </span>
                        )}
                      </div>
                      <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
                        {proj.description}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT: PROMINENT MINIMAL DIAGONAL ARROW */}
                  <div className="self-end sm:self-center shrink-0 w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] group-hover:border-primary/50 group-hover:bg-primary group-hover:text-black text-neutral-400 flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION: OFFICIAL VERIFIED CERTIFICATES & ENDORSEMENTS */}
        <section className="mb-16">
          <div className="mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium block mb-2">
              03 / VERIFIED CREDENTIALS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              Official Certificates &amp; Proof of Contribution
            </h2>
            <p className="text-sm text-neutral-400 font-normal">
              Official Certificates of Contribution and Appreciation awarded by IuXoa Studio leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* General Certificate */}
            <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#0A0A0C] mb-4">
                  <img
                    src="/images/certificate_iuxoa_general_45sd.png"
                    alt="IuXoa Studio Certificate of Appreciation"
                    className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  Certificate of Appreciation
                </h3>
                <p className="text-xs text-neutral-400 mb-3">
                  In recognition of outstanding contribution, dedication, and engineering excellence across IuXoa Studio projects.
                </p>
              </div>
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-primary font-medium">ID: IUXOA-COA-45SD</span>
                <span>May 25, 2026</span>
              </div>
            </div>

            {/* Runox Certificate */}
            <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#0A0A0C] mb-4">
                  <img
                    src="/images/certificate_runox_3kfr.png"
                    alt="Runox Backend Developer Certificate"
                    className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  Certificate of Contribution — Runox
                </h3>
                <p className="text-xs text-neutral-400 mb-3">
                  Recognized as Backend Developer and Map Integration Engineer for route tracking and location telemetry pipelines.
                </p>
              </div>
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-primary font-medium">ID: IUXOA-COA-3KFR</span>
                <span>May 25, 2025</span>
              </div>
            </div>

            {/* Woink Certificate */}
            <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#0A0A0C] mb-4">
                  <img
                    src="/images/certificate_woink_e2t6.png"
                    alt="Woink Frontend Developer Certificate"
                    className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  Certificate of Contribution — Woink!
                </h3>
                <p className="text-xs text-neutral-400 mb-3">
                  Recognized as Frontend Developer revamping multiplayer UI components, lobbies, and real-time state synchronization.
                </p>
              </div>
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-primary font-medium">ID: IUXOA-COA-E2T6</span>
                <span>May 25, 2025</span>
              </div>
            </div>

            {/* Paradox Certificate */}
            <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#0A0A0C] mb-4">
                  <img
                    src="/images/certificate_paradox_4fe5.png"
                    alt="Paradox Frontend Developer Certificate"
                    className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  Certificate of Contribution — Paradox
                </h3>
                <p className="text-xs text-neutral-400 mb-3">
                  Recognized as Frontend Developer engineering accessible, high-contrast layouts across 15+ gameplay screens.
                </p>
              </div>
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-primary font-medium">ID: IUXOA-COA-4FE5</span>
                <span>May 25, 2025</span>
              </div>
            </div>
          </div>
        </section>

        {/* END / BACK TO ACHIEVEMENTS */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-primary transition-colors group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Achievements</span>
          </Link>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors group"
          >
            <span>Explore All Projects</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
