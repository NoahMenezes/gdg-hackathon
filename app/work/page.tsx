"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { BlurText } from "@/components/BlurText";
import { HLSVideo } from "@/components/HLSVideo";

const PROJECTS = [
  {
    id: 1,
    client: "Harrow Grain Co.",
    category: "Grain",
    image: "https://picsum.photos/600/800?random=1",
    stat: "+31% corn yield, 2 seasons",
    height: "h-[450px]",
  },
  {
    id: 2,
    client: "GreenFields Co-op",
    category: "Large Scale",
    image: "https://picsum.photos/600/500?random=2",
    stat: "-40% fertilizer cost, Q1",
    height: "h-[350px]",
  },
  {
    id: 3,
    client: "Dekker Family Farms",
    category: "Grain",
    image: "https://picsum.photos/600/700?random=3",
    stat: "Fungal outbreak prevented, full south field saved",
    height: "h-[500px]",
  },
  {
    id: 4,
    client: "Vino Terra Estate",
    category: "Viticulture",
    image: "https://picsum.photos/600/600?random=4",
    stat: "Harvest timing optimized, +18% Brix score",
    height: "h-[400px]",
  },
  {
    id: 5,
    client: "Sunrise Orchards",
    category: "Horticulture",
    image: "https://picsum.photos/600/800?random=5",
    stat: "Irrigation cut 35%, zero yield loss",
    height: "h-[480px]",
  },
  {
    id: 6,
    client: "Stonebridge Pastoral",
    category: "Livestock",
    image: "https://picsum.photos/600/500?random=6",
    stat: "Pasture rotation AI, +22% carrying capacity",
    height: "h-[380px]",
  },
  {
    id: 7,
    client: "Blue Ridge Specialty",
    category: "Specialty Crops",
    image: "https://picsum.photos/600/700?random=7",
    stat: "Microclimate mapping, +2 harvest windows/yr",
    height: "h-[450px]",
  },
  {
    id: 8,
    client: "Meridian AgGroup",
    category: "Large Scale",
    image: "https://picsum.photos/600/600?random=8",
    stat: "50,000 acres onboarded, 6 days",
    height: "h-[420px]",
  },
  {
    id: 9,
    client: "Calder Potato Farms",
    category: "Horticulture",
    image: "https://picsum.photos/600/800?random=9",
    stat: "Disease prediction, saved $280k in losses",
    height: "h-[500px]",
  },
  {
    id: 10,
    client: "Sundara Rice Collective",
    category: "Specialty Crops",
    image: "https://picsum.photos/600/500?random=10",
    stat: "Water use -44%, yield flat",
    height: "h-[360px]",
  },
  {
    id: 11,
    client: "Plateau Dryland Farms",
    category: "Grain",
    image: "https://picsum.photos/600/700?random=11",
    stat: "Drought resilience plan, 3 seasons running",
    height: "h-[480px]",
  },
  {
    id: 12,
    client: "Kellerman Vineyards",
    category: "Viticulture",
    image: "https://picsum.photos/600/600?random=12",
    stat: "Vintage prediction accuracy: 96%",
    height: "h-[400px]",
  },
];

const FILTERS = [
  "All",
  "Grain",
  "Horticulture",
  "Viticulture",
  "Livestock",
  "Specialty Crops",
  "Large Scale",
];

