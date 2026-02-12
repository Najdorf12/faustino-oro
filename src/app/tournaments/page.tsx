import { Suspense } from "react";
import Image from "next/image";
import NavbarLanding from "@/components/landing/ui/NavbarLanding";
import imgFaustiNotice from "@/assets/images/ai2.jpg";
import imgFausti from "@/assets/images/img6.jpg";
/* import { getTournaments } from "@/libs/tournaments";
import TournamentsClient from "./TournamentsClient" */ export default function TournamentsPage() {
  return (
    <section className="w-full pb-32">
      <section className="w-full min-h-screen bg-zinc-800 flex flex-col pt-30 gap-12 lg:gap-0 lg:pt-0 lg:flex-row text-balance">
        <NavbarLanding />
        <article className="pl-6 relative w-full h-[24vh] flex flex-col items-start justify-center text-start md:border-b border-zinc-700 md:w-1/2 md:h-screen md:pl-12 lg:pt-6">
          <h6 className="relative text-zinc-300 text-6xl md:text-8xl font-medium 3xl:text-9xl">
            TORNEOS
          </h6>
          <p className="relative text-sm md:text-lg text-zinc-400 flex justify-center items-center max-w-175 my-6 3xl:text-xl">
            Consulta aquí la lista de próximos torneos en los que participará.
            Sigue su calendario y mantente al día con su increíble recorrido
            competitivo.
          </p>
          <button className="relative text-zinc-300 text-lg mt-5 flex items-center gap-2 font-medium lg:ml-1 xl:text-xl 2xl:text-2xl group hover:text-sky-700 cursor-pointer duration-500">
            Ir a Noticias
            <span className="group-hover:translate-x-3 duration-500">
              <ArrowRight />
            </span>
          </button>
        </article>
        <div className="hidden md:flex justify-center absolute bottom-0 w-1/2">
          <p className="text-base leading-5 pl-12 text-balance h-25 text-zinc-400 flex justify-center items-center">
            Mantente informado sobre sus próximas competencias, análisis de
            partidas y eventos destacados en el mundo del ajedrez.
          </p>
          <p className="text-lg leading-5 text-center text-balance h-25 bg-sky-700 rounded-tl text-zinc-300 flex justify-center items-center">
            CHESSI IS COMING
          </p>
        </div>
        <section className="w-[90%] self-center h-[60vh] md:w-1/2 md:h-screen relative flex items-center justify-center">
          <div className="absolute inset-0 z-100"></div>
          <Image
            src={imgFaustiNotice}
            alt="img-notice"
            loading="eager"
            className="w-full h-full object-cover absolute inset-0 rounded-2xl lg:rounded-bl-none"
          />
        </section>
      </section>
      <figure className="w-full relative md:w-full h-120 md:h-screen mt-9 lg:mt-0">
        <p className="absolute top-2 left-5 text-zinc-500 text-3xl z-100 text-balance max-w xl:text-7xl w-1/2  xl:left-12 xl:top-12 xl:font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit Culpa, rerum.
        </p>
        <div className="absolute inset-0 bg-zinc-900/80"></div>
        <Image
          src={imgFausti}
          alt="imgFooter"
          className="w-full h-full object-cover "
        />
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #52525c 1px, transparent 1px),
        linear-gradient(to bottom, #52525c 1px, transparent 1px)
      `,
            backgroundSize: "300px 300px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
            WebkitMaskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
          }}
        />
      </figure>

      <Suspense fallback={<TournamentsLoading />}></Suspense>
    </section>
  );
}

function TournamentsLoading() {
  return (
    <section className="w-full pt-12 lg:pt-24">
      <div className="flex flex-col gap-12 items-center justify-center max-w-290 mx-auto">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full h-100 bg-zinc-800/50 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    </section>
  );
}

function ArrowRight() {
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
