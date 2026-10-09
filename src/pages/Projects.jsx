import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard from "@/components/projects/ProjectCard";
import { projectsData } from "@/data/projectsData";
import { Trophy, Briefcase, Filter } from "lucide-react";

export default function Projects() {
  const [filter, setFilter] = useState("all");

  const hackathonProjects = projectsData.filter((p) => p.isHackathon);
  const iuxoaProjects = projectsData.filter((p) => p.isIuxoa);

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white selection:bg-primary/20 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 md:pt-36 pb-24 px-6 max-w-6xl mx-auto w-full">
        {/* PAGE HEADER */}
        <div className="mb-14 pb-8 border-b border-white/[0.08]">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold block mb-2">
            04 / PROJECTS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
            Selected Work
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed">
            "Projects I've built, contributed to and explored across professional, academic and hackathon environments."
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === "all"
                  ? "bg-primary text-black font-semibold shadow-md shadow-primary/20"
                  : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.06]"
              }`}
            >
              All Projects ({projectsData.length})
            </button>
            <button
              onClick={() => setFilter("hackathons")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === "hackathons"
                  ? "bg-primary text-black font-semibold shadow-md shadow-primary/20"
                  : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.06]"
              }`}
            >
              Hackathons ({hackathonProjects.length})
            </button>
            <button
              onClick={() => setFilter("iuxoa")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === "iuxoa"
                  ? "bg-primary text-black font-semibold shadow-md shadow-primary/20"
                  : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.06]"
              }`}
            >
              IuXoa Studio ({iuxoaProjects.length})
            </button>
          </div>
        </div>

        {/* HACKATHON PROJECTS SUBSECTION */}
        {(filter === "all" || filter === "hackathons") && (
          <section className="mb-20">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Trophy size={15} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Hackathons
                </h2>
                <p className="text-xs text-neutral-400 font-normal">
                  Competitive prototypes engineered under high-stakes, time-constrained hackathons.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hackathonProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </section>
        )}

        {/* IUXOA PROJECTS SUBSECTION */}
        {(filter === "all" || filter === "iuxoa") && (
          <section>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Briefcase size={15} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Professional Work · IuXoa Studio
                </h2>
                <p className="text-xs text-neutral-400 font-normal">
                  Original titles and client engineering developed at IuXoa Studio.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {iuxoaProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
