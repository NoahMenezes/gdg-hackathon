"use client";

import { useState } from "react";
import {
  Truck,
  Box,
  MapPin,
  Clock,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  Package,
  ArrowRight,
  Route,
  Activity,
  Thermometer,
  Layers,
  Search,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SupplyChainLogistics() {
  const [activeShipment, setActiveShipment] = useState("SHP-9042");

  const shipments = [
    {
      id: "SHP-9042",
      origin: "Ponda Cluster",
      destination: "Mormugao Port",
      commodity: "Grade W320 Cashew",
      status: "In Transit",
      eta: "14:30 (Today)",
      temp: "24°C",
      compliance: "98%",
      progress: 65
    },
    {
      id: "SHP-9045",
      origin: "Bicholim Hub",
      destination: "Panjim Market",
      commodity: "Organic Jyoti Rice",
      status: "Delayed",
      eta: "18:15 (Today)",
      temp: "22°C",
      compliance: "100%",
      progress: 30
    },
    {
      id: "SHP-9048",
      origin: "Quepem Unit",
      destination: "Verna Cold Storage",
      commodity: "Goan Chili Paste",
      status: "Loading",
      eta: "09:00 (Tomorrow)",
      temp: "4°C",
      compliance: "100%",
      progress: 5
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading italic tracking-tight">Supply Chain & Logistics</h2>
          <p className="text-white/40 font-light mt-1">Real-time farm-to-fork tracking and cold-chain compliance monitoring.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Blockchain Verified</span>
          </div>
        </div>
      </div>

      {/* FLEET METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Vehicles", value: "24", icon: Truck, color: "text-blue-400", sub: "842 km total today" },
          { label: "On-Time Rate", value: "94.2%", icon: Clock, color: "text-green-400", sub: "+2.1% improvement" },
          { label: "Temperature Alerts", value: "02", icon: AlertTriangle, color: "text-orange-400", sub: "Zone 4 Cold Storage" },
          { label: "Inventory Val.", value: "₹2.4 Cr", icon: Box, color: "text-purple-400", sub: "Across 12 hubs" },
        ].map((metric, i) => (
          <div key={i} className="bg-white/2 border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${metric.color}`}>
                <metric.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-heading italic mb-1">{metric.value}</div>
            <div className="text-xs text-white/40 font-medium uppercase tracking-widest mb-2">{metric.label}</div>
            <p className="text-[10px] text-white/20 italic">{metric.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SHIPMENT TRACKING MAP VIEW */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/2 border border-white/5 rounded-3xl overflow-hidden min-h-120 relative group">
             {/* Mock Map Background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale invert" />

            {/* Map Overlay UI */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40" />

            <div className="absolute top-6 left-6 right-6 flex justify-between">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                <Navigation className="w-5 h-5 text-blue-400" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-white/40 block">Tracking: {activeShipment}</span>
                  <span className="text-sm font-medium">Atal Setu Bridge, Goa</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl text-white/60 hover:text-white transition-all">
                  <Layers className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Simulated Logistics Route Nodes */}
            <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] border-2 border-white animate-pulse" />
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white/40 rounded-full" />
            <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-white/40 rounded-full" />

            <div className="absolute bottom-8 left-8 right-8">
               <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Truck className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-heading italic">In Transit: Mormugao Express</h3>
                        <p className="text-xs text-white/40">Driver: Rajesh N. | Vehicle: GA-01-S-4421</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-green-400">On Track</span>
                      <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-1">ETA 14:30</p>
                    </div>
                  </div>

                  <div className="relative h-2 bg-white/5 rounded-full overflow-hidden mb-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      className="absolute inset-y-0 left-0 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-3 h-3 text-orange-400" />
                      <span className="text-[10px] text-white/60">Temp: 24.2°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-3 h-3 text-green-400" />
                      <span className="text-[10px] text-white/60">Vibration: Normal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Route className="w-3 h-3 text-purple-400" />
                      <span className="text-[10px] text-white/60">Dist: 14.2 km</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-3 h-3 text-blue-400" />
                      <span className="text-[10px] text-white/60">Load: 2.4 Tons</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-linear-to-r from-green-500/10 to-transparent border border-green-500/20 rounded-3xl p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500/20 rounded-2xl">
                <ShieldCheck className="w-6 h-6 text-green-400" />
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-xl font-heading italic text-green-300">Smart Batch Verification</h3>
                  <p className="text-sm text-white/60 leading-relaxed italic">
                    IoT sensors have confirmed that Batch #GA-PON-22 maintained the mandatory &lt;25°C temperature throughout the 140km journey. QR-code ready for distribution center arrival.
                  </p>
                </div>
                <button className="text-xs font-bold text-green-400 hover:underline flex items-center gap-1 group">
                  Generate Compliance Certificate
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SHIPMENTS LIST */}
        <div className="space-y-6">
          <div className="bg-white/2 border border-white/5 rounded-3xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-heading italic">Active Batches</h3>
              <div className="p-2 bg-white/5 rounded-lg">
                <Search className="w-3 h-3 text-white/40" />
              </div>
            </div>
            <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1">
              {shipments.map((shp) => (
                <button
                  key={shp.id}
                  onClick={() => setActiveShipment(shp.id)}
                  className={`w-full p-4 rounded-2xl border transition-all text-left group ${
                    activeShipment === shp.id
                      ? 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                      : 'bg-white/2 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold font-mono text-white/80">{shp.id}</span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase ${
                      shp.status === 'Delayed' ? 'bg-red-500 text-white' :
                      shp.status === 'Loading' ? 'bg-white/10 text-white' :
                      'bg-green-500 text-black'
                    }`}>
                      {shp.status}
                    </span>
                  </div>
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-white/90 group-hover:text-white">{shp.commodity}</h4>
                    <p className="text-[10px] text-white/40 italic flex items-center gap-1 mt-1">
                      <MapPin className="w-2.5 h-2.5" /> {shp.origin} → {shp.destination}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-orange-400" />
                        <span className="text-[10px] text-white/40">{shp.temp}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        <span className="text-[10px] text-white/40">{shp.compliance}</span>
                      </div>
                    </div>
                    <ArrowRight className={`w-3 h-3 transition-transform ${activeShipment === shp.id ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-white/5 rounded-2xl p-4 mt-8 border border-white/10">
              <h4 className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-3">Supply Chain Health</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60">Carbon Footprint</span>
                  <span className="text-green-400 font-mono">-12% YOY</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60">Route Efficiency</span>
                  <span className="text-blue-400 font-mono">88.4%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60">Cold Storage Uptime</span>
                  <span className="text-green-400 font-mono">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
