import Image from "next/image";
import { getTranslations } from "next-intl/server";
import imgFausti from "@/assets/images/img1-1.jpeg";
import bg1 from "@/assets/images/bg1.jpg";
import logoML from "@/assets/images/icons/mercado-libre-logo.svg";
import logoMI from "@/assets/images/icons/myinvestor-logo.svg";
import logoChessCom from "@/assets/images/icons/chesscom.svg";

export default async function Partners() {
  const t = await getTranslations("partners");
  const partners = [
    {
      name: "Chess.com",
      logo: logoChessCom,
      description: t("sponsor"),
      href: "https://www.chess.com",
    },
    {
      name: "MyInvestor",
      logo: logoMI,
      description: t("financial"),
      href: "https://myinvestor.es",
    },
    {
      name: "Mercado Libre",
      logo: logoML,
      description: t("sponsor"),
      href: "https://www.mercadolibre.com",
    },
  ];
  return (
    <section className="h-screen relative flex flex-col items-center justify-center overflow-hidden lg:items-start ">
      <div className="absolute w-full h-full inset-0  flex items-center justify-start ">
        <div className="w-full h-full absolute inset-0 bg-radial from-30% from-zinc-900/70 to-zinc-950"></div>
        <Image
          src={imgFausti}
          alt="chess motion"
          className="w-full h-full object-cover  "
        />
      </div>
      <article
        id="partners"
        className="relative z-20 flex flex-col justify-between h-full py-8 px-4 w-full lg:pt-14 lg:pb-10 lg:items-center  "
      >
        <div className="relative z-100 self-start lg:pl-12">
          <h6 className="text-[3rem] sm:text-[3.2rem] font-medium lg:text-6xl lg:leading-14  xl:text-7xl xl:leading-16 2xl:text-[5rem] 2xl:leading-11 3xl:leading-20 3xl:text-[5.5rem] text-zinc-200">
             {t("title")}
          </h6>
          <p className="border-l-2  pl-3  border-sky-700 py-2 text-lg mt-3 font-extralight text-zinc-100 leading-6 lg:ml-1 lg:text-2xl lg:pl-4 lg:leading-9 lg:mt-9 xl:max-w-180 xl:text-4xl xl:leading-10 3xl:leading-14 3xl:text-5xl 2xl:mt-10 3xl:max-w-250">
             {t("description")}
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center lg:flex-row  w-full justify-start lg:pl-12 lg:gap-6 ">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 shadow-lg shadow-sky-900 bg-linear-to-tr from-zinc-900/40 to-zinc-900/70 border border-sky-800 hover:border-zinc-700 rounded-2xl py-2 px-16 transition-colors duration-400 md:backdrop-blur-[1px] max-w-75 lg:max-w-70 xl:max-w-80 xl:py-3 xl:w-80 2xl:max-w-90 2xl:w-90 3xl:max-w-120 3xl:w-100   "
            >
              <div className="w-40 h-16 xl:w-50 xl:h-20 rounded-lg flex items-center justify-center 2xl:w-56 2xl:h-24 3xl:w-59 3xl:h-26">
                <Image
                  src={p.logo}
                  alt={p.name}
                  className="w-full h-full object-contain "
                />
              </div>
              <div className="flex flex-col gap-1 items-center justify-center">
                <span className="text-zinc-400 text-xs md:text-sm 3xl:text-base group-hover:text-zinc-200 transition-colors">
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
