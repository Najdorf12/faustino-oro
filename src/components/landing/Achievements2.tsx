import Image from "next/image";
import iconTrophy from "@/assets/images/iconTrophy.svg";
import {
  Achievement,
  AchievementCategory,
  ACHIEVEMENT_CATEGORIES,
} from "@/types/achievement";

interface AchievementsProps {
  data: Achievement[];
}

const CardContent = ({
  category,
  items,
}: {
  category: AchievementCategory;
  items: Achievement[];
}) => (
  <div className="relative w-full h-full  border-2 border-zinc-700 rounded-2xl shadow-xl shadow-sky-900 py-6 px-3 lg:py-12 lg:px-10">
    <div className="absolute inset-0 z-20 bg-linear-to-bl from-zinc-800/10 via-zinc-800/60 to-sky-900 rounded-2xl" />

    <p className="relative z-100 text-zinc-500 text-sm font-semibold uppercase tracking-widest mb-6 lg:mb-6 lg:text-lg 2xl:text-xl 3xl:text-2xl">
      {category}
    </p>
    <ul className="relative z-100 text-zinc-300 font- text-sm lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-[1.7rem] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8 md:gap-y-5">
      {items.map((achievement) => (
        <li key={achievement._id} className="flex items-center gap-3 lg:gap-6">
          <Image
            src={iconTrophy}
            alt="icon-trophy"
            className="w-9 sm:w-10 lg:w-12 3xl:w-14 shrink-0"
          />
          {achievement.title}
        </li>
      ))}
    </ul>
  </div>
);

export default function Achievements({ data }: AchievementsProps) {
  const grouped = ACHIEVEMENT_CATEGORIES.reduce(
    (acc, category) => {
      const items = data
        .filter((a) => a.category === category)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      if (items.length > 0) acc[category] = items;
      return acc;
    },
    {} as Record<AchievementCategory, Achievement[]>,
  );

  const entries = Object.entries(grouped) as [
    AchievementCategory,
    Achievement[],
  ][];

  return (
    <>
      <section className="w-full h-full mt-6 z-100 flex flex-col gap-10 items-center relative lg:px-12 lg:mt-12 2xl:px-16">
        <article className="flex flex-col pl-4 gap-3 lg:flex-row lg:px-9 lg:w-full xl:gap-7 3xl:gap-9">
          <h6 className="text-zinc-200 text-[3rem] sm:text-[3.2rem] font-medium lg:text-6xl lg:leading-14 xl:text-7xl xl:leading-16 2xl:text-[5rem] 2xl:leading-11 3xl:leading-20 3xl:text-[5.5rem]">
            Logros
          </h6>
          <h6 className="flex items-center text-zinc-500 max-w-130 text-start border-l-2 border-sky-600 text-sm font-medium pl-3 md:pl-6 py-1 md:leading-6 md:text-lg lg:py-2 xl:py-3 2xl:text-xl 3xl:text-2xl 3xl:max-w-150 3xl:leading-8">
            Con dedicación, esfuerzo y disciplina, Faustino sigue conquistando
            nuevos desafíos en cada partida.
          </h6>
        </article>

        <section className="relative w-[94%] mx-auto flex flex-col gap-8 lg:w-[%] lg:gap-10">
          {data && data.length > 0 ? (
            <div className="flex flex-col gap-8 lg:gap-12">
              {entries.map(([category, items]) => (
                <CardContent key={category} category={category} items={items} />
              ))}
            </div>
          ) : (
            <p className="text-zinc-400">No hay logros disponibles</p>
          )}
        </section>
      </section>

      <legend className="w-full justify-center relative text-center flex items-center gap-3 text-zinc-500 mt-14 text-sm sm:text-base md:mt-16 md:text-xl lg:mt-18 lg:pb-3 lg:gap-4 xl:gap-6 2xl:text-2xl 3xl:text-3xl 3xl:mt-24">
        <div className="w-12 md:w-32 h-0.5 bg-sky-700 lg:w-36" />
        EL ÉXITO OCURRE CUANDO TUS SUEÑOS SON MAS GRANDES QUE TUS EXCUSAS
        <div className="w-12 md:w-32 h-0.5 bg-sky-700 lg:w-36" />
      </legend>
    </>
  );
}
