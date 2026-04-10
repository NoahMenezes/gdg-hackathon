"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { BlurText } from "@/components/BlurText";
import { HLSVideo } from "@/components/HLSVideo";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

// --- FAQ Component Adapters --- //
const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={`liquid-glass rounded-2xl mb-4 overflow-hidden border border-white/5 ${className || ""}`}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={`flex flex-1 items-center justify-between py-6 px-6 md:px-8 font-heading italic text-white text-xl md:text-2xl transition-all [&[data-state=open]>svg]:rotate-180 hover:bg-white/5 ${className || ""}`}
      {...props}
    >
      {children}
      <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 text-white/50" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={`overflow-hidden text-sm data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 border-t border-white/5 ${className || ""}`}
    {...props}
  >
    <div className="pb-6 pt-2 px-6 md:px-8 text-white/60 font-body font-light leading-relaxed">
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// --- DATA --- //
const TIMELINE_STEPS = [
  {
    num: "01",
    name: "Discovery Call",
    phase: "Onboarding",
    dur: "~20 min",
    desc: "A focused 20-min call where we learn your operation size, crop mix, existing machinery, and this season's goals.",
  },
  {
    num: "02",
    name: "Field Boundary Upload",
    phase: "Onboarding",
    dur: "~15 min",
    desc: "Upload your field boundaries via our web portal or connect directly to John Deere Operations Center. Our AI validates and segments immediately.",
  },
  {
    num: "03",
    name: "Historical Data Ingestion",
    phase: "Analysis",
    dur: "~2 hours (automated)",
    desc: "We pull 5 years of satellite imagery, regional weather records, and public yield data for your geography. All automated.",
  },
  {
    num: "04",
    name: "Soil Baseline Modeling",
    phase: "Analysis",
    dur: "~4 hours",
    desc: "Without a single soil probe, our AI builds a baseline nutrient and pH model from spectral data and regional soil surveys.",
  },
  {
    num: "05",
    name: "Risk Assessment Report",
    phase: "Planning",
    dur: "~3 hours",
    desc: "Pest pressure, drought probability, flood risk, frost windows. Your risk landscape for the season, quantified.",
  },
  {
    num: "06",
    name: "Season Crop Plan",
    phase: "Planning",
    dur: "~1 day",
    desc: "Planting dates, variety recommendations, input rates, irrigation schedule — all generated and delivered for your review.",
  },
  {
    num: "07",
    name: "Plan Review & Agronomist Sign-Off",
    phase: "Planning",
    dur: "~45 min call",
    desc: "One of our certified agronomists reviews the AI plan with you on a video call. Adjustments made same day.",
  },
  {
    num: "08",
    name: "Machinery Integration",
    phase: "Deployment",
    dur: "~1 day",
    desc: "We connect FieldMind to your ISOBUS-compatible equipment and generate variable-rate application files ready to load.",
  },
  {
    num: "09",
    name: "Live Dashboard Activation",
    phase: "Deployment",
    dur: "~2 hours",
    desc: "Your real-time field intelligence dashboard goes live — satellite passes, weather feeds, soil moisture, and alerts all connected.",
  },
  {
    num: "10",
    name: "In-Season Monitoring",
    phase: "In-Season",
    dur: "Continuous",
    desc: "Weekly satellite analysis, daily weather-adjusted irrigation commands, and real-time pest/disease alerts throughout the season.",
  },
  {
    num: "11",
    name: "Harvest Logistics Optimization",
    phase: "In-Season",
    dur: "~2 weeks pre-harvest",
    desc: "As harvest approaches, FieldMind models optimal harvest windows, combines yield map predictions with logistics routing.",
  },
  {
    num: "12",
    name: "Post-Harvest Debrief & Next Season Plan",
    phase: "Post-Harvest",
    dur: "Within 48 hours of harvest completion",
    desc: "Full season ROI report, yield variance analysis, soil health update, and a first draft of next season's plan. Automatically.",
  },
];

