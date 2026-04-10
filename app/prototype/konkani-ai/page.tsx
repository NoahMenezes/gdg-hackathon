"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  Languages,
  MessageSquare,
  Search,
  History,
  Sparkles,
  ChevronRight,
  Database,
  Info,
  PlayCircle,
  PauseCircle,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function KonkaniVoiceAI() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState<null | {
    text: string;
    translation: string;
    source: string;
  }>(null);

  const startRecording = () => {
    setIsRecording(true);
    setResponse(null);
    setTranscript("");

    // Simulate recording duration
    setTimeout(() => {
      setIsRecording(false);
      setIsProcessing(true);
      setTranscript("Bhatantlea kiddiyecher upai sanga?");

      // Simulate RAG + Whisper processing
      setTimeout(() => {
        setIsProcessing(false);
        setResponse({
          text: "Bhatantlea kiddiyecher (Stem Borer) niyontronn korunk, Chlorantraniliprole 0.4% GR vaprat. Proti ekorak 4 kg vaprat ani xetant udok sambhallat.",
          translation: "To control Stem Borer in paddy, use Chlorantraniliprole 0.4% GR. Apply 4kg per acre and maintain field water levels.",
          source: "ICAR Goa Agriculture Handbook (2023)"
        });
      }, 2500);
    }, 3000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading italic tracking-tight">Konkani Voice AI</h2>
          <p className="text-white/40 font-light mt-1">Whisper-tuned RAG assistant for low-literacy farmers in Goa.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-3 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl">
            <Languages className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-purple-300">Konkani (Devanagari/Roman)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* INTERACTION HUB */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          <div className="flex-1 bg-white/2 border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center min-h-120 relative overflow-hidden">
            {/* Background Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] transition-all duration-1000 ${isRecording ? 'bg-red-500/20' : isProcessing ? 'bg-purple-500/20' : 'bg-green-500/5'}`} />

            <div className="relative z-10 w-full max-w-lg space-y-12 flex flex-col items-center">
              {/* Voice Waves Visualization */}
              <div className="flex items-center justify-center gap-1.5 h-16">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isRecording ? [10, 40, 15, 60, 20][i % 5] : 4,
                      opacity: isRecording ? 1 : 0.2
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.6,
                      delay: i * 0.05
                    }}
                    className="w-1.5 bg-purple-400 rounded-full"
                  />
                ))}
              </div>

              {/* Action Button */}
              <div className="text-center space-y-6">
                <button
                  onClick={startRecording}
                  disabled={isRecording || isProcessing}
                  className={`relative group w-32 h-32 rounded-full flex items-center justify-center transition-all ${
                    isRecording
                      ? 'bg-red-500 shadow-[0_0_50px_rgba(239,68,68,0.4)]'
                      : isProcessing
                        ? 'bg-purple-500/20 cursor-wait'
                        : 'bg-purple-500 hover:scale-105 shadow-[0_0_30px_rgba(168,85,247,0.4)]'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isRecording ? (
                      <motion.div key="off" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <MicOff className="w-10 h-10 text-white" />
                      </motion.div>
                    ) : (
                      <motion.div key="on" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Mic className="w-10 h-10 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isRecording && (
                    <motion.div
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-red-500"
                    />
                  )}
                </button>
                <div className="space-y-2">
                  <p className="text-xl font-heading italic">
                    {isRecording ? "Listening..." : isProcessing ? "Thinking in Konkani..." : "Tap to Speak"}
                  </p>
                  <p className="text-sm text-white/40 italic">
                    {isRecording ? "Ask about crops, pests, or subsidies" : isProcessing ? "Querying Vector Database" : "Amcho AI, Tumchea Sevekh"}
                  </p>
                </div>
              </div>

              {/* Real-time Transcription Mock */}
              <AnimatePresence>
                {(transcript || isRecording) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="w-full bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center italic text-white/80"
                  >
                    "{transcript || "..."}"
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/2 border border-white/5 p-5 rounded-2xl flex items-start gap-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Database className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest block mb-1">Knowledge Base</span>
                <p className="text-sm font-medium">12.4k Goan Agri Documents</p>
              </div>
            </div>
            <div className="bg-white/2 border border-white/5 p-5 rounded-2xl flex items-start gap-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest block mb-1">Response Style</span>
                <p className="text-sm font-medium">Farmer-centric & Dialect-aware</p>
              </div>
            </div>
          </div>
        </div>

        {/* RESPONSE & HISTORY */}
        <div className="space-y-6">
          <div className="bg-white/2 border border-white/5 rounded-3xl p-6 min-h-120 flex flex-col">
            <h3 className="text-xl font-heading italic mb-6">Expert Response</h3>

            <AnimatePresence mode="wait">
              {response ? (
                <motion.div
                  key="response"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-purple-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Audio Output</span>
                    </div>
                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl relative group">
                      <PlayCircle className="w-12 h-12 text-purple-400 mx-auto cursor-pointer hover:scale-110 transition-transform" />
                      <p className="text-sm text-white/80 mt-4 font-medium text-center">{response.text}</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <Languages className="w-4 h-4 text-white/40" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Translation (English)</span>
                    </div>
                    <p className="text-sm text-white/50 italic leading-relaxed pl-4 border-l border-white/10">
                      {response.translation}
                    </p>
                  </div>

                  <div className="bg-white/5 p-3 rounded-xl flex items-center gap-3 mt-8">
                    <Info className="w-4 h-4 text-blue-400" />
                    <span className="text-[10px] text-white/40">Source: {response.source}</span>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-xs font-medium">
                    Send to Whatsapp
                    <Send className="w-3 h-3" />
                  </button>
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4 opacity-40">
                  <MessageSquare className="w-12 h-12" />
                  <p className="text-sm italic">
                    Start a conversation by asking a question in Konkani.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-white/2 border border-white/5 rounded-3xl p-6">
            <h3 className="text-sm font-heading italic text-white/60 mb-4">Recent Inquiries</h3>
            <div className="space-y-3">
              {[
                "PMFBY claims for North Goa",
                "Cashew nut shell liquid extraction",
                "Watering schedule for Okra"
              ].map((q, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl text-xs hover:bg-white/10 cursor-pointer group transition-all">
                  <span className="text-white/60 line-clamp-1">{q}</span>
                  <ChevronRight className="w-3 h-3 text-white/20 group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
