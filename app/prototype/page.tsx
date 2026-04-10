"use client";

import { Activity, Camera, Droplets, Mic, ShieldCheck } from "lucide-react";

export default function DistrictIntelligence() {
  return (
    <div className="p-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HERO PROBLEM SOLVER HEADER */}
        <div className="bg-linear-to-r from-green-500/10 to-transparent border border-green-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-4xl font-heading italic mb-3 tracking-tight">
              District Intelligence Overview
            </h2>
            <p className="text-white/60 text-lg font-light leading-relaxed max-w-2xl">
              Transforming Goan agriculture from reactive habit to preventive
              intelligence. Monitoring North & South Goa districts with
              real-time telemetry and AI-driven insights.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center min-w-32">
              <span className="block text-2xl font-heading text-green-400">
                35%
              </span>
              <span className="text-[10px] uppercase text-white/40 tracking-wider">
                Water Saved
              </span>
            </div>
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center min-w-32">
              <span className="block text-2xl font-heading text-orange-400">
                60%
              </span>
              <span className="text-[10px] uppercase text-white/40 tracking-wider">
                Faster Detection
              </span>
            </div>
          </div>
        </div>

        {/* B2B DISTRICT MAP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-white/2 border border-white/5 rounded-3xl overflow-hidden min-h-120 relative group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-40 transition-transform duration-2000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <span className="bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider w-fit">
                District Stress Heatmap
              </span>
              <div className="flex gap-2">
                <span className="bg-red-500/20 backdrop-blur-md text-red-400 text-[10px] px-3 py-1 rounded-full border border-red-500/30">
                  Pest Corridor: Ponda
                </span>
                <span className="bg-blue-500/20 backdrop-blur-md text-blue-400 text-[10px] px-3 py-1 rounded-full border border-blue-500/30">
                  Irrigation Deficit: Quepem
                </span>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-2xl font-heading italic mb-2">
                Regional Health Monitoring
              </h3>
              <p className="text-white/60 font-light max-w-xl">
                Live heatmaps for Agriculture Dept & Insurers. Evidence-backed
                PMFBY claim verification in under 7 days using ground-truth data
                from LoRaWAN nodes.
              </p>
            </div>

            {/* Simulated Data Nodes */}
            <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_red] animate-ping" />
            <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_red]" />
            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_15px_orange]" />
          </div>

          <div className="bg-white/2 border border-white/5 rounded-3xl p-6 space-y-6 flex flex-col">
            <h4 className="text-sm font-heading italic text-white/60">
              Live Analytics Feed
            </h4>
            {[
              { label: "Labelling Accuracy", value: "92.4%", trend: "Up" },
              {
                label: "Telemetry Records",
                value: "1.4M",
                trend: "Steady",
              },
              { label: "Active Nodes", value: "842", trend: "Growth" },
              { label: "Claim Disputes", value: "-42%", trend: "Down" },
            ].map((row, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 border-b border-white/5 pb-4 last:border-0"
              >
                <span className="text-[10px] uppercase tracking-wider text-white/30 font-medium">
                  {row.label}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-heading italic">
                    {row.value}
                  </span>
                  <span
                    className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold ${
                      row.trend === "Up" || row.trend === "Growth"
                        ? "bg-green-500/20 text-green-400"
                        : row.trend === "Down"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-white/10 text-white/40"
                    }`}
                  >
                    {row.trend}
                  </span>
                </div>
              </div>
            ))}
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 mt-auto">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span className="text-xs font-bold text-white/80">
                  Claim Verification
                </span>
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed italic">
                Ground-truth IoT data confirms 425mm rainfall deficit in Zone 4.
                Claims pre-validated.
              </p>
            </div>
          </div>
        </div>

        {/* QUICK STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/2 border border-white/5 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <Camera className="w-4 h-4 text-green-400" />
              <span className="text-xs font-medium text-white/60">
                Crop Doctor
              </span>
            </div>
            <div className="text-2xl font-heading italic">12.4k Scans</div>
            <div className="text-[10px] text-green-400 mt-1">
              +12% from last week
            </div>
          </div>
          <div className="bg-white/2 border border-white/5 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-medium text-white/60">
                IoT Nodes
              </span>
            </div>
            <div className="text-2xl font-heading italic">842 Active</div>
            <div className="text-[10px] text-blue-400 mt-1">99.8% Uptime</div>
          </div>
          <div className="bg-white/2 border border-white/5 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <Mic className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-medium text-white/60">
                Voice AI
              </span>
            </div>
            <div className="text-2xl font-heading italic">5.2k Queries</div>
            <div className="text-[10px] text-purple-400 mt-1">84% Konkani</div>
          </div>
          <div className="bg-white/2 border border-white/5 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-medium text-white/60">
                Health Index
              </span>
            </div>
            <div className="text-2xl font-heading italic">Good (78)</div>
            <div className="text-[10px] text-orange-400 mt-1">
              Normal for Season
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
