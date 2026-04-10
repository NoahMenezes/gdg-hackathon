"use client";

import {
  ArrowUpRight,
  Play,
  Zap,
  Palette,
  BarChart3,
  Shield,
} from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { BlurText } from "@/components/BlurText";
import { HLSVideo } from "@/components/HLSVideo";
import { useEffect } from "react";

export default function Home() {
  // Suppress Clerk development warning from overflowing terminal
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
      {/* SECTION 1 — NAVBAR */}
      <nav className="fixed top-4 w-full z-50 px-6 md:px-16 flex items-center justify-between max-w-350 left-1/2 -translate-x-1/2">
        <div className="flex-1 flex justify-start">
          <div className="relative w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center liquid-glass">
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
                Get Started <ArrowUpRight className="w-4 h-4" />
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </nav>

      {/* SECTION 2 — HERO */}
      <section className="relative overflow-visible h-250 bg-black">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 mix-blend-screen"
          src="/Transition_video_first_202604040755.mp4"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/5 z-0" />
        <div className="absolute bottom-0 left-0 right-0 h-75 bg-linear-to-t from-black to-transparent z-1" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto pt-37.5">
          <div className="liquid-glass rounded-full px-4 py-1.5 flex items-center gap-3 mb-8">
            <span className="bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              New
            </span>
            <span className="text-xs font-medium text-white/90">
              Introducing AI-powered precision farming.
            </span>
          </div>

          <BlurText
            text="The Farm Intelligence Your Land Deserves"
            className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white tracking-[-4px] leading-[0.8] mb-8"
          />

          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl text-white/60 font-light max-w-2xl mb-12"
          >
            Smarter crops. Healthier soil. Driven by AI, refined by agronomists.
            This is farming, wildly reimagined.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button className="liquid-glass-strong rounded-full px-8 py-4 text-base font-medium flex items-center gap-2 hover:bg-white/10 transition-colors w-full sm:w-auto justify-center text-white">
              Get Started <ArrowUpRight className="w-5 h-5 ml-1" />
            </button>
            <button className="rounded-full px-8 py-4 text-base font-medium text-white flex items-center gap-2 hover:text-white/80 transition-colors w-full sm:w-auto justify-center">
              <Play className="w-4 h-4" /> Watch the Film
            </button>
          </motion.div>
        </div>

        {/* SECTION 3 — PARTNERS BAR (Absolute at bottom of hero) */}
        <div className="absolute bottom-16 left-0 right-0 z-10 flex flex-col items-center">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white mb-8">
            Trusted by leading operations
          </span>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-80">
            {["Cargill", "Bayer", "John Deere", "Corteva", "Syngenta"].map(
              (partner) => (
                <span
                  key={partner}
                  className="font-heading italic text-2xl md:text-3xl text-white tracking-tight"
                >
                  {partner}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4 — START SECTION */}
      <section className="relative min-h-175 py-32 px-6 md:px-16 lg:px-24 flex flex-col justify-center">
        {/* Background HLS */}
        <div className="absolute inset-0 z-0 min-h-175 w-full">
          <HLSVideo
            src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 h-50 bg-linear-to-b from-black to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-50 bg-linear-to-t from-black to-transparent z-10" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto min-h-125 flex flex-col items-center justify-center">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-6">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-6">
            You plant it. We optimize it.
          </h2>
          <p className="text-lg text-white/60 font-light mb-10 max-w-2xl mx-auto">
            Share your field data. Our AI handles the rest—soil mapping, crop
            planning, forecasting. All in days.
          </p>
          <button className="liquid-glass-strong rounded-full px-8 py-4 text-sm font-medium flex items-center gap-2 mx-auto hover:bg-white/10 transition-colors">
            Get Started <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* SECTION 5 — FEATURES CHESS */}
      <section className="py-24 px-6 md:px-16 lg:px-24 relative z-10 bg-white/2">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center md:text-left">
            <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">
              Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
              Pro agriculture features. Zero complexity.
            </h2>
          </div>

          <div className="flex flex-col gap-32">
            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading italic text-white mb-6 leading-none">
                  Designed to yield.
                  <br />
                  Built to perform.
                </h3>
                <p className="text-white/60 font-light mb-8 leading-relaxed max-w-md text-lg">
                  Every recommendation is data-driven. Our AI studies soil
                  composition and weather patterns—then builds your farm plan to
                  outperform averages.
                </p>
                <button className="liquid-glass-strong rounded-full px-8 py-4 text-sm font-medium hover:bg-white/5 transition-colors">
                  Learn more
                </button>
              </div>
              <div className="order-1 md:order-2 rounded-2xl overflow-hidden liquid-glass relative group aspect-4/3">
                {/* Farming imagery from Unsplash */}
                <img
                  src="https://images.unsplash.com/photo-1761839258830-81f87b1c6d62?q=80&w=800&auto=format&fit=crop"
                  alt="Precision Harvesting"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
              <div className="rounded-2xl overflow-hidden liquid-glass relative group aspect-4/3">
                {/* Agriculture imagery from Unsplash */}
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop"
                  alt="Crop Intelligence"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading italic text-white mb-6 leading-none">
                  It gets smarter.
                  <br />
                  Season after season.
                </h3>
                <p className="text-white/60 font-light mb-8 leading-relaxed max-w-md text-lg">
                  Your farm intelligence evolves automatically. AI monitors
                  every moisture reading and yield outcome—then refines
                  recommendations in real time. No manual recalibration.
                </p>
                <button className="rounded-full px-6 py-3 text-sm font-medium text-white hover:text-white/70 transition-colors">
                  See how it works
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FEATURES GRID */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-white/2 border-y border-white/5 relative z-10 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-6">
            <div>
              <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">
                Why Us
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
                The difference is everything.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Hours, Not Seasons",
                desc: "Full soil analysis and crop plan delivered in under 24 hours.",
              },
              {
                icon: Palette,
                title: "Obsessively Precise",
                desc: "Every hectare mapped. Every variable weighted. Every decision optimized.",
              },
              {
                icon: BarChart3,
                title: "Built to Yield",
                desc: "Recommendations informed by millions of acres of training data.",
              },
              {
                icon: Shield,
                title: "Resilient by Default",
                desc: "Climate-adaptive models built for drought, flood, and everything between.",
              },
            ].map((feat, i) => (
              <div
                key={i}
                className="liquid-glass rounded-2xl p-6 hover:bg-white/4 transition-colors border border-white/5 flex flex-col items-start min-h-50"
              >
                <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center mb-6">
                  <feat.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-heading italic text-white mb-3">
                  {feat.title}
                </h3>
                <p className="text-white/60 text-sm font-body font-light leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — STATS */}
      <section className="relative py-32 px-6 lg:px-24 flex items-center justify-center border-b border-white/5">
        {/* Background HLS */}
        <div className="absolute inset-0 z-0 h-full w-full">
          <HLSVideo
            src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0)" }}
          />
          <div className="absolute top-0 left-0 right-0 h-50 bg-linear-to-b from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-50 bg-linear-to-t from-black to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-6xl">
          <div className="liquid-glass rounded-3xl p-12 md:p-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center border border-white/10 shadow-2xl">
            {[
              { v: "2M+", l: "Acres monitored" },
              { v: "94%", l: "Yield accuracy" },
              { v: "3.8x", l: "ROI vs. traditional" },
              { v: "24 hrs", l: "First field report" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight">
                  {stat.v}
                </span>
                <span className="text-white/60 font-body font-light text-sm">
                  {stat.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — TESTIMONIALS */}
      <section className="py-24 px-6 md:px-16 lg:px-24 relative z-10 max-w-7xl mx-auto w-full">
        <div className="mb-16 text-center">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">
            What They Say
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            Don't take our word for it.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              q: "We've tried three precision ag platforms over the years. FieldMind is the first one that actually thinks like an agronomist. Our corn yield is up 31% this season.",
              n: "James Harrow",
              r: "Farm Director, Harrow",
            },
            {
              q: "The soil intelligence reports alone justified the subscription. We cut fertilizer costs by 40% in the first quarter without touching our yield targets.",
              n: "Priya Menon",
              r: "Head of Agronomy, GreenFields",
            },
            {
              q: "FieldMind flagged a fungal risk in our soybean block two weeks before any visible symptoms. We treated early. Saved the entire south field.",
              n: "Tom Dekker",
              r: "Owner-Operator, Dekker Farms",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="liquid-glass rounded-2xl p-8 border border-white/5 flex flex-col justify-between hover:bg-white/3 transition-colors h-full min-h-62.5"
            >
              <div className="mb-8">
                <p className="text-white/80 font-body font-light text-sm italic leading-relaxed">
                  "{t.q}"
                </p>
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm text-white font-medium mb-1">{t.n}</h4>
                <p className="text-xs text-white/50">{t.r}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9 — CTA FOOTER */}
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
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-[-4px] leading-[0.85] mb-6">
            Your next harvest starts here.
          </h2>
          <p className="text-lg text-white/60 font-light mb-12 max-w-lg">
            Book a free field assessment. See what AI-powered precision
            agriculture can do for your land.
          </p>
          <div className="flex items-center gap-4">
            <button className="liquid-glass-strong rounded-full px-8 py-4 text-base font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
              Book assessment <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-light tracking-wide">
            © 2026 FieldMind AI. All rights reserved.
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
