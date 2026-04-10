"use client";

import { useState } from "react";
import {
  Camera,
  Upload,
  Zap,
  Activity,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  History,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AICropDoctor() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<null | {
    disease: string;
    confidence: number;
    severity: string;
    recommendation: string;
  }>(null);

  const startScan = () => {
    setIsScanning(true);
    setScanResult(null);
    // Simulate on-device inference delay
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        disease: "Rice Blast (Magnaporthe oryzae)",
        confidence: 94.2,
        severity: "Moderate",
        recommendation:
          "Apply Tricyclazole 75% WP at 0.6g/L. Ensure proper field drainage and reduce nitrogenous fertilizer application until recovery.",
      });
    }, 3000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading italic tracking-tight">
            AI Crop Doctor
          </h2>
          <p className="text-white/40 font-light mt-1">
            Real-time on-device pest & disease diagnostics for Goan crops.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-sm">
            <History className="w-4 h-4" />
            Scan History
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-all text-sm border-none cursor-pointer">
            <Upload className="w-4 h-4" />
            Bulk Upload
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SCANNER VIEWPORT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video lg:aspect-square max-h-160 bg-black rounded-3xl border border-white/10 overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-60" />

            {/* Overlay Grid */}
            <div className="absolute inset-0 border-40 border-black/40 pointer-events-none" />

            {/* Scanner Animation */}
            <AnimatePresence>
              {isScanning && (
                <motion.div
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-linear-to-r from-transparent via-green-400 to-transparent shadow-[0_0_15px_rgba(74,222,128,0.8)] z-10"
                />
              )}
            </AnimatePresence>

            {/* Bounding Box Mock */}
            {!isScanning && !scanResult && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  Center Subject
                </p>
              </div>
            )}

            {scanResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-green-400 rounded-lg shadow-[0_0_20px_rgba(74,222,128,0.4)]"
              >
                <div className="absolute -top-6 left-0 bg-green-400 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-lg">
                  {scanResult.disease} {scanResult.confidence}%
                </div>
              </motion.div>
            )}

            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <button
                onClick={startScan}
                disabled={isScanning}
                className={`group relative flex items-center gap-4 px-8 py-4 rounded-2xl font-heading italic text-xl transition-all border-none cursor-pointer ${isScanning ? "bg-white/10 text-white/40 cursor-not-allowed" : "bg-green-500 text-black hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(34,197,94,0.4)]"}`}
              >
                <Camera
                  className={`w-6 h-6 ${isScanning ? "animate-pulse" : ""}`}
                />
                {isScanning ? "Processing Model..." : "Capture Diagnostic"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/2 border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-orange-400" />
                <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
                  Inference Engine
                </span>
              </div>
              <p className="text-sm font-medium">YOLOv8-Small (TFLite)</p>
            </div>
            <div className="bg-white/2 border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
                  Latency
                </span>
              </div>
              <p className="text-sm font-medium">142ms (Offline)</p>
            </div>
            <div className="bg-white/2 border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
                  Model Version
                </span>
              </div>
              <p className="text-sm font-medium">Goa-Crops-v4.2</p>
            </div>
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="space-y-6">
          <div className="bg-white/2 border border-white/5 rounded-3xl p-6 min-h-120 flex flex-col">
            <h3 className="text-xl font-heading italic mb-6">
              Diagnostic Results
            </h3>

            {!isScanning && !scanResult && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white/20" />
                </div>
                <p className="text-sm text-white/40 leading-relaxed italic">
                  Run a scan or upload an image to view detailed disease
                  analysis and treatment protocols.
                </p>
              </div>
            )}

            {isScanning && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-green-500/20 animate-ping absolute inset-0" />
                  <div className="w-20 h-20 rounded-full border-2 border-green-500 flex items-center justify-center bg-green-500/10">
                    <Activity className="w-8 h-8 text-green-400 animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-lg font-heading italic">
                    Analyzing Tissue...
                  </p>
                  <p className="text-xs text-white/40 px-8 italic">
                    Comparing against 42 known Goan paddy pathogens.
                  </p>
                </div>
              </div>
            )}

            {scanResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                      Diagnosis
                    </span>
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  </div>
                  <h4 className="text-lg font-medium">{scanResult.disease}</h4>
                  <div className="flex gap-4 mt-2">
                    <span className="text-xs text-white/40">
                      Confidence:{" "}
                      <span className="text-green-400 font-bold">
                        {scanResult.confidence}%
                      </span>
                    </span>
                    <span className="text-xs text-white/40">
                      Severity:{" "}
                      <span className="text-orange-400 font-bold">
                        {scanResult.severity}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                      Recommended Action
                    </span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed italic border-l-2 border-green-500/30 pl-4 py-1">
                    {scanResult.recommendation}
                  </p>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-sm font-medium mt-8 group border-none cursor-pointer text-white">
                  Add to PMFBY Evidence Log
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
