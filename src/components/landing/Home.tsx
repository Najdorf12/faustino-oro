import Image from "next/image";
import Link from "next/link";
import imgHome from "@/assets/images/newhome3.jpg";
import imgHomeMobile from "@/assets/images/newhome4.jpg";
import icon from "@/assets/images/icons/iconKnight.svg";
import { Instagram, Facebook, Youtube } from "@boxicons/react";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("home");
  return (
    <>
      <section className=" h-[95vh] md:h-screen w-full relative pb-2 lg:pb-1  rounded-b-xl lg:rounded-b-3xl border-b border-zinc-700">
        <div className="absolute inset-0 z-20 bg-zinc-900/25 lg:bg-zinc-900/25  rounded-b-xl lg:rounded-b-3xl"></div>
        <picture className="w-full h-full z-15 absolute inset-0 mx-auto rounded-b-xl lg:rounded-b-3xl">
          <source media="(min-width: 600px)" srcSet={imgHome.src} />
          <Image
            src={imgHomeMobile}
            alt="home-palmares"
            className="w-full h-full object-cover rounded-b-xl lg:rounded-b-3xl"
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
        <article className=" relative z-100 w-full h-full flex flex-col items-center justify-end gap-1 md:gap-2 lg:w-1/2 lg:justify-center lg:pb-6 lg:pr-30  lg:gap-3 xl:pr-44 2xl:pr-34">
          <h1 className="text-stone-200 relative z-100 text-[2.9rem] leading-14 sm:text-[3rem] sm:leading-18 font-superlarky text-center md:text-[4rem] lg:leading-26 lg:text-[4.5rem] xl:leading-29 xl:text-[4.99rem] xl:tracking-wide 2xl:leading-41 2xl:text-[7.2rem] 3xl:leading-42 3xl:text-[7.5rem]">
            Faustino Oro
          </h1>
          <p className="font-medium flex items-center gap-1.5 text-zinc-300 lg:text-stone-300 text-base sm:text-[1.1rem] lg:text-[.95rem] xl:text-[1.05rem] 2xl:text-[1.5rem] 3xl:text-3xl">
            <span className="border-2 border-sky-700 text-zinc-300  px-1 py-0.5 font-ubuntu rounded-sm lg:py- lg:px-1.5">
              GM
            </span>{" "}
            {t("title")}
          </p>
        </article>

      {/*   <div className="fixed z-200 right-0.5 bottom-1.5 md:bottom-2 w-9 sm:w-10 2xl:w-12">
          <Image src={icon} alt="icon" className="w-full"></Image>
        </div> */}

        <div className=" items-center justify-center h-full flex flex-col gap-2 lg:gap-4 xl:gap-5 z-100 absolute right-2 lg:right-4 top-0">
          <div className="h-[16vh] w-0.5 bg-sky-800 mb-2"></div>

          <Link
            href="https://www.instagram.com/faustioro/"
            target="blank"
            className="hover:bg-sky-600 hover:border-sky-400 bg-sky-800 border-2 p-1.5 md:p-2 flex items-center justify-center border-sky-700 rounded-full duration-400"
          >
            <Instagram
              className="w-7.5 h-7.5 md:w-[38px] md:h-[38px]"
              fill="#d4d4d8"
              cursor="pointer"
            />
          </Link>

          <Link
            href="https://www.youtube.com/@faustinooro"
            target="blank"
            className="hover:bg-sky-600 hover:border-sky-400 bg-sky-800 border-2 p-1.5 md:p-2 flex items-center justify-center border-sky-700 rounded-full duration-400"
          >
            <Youtube
              className="w-7.5 h-7.5 md:w-[38px] md:h-[38px]"
              fill="#d4d4d8"
              cursor="pointer"
            />
          </Link>

          <Link
            href="https://www.facebook.com/orofaustino/?locale=es_LA"
            target="blank"
            className="hover:bg-sky-600 hover:border-sky-400 bg-sky-800 border-2 p-1.5 md:p-2 flex items-center justify-center border-sky-700 rounded-full duration-400"
          >
            <Facebook
              className="w-7.5 h-7.5 md:w-[38px] md:h-[38px]"
              fill="#d4d4d8"
              cursor="pointer"
            />
          </Link>

          <div className="h-[16vh] w-0.5 bg-sky-800 mt-2"></div>
        </div>
      </section>
    </>
  );
}
/* ****


 */
