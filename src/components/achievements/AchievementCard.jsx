import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function AchievementCard({ item }) {
  const destination = item.customRoute || (item.slug === "iuxoa-recognition" ? "/experience/iuxoa" : `/achievements/${item.slug}`);

  return (
    <Link
      to={destination}
      data-cursor="project"
      className="group flex flex-col bg-[#111114] border border-white/[0.08] hover:border-primary/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
    >
      {/* TOP: COVER IMAGE */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0A0C] border-b border-white/[0.06]">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
        />
      </div>

      {/* BOTTOM: METADATA, TITLE, SHORT DESCRIPTION, VIEW DETAILS */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Category label and Year / Period */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="font-mono text-xs uppercase tracking-wider text-primary font-medium">
              {item.category}
            </span>
            <span className="font-mono text-xs text-neutral-400">
              {item.period}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors tracking-tight mb-2.5 line-clamp-2">
            {item.title}
          </h3>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-3 font-normal mb-5">
            {item.shortDescription}
          </p>
        </div>

        {/* View Details Row with Arrow */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white transition-colors mt-auto">
          <span>View details</span>
          <ArrowRight
            size={14}
            className="text-neutral-400 group-hover:text-primary group-hover:translate-x-1 transition-all"
          />
        </div>
      </div>
    </Link>
  );
}
