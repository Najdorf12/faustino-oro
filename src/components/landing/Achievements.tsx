import imgPalmares from "@/assets/images/img3.jpg";
import Image from "next/image";
import iconTrophy from "@/assets/images/iconTrophy.svg";
import imgPalmaresDesktop from "@/assets/images/img3-desktop.jpg";
import imgFaustiCaruana from "@/assets/images/chess/19.jpg";
interface AchievementsProps {
  data: any[];
}

export default function Achievements({ data }: AchievementsProps) {
  return (
    <>
      <section className="w-full h-full mt-6 z-100 flex flex-col gap-10 items-center relative lg:px-12 lg:mt-9 2xl:px-16 ">
        <article className="flex flex-col pl-4 gap-6 lg:flex-row lg:px-9 lg:w-full ">
          <h6 className="text-zinc-200 text-[2.6rem] sm:text-5xl font-medium lg:text-7xl lg:leading-12 2xl:text-[5rem] 2xl:leading-11 3xl:text-[5.5rem] ">
            Logros
          </h6>
          <h6 className="flex items-center text-zinc-500 max-w-130 text-start border-l-2 border-sky-600 text-sm font-medium pl-3 md:pl-6 py-1 md:leading-6 md:text-lg 2xl:text-xl lg:py-2 ">
            Con dedicación, esfuerzo y disciplina, Faustino sigue conquistando
            nuevos desafíos en cada partida.
          </h6>
        </article>

        <section className="relative w-[96%] mx-auto flex flex-col px-4 py-6 lg:pl-12 lg:py-9 ">
          <div className="absolute inset-0 z-20 bg-linear-to-bl from-zinc-800/40 via-zinc-800/80 to-sky-900 flex justify-center items-center rounded-3xl"></div>
          <picture className="w-full h-full border-3 border-zinc-700 rounded-3xl absolute inset-0 mx-auto shadow-2xl shadow-sky-800">
            <source
              media="(min-width: 1024px)"
              srcSet={imgPalmaresDesktop.src}
            />
            <Image
              src={imgPalmares}
              alt="home-palmares"
              className="w-full h-full object-cover rounded-3xl"
              fill
            />
          </picture>
          <ul className="relative z-100 text-zinc-300 flex flex-col gap-4 sm:gap-5 font-medium text-sm sm:text-base max-w-150 lg:text-lg xl:text-xl 2xl:text-2xl">
            {data && data.length > 0 ? (
              data.map((achievement: any) => (
                <li
                  key={achievement._id}
                  className="flex items-center gap-3 lg:gap-6"
                >
                  <Image
                    src={iconTrophy}
                    alt="icon-trophy"
                    className="w-9 sm:w-10 lg:w-10"
                  />
                  {achievement.title}
                </li>
              ))
            ) : (
              <li className="text-zinc-400">No hay logros disponibles</li>
            )}
          </ul>
        </section>
      </section>
      <legend className="w-full justify-center relative text-center flex items-center gap-3 text-zinc-500 mt-14 text-sm sm:text-base md:mt-16 md:text-xl lg:mt-24 lg:pb-3 2xl:text-2xl">
        <div className="w-12 md:w-32 h-0.5 bg-sky-700"></div>
        EL ÉXITO OCURRE CUANDO TUS SUEÑOS SON MAS GRANDES QUE TUS EXCUSAS
        <div className="w-12 md:w-32 h-0.5 bg-sky-700"></div>
      </legend>
     {/*  <figure className="w-full relative z-2200 md:w-full h-100 md:h-screen mt-16">
        <div className="absolute inset-0 bg-zinc-900/80"></div>
        <Image
          src={imgFaustiCaruana}
          alt="imgFooter"
          className="w-full h-full object-cover "
        ></Image>
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
        <article className="absolute inset-0 z-100000 flex items-start pb-14  md:items-end ">
          <h6 className="z-60 text-start text-zinc-300 font-medium  text-balance text-lg mt-1 md:text-5xl ml-[9%] max-w-200 3xl:text-6xl">
            Aquí encontrarás actualizaciones en tiempo real y la cobertura de
            los momentos más importantes de su trayectoria profesional
          </h6>
        </article>
      </figure> */}
    </>
  );
}
