import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0A0A0C] text-neutral-400 py-14 px-6 relative overflow-hidden">
      {/* Background subtle circuit grid glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-white/[0.06]">
          {/* Identity & Department */}
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              Ridhi Gupta
            </h3>
            <p className="text-xs text-primary font-mono tracking-wide mb-2">
              Computer Organisation & Architecture
            </p>
            <p className="text-xs text-neutral-400">
              BE CSE (Artificial Intelligence) · Chandigarh University
            </p>
          </div>

          {/* Minimal External Links */}
          <div className="flex flex-wrap items-center gap-5 text-sm">
            <a
              href="https://github.com/ridhi-a11y"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight size={13} className="text-primary" />
            </a>
            <a
              href="https://www.linkedin.com/in/ridhi-gupta25"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={13} className="text-primary" />
            </a>
            <a
              href="https://x.com/Ridhi_Gupta25"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
            >
              <span>X (Twitter)</span>
              <ArrowUpRight size={13} className="text-primary" />
            </a>
            <a
              href="https://www.instagram.com/_ridhii25/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
            >
              <span>Instagram</span>
              <ArrowUpRight size={13} className="text-primary" />
            </a>
            <a
              href="https://ridhigupta.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
            >
              <span>Portfolio</span>
              <ArrowUpRight size={13} className="text-primary" />
            </a>
            <a
              href="/Ridhi_Gupta_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
            >
              <span>CV</span>
              <ArrowUpRight size={13} className="text-primary" />
            </a>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-600">
          <span>© 2026 Ridhi Gupta</span>
          <span className="text-neutral-500">
            COA Lab & Academic Portfolio
          </span>
        </div>
      </div>
    </footer>
  );
}
