import type { Metadata } from "next";
import Script from "next/script";
import LenisProvider from "@/lib/LenisProvider";
import PageLoader from "@/components/landing/ui/layout/PageLoader";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <>
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
              "Página Oficial de Faustino Oro, el joven prodigio del ajedrez mundial. Conoce su biografía y mantente informado de sus proximos torneos, estadisticas, partidas destacadas y logros en el mundo del ajedrez profesional.",
            url: "https://www.orofaustino.com",
            image: "https://www.orofaustino.com/img28.webp",
            sameAs: [
              "https://www.instagram.com/faustioro",
              "https://www.facebook.com/orofaustino",
              "https://www.chess.com/member/faustinooro",
            ],
            nationality: "Argentina",
            birthDate: "2013-10-14",
            knowsAbout: ["Ajedrez", "Torneos internacionales", "Estrategias de ajedrez"],
            award: "Faustino Oro, joven prodigio del ajedrez",
          }),
        }}
      />
      <NextIntlClientProvider messages={messages}>
        <PageLoader />
        <LenisProvider>
          <main className="font-satoshi overflow-hidden bg-zinc-800">
            {children}
          </main>
        </LenisProvider>
      </NextIntlClientProvider>
    </>
  );
}