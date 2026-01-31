import Link from "next/link";
import iconNav from "../../assets/images/icon1.png";
import Image from "next/image";

export default function NavbarAdmin() {
  return (
    <nav className="w-full top-0 z-20 text-stone-300 flex items-center justify-between px-4 py-2.5 lg:px-16 lg:py-2">
      <div className="rounded-lg w-10 bg-sky-800 p-1.5 border-zinc-300 border z-100 2xl:w-12">
        <Image
          src={iconNav}
          alt="Beautiful landscape for your journey"
          className="object-contain w-full"
        />
      </div>
      <ul className="flex items-center justify-end gap-3 font-medium md:flex-row lg:gap-9">
        <li>
          <Link
            href="/"
            className="border-zinc-500 rounded-full flex justify-center transition-colors items-center gap-2"
          >
            Inicio
          </Link>
        </li>

        <li>
          <Link
            href="/tournaments"
            className="border-zinc-500 rounded-full flex justify-center transition-colors"
          >
            Torneos
          </Link>
        </li>
        <li>
          <Link
            href="/notices"
            className="border-zinc-500 rounded-full flex justify-center transition-colors"
          >
            Noticias
          </Link>
        </li>
        <li>
          <Link
            href="/#contact"
            className="border-zinc-500 rounded-full flex justify-center transition-colors"
          >
            Contacto
          </Link>
        </li>
      </ul>
    </nav>
  );
}
