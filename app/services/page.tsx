"use client";

import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Globe,
  FlaskConical,
  Droplets,
  TrendingUp,
  Bug,
  Bot,
} from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { BlurText } from "@/components/BlurText";
import { HLSVideo } from "@/components/HLSVideo";
import { useEffect } from "react";

const COMP_ROWS = [
  { f: "Setup time", a: "Weeks", g: "Days", fm: "Hours" },
  { f: "Data freshness", a: "Seasonal", g: "Monthly", fm: "Daily/Weekly" },
  { f: "Predictive capability", a: "Basic", g: "Standard", fm: "Advanced CI" },
  { f: "Cost per acre", a: "High", g: "Moderate", fm: "Fixed/Low" },
  { f: "Real-time alerts", a: "No", g: "Basic", fm: "Yes (Predictive)" },
  { f: "AI-native", a: "No", g: "Partial", fm: "Core" },
  { f: "Scalability", a: "Low", g: "High", fm: "Infinite" },
];

export default function PlatformPage() {
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

  return (
    <main className="bg-black text-white overflow-hidden font-body selection:bg-white/20">
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
      <section className="relative overflow-visible h-175 bg-black">
        {/* Background HLS */}
        <div className="absolute inset-0 z-0 h-175 w-full">
          <HLSVideo
            src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
            className="w-full h-175 object-cover mix-blend-screen"
            style={{ filter: "saturate(0.3)" }}
          />
          <div className="absolute top-0 left-0 right-0 h-50 bg-linear-to-b from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-50 bg-linear-to-t from-black to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto pt-40">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-8">
            Our Platform
          </span>
          <BlurText
            text="Everything your farm needs. Nothing it doesn't."
            className="text-6xl md:text-8xl lg:text-[7.5rem] font-heading italic text-white tracking-tight leading-[0.9] mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl text-white/60 font-light max-w-2xl mb-12"
          >
            From soil to harvest, our AI-native stack covers every layer of
            modern precision agriculture. Faster insights. Smarter decisions.
            Beautifully simple.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-xs font-light text-white/40 uppercase tracking-widest">
            Scroll to explore
          </span>
          <div className="w-px h-12 bg-linear-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* SECTION 3 — PLATFORM MODULES */}
      <section className="py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">
              Core Modules
            </span>
            <h2 className="text-4xl md:text-5xl font-heading italic text-white tracking-[-2px] leading-[0.9] mb-4">
              Six ways we grow your farm.
            </h2>
            <p className="text-white/60 font-light">
              Use one module or the entire platform. Every deployment is
              custom-scoped.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {[
              {
                num: "01",
                icon: Globe,
                title: "Satellite Field Mapping",
                desc: "We don't estimate. We see. Our AI synthesizes multispectral satellite imagery, drone data, and historical yield maps into a living field intelligence layer — updated weekly.",
                detail: "Active within 24 hours",
              },
              {
                num: "02",
                icon: FlaskConical,
                title: "Soil Intelligence Engine",
                desc: "Nutrient profiles, pH gradients, compaction zones, microbial health. We build a complete underground picture of your land so every input decision is defensible.",
                detail: "Full report in 48 hours",
              },
              {
                num: "03",
                icon: Droplets,
                title: "Smart Irrigation Scheduling",
                desc: "Evapotranspiration models, soil moisture telemetry, and weather forecasting combined into a single irrigation command layer. Water less. Grow more.",
                detail: "Live within 72 hours",
              },
              {
                num: "04",
                icon: TrendingUp,
                title: "Yield Prediction & Forecasting",
                desc: "Pre-season yield models updated continuously through the growing cycle. Know what to expect before the combine leaves the shed.",
                detail: "Forecast updated weekly",
              },
              {
                num: "05",
                icon: Bug,
                title: "Pest & Disease Early Warning",
                desc: "AI-trained on millions of outbreak patterns. We detect fungal, bacterial, and pest pressure before symptoms appear — giving you a treatment window, not a crisis.",
                detail: "Continuous monitoring",
              },
              {
                num: "06",
                icon: Bot,
                title: "Autonomous Farm Operations",
                desc: "Variable-rate application prescriptions, automated planting maps, harvest logistics. FieldMind connects to your existing machinery via ISOBUS and John Deere Operations Center.",
                detail: "Integration in 5 days",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="liquid-glass rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-16 border border-white/5 hover:bg-white/3 transition-colors group"
              >
                <div className="flex flex-col justify-between shrink-0 md:w-64">
                  <div>
                    <span className="font-heading italic text-white/30 text-2xl block mb-6">
                      {pillar.num}
                    </span>
                    <div className="liquid-glass-strong rounded-full w-12 h-12 flex items-center justify-center mb-6">
                      <pillar.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-heading italic text-white leading-tight">
                    {pillar.title}
                  </h3>
                </div>

                <div className="flex-1 flex flex-col justify-between pt-2">
                  <p className="text-white/60 font-light leading-relaxed text-lg max-w-2xl mb-8">
                    {pillar.desc}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-white/40 text-xs uppercase tracking-widest font-medium">
                      Scope
                    </span>
                    <div className="h-px w-8 bg-white/20" />
                    <span className="text-white text-sm font-light">
                      {pillar.detail}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — PROCESS MINI */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-white/2 border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
          <div className="md:w-1/3">
            <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">
              How A Season Runs
            </span>
            <h2 className="text-4xl md:text-5xl font-heading italic text-white tracking-[-2px] leading-[0.9] mb-6">
              Simple onboarding.
              <br />
              Powerful output.
            </h2>
            <p className="text-white/60 font-light">
              Four phases. Total visibility.
            </p>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
            {[
              {
                n: "1. Field Onboarding",
                d: "Upload boundaries, soil history, and crop records. Takes under 20 minutes.",
              },
              {
                n: "2. AI Baseline Report",
                d: "Within 24 hours, receive your full soil map, risk assessment, and season plan.",
              },
              {
                n: "3. In-Season Monitoring",
                d: "Weekly satellite passes, daily weather adjustments, real-time alerts.",
              },
              {
                n: "4. Harvest & Debrief",
                d: "Post-harvest yield analysis, ROI report, and next-season recommendations auto-generated.",
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                <h4 className="text-lg font-heading italic text-white mb-3">
                  {step.n}
                </h4>
                <p className="text-white/50 text-sm font-light leading-relaxed">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — COMPARISON TABLE */}
      <section className="py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">
              How We Compare
            </span>
            <h2 className="text-4xl md:text-5xl font-heading italic text-white tracking-[-2px] leading-[0.9]">
              Traditional consulting vs. FieldMind.
            </h2>
          </div>

          <div className="liquid-glass rounded-3xl overflow-hidden border border-white/10 md:overflow-visible overflow-x-auto text-left shadow-xl w-full">
            <table className="w-full min-w-150 border-collapse relative">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-6 font-body text-xs uppercase tracking-widest text-white/40 font-medium text-left w-1/4">
                    Feature
                  </th>
                  <th className="p-6 font-heading italic text-xl text-white font-normal text-left w-1/4 opacity-60">
                    Agronomist Only
                  </th>
                  <th className="p-6 font-heading italic text-xl text-white font-normal text-left w-1/4 opacity-60">
                    Generic AgTech
                  </th>
                  <th className="p-6 font-heading italic text-2xl text-white font-normal text-left w-1/4 liquid-glass-strong shadow-lg relative z-0 border-x border-white/10">
                    FieldMind
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMP_ROWS.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 last:border-b-0 hover:bg-white/2 transition-colors relative"
                  >
                    <td className="px-6 py-5 font-body text-sm font-medium text-white/80">
                      {row.f}
                    </td>
                    <td className="px-6 py-5 font-body text-sm font-light text-white/50">
                      {row.a}
                    </td>
                    <td className="px-6 py-5 font-body text-sm font-light text-white/50">
                      {row.g}
                    </td>
                    <td className="px-6 py-5 font-body text-sm font-medium text-white liquid-glass-strong shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] relative z-0 border-x border-white/10">
                      {row.fm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 7 — CTA FOOTER */}
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
