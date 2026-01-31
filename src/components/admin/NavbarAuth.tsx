import Link from "next/link";
import Image from "next/image";
import iconNav from "../../assets/images/icon1.png"

export default function NavbarAuth() {
  return (
    <nav className="w-full absolute top-0 z-100 text-zinc-100 justify- px-4 pt-3 flex gap-6 md:gap-10 items-center md:px-9 md:pt-4 lg:px-16 2xl:text-lg">
      <div className="rounded-lg w-10 bg-sky-800 p-1.5 border-zinc-300 border z-100 2xl:w-12">
        <Image
          src={iconNav}
          alt="Beautiful landscape for your journey"
          className="object-contain w-full"
        />
      </div>
      <ul className="flex items-center justify-center gap-6 font-medium md:flex-row md:justify-start lg:gap-9">
        <li>
          <Link
            href="/auth/login"
            className="border-zinc-500 rounded-full flex justify-center transition-colors items-center gap-2"
          >
            Iniciar Sesión
          </Link>
        </li>
        <li>
          <Link
            href="/auth/register"
            className="border-zinc-500 rounded-full flex justify-center transition-colors"
          >
            Registrarse
          </Link>
        </li>
        <li></li>
      </ul>
    </nav>
  );
}