const FAQS = [
  {
    q: "How accurate are your yield predictions without soil samples?",
    a: "Our AI relies on 50M+ acres of correlated spectral baseline data, regional soil surveys, and real-time moisture modeling. It achieves a 94% average accuracy, heavily reducing the reliance on physical soil testing.",
  },
  {
    q: "What field data do I need to get started?",
    a: "To get started, we only require your field boundaries. We handle drawing historical data autonomously. You can optionally upload past yield histories and machinery configuration data.",
  },
  {
    q: "Does FieldMind work with my existing machinery?",
    a: "Yes. FieldMind integrates tightly via ISOBUS connectivity and direct APIs into modern equipment including John Deere Operations Center, effectively bridging AI intelligence directly to the tractor cab.",
  },
  {
    q: "What happens if I get an alert mid-season?",
    a: "You will receive an immediate SMS and app push notification with recommended remediation (e.g., targeted fungicide spray). Our platform pinpoints exactly where the problem area is for localized treatment.",
  },
  {
    q: "Can I use FieldMind for multiple farms or operations?",
    a: "Absolutely. FieldMind is designed specifically for scalability. Cooperative managers and large-scale operations track numerous distinct boundaries through unified dashboards.",
  },
  {
    q: "Is my farm data private and secure?",
    a: "Completely. Your farm data is sandboxed securely. We never sell your localized precision data and utilize highest level AWS AgTech encryption infrastructure.",
  },
  {
    q: "What satellite data sources do you use and how fresh is it?",
    a: "We leverage a constellation including Sentinel-2 and Planet Labs. Revisit rates operate from weekly updates natively to daily targeted tasking for Enterprise deployments.",
  },
  {
    q: "Do I need agronomists on-staff to use FieldMind?",
    a: "No. Our intelligence layer provides highly actionable, clear intelligence directly to the operator. For Pro and Enterprise users, our certified agronomists act as your dedicated consulting branch.",
  },
];

