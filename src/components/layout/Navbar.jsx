import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, Cpu } from "lucide-react";
import { projectsData } from "@/data/projectsData";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "COA Lab", path: "/coa-lab" },
  { label: "Projects", path: "/projects" },
  { label: "Achievements", path: "/achievements" },
  { label: "Assignment", path: "/assignment" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Dynamically detect if currently viewing a specific project detail page
  const isProjectDetail =
    location.pathname.startsWith("/projects/") && location.pathname !== "/projects";
  const currentSlug = isProjectDetail
    ? location.pathname.replace(/^\/projects\//, "").split("/")[0]
    : null;
  const currentProject = currentSlug
    ? projectsData.find((p) => p.slug === currentSlug)
    : null;
  const projectWebsite = currentProject?.links?.demo;
  const actionLink = projectWebsite || "/Ridhi_Gupta_Resume.pdf";
  const actionLabel = projectWebsite ? "Website" : "CV";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0C]/90 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/40 py-3.5"
          : "bg-[#0A0A0C]/50 backdrop-blur-sm border-b border-white/[0.04] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-200">
              <Cpu size={16} />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium">
                COA LAB
              </span>
              <span className="text-neutral-500 font-mono text-xs">/</span>
              <span className="text-sm font-semibold tracking-tight text-white group-hover:text-neutral-200 transition-colors">
                Ridhi Gupta
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.02] border border-white/[0.06] rounded-full px-2 py-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_12px_rgba(255,184,0,0.15)] font-semibold"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Dynamic Website / CV Link */}
          <div className="hidden md:flex items-center">
            <a
              href={actionLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                projectWebsite
                  ? "text-primary hover:text-white bg-primary/10 hover:bg-primary/20 border border-primary/35 hover:border-primary/60 shadow-[0_0_14px_rgba(255,184,0,0.15)]"
                  : "text-neutral-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-primary/40"
              }`}
            >
              <span>{actionLabel}</span>
              <ArrowUpRight size={13} className="text-primary" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/[0.08] pb-4 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/15 text-primary border border-primary/30 font-semibold"
                      : "text-neutral-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 mt-1 border-t border-white/[0.05]">
              <a
                href={actionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-mono text-neutral-300 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <span>{projectWebsite ? `${currentProject?.title} Website` : "CV"}</span>
                <ArrowUpRight size={15} className="text-primary" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
