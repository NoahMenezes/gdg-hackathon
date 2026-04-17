"use client";

import {
  ArrowUpRight,
  Cpu,
  Brain,
  Layers,
  QrCode,
  BarChart3,
  ArrowLeftRight,
  TreePine,
  Building2,
  Scale,
  Landmark,
} from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function SolutionsPage() {
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
            Our Platform
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-[-4px] leading-[0.8] mb-8"
          >
            Everything needed to verify, mint, and trade real carbon credits.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-white/60 font-light max-w-2xl mb-12"
          >
            From sensor node deployment to on-chain credit marketplace,
            VerdiChain's end-to-end stack handles the entire verified carbon
            credit lifecycle. Deploy in days. Audit in seconds.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="liquid-glass-strong rounded-full px-8 py-4 text-base font-medium flex items-center gap-2 hover:bg-white/10 transition-colors"
          >
            Start Free Pilot <ArrowUpRight className="w-5 h-5 ml-1" />
          </motion.button>
        </div>
      </section>

      {/* SECTION 3 — PLATFORM MODULES */}
      <section className="py-24 px-6 md:px-16 lg:px-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">
              Platform Modules
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
              Six layers of verified carbon infrastructure.
            </h2>
            <p className="text-white/60 font-light mt-6 max-w-2xl mx-auto">
              Use one module or deploy the full stack. Every implementation is
              scoped to your land, project type, and compliance framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                icon: Cpu,
                title: "IoT Sensor Node Network",
                desc: "Raspberry Pi-based hardware nodes with soil carbon, CO₂ flux, temperature, and humidity sensors. Designed for outdoor deployment, low power consumption, and cellular or LoRaWAN connectivity. Each node costs approximately $40 in components.",
                detail: "Deployed within 48 hours",
              },
              {
                num: "02",
                icon: Brain,
                title: "ML Validation Engine",
                desc: "Our anomaly detection and sequestration estimation models run continuously on incoming sensor data. Spoofed, faulty, or statistically implausible data is rejected automatically. Only verified sequestration events proceed to minting.",
                detail: "Continuous real-time validation",
              },
              {
                num: "03",
                icon: Layers,
                title: "Smart Contract Minting",
                desc: "ERC-721 smart contracts on Ethereum automatically mint a carbon credit NFT the moment the ML engine confirms a sequestration threshold. No human approval step. No delay. No opportunity for manipulation.",
                detail: "Minted within hours of confirmation",
              },
              {
                num: "04",
                icon: QrCode,
                title: "Public Verification Explorer",
                desc: "Every minted credit gets a QR code linking to our public explorer. Scan to see sensor readings, ML validation logs, minting transaction hash, GPS location, and current ownership — all sourced from on-chain data.",
                detail: "Live at mint",
              },
              {
                num: "05",
                icon: BarChart3,
                title: "Carbon Credit Dashboard",
                desc: "A real-time web dashboard showing your deployed nodes, sensor telemetry feeds, ML validation status, minted credit inventory, and cumulative CO₂e sequestered. Designed for project managers, compliance officers, and ESG teams.",
                detail: "Live within 24 hours of deployment",
              },
              {
                num: "06",
                icon: ArrowLeftRight,
                title: "Credit Marketplace & Transfer",
                desc: "List, sell, or retire verified credits directly from the VerdiChain platform. Buyers receive the ERC-721 token to their wallet. Retirement is recorded on-chain and flagged in the public ledger — preventing double-counting forever.",
                detail: "Marketplace active immediately",
              },
            ].map((module, i) => (
              <div
                key={i}
                className="liquid-glass rounded-2xl p-6 hover:bg-white/4 transition-colors border border-white/5 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-white/40 text-sm font-medium">
                    {module.num}
                  </span>
                  <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center">
                    <module.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-heading italic text-white mb-3">
                  {module.title}
                </h3>
                <p className="text-white/60 text-sm font-body font-light leading-relaxed mb-4">
                  {module.desc}
                </p>
                <span className="text-green-500 text-xs font-medium">
                  {module.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — USE CASES */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-white/2 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">
              Use Cases
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
              Who VerdiChain is built for.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                icon: TreePine,
                title: "Reforestation Projects",
                desc: "Deploy sensor nodes across newly planted land. Earn verified credits automatically as trees grow and soil carbon increases. No annual audits. No certification delays.",
              },
              {
                icon: Building2,
                title: "Corporate ESG & Net-Zero",
                desc: "Buy VerdiChain credits with on-chain proof for your sustainability reports. Hand auditors a QR code, not a PDF from a certifier with a conflict of interest.",
              },
              {
                icon: Scale,
                title: "Regulators & Compliance Bodies",
                desc: "Access a public, immutable ledger of all issued and retired credits. Verify any credit in seconds. Identify double-counting and phantom credits instantly.",
              },
              {
                icon: Landmark,
                title: "Conservation NGOs",
                desc: "Generate a sustainable revenue stream from existing protected land. Sensor nodes monitor ongoing sequestration and mint credits that fund conservation operations directly.",
              },
            ].map((case_, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="liquid-glass-strong rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                  <case_.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading italic text-white mb-4">
                    {case_.title}
                  </h3>
                  <p className="text-white/60 text-sm font-body font-light leading-relaxed">
                    {case_.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — COMPARISON */}
      <section className="py-24 px-6 md:px-16 lg:px-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">
              How We Compare
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
              Legacy certification vs. VerdiChain.
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-white/60 font-medium">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 text-white/60 font-medium">
                    Legacy
                  </th>
                  <th className="text-center py-4 px-4 text-white/60 font-medium">
                    Blockchain Only
                  </th>
                  <th className="text-center py-4 px-4 text-green-500 font-medium">
                    VerdiChain
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Verification method",
                    legacy: "Manual audit",
                    blockchain_only: "Self-reported",
                    verdichain: "Hardware sensor + ML",
                  },
                  {
                    feature: "Time to first credit",
                    legacy: "6–18 months",
                    blockchain_only: "Weeks",
                    verdichain: "Hours",
                  },
                  {
                    feature: "Fraud resistance",
                    legacy: "Low",
                    blockchain_only: "Partial",
                    verdichain: "Cryptographic",
                  },
                  {
                    feature: "Public verifiability",
                    legacy: "PDF report",
                    blockchain_only: "Partial",
                    verdichain: "QR → On-chain",
                  },
                  {
                    feature: "Double-counting risk",
                    legacy: "High",
                    blockchain_only: "Moderate",
                    verdichain: "Zero (on-chain)",
                  },
                  {
                    feature: "Cost to certify",
                    legacy: "High",
                    blockchain_only: "Moderate",
                    verdichain: "Near zero (automated)",
                  },
                  {
                    feature: "Real-time data",
                    legacy: "No",
                    blockchain_only: "No",
                    verdichain: "Yes (continuous)",
                  },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-4 px-4 text-white font-medium">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-center text-white/40">
                      {row.legacy}
                    </td>
                    <td className="py-4 px-4 text-center text-white/40">
                      {row.blockchain_only}
                    </td>
                    <td className="py-4 px-4 text-center text-green-500 font-medium">
                      {row.verdichain}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CTA FOOTER */}
      <footer className="relative w-full overflow-hidden pt-32 pb-8 px-6 flex flex-col border-t border-white/5">
        <div className="absolute inset-0 z-0 h-full w-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 mix-blend-screen"
            src="/Transition_video_first_202604040755.mp4"
          />
          <div className="absolute top-0 left-0 right-0 h-50 bg-linear-to-b from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-50 bg-linear-to-t from-black to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto flex-1 justify-center min-h-100">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-[-4px] leading-[0.85] mb-6">
            Deploy your first sensor node this week.
          </h2>
          <p className="text-lg text-white/60 font-light mb-12 max-w-lg">
            Start a free pilot on a small parcel. Mint your first verified
            credit. See the full proof chain live.
          </p>
          <div className="flex items-center gap-4">
            <button className="liquid-glass-strong rounded-full px-8 py-4 text-base font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
              Start Free Pilot <ArrowUpRight className="w-5 h-5" />
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
