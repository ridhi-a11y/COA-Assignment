import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Layers, Cpu, Award, ExternalLink, FileText, Download } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { projectsData } from "@/data/projectsData";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white selection:bg-primary/20 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 md:pt-36 pb-24 px-6 max-w-5xl mx-auto w-full">
        {/* BACK TO PROJECTS LINK */}
        <div className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-primary transition-colors group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* HEADER: TITLE & CONTEXT */}
        <div className="mb-10 pb-8 border-b border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium">
              {project.category}
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs font-mono text-neutral-400">
              {project.event}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-3xl font-normal">
            {project.headline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/30">
              {project.badge}
            </span>
            {project.status && (
              <span className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                {project.status}
              </span>
            )}
            {project.isIuxoa && project.badge !== "MADE WITH IuXoa" && (
              <span className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
                MADE WITH IuXoa
              </span>
            )}
            {project.team && (
              <span className="px-3 py-1 rounded-md text-xs font-mono text-neutral-400 bg-white/[0.03] border border-white/[0.08]">
                Team: {project.team}
              </span>
            )}
            {project.presentation && (
              <a
                href={project.presentation.file}
                target="_blank"
                rel="noopener noreferrer"
                download={project.presentation.type === "pptx" ? project.presentation.fileName : undefined}
                className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-all flex items-center gap-1.5"
              >
                <FileText size={13} />
                <span>{project.presentation.type === "pdf" ? "Pitch Deck (PDF) ↗" : "Presentation (PPTX) ↗"}</span>
              </a>
            )}
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="mb-14 rounded-2xl overflow-hidden border border-white/[0.08] bg-[#111114] aspect-[16/9] max-h-[480px]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* SECTION: OVERVIEW */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Overview
            </h2>
          </div>
          <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              {project.overview}
            </p>
          </div>
        </section>

        {/* SECTION: MY CONTRIBUTION */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              My Contribution
            </h2>
          </div>
          <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              {project.contribution}
            </p>
          </div>
        </section>

        {/* SECTION: TECHNOLOGY / STACK */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Technology & Architecture
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl bg-[#111114] border border-white/[0.08] text-xs font-mono text-neutral-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* SECTION: KEY FEATURES */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Key Features
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-[#111114] border border-white/[0.06] rounded-xl p-5"
              >
                <h3 className="text-sm sm:text-base font-semibold text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span>{feat.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-6 font-normal">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: WHAT I LEARNED */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Key Learnings & Takeaways
            </h2>
          </div>
          <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              {project.learnings}
            </p>
          </div>
        </section>


        {/* SECTION: VERIFIED CERTIFICATE PROOF */}
        {project.certificate && (
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Certificate of Contribution
              </h2>
            </div>
            <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-4 sm:p-6">
              <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#0A0A0C]">
                <img
                  src={project.certificate.image}
                  alt={project.certificate.title || `${project.title} Certificate`}
                  className="w-full h-auto object-contain max-h-[720px] mx-auto"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400 px-1">
                <span>Certificate Ref: {project.certificate.id}</span>
                <span>{project.certificate.issuer}</span>
              </div>
            </div>
          </section>
        )}

        {/* SECTION: PRESENTATION / PITCH DECK */}
        {project.presentation && (
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Presentation &amp; Pitch Deck
              </h2>
            </div>

            <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
              {project.presentation.preview && (
                <div className="mb-6 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0A0A0C]">
                  <img
                    src={project.presentation.preview}
                    alt={`${project.title} Presentation Preview`}
                    className="w-full h-auto object-contain max-h-[500px] mx-auto"
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <FileText size={22} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {project.presentation.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">
                      {project.presentation.format} · {project.presentation.fileName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <a
                    href={project.presentation.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-primary hover:bg-[#FFA500] text-black font-semibold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_16px_rgba(255,184,0,0.2)] active:scale-95"
                  >
                    <span>{project.presentation.type === "pdf" ? "Open Pitch Deck" : "Open Presentation"}</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={project.presentation.file}
                    download={project.presentation.fileName}
                    className="px-3.5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 border border-white/[0.1] text-xs font-medium flex items-center gap-1.5 transition-all"
                  >
                    <Download size={13} />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION: PROJECT LINKS (Only when actually available) */}
        <section className="pt-8 border-t border-white/[0.08]">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Project Availability & References
            </h2>
          </div>

          <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              {project.isIuxoa ? (
                <>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
                      MADE WITH IuXoa
                    </span>
                    {project.status && (
                      <span className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        {project.status}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400">
                    {project.availabilityNote || "Developed as part of professional work with IuXoa Studio. Source code is proprietary and private to the studio."}
                  </p>
                </>
              ) : (
                <>
                  <div className="inline-block px-3 py-1 rounded bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-bold mb-2">
                    ACADEMIC & HACKATHON WORK
                  </div>
                  <p className="text-xs text-neutral-400">
                    Prototyped and presented during competitive hackathon evaluations.
                  </p>
                </>
              )}
            </div>

            {(project.links && (project.links.github || project.links.demo)) || project.presentation ? (
              <div className="flex flex-wrap items-center gap-3">
                {project.links && project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-primary hover:bg-[#FFA500] text-black font-semibold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_16px_rgba(255,184,0,0.2)] active:scale-95"
                  >
                    <span>Live Platform</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
                {project.presentation && (
                  <a
                    href={project.presentation.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-mono text-white flex items-center gap-1.5 transition-all"
                  >
                    <FileText size={13} className="text-primary" />
                    <span>{project.presentation.type === "pdf" ? "Pitch Deck" : "Presentation"}</span>
                    <ArrowUpRight size={13} className="text-neutral-400" />
                  </a>
                )}
                {project.links && project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-mono text-white flex items-center gap-1.5 transition-all"
                  >
                    <span>Repository</span>
                    <ArrowUpRight size={13} className="text-primary" />
                  </a>
                )}
              </div>
            ) : (
              <span className="text-xs font-mono text-neutral-500 italic">
                Verified Experience Archive
              </span>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
