import Image from "next/image";
import imgAdmin from "../../assets/images/img9.webp";
import icon from "../../assets/images/icon1.png";

export default function AdminDashbord() {
  return (
    <section className="w-full relative text-balance h-screen">
      <div className="absolute inset-0 w-full h-screen z-30 bg-zinc-800/80 "></div>
      <figure className="absolute inset-0 z-10 w-full h-screen">
        <Image
          src={imgAdmin}
          alt="img-fausti"
          className="w-full h-full object-cover"
        ></Image>
      </figure>
      <article className="relative z-30 pl-4 pt-9 lg:w-fit flex flex-col gap-4 max-w-90 lg:gap-6 lg:pl-16 lg:pt-6  3xl: lg:left-10 lg:max-w-140  3xl:gap-8 3xl:max-w-160">
        <h6 className="z-20 relative flex text-zinc-100 text-2xl lg:text-5xl xl:text-6xl 3xl:text-7xl">
          Cada torneo es una historia, cada noticia es un capítulo, cada logro
          es un hito
        </h6>
        <div className="w- h-0.5 bg-sky-700"></div>
        <p className="text-lg text-zinc-300 lg:flex lg:text-3xl 3xl:text-4xl">
          Crea, edita y organiza el contenido de forma sencilla
        </p>
        <div className="bg-zinc-800/30 flex items-center gap-2  text-zinc-400 leading-5 border border-sky-700 rounded-lg p-2 text-sm md:text-lg lg:pl-3 lg:gap-3 lg:text-xl">
          <Image
            src={icon}
            alt="icon-Dashboard"
            className="w-8 lg:w-10 2xl:w-11 3xl:w-12"
          ></Image>{" "}
          Pulsa el menu superior para navegar
        </div>
      </article>
      <div className="absolute w-full bottom-0 z-60 flex justify-center text-zinc-500 lg:text-lg">
        © Faustino Oro
      </div>
    </section>
  );
}
