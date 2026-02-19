import Image from "next/image";
import Link from "next/link";
import icon3 from "@/assets/images/icons/iconKnight.svg";

export default function ButtonTournaments() {
  return (
    <Link href={"/tournaments"}>
      <button className=" shadow-sky-700 shadow-xl z-100 border-2 hover:scale-105 border-zinc-200 duration-300 relative group cursor-pointer text-zinc-200 overflow-hidden h-10 w-56 md:w-62 rounded-md bg-sky-800 p-2 flex justify-between pl-3 items-center font-medium md:text-lg">
        <div className="absolute top-0 -right-3 z-10 w-16 h-16 rounded-full scale-150 group-hover:-right-3 duration-500 bg-sky-500"></div>
        <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-1 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-500 bg-sky-600"></div>
        <div className="absolute right-2 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150 duration-500 bg-sky-800"></div>
        <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-1 z-10 w-24 h-24 rounded-full group-hover:scale-150 duration-500 bg-sky-600"></div>
        <p className="z-10">Ir a Torneos</p>
        <Image
          src={icon3}
          alt="icon-3"
          className="w-7 lg:w-8 z-100 group-hover:scale-95 duration-500"
        ></Image>
      </button>
    </Link>
  );
}
