import React from "react";
import {
  Download,
  ExternalLink,
  FileText,
  Brain,
  Code2,
  Server,
  HardDrive,
  ArrowRight,
  Github,
  Linkedin,
  Instagram,
  GraduationCap,
  Languages as LanguagesIcon,
  Briefcase,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function XIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ridhi-gupta25",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    url: "https://github.com/ridhi-a11y",
    icon: Github,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/_ridhii25/",
    icon: Instagram,
  },
  {
    name: "Twitter / X",
    url: "https://x.com/Ridhi_Gupta25",
    icon: XIcon,
  },
  {
    name: "CV / Resume",
    url: "/Ridhi_Gupta_Resume.pdf",
    icon: FileText,
  },
];

const academicInterests = [
  {
    name: "Artificial Intelligence",
    icon: Brain,
    desc: "Machine learning architectures, computer vision heuristics, neural algorithms, and intelligent decision systems.",
  },
  {
    name: "Software Development",
    icon: Code2,
    desc: "Designing resilient frontend interfaces, component hierarchies, state pipelines, and human-centric UI/UX.",
  },
  {
    name: "Backend Development",
    icon: Server,
    desc: "High-concurrency APIs, geospatial data processing, distributed database modeling, and real-time state synchronization.",
  },
  {
    name: "Computer Systems",
    icon: HardDrive,
    desc: "Operating systems, hardware abstraction layers, concurrency management, and system-level performance optimization.",
  },
];

// EDUCATION DATA
const education = [
  {
    qualification: "BE CSE (Artificial Intelligence)",
    institution: "Chandigarh University",
    details: "Microsoft Track",
    period: "2025 — Present",
  },
  {
    qualification: "Police DAV Public School",
    institution: "Senior Secondary · CBSE Board",
    details: "Jalandhar, Punjab",
    period: "2023 — 2025",
  },
  {
    qualification: "Innocent Hearts School",
    institution: "Secondary Schooling · CBSE Board",
    details: "Jalandhar, Punjab",
    period: "Till 2023",
  },
];

// LANGUAGES DATA
const languages = [
  {
    name: "English",
    proficiency: "Fluent",
  },
  {
    name: "Hindi",
    proficiency: "Fluent",
  },
  {
    name: "Punjabi",
    proficiency: "Fluent",
  },
];

// WORK EXPERIENCE DATA
const workExperience = [
  {
    role: "Full Stack Developer (Part-Time)",
    company: "IuXoa",
    period: "April 2026 – Present",
    desc: "Contributing to the design, development, and maintenance of web and game-based applications as part of a professional product team, working across the full software development lifecycle from planning to deployment.",
  },
];

