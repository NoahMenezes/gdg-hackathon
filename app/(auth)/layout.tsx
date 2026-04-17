"use client";

import { HLSVideo } from "@/components/HLSVideo";
import { BlurText } from "@/components/BlurText";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  const quote = isLogin
    ? "Carbon credits that are actually real. No more greenwashing."
    : "Join the verified carbon credit revolution. Your impact, on-chain.";

  return (
    <div className="min-h-screen bg-black flex overflow-hidden">
      {/* LEFT PANEL — Video */}
      <div className="hidden lg:flex w-1/2 relative">
        <div className="absolute inset-0 z-0">
          <HLSVideo
            src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.25)" }}
          />
          <div className="absolute top-0 left-0 right-0 h-[150px] bg-gradient-to-b from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-black to-transparent" />
        </div>
        <div className="absolute inset-0 bg-black/40 z-[1]" />

        <div className="absolute bottom-12 left-12 right-12 z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center">
              <span className="font-heading italic text-white text-lg">V</span>
            </div>
            <span className="font-heading italic text-white text-xl">
              VerdiChain
            </span>
          </div>

          <BlurText
            text={quote}
            className="text-4xl md:text-5xl font-heading italic text-white leading-[0.9] tracking-[-2px] mb-4"
            wordDelay={0.15}
          />
          <p className="text-white/40 text-xs font-body font-light mt-4">
            — VerdiChain
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            {[
              "★ 100% On-chain verifiable",
              "⚡ <24h first credit minted",
              "✓ 94% ML accuracy",
            ].map((pill) => (
              <span
                key={pill}
                className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-xs font-body text-white/70"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 bg-black flex items-center justify-center px-8 md:px-16 lg:px-20 relative min-h-screen">
        <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
          <span className="text-white/40 text-xs font-body font-light hidden md:block">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <a
            href={isLogin ? "/signup" : "/login"}
            className="liquid-glass rounded-full px-5 py-2 text-xs font-body font-medium text-white hover:bg-white/5 transition-colors"
          >
            {isLogin ? "Request Access" : "Log In"}
          </a>
        </div>

        <div className="max-w-sm w-full">{children}</div>
      </div>
    </div>
  );
}
