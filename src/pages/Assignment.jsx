import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Download,
  ExternalLink,
  Terminal,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Assignment() {

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white selection:bg-primary/20 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 md:pt-36 pb-24 px-6 max-w-5xl mx-auto w-full">
        {/* PAGE HEADER */}
        <div className="mb-12 pb-8 border-b border-white/[0.08]">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium block mb-2">
            06 / ASSIGNMENT &amp; LAB
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
            Computer Organisation &amp; Architecture
          </h1>

          <div className="flex flex-wrap items-center gap-2 font-mono text-sm text-neutral-300 mb-4">
            <span className="text-primary font-medium">Assignment 01</span>
            <span className="text-neutral-600">·</span>
            <span>BE CSE (Artificial Intelligence)</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400">Chandigarh University</span>
          </div>

          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed font-normal">
            Academic coursework and interactive laboratory simulators covering computer organization, microarchitectures (CPU, GPU, TPU), 0/1/2/3-address instruction generation, host hardware profiling, and computing foundations.
          </p>
        </div>

        {/* TILE 1: PRIMARY ASSIGNMENT CARD */}
        <section className="mb-6">
          <div className="bg-[#111114] border border-white/[0.08] hover:border-primary/40 rounded-2xl p-6 sm:p-8 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <FileText size={22} />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-primary font-medium block mb-1">
                  OFFICIAL COURSEWORK
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  COA Assignment 01 — Computer Organization &amp; Architecture
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Subject: Computer Organisation &amp; Architecture · Student: Ridhi Gupta (25BAI10044)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/COA_Assignment_01_Ridhi_Gupta.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-medium text-neutral-200 hover:text-white flex items-center gap-2 transition-all"
              >
                <ExternalLink size={13} className="text-primary" />
                <span>View PDF</span>
              </a>

              <a
                href="/COA_Assignment_01_Ridhi_Gupta.pdf"
                download="25bai10044_Ridhi_Gupta_Assignment_1.pdf"
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-medium text-neutral-200 hover:text-white flex items-center gap-2 transition-all"
              >
                <Download size={13} className="text-primary" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </section>

        {/* TILE 2: INSTRUCTION SIMULATOR (UNDER ASSIGNMENT 1) */}
        <section className="mb-14">
          <div className="bg-[#111114] border border-white/[0.08] hover:border-primary/40 rounded-2xl p-6 sm:p-8 transition-all flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Terminal size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono uppercase text-primary font-medium">
                      LABORATORY SIMULATOR · PYTHON TOOL
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-neutral-300">
                      0 / 1 / 2 / 3-Address Formats
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Instruction Simulator
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Repository: cu/instruction_simulator.py · Author: Ridhi Gupta
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/ridhi-a11y/cu/blob/main/instruction_simulator.py"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-medium text-neutral-200 hover:text-white flex items-center gap-2 transition-all"
                >
                  <ExternalLink size={13} className="text-primary" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              An interactive expression-to-instruction translator demonstrating 0-, 1-, 2-, and 3-address instruction formats through postfix conversion and expression-tree generation.
            </p>

            {/* ARCHITECTURAL FORMAT PILLS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/[0.06] text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-[#0A0A0C] border border-white/[0.04]">
                <span className="text-primary font-semibold block text-[11px] mb-0.5">0-Address (Stack)</span>
                <span className="text-[11px] text-neutral-400">PUSH / POP / OP on stack top</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0A0A0C] border border-white/[0.04]">
                <span className="text-primary font-semibold block text-[11px] mb-0.5">1-Address (AC)</span>
                <span className="text-[11px] text-neutral-400">LOAD / STORE / OP with Accumulator</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0A0A0C] border border-white/[0.04]">
                <span className="text-primary font-semibold block text-[11px] mb-0.5">2-Address (Reg)</span>
                <span className="text-[11px] text-neutral-400">MOV / OP Dest, Src register pairs</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0A0A0C] border border-white/[0.04]">
                <span className="text-primary font-semibold block text-[11px] mb-0.5">3-Address (Triplets)</span>
                <span className="text-[11px] text-neutral-400">Dest = Op1 op Op2 explicit registers</span>
              </div>
            </div>
          </div>
        </section>



      </main>

      <Footer />
    </div>
  );
}