export default function About() {
  const resumeUrl = "/Ridhi_Gupta_Resume.pdf";

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white selection:bg-primary/20 selection:text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-28 md:pt-36 pb-24 px-6 max-w-6xl mx-auto w-full">
        {/* PAGE NUMBER & CATEGORY */}
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium">
            01 / ABOUT
          </span>
          <div className="h-px bg-white/[0.08] flex-1 max-w-[120px]" />
        </div>

        {/* TWO-COLUMN EDITORIAL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: EDITORIAL PORTRAIT (35–45% WIDTH: 5/12 COLS) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/[0.12] bg-[#121217] shadow-2xl group">
              <img
                src="/images/profile_pic.png"
                alt="Ridhi Gupta"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                style={{ objectPosition: "67% 45%" }}
              />

              {/* Natural subtle edge ring */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.1] rounded-2xl pointer-events-none" />
            </div>

            {/* Reference-style Technical Label under photo */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs text-neutral-400 space-y-1">
              <p className="text-neutral-300 font-medium">// RIDHI GUPTA</p>
              <p className="text-neutral-500 text-[11px]">CSE (AI) · Chandigarh University</p>
            </div>
          </div>

          {/* RIGHT COLUMN: INFORMATION & ACADEMIC DOSSIER (7/12 COLS) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* NAME, DEGREE & SOCIALS HEADER */}
            <div className="pb-6 border-b border-white/[0.08] space-y-4">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-2">
                  Ridhi Gupta
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-sm font-mono text-neutral-400">
                  <span className="text-neutral-300">BE CSE (Artificial Intelligence)</span>
                  <span className="text-primary">·</span>
                  <span className="text-neutral-400">Chandigarh University</span>
                </div>
              </div>

              {/* SOCIAL ICONS (ROUNDED BUTTONS) */}
              <div className="flex items-center gap-2.5 pt-1">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      title={item.name}
                      className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.1] hover:border-primary/50 hover:bg-white/[0.08] hover:text-primary text-neutral-300 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
                    >
                      <Icon size={17} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* SECTION 1: ABOUT ME */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                About Me
              </h2>
              <div className="bg-[#111114] border border-white/[0.06] rounded-2xl p-6 sm:p-7 space-y-4">
                <p className="text-base text-neutral-300 leading-relaxed font-normal">
                  I am a Computer Science and Engineering student specializing in Artificial Intelligence at Chandigarh University. My focus lies at the intersection of practical software engineering, intelligent systems, and understanding the core architectural mechanisms that power modern computation.
                </p>
                <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                  Throughout academic coursework, competitive hackathons, and engineering work with IuXoa Studio, I have gained hands-on experience building full-stack applications, geospatial intelligence pipelines, and game logic systems. I value clear system design, mathematical precision, and creating technology that solves tangible problems.
                </p>
              </div>
            </section>

            {/* SECTION 2: ACADEMIC INTERESTS */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Academic Interests
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {academicInterests.map((interest, idx) => {
                  const Icon = interest.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-[#111114] border border-white/[0.06] hover:border-primary/40 rounded-xl p-4 transition-all group"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all shrink-0">
                          <Icon size={16} />
                        </div>
                        <h3 className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                          {interest.name}
                        </h3>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                        {interest.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 3: EDUCATION */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Education
              </h2>
              <div className="bg-[#111114] border border-white/[0.06] rounded-2xl p-6 sm:p-7">
                <div className="relative pl-1">
                  {education.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative pl-6 border-l border-white/[0.1] last:border-l-transparent pb-6 last:pb-0"
                    >
                      {/* Timeline node */}
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-[#111114]" />

                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                        <h3 className="text-sm font-semibold text-white">
                          {item.qualification}
                        </h3>
                        <span className="font-mono text-xs text-primary font-medium">
                          {item.period}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-300">
                        {item.institution}
                      </p>

                      {item.details && (
                        <p className="text-[11px] font-mono text-neutral-400 mt-1">
                          {item.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 5: LANGUAGES */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Languages
              </h2>
              <div className="bg-[#111114] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {languages.map((lang, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#0A0A0C] border border-white/[0.04]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="text-sm font-medium text-white">{lang.name}</span>
                      </div>
                      <span className="font-mono text-xs text-neutral-400">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 6: WORK EXPERIENCE */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Work Experience
              </h2>
              <div className="bg-[#111114] border border-white/[0.06] rounded-2xl p-6 sm:p-7 space-y-6">
                {workExperience.map((exp, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                        <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                          {exp.role}
                        </h3>
                      </div>
                      <span className="font-mono text-xs text-primary font-medium">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-xs font-mono text-neutral-300 pl-4.5">
                      {exp.company}
                    </p>

                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal pl-4.5 pt-1">
                      {exp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 7: CURRICULUM VITAE */}
            <section className="pt-2">
              <div className="bg-[#111114] border border-white/[0.08] hover:border-primary/40 rounded-2xl p-5 sm:p-6 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-tight">
                      Curriculum Vitae
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">
                      Ridhi Gupta · Academic & Engineering Resume (PDF)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-medium text-neutral-200 hover:text-white transition-all"
                  >
                    <span>View CV</span>
                    <ExternalLink size={13} className="text-primary" />
                  </a>
                  <a
                    href={resumeUrl}
                    download="Ridhi_Gupta_CV.pdf"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-[#FFA500] text-black font-semibold text-xs transition-all shadow-[0_0_16px_rgba(255,184,0,0.2)]"
                  >
                    <span>Download CV</span>
                    <Download size={13} />
                  </a>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
