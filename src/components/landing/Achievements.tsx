import Image from "next/image";
import iconTrophy from "@/assets/images/iconTrophy.svg";
import imgPalmares from "@/assets/images/img3.jpg";
import imgPalmaresDesktop from "@/assets/images/img3-desktop.jpg";

interface AchievementsProps {
  data: any[];
}

export default function Achievements({ data }: AchievementsProps) {
  return (
    <>
      <section className="w-full h-full mt-6 z-100 flex flex-col gap-10 items-center relative lg:px-12 lg:mt-10 2xl:px-16 ">
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
          <div className="absolute inset-0 z-20 bg-linear-to-bl from-zinc-800/10 via-zinc-800/60 to-sky-900 flex justify-center items-center rounded-3xl"></div>
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
          <ul className="relative z-100 text-zinc-300 flex flex-col gap-4 sm:gap-5 font-medium text-sm sm:text-base max-w-150  lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-[1.7rem] 3xl:max-w-190">
            {data && data.length > 0 ? (
              data.map((achievement: any) => (
                <li
                  key={achievement._id}
                  className="flex items-center gap-3 lg:gap-6"
                >
                  <Image
                    src={iconTrophy}
                    alt="icon-trophy"
                    className="w-9 sm:w-10 lg:w-12 3xl:w-14"
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
      <legend className="w-full justify-center relative text-center flex items-center gap-3 text-zinc-500 mt-14 text-sm sm:text-base md:mt-16 md:text-xl lg:mt-20 lg:pb-3 lg:gap-4 xl:gap-6 2xl:text-2xl 3xl:text-3xl 3xl:mt-24">
        <div className="w-12 md:w-32 h-0.5 bg-sky-700 lg:w-36"></div>
        EL ÉXITO OCURRE CUANDO TUS SUEÑOS SON MAS GRANDES QUE TUS EXCUSAS
        <div className="w-12 md:w-32 h-0.5 bg-sky-700 lg:w-36"></div>
      </legend>
     
    </>
  );
}
