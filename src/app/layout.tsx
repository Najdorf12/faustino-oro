import type { Metadata } from "next";
import { Ubuntu, Inter, Syncopate } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import LenisProvider from "@/lib/LenisProvider";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const satoshi = localFont({
  src: [
    {
      path: "../assets/fonts/Satoshi/Satoshi.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi/Satoshi.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi/Satoshi.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi/Satoshi.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi/Satoshi.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Faustino Oro",
  description: "Official Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.variable} ${inter.variable} ${syncopate.variable} ${satoshi.variable} antialiased`}
      >
        <LenisProvider>
          <main className="font-satoshi overflow-hidden bg-zinc-800">
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}
