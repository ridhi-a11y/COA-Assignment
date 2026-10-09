import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      data-cursor="project"
      className="group flex flex-col bg-[#111114] border border-white/[0.08] hover:border-primary/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex-1"
    >
      {/* UPPER HALF: PROJECT IMAGE / SCREENSHOT */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0A0C] border-b border-white/[0.06]">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback gracefully to subtle abstract dark panel if image fails
            e.currentTarget.style.display = "none";
          }}
        />
        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent opacity-60" />

        {/* Small top badge on image */}
        <div className="absolute top-3.5 left-3.5">
          <span
            className={`inline-block font-mono text-[10px] uppercase font-medium tracking-wider px-2.5 py-1 rounded-md border ${
              project.isIuxoa
                ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                : "bg-primary/10 text-primary border-primary/30"
            }`}
          >
            {project.badge}
          </span>
        </div>
      </div>

      {/* LOWER HALF: CONTENT */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Category / Event */}
          <div className="text-xs text-neutral-400 font-medium mb-1.5 flex items-center justify-between">
            <span>{project.category}</span>
          </div>

          {/* Project Name */}
          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors tracking-tight mb-2">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4 line-clamp-3 font-normal">
            {project.shortDescription}
          </p>
        </div>

        {/* Bottom Bar: Badge & Arrow */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {project.status && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                {project.status}
              </span>
            )}
            {project.isIuxoa && !project.status && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.08] text-neutral-300">
                MADE WITH IuXoa
              </span>
            )}
            {project.isHackathon && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/5 border border-primary/20 text-primary">
                HACKATHON
              </span>
            )}
          </div>

          <div className="w-8 h-8 rounded-full bg-white/[0.03] group-hover:bg-primary group-hover:text-black border border-white/[0.08] group-hover:border-primary flex items-center justify-center text-neutral-400 transition-all">
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
