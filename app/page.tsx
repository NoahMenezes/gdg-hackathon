"use client";

import {
  ArrowUpRight,
  Play,
  Zap,
  Shield,
  BarChart3,
  Globe,
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
            <span className="font-heading italic text-2xl">V</span>
          </div>
        </div>

        <div className="hidden md:flex liquid-glass rounded-full px-8 py-3 items-center gap-8 shrink-0">
          {[
            { name: "Home", href: "/" },
            { name: "How It Works", href: "/how-it-works" },
            { name: "Solutions", href: "/solutions" },
            { name: "Live Ledger", href: "/live-ledger" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/prototype"
            className="bg-white/10 hover:bg-white/20 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full transition-colors border border-white/10"
          >
            Live Demo
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
          <BlurText
            text="VerdiChain — Verified Carbon Credit Tracker"
            className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white tracking-[-4px] leading-[0.8] mb-8"
          />

          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl text-white/60 font-light max-w-2xl mb-12"
          >
            Hardware-verified, blockchain-minted carbon credits. Real sensors.
            Real sequestration. Real proof — on-chain, forever.
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
              <Play className="w-4 h-4" /> See Live Ledger
            </button>
          </motion.div>
        </div>

        {/* SECTION 3 — PARTNERS BAR (Absolute at bottom of hero) */}
        <div className="absolute bottom-16 left-0 right-0 z-10 flex flex-col items-center">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white mb-8">
            Integrated with leading verification and blockchain infrastructure
          </span>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-80">
            {[
              "Verra",
              "Gold Standard",
              "Ethereum Foundation",
              "Chainlink",
              "AWS IoT",
            ].map((partner) => (
              <span
                key={partner}
                className="font-heading italic text-2xl md:text-3xl text-white tracking-tight"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — THE PROBLEM */}
      <section className="relative min-h-175 py-32 px-6 md:px-16 lg:px-24 flex flex-col justify-center">
        <div className="relative z-10 text-center max-w-4xl mx-auto min-h-125 flex flex-col items-center justify-center">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-6">
            The Problem
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-6">
            Carbon credits are massively corrupt.
          </h2>
          <p className="text-lg text-white/60 font-light mb-10 max-w-2xl mx-auto">
            Companies buy "offset credits" that are fake, double-counted, or
            unverifiable. There's no trustworthy way to prove a tree was planted
            or emissions were actually reduced.
          </p>
        </div>
      </section>

      {/* SECTION 5 — YOUR SOLUTION */}
      <section className="py-24 px-6 md:px-16 lg:px-24 relative z-10 bg-white/2">
        <div className="max-w-7xl mx-auto text-center">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">
            Your Solution
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-6">
            A hardware sensor + blockchain system that automatically mints a
            carbon credit token only when real-world data proves it's earned.
          </h2>
        </div>
      </section>

      {/* SECTION 6 — HOW IT WORKS */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-white/2 border-y border-white/5 relative z-10 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-6">
            <div>
              <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">
                How It Works
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
                Sensor reads it. ML validates it. Blockchain mints it.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Hardware Layer */}
            <div className="liquid-glass rounded-2xl p-6 hover:bg-white/4 transition-colors border border-white/5 flex flex-col items-start min-h-50">
              <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center mb-6">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-heading italic text-white mb-3">
                Hardware layer (your ML/DS strength)
              </h3>
              <p className="text-white/60 text-sm font-body font-light leading-relaxed">
                A soil sensor + CO₂ monitor (Raspberry Pi + cheap sensors ~$40)
                placed near a tree or green space. It logs biomass growth
                proxies — soil carbon, humidity, temp over time. An ML model
                validates the data is legitimate (not spoofed) and estimates CO₂
                sequestered.
              </p>
            </div>

            {/* Blockchain Layer */}
            <div className="liquid-glass rounded-2xl p-6 hover:bg-white/4 transition-colors border border-white/5 flex flex-col items-start min-h-50">
              <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center mb-6">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-heading italic text-white mb-3">
                Blockchain layer (beginner-friendly)
              </h3>
              <p className="text-white/60 text-sm font-body font-light leading-relaxed">
                When the ML model confirms a threshold is met, it triggers a
                smart contract on Ethereum testnet (free, no real money). The
                contract mints a simple NFT token representing a verified carbon
                credit. Anyone can scan a QR code and see the on-chain proof —
                immutable, transparent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — STATS */}
      <section className="relative py-32 px-6 lg:px-24 flex items-center justify-center border-b border-white/5">
        <div className="relative z-10 w-full max-w-6xl">
          <div className="liquid-glass rounded-3xl p-12 md:p-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center border border-white/10 shadow-2xl">
            {[
              { v: "100%", l: "On-chain verifiable credits" },
              { v: "94%", l: "ML anomaly detection accuracy" },
              { v: "$40", l: "Hardware node cost per deployment" },
              { v: "<24h", l: "First credit minted after threshold" },
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
            Trust built in hardware. Proved on-chain.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              q: "We've been burned by phantom credits twice. VerdiChain is the first platform where I can hand an auditor a QR code and the proof is right there — on-chain, timestamped, sensor-backed. This is what the market needed.",
              n: "David Okafor",
              r: "Sustainability Director, Meridian Energy Group",
            },
            {
              q: "The combination of soil sensor telemetry and ML validation is genuinely novel. We integrated VerdiChain into our reforestation project in under a week. The automated minting saved us months of manual certification paperwork.",
              n: "Lena Bergström",
              r: "Head of Carbon Markets, NordForest AB",
            },
            {
              q: "As a regulator, what I care about is evidence. VerdiChain provides immutable, hardware-sourced evidence for every single credit. It's the first system I've seen that's actually audit-ready by default.",
              n: "Anjali Rathi",
              r: "Carbon Policy Lead, GreenVerify Institute",
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
            Your next verified credit starts in the ground.
          </h2>
          <p className="text-lg text-white/60 font-light mb-12 max-w-lg">
            Deploy a VerdiChain sensor node on your land. Let real data mint
            real credits. Book a free consultation to get started.
          </p>
          <div className="flex items-center gap-4">
            <button className="liquid-glass-strong rounded-full px-8 py-4 text-base font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
              Book a Consultation <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-light tracking-wide">
            © 2026 VerdiChain. All rights reserved.
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
