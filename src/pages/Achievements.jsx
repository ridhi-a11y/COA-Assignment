import React, { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AchievementCard from "@/components/achievements/AchievementCard";
import { achievementsData } from "@/data/achievementsData";

const FILTERS = [
  { id: "ALL", label: "All", match: () => true },
  { id: "CERTIFICATIONS", label: "Certifications", match: (cat) => cat.toUpperCase().startsWith("CERT") },
  { id: "HACKATHONS", label: "Hackathons", match: (cat) => cat.toUpperCase().startsWith("HACK") },
  { id: "LEADERSHIP", label: "Leadership", match: (cat) => cat.toUpperCase().startsWith("LEAD") },
  { id: "RECOGNITION", label: "Recognition", match: (cat) => cat.toUpperCase().startsWith("RECOG") },
];

export default function Achievements() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filterCounts = useMemo(() => {
    const counts = {};
    FILTERS.forEach((f) => {
      counts[f.id] = achievementsData.filter((item) => f.match(item.category)).length;
    });
    return counts;
  }, []);

  const filteredItems = useMemo(() => {
    const current = FILTERS.find((f) => f.id === activeFilter);
    if (!current || activeFilter === "ALL") return achievementsData;
    return achievementsData.filter((item) => current.match(item.category));
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white selection:bg-primary/20 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 md:pt-36 pb-24 px-6 max-w-6xl mx-auto w-full">
        {/* PAGE HEADER */}
        <div className="mb-10 pb-8 border-b border-white/[0.08]">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium block mb-2">
            05 / ACHIEVEMENTS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
            Beyond the Classroom
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed font-normal">
            A collection of certifications, hackathon milestones, leadership roles and recognitions.
          </p>

          {/* FILTER BAR */}
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f.id;
              const count = filterCounts[f.id] || 0;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-4 py-2 rounded-full text-xs transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-black font-semibold shadow-md shadow-primary/20"
                      : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.06] hover:border-white/[0.15]"
                  }`}
                >
                  <span>{f.label}</span>{" "}
                  <span className={`font-mono ${isActive ? "text-black/80 font-bold" : "text-neutral-500"}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACHIEVEMENTS GRID */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <AchievementCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
