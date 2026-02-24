import Image from "next/image";
import imgHome from "@/assets/images/img15.jpg";
import icon from "@/assets/images/icons/iconKnight.svg";

export default function Home() {
  return (
    <>
      <section className="bg-zinc-800 h-[95vh] md:h-screen w-full relative pb-6  ">
        <div className="absolute inset-0 z-20 bg-radial from-zinc-800/50 from-40% to-zinc-950 "></div>
        <Image
          src={imgHome}
          alt="home-image"
          className="w-full h-full object-cover absolute inset-0"
        />
   {/* <div
    className="absolute inset-0 z-2 "
    style={{
      backgroundImage: `
        linear-gradient(to right, #9f9fa9 1px, transparent 1px),
        linear-gradient(to bottom, #9f9fa9 1px, transparent 1px)
      `,
      backgroundSize: "200px 200px",
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
      maskComposite: "intersect",
      WebkitMaskComposite: "source-in",
    }}
  />  */}
        <article className="relative z-50 w-full h-full flex flex-col items-center justify-end gap-2 lg:gap-6 ">
          <h1 className="text-stone-300 text-shadow-lg text-shadow-zinc-800 text-[3.7rem] leading-14 sm:text-[4rem] sm:leading-15 font-satoshi text-center font-semibold md:font-semibold lg:text-[7rem] xl:leading-24 xl:text-[8.5rem] 2xl:text-[9rem] 3xl:text-[9.4rem]">
            FAUSTINO ORO
          </h1>
          <p className="text-shadow-2xs flex items-center gap-2 text-shadow-zinc-700 text-stone-200 font-semibold text-base sm:text-lg lg:text-2xl 2xl:text-[28px] 3xl:text-3xl">
           <span className="border-2 border-zinc-500 px-1.5 py-0.5 rounded-lg ">IM</span> MAESTRO INTERNACIONAL
          </p>
        </article>

        <div className="fixed z-200 right-0.5 bottom-1 w-10 rounded-lg border-zinc-700 2xl:w-12">
          <Image src={icon} alt="icon" className="w-full"></Image>
        </div>
      </section>
    </>
  );
}