"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Globe,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Calendar,
  Filter,
  Layers,
  Map as MapIcon,
  ChevronRight,
  Info
} from "lucide-react";
import { motion } from "framer-motion";

export default function MarketIntelligence() {
  const [selectedCrop, setSelectedCrop] = useState("Cashew");

  const priceIndices = [
    { crop: "Cashew (W320)", price: "₹740/kg", change: "+12.4%", trend: "up", volume: "4.2 Tons" },
    { crop: "Jyoti Rice", price: "₹42/kg", change: "-2.1%", trend: "down", volume: "128 Tons" },
    { crop: "Goan Chili", price: "₹180/kg", change: "+5.2%", trend: "up", volume: "0.8 Tons" },
    { crop: "Coconut (Dry)", price: "₹32/pc", change: "+0.8%", trend: "up", volume: "15k Units" },
  ];

  const demandForecast = [
    { month: "Nov", demand: 85, supply: 92 },
    { month: "Dec", demand: 110, supply: 88 },
    { month: "Jan", demand: 140, supply: 75 },
    { month: "Feb", demand: 160, supply: 70 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading italic tracking-tight">Market Intelligence</h2>
          <p className="text-white/40 font-light mt-1">Real-time price discovery and demand forecasting for Goan agricultural commodities.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Global APMC Feed</span>
          </div>
        </div>
      </div>

      {/* PRICE TICKER */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {priceIndices.map((item, i) => (
          <div key={i} className="bg-white/2 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-white/80">{item.crop}</span>
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                item.trend === 'up' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {item.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {item.change}
              </div>
            </div>
            <div className="text-3xl font-heading italic mb-1">{item.price}</div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[10px] uppercase text-white/30 tracking-widest font-bold">Daily Volume</span>
              <span className="text-xs font-mono text-white/60">{item.volume}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CHART & ANALYSIS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/2 border border-white/5 rounded-3xl p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h3 className="text-xl font-heading italic">Price Trajectory: {selectedCrop}</h3>
                <p className="text-xs text-white/40 mt-1 italic font-light">Projected vs Historical (Last 6 Months)</p>
              </div>
              <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                {["Cashew", "Rice", "Chili"].map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setSelectedCrop(crop)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedCrop === crop ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/60'
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* MOCK CHART VISUALIZATION */}
            <div className="h-64 flex items-end justify-between gap-4 pt-8">
              {demandForecast.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <div className="w-full flex justify-center items-end gap-1 h-full">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${d.supply}%` }}
                      className="w-4 bg-blue-500/40 rounded-t-sm group-hover:bg-blue-500/60 transition-all"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${d.demand}%` }}
                      className="w-4 bg-green-500/40 rounded-t-sm group-hover:bg-green-500/60 transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                    />
                  </div>
                  <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{d.month}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-6 mt-8 pt-8 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500/40 rounded-sm" />
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Supply</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500/40 rounded-sm" />
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Demand</span>
              </div>
              <div className="ml-auto flex items-center gap-2 text-orange-400 bg-orange-500/5 px-3 py-1 rounded-full border border-orange-500/20">
                <TrendingUp className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase">Arbitrage Opportunity: +₹45/kg</span>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-r from-blue-500/10 to-transparent border border-blue-500/20 rounded-3xl p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/20 rounded-2xl">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-xl font-heading italic text-blue-300">Predictive Market Sentiment</h3>
                  <p className="text-sm text-white/60 leading-relaxed italic">
                    AI analysis of regional rainfall deficits and global cashew production spikes suggests a price peak in late December. Recommended hold for Grade W320 stocks for an additional 15% margin.
                  </p>
                </div>
                <div className="flex gap-4">
                  <button className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1 group">
                    Download Full Market Report
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT TRADES & OPPORTUNITIES */}
        <div className="space-y-6">
          <div className="bg-white/2 border border-white/5 rounded-3xl p-6 h-full flex flex-col">
            <h3 className="text-xl font-heading italic mb-6">B2B Trade Leads</h3>
            <div className="space-y-4 flex-1">
              {[
                { buyer: "Goa Co-op Marketing", quantity: "2.5 Tons", commodity: "Cashew", price: "₹745", type: "Buy" },
                { buyer: "Bambolim Wholesale", quantity: "1.2 Tons", commodity: "Rice", price: "₹44", type: "Buy" },
                { buyer: "Panjim Spices Ltd", quantity: "500 Kg", commodity: "Chili", price: "₹185", type: "Buy" },
                { buyer: "Margao Agro Hub", quantity: "800 Units", commodity: "Coconut", price: "₹34", type: "Buy" },
              ].map((trade, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{trade.buyer}</span>
                      <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">{trade.commodity}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full border border-green-500/20 font-bold">
                      {trade.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-white/60">{trade.quantity} @ {trade.price}</span>
                    <button className="p-1.5 bg-white/5 rounded-lg text-white/20 group-hover:text-white transition-colors">
                      <ShoppingCart className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 rounded-2xl p-4 mt-8 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-white/40" />
                <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Trade Alerts</span>
              </div>
              <p className="text-[10px] text-white/60 leading-relaxed italic">
                New buyer registered from Karnataka seeking 5 Tons of Cashew (raw). Verify certification before bidding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
