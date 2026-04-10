"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Sprout,
  Layers,
  Bell,
  Languages,
  Camera,
  Droplets,
  Mic,
  ShieldCheck,
  Database,
  TrendingUp,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SharedNavbar from "@/components/SharedNavbar";

export default function PrototypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const originalWarn = console.warn;
    const originalLog = console.log;
    console.warn = (...args) => {
      if (
        typeof args[0] === "string" &&
        (args[0].includes("Clerk") || args[0].includes("The class"))
      )
        return;
      originalWarn.apply(console, args);
    };
    console.log = (...args) => {
      if (typeof args[0] === "string" && args[0].includes("[browser] Clerk:"))
        return;
      originalLog.apply(console, args);
    };
  }, []);

  const menuItems = [
    {
      id: "dashboard",
      label: "District Intelligence",
      icon: LayoutDashboard,
      href: "/prototype",
    },
    {
      id: "diagnostics",
      label: "AI Crop Doctor",
      icon: Camera,
      href: "/prototype/diagnostics",
    },
    {
      id: "irrigation",
      label: "Smart IoT Watering",
      icon: Droplets,
      href: "/prototype/irrigation",
    },
    {
      id: "konkani-ai",
      label: "Konkani Voice AI",
      icon: Mic,
      href: "/prototype/konkani-ai",
    },
    {
      id: "pmfby",
      label: "PMFBY Insurance",
      icon: ShieldCheck,
      href: "/prototype/pmfby",
    },
    {
      id: "market",
      label: "Market Intelligence",
      icon: TrendingUp,
      href: "/prototype/market-intelligence",
    },
    {
      id: "logistics",
      label: "Supply Chain & Logistics",
      icon: Truck,
      href: "/prototype/logistics",
    },
    {
      id: "data-lake",
      label: "Federated Data Lake",
      icon: Database,
      href: "/prototype/data-lake",
    },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-white font-body overflow-hidden selection:bg-white/20">
      {/* SHARED TOP NAVBAR */}
      <SharedNavbar />

      {/* SIDEBAR */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="border-r border-white/5 bg-black flex flex-col z-20 mt-24"
      >
        <div className="p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            <Sprout className="text-black w-6 h-6" />
          </div>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <span className="font-heading italic text-xl tracking-tight leading-none">
                AgriGoa
              </span>
              <span className="text-[10px] text-green-500/60 font-medium uppercase tracking-widest mt-1">
                Precision AI
              </span>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative group ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 shrink-0 ${isActive ? "text-green-400" : ""}`}
                />
                {isSidebarOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-6 bg-green-500 rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5 bg-white/2">
          <div className="flex items-center gap-4 px-4 py-3">
            <UserButton />
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-xs font-medium">Extension Officer</span>
                <span className="text-[10px] text-green-400/60">
                  North Goa District
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col relative overflow-hidden mt-24">
        {/* TOP BAR */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/50 backdrop-blur-xl z-10">
          <div className="flex items-center gap-8 flex-1">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg text-white/40 transition-colors"
            >
              <Layers className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <Languages className="w-4 h-4 text-green-400" />
              <span className="text-xs font-medium text-white/60">
                Active Language:{" "}
                <span className="text-white">Konkani (Goa)</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">
                Network Status
              </span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium">
                  LoRaWAN Gateway Active
                </span>
              </div>
            </div>
            <button className="relative p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all group">
              <Bell className="w-5 h-5 text-white/60 group-hover:text-white" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-black" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
