"use client";

import Image from "next/image";
import imgAbout from "@/assets/images/img9.webp";
import imgAbout2 from "@/assets/images/img1-10.jpeg";
import icon from "@/assets/images/icon5.svg";
import { useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef(null);
  const imgRef = useRef(null);

  const [view, setView] = useState("about");

  useGSAP(
    () => {
      gsap.fromTo(
        ".content",
        { autoAlpha: 0, x: 40 },
        { autoAlpha: 1, x: 0, duration: 1.1, ease: "power3.out" },
      );

      gsap.fromTo(
        imgRef.current,
        { autoAlpha: 0, x: -40, scale: 0.96 },
        { autoAlpha: 1, x: 0, scale: 1, duration: 1.1, ease: "power2.out" },
      );
    },
    { dependencies: [view], scope: container },
  );

  return (
    <section
      ref={container}
      id="about"
      className="w-full min-h-screen pt-22 flex flex-col lg:flex-row bg-zinc-800 relative lg:pt-0"
    >
      <div className="absolute z-100 left-4 top-6 w-9 md:left-auto md:right-12 md:w-10 lg:w-12">
        <Image src={icon} alt="icon" className="w-full"></Image>
      </div>

      <div className="w-full h-62 px-3 relative z-50 flex justify-center items-center lg:h-screen lg:w-1/2 ">
        <div className="absolute inset-0 z-20 bg-zinc-800/30"></div>
        <Image
          ref={imgRef}
          key={view}
          src={view === "about" ? imgAbout : imgAbout2}
          alt="about"
          className="image-about w-full h-full rounded-lg border-6 shadow-2xl shadow-sky-800 border-zinc-700 object-cover lg:rounded-full lg:w-[600px] lg:h-[600px] xl:w-[650px] xl:h-[650px] 2xl:w-[700px] 2xl:h-[700px] 3xl:w-[750px] 3xl:h-[750px]"
        />
      </div>

      <article className="content w-full flex flex-col pt-12 pb-14 justify-center gap-4 px-4 relative z-100 lg:py-0 lg:w-1/2 lg:h-screen">
        <div className="text-zinc-600 text-xl lg:text-2xl 2xl:text-3xl">
          SOBRE MI
        </div>

        {view === "about" && (
          <div className="text-balance">
            <h3 className="text-zinc-300 text-[1.45rem] sm:text-2xl md:text-4xl font-medium max-w-150 2xl:text-5xl 2xl:max-w-175">
              SOY FAUSTINO ORO. NACÍ EN BUENOS AIRES, ARGENTINA, EL 14 DE
              OCTUBRE DE 2013
            </h3>

            <p className="text-sm lg:text-base text-zinc-500 mt-9 lg:mt-14 lg:max-w-150 2xl:text-lg 2xl:max-w-170">
              En plena pandemia, el 30 de mayo de 2020 aprendí a mover las
              piezas y, desde entonces, el ajedrez ha sido mucho más que un
              simple juego para mí: es un desafío constante que me motiva a
              seguir mejorando. Autodidacta y persistente, he crecido con cada
              partida y cada lección, con la firme convicción de llegar a lo más
              alto.
            </p>

            <button
              onClick={() => setView("historia")}
              className="text-zinc-300 text-lg mt-10 flex items-center gap-2 font-medium xl:text-xl 2xl:text-2xl group hover:text-sky-700 cursor-pointer duration-500"
            >
              HISTORIA{" "}
              <span className="group-hover:translate-x-3 duration-500">
                <ArrowRight />
              </span>
            </button>
          </div>
        )}

        {view === "historia" && (
          <div className="flex flex-col gap-4 ">
            <h3 className="text-zinc-300 text-[2.6rem] sm:text-4xl md:text-5xl font-medium 2xl:text-6xl">
              HISTORIA
            </h3>

            <p className="text-sm lg:text-base text-zinc-500  max-w-[600px] 2xl:text-lg 2xl:max-w-[680px] ">
              Mi primer torneo de ajedrez clásico fue el "8vo IRT Alejandro
              Judewicz" en Mar del Plata, Buenos Aires (Argentina) en septiembre
              de 2021. En este torneo ingresé por primera vez al ranking ELO
              FIDE con 1922 puntos, lo que me consagró como el N° 1 mundial en
              mi categoría, posición que he mantenido desde entonces. En 2021,
              me consagré Campeón Argentino Sub-8, y en 2022, Campeón
              Panamericano Sub-10 en Montevideo, Uruguay, lo que me otorgó mi
              primer título de Candidato a Maestro (CM). En abril de 2023,
              jugando un ITT de Jóvenes Talentos en el Club de Villa Martelli,
              Buenos Aires, Argentina, alcancé un ELO FIDE de 2300,
              convirtiéndome en el Maestro FIDE (FM) más joven de la historia
              por puntos. Desde entonces, me llaman el "Pibe de Oro" o el "Messi
              del Ajedrez". En septiembre de 2023, jugando un ITT en Comodoro
              Rivadavia, Chubut, Argentina, obtuve mi primera norma de Maestro
              Internacional (IM), marcando otro récord de precocidad.
              Finalmente, en 2024, obtuve las dos normas restantes para el
              título de Maestro Internacional en el "Campeonato Continental
              Absoluto de las Américas" en Medellín (mayo de 2024) y en el
              "Torneo Cerrado de IM" en el Club de Barcelona (junio de 2024).
              Esto, sumado a haber superado los 2400 de ELO FIDE, hizo que me
              convirtiera en el Maestro Internacional más joven de la historia
              en ese momento. Mi meta es convertirme en Gran Maestro y llegar a
              ser Campeón Mundial, formando parte de la élite del ajedrez.
            </p>

            <button
              onClick={() => setView("about")}
              className="text-zinc-300 text-lg mt-5 flex items-center gap-2 font-medium xl:text-xl 2xl:text-2xl group hover:text-sky-700 cursor-pointer duration-500"
            >
              SOBRE MI{" "}
              <span className="group-hover:translate-x-3 duration-500">
                <ArrowRight />
              </span>
            </button>
          </div>
        )}
      </article>

      {/* circles */}
      <div className="absolute z-40 -right-32 -bottom-[300px] w-[900px] h-[900px] border rounded-full flex justify-center items-center  border-dashed border-zinc-700 ">
        <div className="w-[600px] h-[600px] border border-dashed border-zinc-700 rounded-full flex justify-center items-center">
          <div className="w-[500px] h-[500px] rounded-full border border-dashed border-zinc-700"></div>
        </div>
      </div>
    </section>
  );
}

export function ArrowRight() {
  return (
    <svg
      style={{
        filter: "drop-shadow(0 0 0 transparent)",
        stroke: "none",
      }}
      width="100px"
      height="35px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 18L20.6464 12.3536C20.8417 12.1583 20.8417 11.8417 20.6464 11.6464L15 6"
        stroke="#00a6f4"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12L-12 12"
        stroke="#00a6f4"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