export default function FieldsPage() {
  useEffect(() => {
    const originalWarn = console.warn;
    const originalLog = console.log;

    console.warn = function (...args) {
      if (
        typeof args[0] === "string" &&
        (args[0].includes("Clerk has been loaded with development keys") ||
          args[0].includes("[browser] Clerk:") ||
          args[0].includes("The class"))
      )
        return;
      originalWarn.apply(console, args);
    };

    console.log = function (...args) {
      if (typeof args[0] === "string" && args[0].includes("[browser] Clerk:"))
        return;
      originalLog.apply(console, args);
    };
  }, []);

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = PROJECTS.filter(
    (p) => activeFilter === "All" || p.category === activeFilter,
  );

  return (
    <main className="bg-black text-white overflow-hidden font-body selection:bg-white/20 min-h-screen">
      {/* SECTION 1 — SHARED NAVBAR */}
      <nav className="fixed top-4 w-full z-50 px-6 md:px-16 flex items-center justify-between max-w-350 left-1/2 -translate-x-1/2">
        <div className="flex-1 flex justify-start">
          <div className="shrink-0 relative w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
            <span className="font-heading italic text-2xl">F</span>
          </div>
        </div>
        <div className="hidden md:flex liquid-glass rounded-full px-8 py-3 items-center gap-8 shrink-0">
          {["Home", "Services", "Work", "Process"].map((link) => (
            <a
              key={link}
              href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
          <a
            href="/prototype"
            className="bg-white/10 hover:bg-white/20 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full transition-colors border border-white/10"
          >
            Prototype
          </a>
        </div>
        <div className="flex-1 flex justify-end items-center gap-4">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="hidden md:block text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer">
                Log In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-white text-black rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2 hover:bg-white/90 transition-colors cursor-pointer">
                Start Free Trial <ArrowUpRight className="w-4 h-4" />
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </nav>

      {/* SECTION 2 — HERO */}
      <section className="relative overflow-visible h-150 bg-black border-b border-white/5">
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto pt-35">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-8 tracking-wide">
            Field Case Studies
          </span>
          <BlurText
            text="Farms that grow harder than they ever have."
            className="text-6xl md:text-7xl font-heading italic text-white tracking-[-4px] leading-[0.9] mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto mb-12"
          >
            A curated look at real deployments across FieldMind's network. Each
            one delivering measurable yield improvement, cost reduction, and
            season-defining intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-nowrap overflow-x-auto pb-4 max-w-full gap-3 px-4 hide-scrollbar"
          >
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-white text-black"
                    : "liquid-glass text-white/60 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — PROJECT GRID */}
      <section className="py-16 px-6 md:px-16 lg:px-24">
        <div className="max-w-350 mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`liquid-glass rounded-3xl overflow-hidden relative group break-inside-avoid ${project.height}`}
              >
                <img
                  src={project.image}
                  alt={project.client}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
                  <span className="text-white/60 font-body text-xs uppercase tracking-widest mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-3xl font-heading italic text-white leading-none mb-4">
                    {project.client}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="liquid-glass-strong rounded-full px-3 py-1 text-xs text-white/90 font-medium">
                      {project.stat}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 4 — FEATURED CASE STUDY */}
      <section className="py-24 px-6 md:px-16 lg:px-24 border-y border-white/5 relative bg-white/2">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">
                Featured Deployment
              </span>
              <span className="block text-white/40 text-sm font-body uppercase tracking-widest mb-6">
                Meridian AgGroup — Large Scale Grain
              </span>
              <h2 className="text-4xl md:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-8">
                Meridian AgGroup — 50,000 Acre Intelligence Layer
              </h2>
              <p className="text-white/60 font-light text-lg leading-relaxed mb-10 max-w-xl">
                Meridian needed field-level intelligence across a fragmented
                50,000-acre operation spanning three counties. We deployed
                FieldMind's full satellite mapping and irrigation stack in 6
                days — delivering a unified dashboard that cut input costs by
                $1.2M in the first season.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-12">
                <div>
                  <span className="block text-4xl font-heading italic text-white mb-2">
                    $1.2M
                  </span>
                  <span className="text-white/40 text-xs uppercase tracking-widest">
                    Input cost savings, season 1
                  </span>
                </div>
                <div>
                  <span className="block text-4xl font-heading italic text-white mb-2">
                    6 days
                  </span>
                  <span className="text-white/40 text-xs uppercase tracking-widest">
                    Full deployment across 50k acres
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="block text-4xl font-heading italic text-white mb-2">
                    94%
                  </span>
                  <span className="text-white/40 text-xs uppercase tracking-widest">
                    Yield forecast accuracy
                  </span>
                </div>
              </div>

              <button className="bg-white text-black rounded-full px-8 py-4 text-sm font-medium flex items-center gap-2 hover:bg-white/90 transition-colors">
                Read Case Study <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="order-1 lg:order-2">
              <div className="liquid-glass-strong rounded-3xl p-4 overflow-hidden h-150 relative border border-white/10 group">
                <img
                  src="https://picsum.photos/1000/1200?random=50"
                  alt="Meridian Case Study"
                  className="w-full h-full object-cover rounded-2xl opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full liquid-glass flex items-center justify-center border border-white/20 text-white cursor-pointer hover:bg-white hover:text-black transition-colors group/play">
                    <div className="translate-x-0.5">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — TECH STACK (DATA STACK) */}
      <section className="py-24 px-6 md:px-16 text-center">
        <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">
          Powered By
        </span>
        <h2 className="text-3xl md:text-5xl font-heading italic text-white tracking-tight leading-[0.9] mb-6">
          World-class data infrastructure. Seamlessly integrated.
        </h2>
        <p className="text-white/60 font-light mb-16 max-w-2xl mx-auto">
          Every deployment runs on best-in-class agricultural data systems —
          chosen for accuracy, resilience, and farm-floor usability.
        </p>

        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-8">
          {[
            "Sentinel-2",
            "Planet Labs",
            "ISOBUS",
            "John Deere Ops",
            "AWS AgTech",
            "OpenET",
            "NDVI Engine",
            "Meteomatics",
          ].map((tech) => (
            <div
              key={tech}
              className="liquid-glass rounded-full px-8 py-4 flex items-center justify-center border border-white/5 hover:bg-white/5 transition-colors"
            >
              <span className="font-heading italic text-xl text-white/80">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — CTA FOOTER */}
      <footer className="relative w-full overflow-hidden pt-32 pb-8 px-6 flex flex-col border-t border-white/5">
        <div className="absolute inset-0 z-0 h-full w-full">
          <HLSVideo
            src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 h-50 bg-linear-to-b from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-50 bg-linear-to-t from-black to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto flex-1 justify-center min-h-100">
          <h2 className="text-6xl md:text-8xl font-heading italic text-white tracking-[-4px] leading-[0.85] mb-6">
            Your next harvest starts here.
          </h2>
          <p className="text-lg text-white/60 font-light mb-10 max-w-lg">
            Book a free field assessment. See what AI-powered precision
            agriculture can do for your land.
          </p>
          <div className="flex items-center gap-4">
            <button className="liquid-glass-strong rounded-full px-8 py-4 text-base font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
              Book Field Assessment <ArrowUpRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-light tracking-wide">
            © 2026 FieldMind AI. All rights reserved.
          </p>
          <p className="hidden md:block text-white/20 text-xs font-body italic tracking-widest uppercase">
            Grow smarter. Farm forever.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/40 text-xs font-light hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
