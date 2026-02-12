import { Metadata } from "next";
import NavbarLanding from "@/components/landing/ui/NavbarLanding";
import Home from "@/components/landing/Home";
import About from "@/components/landing/About";
import LandingClient from "@/components/landing/LandingClient";

export const metadata: Metadata = {
  title: "Faustino Oro",
  description:
    "Conoce a Faustino Oro, el jugador más joven en alcanzar 2500 de ELO FIDE. Campeón Argentino, Panamericano y número uno del mundo en su categoría.",
  keywords: [
    "Faustino Oro",
    "ajedrez",
    "prodigio",
    "gran maestro",
    "torneos",
    "campeón",
  ],
};

export default function HomePage() {
  return (
    <section className="bg-zinc-800 text-balance overflow-hidden">
      <NavbarLanding />
      <Home />
      <About />
      <LandingClient />
    </section>
  );
}