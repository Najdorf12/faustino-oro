import Image from "next/image";
import imgHome from "@/assets/images/img15.jpg";
import icon from "@/assets/images/icons/iconKnight.svg";

export default function Home() {
  return (
    <>
      <section className="bg-zinc-800 h-screen w-full relative pb-6  ">
        <div className="absolute inset-0 z-20 bg-radial from-zinc-800/40 from-40% to-zinc-800 "></div>
        <Image
          src={imgHome}
          alt="home-image"
          className="w-full h-full object-cover absolute inset-0"
        />
        <article className="relative z-50 w-full h-full flex flex-col items-center justify-end gap-4 lg:gap-6 ">
          <h1 className="text-zinc-300 text-7xl leading-16 font-ubuntu text-center font-semibold md:font-semibold lg:text-[7rem] xl:leading-24 xl:text-9xl 2xl:text-[8.5rem] 3xl:text-[9rem]">
            FAUSTINO ORO
          </h1>
          <p className="text-zinc-300 font-semibold text-xl lg:text-2xl 2xl:text-[28px] 3xl:text-3xl">
            MAESTRO INTERNACIONAL
          </p>
        </article>

        <div className="fixed z-200 right-0.5 bottom-1 w-10 rounded-lg border-zinc-700 2xl:w-12">
          <Image src={icon} alt="icon" className="w-full"></Image>
        </div>
      </section>
    </>
  );
}