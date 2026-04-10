"use client";

import { useState } from "react";
import {
  ShieldCheck,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Calendar,
  ArrowRight,
  Download,
  Search,
  Filter,
  Activity,
  Droplets,
  CloudRain,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PMFBYInsurance() {
  const [activeTab, setActiveTab] = useState("claims");

  const claims = [
    {
      id: "CLM-842-GOA",
      farmer: "Ramesh Gaonkar",
      location: "Ponda, North Goa",
      crop: "Kharif Paddy",
      status: "Pre-Validated",
      confidence: 98.4,
      evidence: ["IoT Soil Moisture", "Satellite NDVI", "AI Photo Scan"],
      date: "Oct 12, 2023",
    },
    {
      id: "CLM-843-GOA",
      farmer: "Sita Prabhu",
      location: "Quepem, South Goa",
      crop: "Cashew",
      status: "In-Review",
      confidence: 72.1,
      evidence: ["IoT Temp Sensor", "Regional Rain Deficit"],
      date: "Oct 14, 2023",
    },
    {
      id: "CLM-845-GOA",
      farmer: "Anand Naik",
      location: "Bicholim, North Goa",
      crop: "Paddy",
      status: "Disputed",
      confidence: 45.8,
      evidence: ["Manual Report Only"],
      date: "Oct 15, 2023",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading italic tracking-tight">
            PMFBY Insurance Verification
          </h2>
          <p className="text-white/40 font-light mt-1">
            Ground-truth evidence automation for Pradhan Mantri Fasal Bima
            Yojana.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-sm">
            <Download className="w-4 h-4" />
            Export Audit Log
          </button>
        </div>
      </div>

      {/* QUICK METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">
              Efficiency
            </span>
          </div>
          <div className="text-3xl font-heading italic mb-1">-65%</div>
          <div className="text-xs text-white/40 font-medium uppercase tracking-widest">
            Verification Time
          </div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
              Accuracy
            </span>
          </div>
          <div className="text-3xl font-heading italic mb-1">94.8%</div>
          <div className="text-xs text-white/40 font-medium uppercase tracking-widest">
            Evidence Correlation
          </div>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
              Volume
            </span>
          </div>
          <div className="text-3xl font-heading italic mb-1">₹4.2 Cr</div>
          <div className="text-xs text-white/40 font-medium uppercase tracking-widest">
            Pre-Validated Claims
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CLAIMS LIST */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/2 border border-white/5 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-xl font-heading italic">
                Active Claim Verification
              </h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type="text"
                    placeholder="Search Farmer ID..."
                    className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-green-500/50 transition-colors w-48"
                  />
                </div>
                <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-white">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/30 font-bold">
                    <th className="px-6 py-4">Farmer / ID</th>
                    <th className="px-6 py-4">Crop & Location</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">AI Trust</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {claims.map((claim) => (
                    <tr
                      key={claim.id}
                      className="group hover:bg-white/2 transition-colors"
                    >
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {claim.farmer}
                          </span>
                          <span className="text-[10px] text-white/40">
                            {claim.id}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm text-white/80">
                            {claim.crop}
                          </span>
                          <span className="text-[10px] text-white/40 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {claim.location}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`text-[10px] px-2 py-1 rounded-full font-bold border ${
                            claim.status === "Pre-Validated"
                              ? "bg-green-500/10 border-green-500/20 text-green-400"
                              : claim.status === "In-Review"
                                ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                : "bg-red-500/10 border-red-500/20 text-red-400"
                          }`}
                        >
                          {claim.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${claim.confidence > 80 ? "bg-green-500" : claim.confidence > 50 ? "bg-blue-500" : "bg-red-500"}`}
                              style={{ width: `${claim.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono">
                            {claim.confidence}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="p-2 hover:bg-white/5 rounded-lg text-white/20 hover:text-white transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* EVIDENCE WORKSPACE */}
        <div className="space-y-6">
          <div className="bg-white/2 border border-white/5 rounded-3xl p-6 min-h-120">
            <h3 className="text-xl font-heading italic mb-6">
              Evidence Package
            </h3>

            <div className="space-y-8">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                    Selected: CLM-842-GOA
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-black/40 rounded-xl border border-white/5">
                    <Droplets className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium">
                        IoT Moisture Deficiency
                      </p>
                      <p className="text-[10px] text-white/40 italic">
                        Sensors in Ponda Zone 4 recorded &lt;15% moisture for 14
                        consecutive days.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-black/40 rounded-xl border border-white/5">
                    <CloudRain className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium">
                        Hyper-local Weather Fuse
                      </p>
                      <p className="text-[10px] text-white/40 italic">
                        IMD data confirmed 42% rainfall deficit compared to
                        10-year mean.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-black/40 rounded-xl border border-white/5">
                    <Activity className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium">
                        NDVI Satellite Anomaly
                      </p>
                      <p className="text-[10px] text-white/40 italic">
                        Vegetation index dropped by 0.3 units between Oct 1 and
                        Oct 10.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] uppercase font-bold text-white/30 tracking-widest">
                  Audit Actions
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 bg-green-500 text-black text-[10px] font-bold uppercase rounded-xl hover:bg-green-400 transition-all">
                    Approve Claim
                  </button>
                  <button className="py-3 bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase rounded-xl hover:bg-white/10 transition-all">
                    Request Info
                  </button>
                </div>
                <button className="w-full py-3 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase rounded-xl hover:bg-red-500/20 transition-all">
                  Flag for Dispute
                </button>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-white/20" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                    Verification History
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="text-white/20">12:42 PM</span>
                    <span className="text-white/60 italic">
                      AI Auto-Correlation Complete
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="text-white/20">11:15 AM</span>
                    <span className="text-white/60 italic">
                      IoT Ground-Truth Pack Fetched
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
