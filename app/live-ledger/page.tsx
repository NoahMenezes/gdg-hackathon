"use client";

import {
  ArrowUpRight,
  Cpu,
  Leaf,
  Coins,
  ShieldCheck,
  Search,
} from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function LiveLedgerPage() {
  return (
    <main className="bg-black text-white overflow-hidden font-body">
      {/* SECTION 1 — SHARED NAVBAR */}
      <nav className="fixed top-4 w-full z-50 px-6 md:px-16 flex items-center justify-between max-w-350 left-1/2 -translate-x-1/2">
        <div className="flex-1 flex justify-start">
          <div className="shrink-0 relative w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center liquid-glass">
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
      <section className="relative overflow-visible h-175 bg-black pt-32">
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-8">
            Live On-Chain Ledger
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-[-4px] leading-[0.8] mb-8"
          >
            Every credit. Every sensor. Fully transparent.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-white/60 font-light max-w-2xl mb-12"
          >
            The VerdiChain public ledger is a real-time view of all sensor
            nodes, ML validation events, minted credits, and retirements — all
            sourced directly from Ethereum. No filters. No spin. Just proof.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl"
          >
            {[
              { value: "1,284", label: "Credits Minted" },
              { value: "842", label: "Active Sensor Nodes" },
              { value: "9,340 tCO₂e", label: "Total Sequestration Verified" },
              { value: "0", label: "Double-Counted Credits" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <span className="text-3xl md:text-4xl font-heading italic text-white tracking-tight">
                  {stat.value}
                </span>
                <p className="text-white/60 text-sm font-light mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — MAP SECTION */}
      <section className="py-24 px-6 md:px-16 lg:px-24 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-6">
            Global Node Map
          </h2>
          <p className="text-white/60 font-light mb-12 max-w-2xl mx-auto">
            Live positions of all deployed VerdiChain sensor nodes. Green =
            actively sequestering and transmitting. Yellow = below minting
            threshold. Red = anomaly detected or offline. Each node links to its
            full sensor telemetry feed and minted credit history.
          </p>
          <div className="liquid-glass rounded-3xl p-8 mb-8">
            {/* Placeholder for map */}
            <div className="h-96 bg-black/50 rounded-2xl flex items-center justify-center">
              <span className="text-white/40">
                Interactive World Map Coming Soon
              </span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Anomaly Detected: Node #0471 — Borneo Cluster",
              "Threshold Crossed: Node #0388 — Amazon South Block — Minting Now",
            ].map((alert, i) => (
              <span
                key={i}
                className="liquid-glass rounded-full px-4 py-2 text-sm font-medium text-white"
              >
                {alert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — ANALYTICS FEED */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-white/2 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-12 text-center">
            Live Analytics Feed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {[
              { label: "ML Validation Accuracy", value: "94.1%", trend: "Up" },
              {
                label: "Sensor Readings Logged",
                value: "2.8M",
                trend: "Steady",
              },
              { label: "Active Nodes", value: "842", trend: "Growth" },
              { label: "Fraud Flags Rejected", value: "99", trend: "Down" },
            ].map((metric, i) => (
              <div key={i} className="liquid-glass rounded-2xl p-6 text-center">
                <span className="text-2xl font-heading italic text-white">
                  {metric.value}
                </span>
                <p className="text-white/60 text-sm font-light mt-2">
                  {metric.label}
                </p>
                <span className="text-green-500 text-xs font-medium mt-1 block">
                  {metric.trend}
                </span>
              </div>
            ))}
          </div>
          <div className="liquid-glass rounded-2xl p-6">
            <h3 className="text-lg font-heading italic text-white mb-4">
              Recent Minting Events
            </h3>
            <p className="text-white/60 text-sm">
              Node #0388 — Amazon South Block — 0.3 tCO₂e confirmed. TX:
              0x3f8a...d21c. Minted 4 minutes ago.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — CREDIT EXPLORER */}
      <section className="py-24 px-6 md:px-16 lg:px-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">
            Credit Explorer
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-6">
            Search any credit. Verify in seconds.
          </h2>
          <p className="text-white/60 font-light mb-12 max-w-2xl mx-auto">
            Enter a credit token ID or scan a QR code to pull the full proof
            record: sensor node ID, GPS coordinates, measurement window, raw
            data hash, ML validation log, minting transaction, and current owner
            wallet.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <input
              type="text"
              placeholder="Enter Token ID or paste Transaction Hash"
              className="flex-1 liquid-glass rounded-full px-6 py-4 text-white placeholder-white/40 bg-transparent border border-white/10 focus:border-white/20 outline-none"
            />
            <button className="liquid-glass-strong rounded-full px-8 py-4 text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
              <Search className="w-4 h-4" />
              Verify Credit
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6 — QUICK STATS */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-white/2 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Cpu,
                label: "Sensor Nodes",
                value: "842 Active",
                change: "99.8% uptime this month",
              },
              {
                icon: Leaf,
                label: "CO₂e Verified",
                value: "9,340 tonnes",
                change: "+412 tonnes this week",
              },
              {
                icon: Coins,
                label: "Credits Minted",
                value: "1,284 tokens",
                change: "+38 this week",
              },
              {
                icon: ShieldCheck,
                label: "Fraud Rejections",
                value: "99 flagged",
                change: "All stopped before minting",
              },
            ].map((stat, i) => (
              <div key={i} className="liquid-glass rounded-2xl p-6 text-center">
                <div className="liquid-glass-strong rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-heading italic text-white block">
                  {stat.value}
                </span>
                <p className="text-white/60 text-sm font-light mt-2">
                  {stat.label}
                </p>
                <span className="text-green-500 text-xs font-medium mt-1 block">
                  {stat.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
