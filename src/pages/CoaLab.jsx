import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NumberConverter from "@/components/coa/NumberConverter";
import { Cpu, Terminal, BookOpen, Binary } from "lucide-react";

export default function CoaLab() {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white selection:bg-primary/20 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 md:pt-36 pb-24 px-6 max-w-6xl mx-auto w-full">
        {/* PAGE HEADER */}
        <div className="mb-12 pb-8 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs font-mono text-primary mb-4">
            <Binary size={13} />
            <span>03 / COA INTERACTIVE LAB</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
            Number System Converter
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed">
            Convert numbers between different number systems and understand the logic behind each conversion.
          </p>


        </div>

        {/* INTERACTIVE CONVERTER CORE */}
        <section>
          <NumberConverter />
        </section>
      </main>

      <Footer />
    </div>
  );
}
