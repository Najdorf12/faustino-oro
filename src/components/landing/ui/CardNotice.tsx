import iconKnight from "@/assets/images/iconKnight.svg";
import Image from "next/image";
import type { Notice } from "@/types/notice";

interface CardNoticeProps {
  notice: Notice;
  onClick: () => void; // ← Agrega esta prop
}

export default function CardNoticeLayout({ notice, onClick }: CardNoticeProps) {
  return (
    <li className="max-w-170 flex flex-col gap-2 relative border-b border-zinc-400 py-2 lg:p-2 2xl:max-w-170">
      <div className="text-lg md:text-xl text-zinc-500 flex items-center gap-2 font-medium h-12 2xl:text-2xl">
        <div className="w-10 h-10 flex items-center justify-center shrink-0">
          <Image
            src={iconKnight}
            className="w-10 h-10"
            alt="icon-notice"
          />
        </div>
        <span className="leading-tight">{notice?.title}</span>
      </div>
      <div className="text-zinc-400 mt-1 pl-3 2xl:text-lg">
        {notice?.description}
      </div>
      <div className="text-zinc-500 pl-3 2xl:text-lg">
        {notice?.content?.split(".")[0] + "."}
      </div>
      <button
        onClick={onClick} // ← Agrega el onClick aquí
        className="self-end ml-3 bg-zinc-600 cursor-pointer z-100 w-48 rounded-lg h-9 relative text-zinc-200 font-medium flex items-center pl-2 group mt-2"
      >
        <p>Leer más</p>
        <div className="bg-sky-600 cursor-pointer rounded-lg h-9 w-9 grid place-items-center absolute right-0 top-0 group-hover:w-full z-10 duration-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="w-[1.2em] transition-transform duration-300 text-sky-300 group-hover:translate-x-[0.1em]"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              fill="currentColor"
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
            ></path>
          </svg>
        </div>
      </button>
    </li>
  );
}