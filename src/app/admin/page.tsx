import Image from "next/image";
import imgAdmin from "../../assets/images/img9.webp";
import icon from "../../assets/images/icon1.png";

export default function AdminDashbord() {
  return (
    <section className="w-full relative text-balance h-[90vh] md:h-screen">
      <div className="absolute inset-0 w-full h-[90vh] md:h-screen z-30 bg-zinc-800/80 "></div>
      <figure className="absolute inset-0 z-10 w-full h-[90vh] md:h-screen">
        <Image
          src={imgAdmin}
          alt="img-fausti"
          className="w-full h-full object-cover"
        ></Image>
      </figure>
      <article className="relative z-30 pl-4 pt-9 lg:w-fit flex flex-col gap-4 max-w-80 md:max-w-120 lg:gap-6 lg:pl-16 lg:pt-9 3xl: lg:left-10 lg:max-w-130 xl:max-w-155 3xl:gap-8 3xl:max-w-185 3xl:pt-12">
        <h6 className="z-20 relative flex text-zinc-100 text-2xl md:text-4xl lg:text-5xl xl:text-6xl 3xl:text-7xl">
          Cada torneo es una historia, cada noticia es un capítulo, cada logro
          es un hito
        </h6>
        <div className="w- h-0.5 bg-sky-700"></div>
        <p className="text-base text-zinc-300 lg:flex md:text-lg lg:text-3xl 3xl:text-4xl">
          Crea, edita y organiza el contenido de forma sencilla
        </p>
        <div className="bg-zinc-800/30 flex items-center gap-2 text-zinc-400 leading-5 border border-sky-700 rounded-lg p-1 pl-2 text-sm md:p-2 md:text-lg lg:pl-3 lg:gap-3 lg:text-xl 3xl:text-2xl ">
          <Image
            src={icon}
            alt="icon-Dashboard"
            className="w-8 lg:w-10 2xl:w-11 3xl:w-12"
          ></Image>{" "}
          Pulsa el menu superior para navegar
        </div>
      </article>
     
    </section>
  );
}
