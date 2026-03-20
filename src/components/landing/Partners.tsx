import Image from "next/image";
/* import giftMotion from "@/assets/images/chess/motion1.gif"; */
import imgFausti from "@/assets/images/img1-1.jpeg";
import bg1 from "@/assets/images/bg1.jpg";
// Una vez que tengas los logos, los importás así:
import logoML from "@/assets/images/icons/mercado-libre-logo.svg";
import logoMI from "@/assets/images/icons/myinvestor-logo.svg";

const partners = [
  {
    name: "Mercado Libre",
    logo: logoML,
    description: "Patrocinador oficial",
    href: "https://www.mercadolibre.com",
  },
  {
    name: "MyInvestor",
    logo: logoMI,
    description: "Partner financiero",
    href: "https://myinvestor.es",
  },
];

export default function Partners() {
  return (
    <section className="h-screen relative flex flex-col items-center justify-center overflow-hidden lg:items-start lg:pl-12">
      {/* GIF — esquina decorativa */}
      <div className="absolute w-full h-full inset-0  flex items-center justify-start ">
        <div className="w-full h-full absolute inset-0 bg-zinc-900/80"></div>
        <Image
          src={imgFausti}
          alt="chess motion"
          className="w-full h-full object-cover  "
          /* unoptimized  */ // necesario para que Next.js no procese el GIF y pierda la animación
        />
        {/*        <div
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
        /> */}
      </div>
      {/* Contenido */}
      <article className="relative z-20 flex flex-col justify-between h-full py-8 px-6 lg:w-1/2 lg:pt-14 lg:pb-20 lg:items-center ">

        <div className="relative z-100">
          <p className="text-[3rem] sm:text-[3.2rem] font-medium lg:text-6xl lg:leading-14  xl:text-7xl xl:leading-16 2xl:text-[5rem] 2xl:leading-11 3xl:leading-20 3xl:text-[5.5rem] text-zinc-200">
            Partners
          </p>

          {/*   <div className="h-px  w-full bg-sky-700 mt-3 lg:mt-12"></div> */}

          <h6 className="border-l-2  pl-3  border-sky-700 py-2 text-lg mt-3 font-extralight text-zinc-100 leading-6 lg:ml-1 lg:text-2xl lg:pl-4 lg:leading-9 lg:mt-9 xl:text-4xl xl:leading-10 3xl:leading-14 3xl:text-5xl 2xl:mt-10">
            Mis aliados en la visión, el coraje y la determinación de conquistar
            lo más alto
          </h6>
        </div>
       
        <div className="flex flex-col gap-4 items-center lg:flex-row xl:gap-6  ">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 shadow-lg shadow-sky-900 bg-linear-to-tr from-zinc-900/40 to-zinc-900  border border-sky-600 hover:border-sky-100 rounded-2xl py-3 px-16 transition-colors duration-300 md:backdrop-blur-[1px] max-w-75 lg:max-w-70  lg:py-4 xl:max-w-82 2xl:max-w-85 3xl:max-w-95 "
            >
              <div className="w-46 h-16  xl:w-54 xl:h-22 rounded-lg flex items-center justify-center 2xl:w-56 2xl:h-24 3xl:w-59 3xl:h-26">
                <Image
                  src={p.logo}
                  alt={p.name}
                  className="w-full h-full object-contain "
                />
              </div>
              <div className="flex flex-col gap-1 items-center justify-center">
              
                <span className="text-zinc-400 text-xs md:text-sm 3xl:text-base group-hover:text-zinc-300 transition-colors">
                  {p.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </article>
    </section>
  );
}
