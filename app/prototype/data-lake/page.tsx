"use client";

import { useState } from "react";
import {
  Database,
  ShieldCheck,
  Share2,
  RefreshCw,
  Server,
  HardDrive,
  Lock,
  Globe,
  Zap,
  Activity,
  ChevronRight,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function FederatedDataLake() {
  const [isSyncing, setIsSyncing] = useState(false);

  const datasets = [
    {
      name: "Paddy Disease Morphology",
      source: "District Extension Scans",
      size: "4.2 GB",
      nodes: 12,
      status: "Verified",
    },
    {
      name: "North Goa Soil Telemetry",
      source: "LoRaWAN Mesh Net",
      size: "1.8 GB",
      nodes: 42,
      status: "Streaming",
    },
    {
      name: "Konkani Dialect Corpus",
      source: "Voice RAG Interactions",
      size: "820 MB",
      nodes: 5,
      status: "Encrypted",
    },
    {
      name: "Cashew Yield Prediction",
      source: "Fused Satellite + IoT",
      size: "12.4 GB",
      nodes: 8,
      status: "Processing",
    },
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 3000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading italic tracking-tight">
            Federated Data Lake
          </h2>
          <p className="text-white/40 font-light mt-1">
            Privacy-preserving data aggregation & continuous model retraining
            for Goan agriculture.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-all text-sm disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`}
            />
            Trigger Global Sync
          </button>
        </div>
      </div>

      {/* INFRASTRUCTURE OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white/2 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
            <Server className="w-6 h-6 text-blue-400" />
          </div>
          <span className="text-2xl font-heading italic">14 Nodes</span>
          <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest">
            Active Taluka Servers
          </span>
        </div>
        <div className="bg-white/2 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
            <HardDrive className="w-6 h-6 text-green-400" />
          </div>
          <span className="text-2xl font-heading italic">18.4 TB</span>
          <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest">
            Total Federated Storage
          </span>
        </div>
        <div className="bg-white/2 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-purple-400" />
          </div>
          <span className="text-2xl font-heading italic">AES-256</span>
          <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest">
            On-Device Anonymization
          </span>
        </div>
        <div className="bg-white/2 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-orange-400" />
          </div>
          <span className="text-2xl font-heading italic">3.2k KM²</span>
          <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest">
            Geospatial Coverage
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* DATASET EXPLORER */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/2 border border-white/5 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-heading italic">Active Catalogs</h3>
              <button className="text-xs text-green-400 font-bold hover:underline flex items-center gap-1">
                <Plus className="w-3 h-3" /> Register New Source
              </button>
            </div>
            <div className="divide-y divide-white/5">
              {datasets.map((dataset, i) => (
                <div
                  key={i}
                  className="p-6 flex items-center justify-between group hover:bg-white/2 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <Database className="w-5 h-5 text-white/40 group-hover:text-green-400 transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white/90">
                        {dataset.name}
                      </h4>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">
                        Source: {dataset.source}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-[10px] text-white/60 flex items-center gap-1">
                          <HardDrive className="w-3 h-3" /> {dataset.size}
                        </span>
                        <span className="text-[10px] text-white/60 flex items-center gap-1">
                          <Share2 className="w-3 h-3" /> {dataset.nodes} Peer
                          Nodes
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${
                        dataset.status === "Verified"
                          ? "border-green-500/30 text-green-400 bg-green-500/5"
                          : dataset.status === "Streaming"
                            ? "border-blue-500/30 text-blue-400 bg-blue-500/5"
                            : "border-white/10 text-white/40"
                      }`}
                    >
                      {dataset.status}
                    </span>
                    <button className="p-2 hover:bg-white/5 rounded-lg text-white/20 group-hover:text-white transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-linear-to-r from-purple-500/10 to-transparent border border-purple-500/20 rounded-3xl p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500/20 rounded-2xl">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-xl font-heading italic text-purple-300">
                    Continuous Model Retraining
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed italic">
                    Federated learning pipeline allows model updates without raw
                    data leaving local district nodes. YOLOv8 weights are
                    averaged every 24 hours to improve "Rice Blast" detection in
                    South Goa talukas.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-black/40 rounded-xl px-4 py-2 border border-white/5">
                    <span className="text-[10px] text-white/30 uppercase block">
                      Last Train
                    </span>
                    <span className="text-sm font-bold">4h 12m ago</span>
                  </div>
                  <div className="bg-black/40 rounded-xl px-4 py-2 border border-white/5">
                    <span className="text-[10px] text-white/30 uppercase block">
                      mAP Improvement
                    </span>
                    <span className="text-sm font-bold text-green-400">
                      +1.24%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GOVERNANCE & PRIVACY */}
        <div className="space-y-6">
          <div className="bg-white/2 border border-white/5 rounded-3xl p-6">
            <h3 className="text-xl font-heading italic mb-6">
              Data Governance
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Privacy Protocol
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-white/40 italic">
                      Geospatial Obfuscation
                    </span>
                    <span className="text-green-400 font-bold">Enabled</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-white/40 italic">
                      PII Scrubbing (Whisper)
                    </span>
                    <span className="text-green-400 font-bold">Enabled</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-white/40 italic">
                      Differential Privacy Level
                    </span>
                    <span className="text-white/80 font-bold">
                      High (ε=0.1)
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-5 h-5 text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Storage Health
                  </span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-blue-500 w-[65%]" />
                </div>
                <div className="flex justify-between text-[10px] text-white/40">
                  <span>65% Utilized</span>
                  <span>12.4 TB Available</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-8 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-sm font-medium">
              View Access Logs
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white/2 border border-white/5 rounded-3xl p-6">
            <h3 className="text-sm font-heading italic text-white/60 mb-4">
              Federated Nodes
            </h3>
            <div className="space-y-3">
              {["Ponda Taluka Edge", "Canacona Hub", "Bicholim Data Unit"].map(
                (node, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-medium">{node}</span>
                    </div>
                    <span className="text-[8px] font-mono text-white/30">
                      L-64ms
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
