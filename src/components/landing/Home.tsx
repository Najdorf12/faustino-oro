import Image from "next/image";
import imgHome from "@/assets/images/img5.webp";
import imgHomeMobile from "@/assets/images/img5-3.jpg";
import icon from "@/assets/images/icons/iconKnight.svg";

export default function Home() {
  return (
    <>
      <section className="bg-radial from-20% from-zinc-50 to-stone-100 h-[95vh] md:h-screen w-full relative pb-3.5 lg:pb-1 ">
        <div className="absolute inset-0 z-20  bg-zinc-900/50 "></div>
        <picture className="w-full h-full z-15 absolute inset-0 mx-auto ">
          <source media="(min-width: 1024px)" srcSet={imgHome.src} />
          <Image
            src={imgHomeMobile}
            alt="home-palmares"
            className="w-full h-full object-cover "
            fill
          />
        </picture>

        {/* Diagonal Fade Center Grid Background */}
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `
        linear-gradient(to right, #e4e4e7 1px, transparent 1px),
        linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)
      `,
            backgroundSize: "150px 150px",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
            maskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
          }}
        />
{/*    */}
        <article className="relative z-100 w-full h-full flex flex-col items-center justify-end gap-1 md:gap-2  lg:w-1/2 lg:justify-center lg:pt-12">
          <h1 className="bg-linear-to-t from-gray-400 via-gray-300 to-zinc-200 lg:bg-linear-to-tl lg:from-gray-400 lg:via-gray-200 lg:to-gray-300 bg-clip-text text-transparent relative z-100 text-[2.9rem] leading-16 sm:text-[3rem] sm:leading-18 font-superlarky text-center md:text-[4rem] lg:leading-32 lg:text-[5.9rem] xl:leading-38 xl:text-[7.2rem] 2xl:leading-44 2xl:text-[8rem] 3xl:leading-50 3xl:text-[9.3rem]">
            Faustino Oro
          </h1>
          <p className="font-medium flex items-center gap-2 text-zinc-300  lg:text-zinc-300 text-base sm:text-[1.1rem] lg:text-xl xl:text-[1.30rem] 2xl:text-[1.5rem] 3xl:text-3xl">
            <span className="border-2 border-zinc-400 text-zinc-300 lg:border-zinc-400 lg:text-zinc-300 px-1 py-0.5 font-ubuntu rounded-sm lg:py- lg:px-1.5">
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
