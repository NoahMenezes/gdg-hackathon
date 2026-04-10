import type { Metadata } from "next";
import { Instrument_Serif, Barlow } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const instrument = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-heading",
});

const barlow = Barlow({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "FieldMind AI — Precision Agriculture Platform",
  description: "AI-powered field intelligence. Satellite mapping, yield prediction, smart irrigation, and pest detection — all in one platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${barlow.variable} antialiased`}
    >
      <body className="min-h-screen bg-black text-white flex flex-col">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
