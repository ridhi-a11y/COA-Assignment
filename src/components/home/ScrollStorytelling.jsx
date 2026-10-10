import React, { useEffect, useRef, useState } from "react";

// Primary introduction sentence broken into individual tokens with formatting metadata
const PRIMARY_WORDS = [
  { text: '"Hi,', isBold: false },
  { text: "I'm", isBold: false },
  { text: "Ridhi", isBold: true },
  { text: "Gupta", isBold: true },
  { text: "—", isBold: false },
  { text: "a", isBold: false },
  { text: "CSE", isBold: false },
  { text: "(Artificial", isBold: false },
  { text: "Intelligence)", isBold: false },
  { text: "student", isBold: false },
  { text: "interested", isBold: false },
  { text: "in", isBold: false },
  { text: "software", isBold: false },
  { text: "development,", isBold: false },
  { text: "AI,", isBold: false },
  { text: "and", isBold: false },
  { text: "understanding", isBold: false },
  { text: "the", isBold: false },
  { text: "systems", isBold: false },
  { text: "behind", isBold: false },
  { text: 'computation."', isBold: false },
];

// Secondary technical context sentence broken into words
const SECONDARY_WORDS = [
  "Bridging",
  "hardware",
  "architecture",
  "principles",
  "with",
  "high-level",
  "software",
  "engineering",
  "and",
  "intelligent",
  "computing",
  "workflows.",
];

/**
 * Calculates smooth normalized progress [0..1] for a specific word
 */
function getWordProgress(overallProgress, wordIndex, totalWords, rangeStart, rangeEnd, smoothing = 1.35) {
  const step = (rangeEnd - rangeStart) / totalWords;
  const wordStart = rangeStart + wordIndex * step;
  const wordEnd = wordStart + step * smoothing;

  if (overallProgress <= wordStart) return 0;
  if (overallProgress >= wordEnd) return 1;
  return (overallProgress - wordStart) / (wordEnd - wordStart);
}

export default function ScrollStorytelling() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Track scroll progress naturally as section scrolls through viewport
  useEffect(() => {
    if (isReducedMotion) return;

    let ticking = false;
    let lastProgress = -1;

    const calculateProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Starts highlighting as the section enters the lower part of viewport
      const start = windowH * 0.85;
      // Finishes highlighting as it centers in viewport
      const end = windowH * 0.20;
      const scrollSpan = start - end;

      const currentScroll = start - rect.top;
      const rawProgress = currentScroll / scrollSpan;
      const clamped = Math.max(0, Math.min(1, rawProgress));

      if (Math.abs(clamped - lastProgress) > 0.001) {
        lastProgress = clamped;
        setScrollProgress(clamped);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    calculateProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isReducedMotion]);

  // Primary text animates from 2% to 65% of scroll window
  // Secondary text animates from 60% to 96% of scroll window
  const PRIMARY_START = 0.02;
  const PRIMARY_END = 0.65;
  const SECONDARY_START = 0.60;
  const SECONDARY_END = 0.96;

  return (
    <section
      ref={containerRef}
      aria-label="Personal Statement and Introduction"
      className="relative py-16 sm:py-24 px-6 border-y border-white/[0.08] bg-white/[0.01] overflow-hidden w-full"
    >
      {/* Subtle background circuit texture & glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-primary/[0.025] blur-[130px] pointer-events-none rounded-full" />

      {/* Storytelling Content Box */}
      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-7 relative z-10 w-full">
        
        {/* Subtle concentric beacon accent dot */}
        <div className="flex items-center justify-center mb-2 sm:mb-4">
          <div
            className="relative flex items-center justify-center w-5 h-5 rounded-full border border-primary/40 bg-primary/[0.06] shadow-[0_0_12px_rgba(255,184,0,0.15)]"
            title="System Active"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(255,184,0,0.9)]" />
          </div>
        </div>

        {/* Hidden full text for accessible screen reader consumption */}
        <h2 className="sr-only">
          "Hi, I'm Ridhi Gupta — a CSE (Artificial Intelligence) student interested in software development, AI, and understanding the systems behind computation."
        </h2>

        {/* PRIMARY SENTENCE: Scroll-driven word-by-word reveal */}
        <p
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-normal leading-[1.35] tracking-tight text-center max-w-4xl mx-auto selection:bg-primary/20"
          aria-hidden="true"
        >
          {PRIMARY_WORDS.map((item, idx) => {
            const wordFactor = isReducedMotion
              ? 1
              : getWordProgress(
                  scrollProgress,
                  idx,
                  PRIMARY_WORDS.length,
                  PRIMARY_START,
                  PRIMARY_END
                );

            return (
              <span
                key={idx}
                className={`relative inline-block mr-[0.28em] select-none ${
                  item.isBold ? "font-semibold" : "font-normal"
                }`}
              >
                {/* Base muted gray layer: clearly legible silhouette (#71717A) */}
                <span className="text-[#71717A]">
                  {item.text}
                </span>

                {/* Highlighted bright white layer: progressively illuminates (#F5F5F5) */}
                <span
                  className="absolute inset-0 text-[#F5F5F5] select-none pointer-events-none"
                  style={{
                    opacity: wordFactor,
                    willChange: "opacity",
                  }}
                >
                  {item.text}
                </span>
              </span>
            );
          })}
        </p>

        {/* Hidden secondary text for screen readers */}
        <p className="sr-only">
          Bridging hardware architecture principles with high-level software engineering and intelligent computing workflows.
        </p>

        {/* SECONDARY TEXT: Follows primary sentence with subtle technical reveal */}
        <div
          className="pt-2 sm:pt-3 max-w-2xl mx-auto text-center"
          aria-hidden="true"
        >
          <p className="font-mono text-xs sm:text-sm md:text-[15px] leading-relaxed text-center tracking-normal">
            {SECONDARY_WORDS.map((word, idx) => {
              const wordFactor = isReducedMotion
                ? 1
                : getWordProgress(
                    scrollProgress,
                    idx,
                    SECONDARY_WORDS.length,
                    SECONDARY_START,
                    SECONDARY_END
                  );

              return (
                <span
                  key={idx}
                  className="relative inline-block mr-[0.3em] select-none"
                >
                  {/* Base subtle gray layer (#52525A) */}
                  <span className="text-[#52525A]">
                    {word}
                  </span>

                  {/* Highlighted light neutral layer (#E4E4E7) */}
                  <span
                    className="absolute inset-0 text-[#E4E4E7] select-none pointer-events-none"
                    style={{
                      opacity: wordFactor,
                      willChange: "opacity",
                    }}
                  >
                    {word}
                  </span>
                </span>
              );
            })}
          </p>
        </div>

      </div>
    </section>
  );
}
