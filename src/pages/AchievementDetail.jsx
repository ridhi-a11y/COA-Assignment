import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Award, Calendar, Building, FolderGit2, User, Trophy, FileText, ExternalLink, Download } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { achievementsData } from "@/data/achievementsData";

export default function AchievementDetail() {
  const { slug } = useParams();

  if (slug === "iuxoa-recognition") {
    return <Navigate to="/experience/iuxoa" replace />;
  }

  const item = achievementsData.find((a) => a.slug === slug);

  if (!item) {
    return <Navigate to="/achievements" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white selection:bg-primary/20 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 md:pt-36 pb-24 px-6 max-w-5xl mx-auto w-full">
        {/* BACK LINK */}
        <div className="mb-8">
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-primary transition-colors group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Achievements</span>
          </Link>
        </div>

        {/* HEADER: CATEGORY, TITLE, DATE / PERIOD */}
        <div className="mb-10 pb-8 border-b border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium">
              {item.category}
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs font-mono text-neutral-400">
              {item.period}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            {item.title}
          </h1>

          {/* METADATA CHIPS: EVENT, ORGANIZATION, ROLE, PROJECT, SCORE */}
          <div className="flex flex-wrap items-center gap-2.5">
            {item.score && (
              <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/30 flex items-center gap-1.5">
                <Trophy size={13} />
                <span>Score: {item.score}</span>
              </span>
            )}

            {item.certificatePdf && (
              <a
                href={item.certificatePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-all flex items-center gap-1.5"
              >
                <FileText size={13} />
                <span>Certificate PDF ↗</span>
              </a>
            )}

            {item.event && (
              <span className="px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-300 bg-white/[0.03] border border-white/[0.08] flex items-center gap-1.5">
                <Calendar size={13} className="text-primary" />
                <span>Event: {item.event}</span>
              </span>
            )}

            {item.organization && (
              <span className="px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-300 bg-white/[0.03] border border-white/[0.08] flex items-center gap-1.5">
                <Building size={13} className="text-primary" />
                <span>{item.organization}</span>
              </span>
            )}

            {item.role && (
              <span className="px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-300 bg-white/[0.03] border border-white/[0.08] flex items-center gap-1.5">
                <User size={13} className="text-primary" />
                <span>Role: {item.role}</span>
              </span>
            )}

            {item.project && (
              <span className="px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-300 bg-white/[0.03] border border-white/[0.08] flex items-center gap-1.5">
                <FolderGit2 size={13} className="text-primary" />
                <span>Project: {item.project}</span>
              </span>
            )}
          </div>
        </div>

        {/* LARGE RELEVANT IMAGE */}
        <div
          className={`rounded-2xl overflow-hidden border border-white/[0.08] bg-[#111114] ${
            item.certificatePdf
              ? "aspect-[16/11] max-h-[560px] mb-4 bg-black/60 flex items-center justify-center p-2 sm:p-4"
              : "aspect-[16/10] max-h-[480px] mb-14"
          }`}
        >
          <img
            src={item.image}
            alt={item.title}
            className={`w-full h-full ${
              item.certificatePdf
                ? "object-contain rounded-xl shadow-2xl"
                : "object-cover object-center"
            }`}
          />
        </div>

        {/* OFFICIAL CERTIFICATE PDF CALLOUT (IF AVAILABLE) */}
        {item.certificatePdf && (
          <div className="mb-14 p-4 sm:p-5 rounded-2xl bg-[#111114] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <FileText size={22} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white flex items-center gap-2">
                  <span>Official Microsoft Credential (PDF)</span>
                </div>
                <div className="text-xs text-neutral-400 font-mono mt-0.5">
                  {item.verificationCode
                    ? `Verification Code: ${item.verificationCode} · Satya Nadella, Microsoft CEO`
                    : "Verified Microsoft Azure Credential"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={item.certificatePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-black font-semibold text-xs transition-all hover:bg-primary/90 shadow-md shadow-primary/10"
              >
                <span>View Official Certificate (PDF)</span>
                <ExternalLink size={13} />
              </a>
              <a
                href={item.certificatePdf}
                download="Microsoft_AZ900_Certificate_Ridhi_Gupta.pdf"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 border border-white/[0.1] text-xs font-medium transition-all"
              >
                <Download size={13} />
                <span>Download</span>
              </a>
            </div>
          </div>
        )}

        {/* SECTION: OVERVIEW */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Overview
            </h2>
          </div>
          <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              {item.overview || item.shortDescription}
            </p>

            {/* CONTEXTUAL PROJECTS (FOR IUXOA RECOGNITION) */}
            {item.contextProjects && item.contextProjects.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <span className="text-xs font-mono text-neutral-400 block mb-3 uppercase tracking-wider">
                  Associated Studio Projects
                </span>
                <div className="flex flex-wrap gap-2">
                  {item.contextProjects.map((pName) => (
                    <span
                      key={pName}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-neutral-300"
                    >
                      {pName}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION: KEY RESPONSIBILITIES & HIGHLIGHTS */}
        {item.details && item.details.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Key Responsibilities &amp; Highlights
              </h2>
            </div>
            <div className="space-y-3">
              {item.details.map((point, idx) => (
                <div
                  key={idx}
                  className="bg-[#111114] border border-white/[0.06] rounded-xl p-4 sm:p-5 flex items-start gap-3"
                >
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION: SYSTEMS & ARCHITECTURAL RELEVANCE */}
        {item.relevanceToCOA && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Relevance to Computer Organisation &amp; Architecture
              </h2>
            </div>
            <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                {item.relevanceToCOA}
              </p>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
