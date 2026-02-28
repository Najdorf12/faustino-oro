import Image from "next/image";
import imgHome from "@/assets/images/img5.webp";
import imgHomeMobile from "@/assets/images/img5-3.jpg";
import icon from "@/assets/images/icons/iconKnight.svg";

export default function Home() {
  return (
    <>
      <section className="bg-zinc-800 h-[95vh] md:h-screen w-full relative pb-2 lg:pb-3 ">
        <div className="absolute inset-0 z-20 bg-radial from-zinc-900/20 lg:from-10% to-zinc-950 "></div>
        <picture className="w-full h-full  absolute inset-0 mx-auto ">
          <source media="(min-width: 1024px)" srcSet={imgHome.src} />
          <Image
            src={imgHomeMobile}
            alt="home-palmares"
            className="w-full h-full object-cover "
            fill
          />
        </picture>
        {/* #9f9fa9 */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #71717b 1px, transparent 1px),
        linear-gradient(to bottom, #71717b 1px, transparent 1px)
      `,
            backgroundSize: "140px 140px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
          }}
        />
        <article className="relative z-100 w-full h-full flex flex-col items-center justify-end gap-1 lg:gap-6 lg:w-1/2 lg:justify-center lg:items-start lg:pl-20 lg:pt-12">
          <h1 className="text-zinc-300 relative z-100 text-shadow-lg text-shadow-zinc-800 text-[4rem] leading-14 sm:text-[4.2rem] sm:leading-15 font-ubuntu text-center font-medium lg:font-semibold lg:text-[7rem] xl:leading-28 lg:text-start  xl:text-[8rem] 2xl:text-[9rem] 3xl:text-[9.4rem]">
            FAUSTINO ORO
          </h1>
          <p className="text-shadow-2xs flex items-center gap-2 text-shadow-zinc-700 text-zinc-300 font-medium text-base sm:text-lg lg:text-2xl 2xl:text-[28px] 3xl:text-3xl">
            <span className="border-2 border-zinc-500 px-1.5 py-0.5 rounded-lg ">
              IM
            </span>{" "}
            MAESTRO INTERNACIONAL
          </p>
        </article>

        <div className="fixed z-200 right-0.5 bottom-1.5 md:bottom-2 w-9 sm:w-10 2xl:w-12">
          <Image src={icon} alt="icon" className="w-full"></Image>
        </div>
      </section>
    </>
  );
}
