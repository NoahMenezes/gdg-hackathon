"use client";

import { useState } from "react";
import {
  Droplets,
  Wind,
  Sun,
  Thermometer,
  CloudRain,
  Activity,
  Zap,
  Calendar,
  AlertTriangle,
  Play,
  Pause,
  Clock,
  Settings2,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SmartIrrigation() {
  const [isIrrigating, setIsIrrigating] = useState(false);
  const [activeZone, setActiveZone] = useState(1);

  const stats = [
    { label: "Soil Moisture", value: "24%", icon: Droplets, color: "text-blue-400", status: "Low" },
    { label: "Ambient Temp", value: "32°C", icon: Thermometer, color: "text-orange-400", status: "High" },
    { label: "Wind Speed", value: "12 km/h", icon: Wind, color: "text-slate-400", status: "Steady" },
    { label: "Solar Rad", value: "840 W/m²", icon: Sun, color: "text-yellow-400", status: "Peak" },
  ];

  const zones = [
    { id: 1, name: "Paddy Field A", crop: "Jyoti Rice", moisture: 22, status: "Critical" },
    { id: 2, name: "Cashew Grove", crop: "Vengurla-4", moisture: 45, status: "Optimal" },
    { id: 3, name: "Vegetable Plot", crop: "Chilli/Okra", moisture: 38, status: "Warning" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading italic tracking-tight">Smart IoT Irrigation</h2>
          <p className="text-white/40 font-light mt-1">LSTM-driven predictive watering based on fused sensor telemetry.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 text-xs font-bold uppercase tracking-wider">
            <CloudRain className="w-4 h-4" />
            Rain Expected: 2h
          </div>
        </div>
      </div>

      {/* SENSOR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/2 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                stat.status === 'Low' || stat.status === 'High' ? 'border-orange-500/30 text-orange-400 bg-orange-500/5' : 'border-green-500/30 text-green-400 bg-green-500/5'
              }`}>
                {stat.status}
              </span>
            </div>
            <div className="text-3xl font-heading italic mb-1">{stat.value}</div>
            <div className="text-xs text-white/40 font-medium uppercase tracking-widest">{stat.label}</div>
            <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20 transition-all group-hover:opacity-100" style={{ width: '40%', color: 'inherit' }} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CONTROL CENTER */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/2 border border-white/5 rounded-3xl p-8 relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-heading italic">Active Schedule: Zone {activeZone}</h3>
              <button className="p-2 hover:bg-white/5 rounded-lg text-white/40">
                <Settings2 className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center py-12 space-y-8 relative">
              <div className="relative">
                <AnimatePresence>
                  {isIrrigating && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute -inset-8 rounded-full border border-blue-500/30 animate-ping"
                    />
                  )}
                </AnimatePresence>
                <div className={`w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-700 ${isIrrigating ? 'border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.3)] bg-blue-500/5' : 'border-white/10 bg-white/2'}`}>
                  <div className="text-center">
                    <Droplets className={`w-12 h-12 mx-auto mb-2 transition-colors ${isIrrigating ? 'text-blue-400' : 'text-white/20'}`} />
                    <span className="text-2xl font-heading italic">{isIrrigating ? "ON" : "OFF"}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsIrrigating(!isIrrigating)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-heading italic text-xl transition-all ${
                    isIrrigating
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
                      : 'bg-blue-500 text-black hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(59,130,246,0.4)]'
                  }`}
                >
                  {isIrrigating ? (
                    <>
                      <Pause className="w-6 h-6 fill-current" />
                      Abort Cycle
                    </>
                  ) : (
                    <>
                      <Play className="w-6 h-6 fill-current" />
                      Force Irrigation
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-[10px] text-white/30 uppercase font-bold block mb-1">Flow Rate</span>
                <span className="text-lg font-heading italic">{isIrrigating ? "12.4 L/m" : "0.0 L/m"}</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-[10px] text-white/30 uppercase font-bold block mb-1">Water Pressure</span>
                <span className="text-lg font-heading italic">2.4 Bar</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-[10px] text-white/30 uppercase font-bold block mb-1">Estimated End</span>
                <span className="text-lg font-heading italic">18:45</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-[10px] text-white/30 uppercase font-bold block mb-1">Total Used</span>
                <span className="text-lg font-heading italic">142 L</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-6 flex items-start gap-4">
            <Zap className="w-6 h-6 text-blue-400 shrink-0" />
            <div>
              <h4 className="font-heading italic text-blue-400 mb-1">AI Recommendation (LSTM Fusion)</h4>
              <p className="text-sm text-white/60 leading-relaxed italic">
                Incoming high-evapotranspiration window detected for tomorrow 11:00 AM. Pre-watering suggested for Paddy Zone A at 4:00 AM to optimize soil moisture retention. Rain forecast at 6:00 PM suggests bypassing the evening cycle.
              </p>
            </div>
          </div>
        </div>

        {/* ZONE LIST */}
        <div className="space-y-6">
          <div className="bg-white/2 border border-white/5 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-heading italic">Field Zones</h3>
              <span className="text-[10px] text-white/40 uppercase font-bold">3 Active</span>
            </div>
            <div className="space-y-3">
              {zones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveZone(zone.id)}
                  className={`w-full p-4 rounded-2xl border transition-all text-left group ${
                    activeZone === zone.id
                      ? 'bg-blue-500/10 border-blue-500/30'
                      : 'bg-white/2 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium">{zone.name}</span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      zone.status === 'Critical' ? 'bg-red-500 text-white' :
                      zone.status === 'Warning' ? 'bg-orange-500 text-white' :
                      'bg-green-500 text-black'
                    }`}>
                      {zone.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-white/40 italic">{zone.crop}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${zone.moisture < 30 ? 'bg-orange-500' : 'bg-blue-500'}`}
                          style={{ width: `${zone.moisture}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold">{zone.moisture}%</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/2 border border-white/5 rounded-3xl p-6">
            <h3 className="text-xl font-heading italic mb-4">LoRaWAN Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-white/60">Gateway Status</span>
                </div>
                <span className="text-xs font-bold text-green-400">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-white/30" />
                  <span className="text-xs text-white/60">Last Data Sync</span>
                  </div>
                <span className="text-xs font-bold text-white/40">4m ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  <span className="text-xs text-white/60">Valve Maintenance</span>
                </div>
                <span className="text-xs font-bold text-orange-400">Required</span>
              </div>
            </div>
            <button className="w-full mt-6 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-sm font-medium">
              Network Diagnostic
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
