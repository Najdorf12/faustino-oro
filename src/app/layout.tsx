import type { Metadata } from "next";
import { Ubuntu, Inter, Syncopate } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import LenisProvider from "@/lib/LenisProvider";
import PageLoader from "@/components/landing/ui/layout/PageLoader";

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
  metadataBase: new URL("https://www.orofaustino.com"),
  title: {
    default: "Faustino Oro - Página Oficial del Ajedrecista Argentino",
    template: "%s | Faustino Oro",
  },
  description:
    "Página Oficial de Faustino Oro, el joven prodigio del ajedrez argentino. Conoce su biografía, torneos, partidas destacadas y logros en el mundo del ajedrez profesional.",
  keywords: [
    "Faustino Oro",
    "niño prodigio ajedrez",
    "IM",
    "Maestro Internacional",
    "GM ajedrez argentino",
    "ranking FIDE",
    "torneos internacionales ajedrez",
    "partidas destacadas ajedrez",
    "maestro internacional",
    "El pibe de oro",
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
      "Página Oficial de Faustino Oro, el joven prodigio del ajedrez argentino. Conoce su biografía, torneos, partidas destacadas y logros.",
    siteName: "Faustino Oro",
    images: [
      {
        url: "/fausti.jpeg",
        width: 1200,
        height: 630,
        alt: "Faustino Oro, joven prodigio del ajedrez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faustino Oro - Página Oficial | Ajedrez Profesional",
    description:
      "Página Oficial de Faustino Oro, el joven prodigio del ajedrez argentino",
    images: ["/fausti.jpeg"],
  },
  alternates: {
    canonical: "https://www.orofaustino.com",
  },
  verification: {
    google: "yLmlttyx8GtuVp89gWQ1X0oVRhudOMEshoohKRjVeyU",
  },
  icons: {
    icon: "/iconNav.png",
  },
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* ✅ Boxicons en el head */}
        <link rel="preconnect" href="https://unpkg.com" />
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${ubuntu.variable} ${inter.variable} ${syncopate.variable} ${satoshi.variable} antialiased`}
      >
        {/* ✅ JSON-LD */}
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Faustino Oro",
              description:
                "Joven prodigio del ajedrez argentino, considerado uno de los talentos más prometedores del ajedrez mundial",
              url: "https://www.orofaustino.com",
              image: "https://www.orofaustino.com/fausti.jpeg",
              sameAs: [
                "https://www.instagram.com/faustioro",
                "https://www.facebook.com/orofaustino",
                "https://www.chess.com/member/faustinooro",
              ],
              nationality: "Argentina",
              birthDate: "2013-10-14",
              knowsAbout: [
                "Ajedrez",
                "Torneos internacionales",
                "Estrategias de ajedrez",
              ],
              award: "Gran Maestro de Ajedrez (GM)",
            }),
          }}
        />
        <PageLoader />
        <LenisProvider>
          <main className="font-satoshi overflow-hidden bg-zinc-800">
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}
