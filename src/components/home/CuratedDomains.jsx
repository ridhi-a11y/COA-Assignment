import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Binary, Cpu, Award, ArrowRight } from "lucide-react";

/**
 * Clamp a number between min and max
 */
function clamp(val, min = 0, max = 1) {
  return Math.max(min, Math.min(max, val));
}

/**
 * Smoothstep interpolation function for smooth start and finish
 */
function smoothstep(min, max, value) {
  if (value <= min) return 0;
  if (value >= max) return 1;
  const t = (value - min) / (max - min);
  return t * t * (3 - 2 * t);
}

export default function CuratedDomains() {
  const sectionRef = useRef(null);

  const [headingFactor, setHeadingFactor] = useState(0);
  const [cardFactors, setCardFactors] = useState([0, 0, 0]);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Natural scroll animation tracking as section enters viewport
  useEffect(() => {
    if (isReducedMotion) return;

    let ticking = false;
    let lastProgress = -1;

    const updateScrollAnimation = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Starts animating as the section enters the bottom part of viewport
      const start = windowH * 0.88;
      // Reaches completion when centered nicely in viewport
      const end = windowH * 0.15;
      const scrollSpan = start - end;

      const current = start - rect.top;
      const p = clamp(current / scrollSpan, 0, 1);

      if (Math.abs(p - lastProgress) > 0.001) {
        lastProgress = p;

        // Sequence:
        // Phase 1 (Heading): 0.00 -> 0.28 (fades in and glides up 22px)
        // Phase 2 (Card 1):  0.22 -> 0.52 (glides from right +48px)
        // Phase 3 (Card 2):  0.46 -> 0.76 (glides from right +48px)
        // Phase 4 (Card 3):  0.70 -> 1.00 (glides from right +48px)
        const fHead = smoothstep(0.0, 0.28, p);
        const fCard1 = smoothstep(0.22, 0.52, p);
        const fCard2 = smoothstep(0.46, 0.76, p);
        const fCard3 = smoothstep(0.70, 1.00, p);

        setHeadingFactor(fHead);
        setCardFactors([fCard1, fCard2, fCard3]);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollAnimation();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateScrollAnimation();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isReducedMotion]);

  const hFactor = isReducedMotion ? 1 : headingFactor;
  const c1Factor = isReducedMotion ? 1 : cardFactors[0];
  const c2Factor = isReducedMotion ? 1 : cardFactors[1];
  const c3Factor = isReducedMotion ? 1 : cardFactors[2];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 px-6 max-w-7xl mx-auto w-full relative"
    >
      {/* PHASE 1: HEADING AREA (Reveals first with subtle upward movement & fade) */}
      <div
        style={{
          opacity: hFactor,
          transform: hFactor >= 1 ? "none" : `translateY(${(1 - hFactor) * 22}px)`,
          transition: "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: hFactor >= 1 ? "auto" : "opacity, transform",
        }}
        className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary font-medium mb-2">
            CURATED DOMAINS
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Explore Academic & Engineering Work
          </h2>
        </div>
        <p className="text-sm text-neutral-400 max-w-md">
          Dive into interactive computation modules, hackathon projects, and academic honors.
        </p>
      </div>

      {/* PHASE 2: THREE CARDS ENTER FROM THE RIGHT, ONE BY ONE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: COA LAB (Enters first after heading) */}
        <div
          style={{
            opacity: c1Factor,
            transform: c1Factor >= 1 ? "none" : `translateX(${(1 - c1Factor) * 48}px)`,
            transition: "opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: c1Factor >= 1 ? "auto" : "opacity, transform",
            pointerEvents: c1Factor > 0.15 ? "auto" : "none",
          }}
          className="h-full flex flex-col"
        >
          <Link
            to="/coa-lab"
            className="group relative p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-primary/50 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between h-full"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6 group-hover:scale-105 group-hover:bg-primary group-hover:text-black transition-all">
                <Binary size={22} />
              </div>
              <p className="font-mono text-xs text-primary font-medium uppercase tracking-wider mb-2">
                INTERACTIVE TOOLS
              </p>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                COA Lab
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                Universal bilateral Number System Converter across Decimal, Binary, Octal, and Hexadecimal with comprehensive step-by-step mathematical proofs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-primary transition-colors">
              <span>Explore Lab</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* CARD 2: PROJECTS (Enters second after COA Lab) */}
        <div
          style={{
            opacity: c2Factor,
            transform: c2Factor >= 1 ? "none" : `translateX(${(1 - c2Factor) * 48}px)`,
            transition: "opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: c2Factor >= 1 ? "auto" : "opacity, transform",
            pointerEvents: c2Factor > 0.15 ? "auto" : "none",
          }}
          className="h-full flex flex-col"
        >
          <Link
            to="/projects"
            className="group relative p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-primary/50 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between h-full"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6 group-hover:scale-105 group-hover:bg-primary group-hover:text-black transition-all">
                <Cpu size={22} />
              </div>
              <p className="font-mono text-xs text-primary font-medium uppercase tracking-wider mb-2">
                APPLIED SYSTEMS
              </p>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                Projects
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                Featured hackathons (ByteBuild 2026, Tekathon 5.0, Project Expo 2026) alongside industry-recognized engineering (TrapMate, Woink, Runox, Paradox).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-primary transition-colors">
              <span>View Projects</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* CARD 3: ACHIEVEMENTS (Enters third after Projects) */}
        <div
          style={{
            opacity: c3Factor,
            transform: c3Factor >= 1 ? "none" : `translateX(${(1 - c3Factor) * 48}px)`,
            transition: "opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: c3Factor >= 1 ? "auto" : "opacity, transform",
            pointerEvents: c3Factor > 0.15 ? "auto" : "none",
          }}
          className="h-full flex flex-col"
        >
          <Link
            to="/achievements"
            className="group relative p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-primary/50 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between h-full"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6 group-hover:scale-105 group-hover:bg-primary group-hover:text-black transition-all">
                <Award size={22} />
              </div>
              <p className="font-mono text-xs text-primary font-medium uppercase tracking-wider mb-2">
                RECOGNITION
              </p>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                Achievements
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                Verified hackathon laurels, developer recognitions from IuXoa Studio, and competitive milestone certificates with rich dedicated detail views.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-primary transition-colors">
              <span>View Achievements</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
