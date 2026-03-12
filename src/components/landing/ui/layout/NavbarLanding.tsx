import Link from "next/link";
import imgNav from "@/assets/images/icons/iconKnight.svg";
import Image from "next/image";

export default function NavbarLanding() {
  return (
    <nav className="w-full absolute top-0 z-200 text-zinc-50 lg:text-zinc-500 px-4 pt-2 flex flex-row gap-4 md:gap-10 md:justify-start md:px-6  md:pt-4 lg:px-6 xl:pt-6 xl:px-14 2xl:text-lg">
      <div className="rounded-lg w-9 sm:w-10 bg-sky-800 p-1.5 border-zinc-300 border z-100 lg:p-2 lg:w-12 2xl:w-14">
        <Image
          src={imgNav}
          alt="Beautiful landscape for your journey"
          className="object-contain w-full"
        />
      </div>
      <ul className="flex items-center justify-end gap-3 md:font-medium text-sm  md:flex-row md:justify-start lg:gap-8 lg:text-lg">
        <li>
          <Link
            href="/"
            className="flex justify-center transition-colors cursor-pointer "
          >
            <button id="cta">
              <span className="hover-underline-animation pb-1 lg:pb-2 lg:px-1 hover:text-sky-700 duration-400">Inicio</span>
            </button>
          </Link>
        </li>

        <li>
          <Link
            href="/tournaments"
            className="flex justify-center transition-colors "
          >
             <button id="cta">
              <span className="hover-underline-animation pb-1 lg:pb-2 lg:px-1 hover:text-sky-700 duration-400">Torneos</span>
            </button>
          </Link>
        </li>
        <li>
          <Link
            href="/notices"
            className="flex justify-center transition-colors "
          >
              <button id="cta">
              <span className="hover-underline-animation pb-1 lg:pb-2 lg:px-1 hover:text-sky-700 duration-400">Noticias</span>
            </button>
          </Link>
        </li>
        <li>
          <Link
            href="/#contact"
            className="flex justify-center transition-colors "
          >
              <button id="cta">
              <span className="hover-underline-animation pb-1 lg:pb-2 lg:px-1 hover:text-sky-700 duration-400">Contacto</span>
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
