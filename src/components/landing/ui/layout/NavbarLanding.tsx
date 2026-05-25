"use client";

import Link from "next/link";
import imgNav from "@/assets/images/icons/iconKnight.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LenguageSwitcher"

export default function NavbarLanding() {
  const t = useTranslations("nav");

  return (
    <nav className="w-full absolute top-0 z-200 text-zinc-300 lg:text-zinc-320 px-4 pt-2 flex flex-row gap-3 md:gap-10 md:justify-start md:px-6 md:pt-4 lg:px-6 xl:pt-6 xl:px-14 2xl:text-lg ">
      <div className="rounded-lg w-10 bg-sky-800 p-1.5 border-zinc-300 border z-100 lg:p-2 lg:w-12 2xl:w-14">
        <Link href="/">
          <Image
            src={imgNav}
            alt="Faustino Oro"
            className="object-contain w-full"
          />
        </Link>
      </div>

      <ul className="flex items-center justify-end gap-3 md:font-medium text-sm md:flex-row md:justify-start font-medium lg:gap-7 lg:text-lg 3xl:text-xlg">
        <li>
          <Link href="/" className="hidden lg:flex justify-center transition-colors">
            <button id="cta">
              <span className="hover-underline-animation pb-1 lg:pb-2 lg:px-1 hover:text-sky-500 duration-400">
                {t("home")}
              </span>
            </button>
          </Link>
        </li>
        <li>
          <Link href="/tournaments" className="flex justify-center transition-colors">
            <button id="cta">
              <span className="hover-underline-animation pb-1 lg:pb-2 lg:px-1 hover:text-sky-500 duration-400">
                {t("tournaments")}
              </span>
            </button>
          </Link>
        </li>
        <li>
          <Link href="/notices" className="flex justify-center transition-colors">
            <button id="cta">
              <span className="hover-underline-animation pb-1 lg:pb-2 lg:px-1 hover:text-sky-500 duration-400">
                {t("notices")}
              </span>
            </button>
          </Link>
        </li>
        <li>
          <Link href="/#partners" className="flex justify-center transition-colors">
            <button id="cta">
              <span className="hover-underline-animation pb-1 lg:pb-2 lg:px-1 hover:text-sky-500 duration-400">
                {t("partners")}
              </span>
            </button>
          </Link>
        </li>
        <li>
          <Link href="/#contact" className="flex justify-center transition-colors">
            <button id="cta">
              <span className="hover-underline-animation pb-1 lg:pb-2 lg:px-1 hover:text-sky-500 duration-400">
                {t("contact")}
              </span>
            </button>
          </Link>
        </li>
      </ul>

      {/* Switch al final del nav */}
      <div className="absolute right-4 top-12 md:top-14 flex items-center lg:top-6 lg:right-10 xl:top-7.5 2xl:top-9">
        <LanguageSwitcher />
      </div>
    </nav>
  );
}