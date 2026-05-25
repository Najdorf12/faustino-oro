import type { Metadata, Viewport } from "next";
import { Ubuntu } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const satoshi = localFont({
  src: [
    { path: "../assets/fonts/Satoshi/Satoshi.ttf", weight: "300", style: "normal" },
    { path: "../assets/fonts/Satoshi/Satoshi.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/Satoshi/Satoshi.ttf", weight: "500", style: "normal" },
    { path: "../assets/fonts/Satoshi/Satoshi.ttf", weight: "600", style: "normal" },
    { path: "../assets/fonts/Satoshi/Satoshi.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const lubidow = localFont({
  src: [
    { path: "../assets/fonts/lubidow-regular.ttf", weight: "300", style: "normal" },
    { path: "../assets/fonts/lubidow-regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/lubidow-regular.ttf", weight: "500", style: "normal" },
    { path: "../assets/fonts/lubidow-regular.ttf", weight: "600", style: "normal" },
    { path: "../assets/fonts/lubidow-regular.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-lubidow",
  display: "swap",
});

const superlarky = localFont({
  src: [
    { path: "../assets/fonts/SuperLarky.ttf", weight: "300", style: "normal" },
    { path: "../assets/fonts/SuperLarky.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/SuperLarky.ttf", weight: "500", style: "normal" },
    { path: "../assets/fonts/SuperLarky.ttf", weight: "600", style: "normal" },
    { path: "../assets/fonts/SuperLarky.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-superlarky",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.orofaustino.com"),
  title: {
    default: "Faustino Oro - Página Oficial del Ajedrecista Argentino",
    template: "%s | Faustino Oro",
  },
  description:
    "Página Oficial de Faustino Oro, el joven prodigio del ajedrez mundial. Conoce su biografía y mantente informado de sus proximos torneos, estadisticas, partidas destacadas y logros en el mundo del ajedrez profesional.",
  keywords: [
    "Faustino Oro", "niño prodigio ajedrez", "IM", "Maestro Internacional",
    "GM ajedrez argentino", "ranking FIDE", "torneos internacionales ajedrez",
    "partidas destacadas ajedrez", "maestro internacional", "El pibe de oro",
  ],
  authors: [{ name: "Faustino Oro" }],
  creator: "Faustino Oro",
  publisher: "Faustino Oro",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://www.orofaustino.com",
    title: "Faustino Oro - Página Oficial del Ajedrecista Argentino",
    description:
      "Página Oficial de Faustino Oro, el joven prodigio del ajedrez mundial. Conoce su biografía y mantente informado de sus proximos torneos, estadisticas, partidas destacadas y logros en el mundo del ajedrez profesional.",
    siteName: "Faustino Oro",
    images: [{ url: "/fausti.jpeg", width: 1200, height: 630, alt: "Faustino Oro, joven prodigio del ajedrez" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faustino Oro - Página Oficial | Ajedrez Profesional",
    description: "Página Oficial de Faustino Oro, el joven prodigio del ajedrez argentino",
    images: ["/fausti.jpeg"],
  },
  alternates: { canonical: "https://www.orofaustino.com" },
  verification: { google: "yLmlttyx8GtuVp89gWQ1X0oVRhudOMEshoohKRjVeyU" },
  icons: { icon: [{ url: "/logo3.png", type: "image/svg+xml" }] },
  other: { google: "notranslate" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://unpkg.com" />
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${ubuntu.variable} ${superlarky.variable} ${satoshi.variable} ${lubidow.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}