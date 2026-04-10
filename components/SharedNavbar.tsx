"use client";

import { ArrowUpRight } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";
import Link from "next/link";

export default function SharedNavbar() {
  return (
    <nav className="fixed top-4 w-full z-50 px-6 md:px-16 flex items-center justify-between max-w-350 left-1/2 -translate-x-1/2 pointer-events-none">
      <div className="flex-1 flex justify-start pointer-events-auto">
        <Link
          href="/"
          className="relative w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center liquid-glass group"
        >
          <span className="font-heading italic text-2xl group-hover:scale-110 transition-transform text-white">
            F
          </span>
        </Link>
      </div>

      <div className="hidden md:flex liquid-glass rounded-full px-8 py-3 items-center gap-8 shrink-0 border border-white/10 pointer-events-auto">
        {["Home", "Services", "Work", "Process"].map((link) => (
          <Link
            key={link}
            href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            {link}
          </Link>
        ))}
        <Link
          href="/prototype"
          className="bg-white/10 hover:bg-white/20 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full transition-colors border border-white/10"
        >
          Prototype
        </Link>
      </div>

      <div className="flex-1 flex justify-end items-center gap-4 pointer-events-auto">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="hidden md:block text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none">
              Log In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-white text-black rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2 hover:bg-white/90 transition-colors cursor-pointer border-none shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Get Started <ArrowUpRight className="w-4 h-4" />
            </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <div className="flex items-center gap-4">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox:
                    "w-10 h-10 border border-white/20 shadow-lg",
                },
              }}
            />
          </div>
        </Show>
      </div>

      <style jsx global>{`
        .liquid-glass {
          background: rgba(10, 10, 10, 0.4);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
      `}</style>
    </nav>
  );
}
