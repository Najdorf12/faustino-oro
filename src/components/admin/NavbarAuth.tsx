import Link from "next/link";
import Image from "next/image";
import iconNav from "@/assets/images/icons/iconKnight.svg";

export default function NavbarAuth() {
  return (
    <nav className="w-full absolute top-0 z-100 text-zinc-100 lg:text-white justify- px-4 pt-3 flex gap-3 md:gap-10 items-center md:px-9 md:pt-4 lg:px-16 2xl:text-lg">
      <Link href="/">
        <div className="rounded-lg w-10 bg-sky-800 p-1.5 border-zinc-300 border z-100 xl:w-12 3xl:w-14 ">
          <Image
            src={iconNav}
            alt="Beautiful landscape for your journey"
            className="object-contain w-full "
          />
        </div>
      </Link>
      <ul className="flex items-center justify-center gap-3 text-sm md:text-base md:font-medium md:flex-row md:justify-start lg:gap-9 3xl:text-lg 3xl:gap-10">
        <li>
          <Link
            href="/"
            className="border-zinc-500 rounded-full flex justify-center transition-colors items-center gap-2 hover:text-sky-600 duration-300"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/auth/login"
            className="border-zinc-500 rounded-full flex justify-center transition-colors items-center gap-2 hover:text-sky-600 duration-300"
          >
            Iniciar Sesión
          </Link>
        </li>
        <li>
          <Link
            href="/auth/register"
            className="border-zinc-500 rounded-full flex justify-center transition-colors hover:text-sky-600 duration-300"
          >
            Registrarse
          </Link>
        </li>
        <li></li>
      </ul>
    </nav>
  );
}