function TimelineStep({
  step,
  index,
}: {
  step: (typeof TIMELINE_STEPS)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  const phaseColors: Record<string, string> = {
    Onboarding: "bg-blue-500/20 text-blue-300",
    Analysis: "bg-purple-500/20 text-purple-300",
    Planning: "bg-orange-500/20 text-orange-300",
    Deployment: "bg-green-500/20 text-green-300",
    "In-Season": "bg-yellow-500/20 text-yellow-300",
    "Post-Harvest": "bg-slate-500/20 text-slate-300",
  };

  return (
    <div ref={ref} className="relative flex gap-8 md:gap-12 w-full max-w-4xl">
      {/* Node & Line */}
      <div className="relative flex flex-col items-center">
        <div
          className={`w-4 h-4 rounded-full border-4 border-black z-10 transition-colors duration-700 ${isInView ? "bg-white" : "bg-white/20"}`}
        />
        {index < 11 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-px h-full absolute top-4 bg-linear-to-b from-white to-white/20 origin-top"
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pb-24 flex-1"
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="font-heading italic text-5xl text-white/20 mr-2">
            {step.num}
          </span>
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider ${phaseColors[step.phase]}`}
          >
            {step.phase}
          </span>
          <span className="text-xs text-white/40 font-light border border-white/10 rounded-full px-2 py-0.5">
            {step.dur}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-heading italic text-white mb-4 leading-tight">
          {step.name}
        </h3>
        <p className="text-white/60 font-light leading-relaxed max-w-xl text-sm md:text-base">
          {step.desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function HowItWorksPage() {
  useEffect(() => {
    const originalWarn = console.warn;
    const originalLog = console.log;

    console.warn = function (...args) {
      if (
        typeof args[0] === "string" &&
        (args[0].includes("Clerk has been loaded with development keys") ||
          args[0].includes("[browser] Clerk:") ||
          args[0].includes("The class"))
      )
        return;
      originalWarn.apply(console, args);
    };

    console.log = function (...args) {
      if (typeof args[0] === "string" && args[0].includes("[browser] Clerk:"))
        return;
      originalLog.apply(console, args);
    };
  }, []);

  const containerRef = useRef(null);

  return (
    <main
      ref={containerRef}
      className="bg-black text-white overflow-hidden font-body selection:bg-white/20 min-h-screen"
    >
      {/* SECTION 1 — SHARED NAVBAR */}
      <nav className="fixed top-4 w-full z-50 px-6 md:px-16 flex items-center justify-between max-w-350 left-1/2 -translate-x-1/2">
        <div className="flex-1 flex justify-start">
          <div className="shrink-0 relative w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
            <span className="font-heading italic text-2xl">F</span>
          </div>
        </div>
        <div className="hidden md:flex liquid-glass rounded-full px-8 py-3 items-center gap-8 shrink-0">
          {["Home", "Services", "Work", "Process"].map((link) => (
            <a
              key={link}
              href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
          <a
            href="/prototype"
            className="bg-white/10 hover:bg-white/20 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full transition-colors border border-white/10"
          >
            Prototype
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
                Start Free Trial <ArrowUpRight className="w-4 h-4" />
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </nav>

      {/* SECTION 2 — HERO */}
      <section className="relative overflow-visible h-175 bg-black">
        {/* Background HLS */}
        <div className="absolute inset-0 z-0 h-175 w-full">
          <HLSVideo
            src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
            className="w-full h-175 object-cover mix-blend-screen"
            style={{ filter: "saturate(0.2)" }}
          />
          <div className="absolute top-0 left-0 right-0 h-50 bg-linear-to-b from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-50 bg-linear-to-t from-black to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto pt-40">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-8">
            Our Process
          </span>
          <BlurText
            text="Hours, not seasons."
            className="text-7xl md:text-8xl lg:text-[7rem] font-heading italic text-white tracking-[-6px] leading-[0.9] mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl text-white/60 font-light max-w-2xl mb-12"
          >
            Most ag consultants take weeks to deliver a field report. We take 24
            hours. Here's exactly how — and why it works.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 w-full"
          >
            {["24 hrs first report", "12-step process", "0 missed alerts"].map(
              (pill) => (
                <span
                  key={pill}
                  className="liquid-glass-strong rounded-full px-5 py-2 text-sm font-medium text-white"
                >
                  {pill}
                </span>
              ),
            )}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — TIMELINE */}
      <section className="py-24 px-6 md:px-16 flex flex-col items-center">
        <div className="mb-24 text-center">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">
            The 12 Steps
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            Every farm. Every time.
          </h2>
        </div>

        <div className="w-full flex justify-center">
          <div className="flex flex-col">
            {TIMELINE_STEPS.map((step, i) => (
              <TimelineStep key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — PHASE OVERVIEW (Gantt) */}
      <section className="py-24 px-6 md:px-16 lg:px-24 border-y border-white/5 bg-white/2">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">
              At a Glance
            </span>
            <h2 className="text-4xl md:text-5xl font-heading italic text-white tracking-tight leading-[0.9] mb-4">
              From sign-up to harvest in one season.
            </h2>
            <p className="text-white/40 text-xs mt-6 italic">
              * Timeline shown for standard grain operation. Specialty crops and
              large-scale deployments may vary.
            </p>
          </div>

          <div className="w-full overflow-x-auto pb-8 hide-scrollbar">
            <div className="min-w-200 flex flex-col gap-4">
              {/* Timeline Header */}
              <div className="flex text-white/30 text-xs font-body uppercase tracking-widest font-medium border-b border-white/10 pb-4 mb-4">
                <div className="w-[10%]">Time</div>
                <div className="w-[90%] flex">
                  <div className="flex-1 text-left pl-4">Week 1</div>
                  <div className="flex-1 text-left pl-4">Week 2</div>
                  <div className="flex-2 text-left pl-4 border-x border-white/10 relative z-10">
                    Week 3–4
                  </div>
                  <div className="flex-3 text-center">Season-long</div>
                  <div className="flex-1 text-right pr-4">Post-harvest</div>
                </div>
              </div>

              {/* Tracks */}
              <div className="flex items-center text-sm">
                <div className="w-[10%] text-white/60 font-medium">Setup</div>
                <div className="w-[90%] relative h-10 liquid-glass rounded-full">
                  <div className="absolute left-0 top-0 bottom-0 w-[20%] liquid-glass-strong rounded-full border border-blue-500/20 flex items-center px-4">
                    <span className="text-blue-200 text-xs font-medium truncate">
                      Onboarding + Analysis
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-sm">
                <div className="w-[10%] text-white/60 font-medium">Review</div>
                <div className="w-[90%] relative h-10 liquid-glass rounded-full">
                  <div className="absolute left-[20%] top-0 bottom-0 w-[20%] liquid-glass-strong rounded-full border border-orange-500/20 flex items-center px-4">
                    <span className="text-orange-200 text-xs font-medium truncate">
                      Planning + Agronomist Review
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-sm">
                <div className="w-[10%] text-white/60 font-medium">
                  Integration
                </div>
                <div className="w-[90%] relative h-10 liquid-glass rounded-full">
                  <div className="absolute left-[40%] top-0 bottom-0 w-[20%] bg-white text-black rounded-full flex items-center px-4 z-10 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    <span className="text-black text-xs font-medium truncate">
                      Deployment + Integration
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-sm">
                <div className="w-[10%] text-white/60 font-medium">Growth</div>
                <div className="w-[90%] relative h-10 liquid-glass rounded-full">
                  <div className="absolute left-[60%] top-0 bottom-0 w-[30%] liquid-glass-strong rounded-full border border-yellow-500/20 flex items-center justify-center px-4">
                    <span className="text-yellow-200 text-xs font-medium truncate">
                      In-Season Monitoring
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-sm">
                <div className="w-[10%] text-white/60 font-medium">Yield</div>
                <div className="w-[90%] relative h-10 liquid-glass rounded-full">
                  <div className="absolute right-0 top-0 bottom-0 w-[10%] liquid-glass-strong rounded-full border border-slate-500/20 flex items-center px-4 justify-end">
                    <span className="text-slate-200 text-xs font-medium truncate">
                      Debrief + Next Season Plan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FAQ */}
      <section className="py-24 px-6 md:px-16 lg:px-24 max-w-4xl mx-auto w-full">
        <div className="mb-16 text-center md:text-left border-b border-white/5 pb-8 flex flex-col md:flex-row items-baseline justify-between">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            Answered before you ask.
          </h2>
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white mt-4 md:mt-0 md:ml-6 inline-block shrink-0">
            Questions
          </span>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* SECTION 6 — TESTIMONIAL */}
      <section className="py-32 px-6 w-full flex justify-center border-t border-white/5 bg-linear-to-b from-black to-white/2">
        <div className="max-w-4xl text-center relative">
          <span className="absolute -top-16 -left-8 md:-left-16 text-[12rem] font-heading italic text-white/5 leading-none select-none pointer-events-none">
            "
          </span>
          <p className="text-2xl md:text-4xl font-heading italic text-white leading-tight mb-12 relative z-10">
            I've used three precision ag platforms over the past decade.
            FieldMind is the first one that actually saved my harvest — not just
            tracked it. The early disease alert on our south block in August
            gave us a 12-day treatment window. We'd have lost $400k without it.
          </p>
          <div className="flex flex-col items-center gap-1">
            <span className="font-medium text-white text-lg">Tom Dekker</span>
            <span className="text-white/40 text-sm">
              Owner-Operator, Dekker Family Farms
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 7 — CTA FOOTER */}
      <footer className="relative w-full overflow-hidden pt-32 pb-8 px-6 flex flex-col border-t border-white/5">
        <div className="absolute inset-0 z-0 h-full w-full">
          <HLSVideo
            src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 h-50 bg-linear-to-b from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-50 bg-linear-to-t from-black to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto flex-1 justify-center min-h-100">
          <h2 className="text-6xl md:text-8xl font-heading italic text-white tracking-[-4px] leading-[0.85] mb-6">
            Your next harvest starts here.
          </h2>
          <p className="text-lg text-white/60 font-light mb-10 max-w-lg">
            Book a free field assessment. See what AI-powered precision
            agriculture can do for your land.
          </p>
          <div className="flex items-center gap-4">
            <button className="liquid-glass-strong rounded-full px-8 py-4 text-base font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
              Book Field Assessment <ArrowUpRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-light tracking-wide">
            © 2026 FieldMind AI. All rights reserved.
          </p>
          <p className="hidden md:block text-white/20 text-xs font-body italic tracking-widest uppercase">
            Grow smarter. Farm forever.
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
