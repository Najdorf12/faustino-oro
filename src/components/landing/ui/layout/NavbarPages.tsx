

import Link from "next/link";
import imgNav from "@/assets/images/icons/iconKnight.svg"
import Image from "next/image";

export default function NavbarPages() {
  return (
    <nav className="w-full absolute top-0 z-200 text-zinc-300 px-4 pt-2 flex flex-row gap-3.5 md:gap-10 md:justify-start md:px-6  md:pt-4 lg:px-6 xl:pt-6 xl:px-14 2xl:text-lg">
      <div className="rounded-lg w-10 bg-sky-800 p-1.5 border-zinc-300 border z-100 lg:p-2 lg:w-12 2xl:w-14">
        <Image
          src={imgNav}
          alt="Beautiful landscape for your journey"
          className="object-contain w-full"
        />
      </div>
      <ul className="flex items-center justify-end gap-3 md:font-medium text-sm  md:flex-row md:justify-start lg:gap-9 lg:text-lg">
        <li>
          <Link
            href="/"
            className="flex justify-center transition-colors "
          >
            Inicio
          </Link>
        </li>

        <li>
          <Link
            href="/tournaments"
            className="flex justify-center transition-colors "
          >
            Torneos
          </Link>
        </li>
        <li>
          <Link
            href="/notices"
            className="flex justify-center transition-colors "
          >
            Noticias
          </Link>
        </li>
        <li>
          <Link
            href="/#contact"
            className="flex justify-center transition-colors "
          >
            Contacto
          </Link>
        </li>
      </ul>
{/*       <div className="flex gap-3 text-base lg:text-lg absolute top-14 right-3 font-semibold md:top-4 lg:right-16 text-zinc-500 2xl:text-xl 2xl:top-7">
        <button className="text-sky-600">ES</button>
        <span>/</span>
        <button>EN</button>
      </div> */}
    </nav>
  );
}