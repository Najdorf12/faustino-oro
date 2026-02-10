"use client";
import gsap from "gsap";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Notice } from "@/types/notice";

interface NoticeModalProps {
  notice: Notice;
  onClose: () => void;
}

export function NoticeModal({ notice, onClose }: NoticeModalProps) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      modalRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.4 }
    );
    gsap.fromTo(
      contentRef.current,
      { y: 80, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.6 }
    );
  }, []);

  const close = () => {
    gsap.to(contentRef.current, {
      y: 80,
      autoAlpha: 0,
      duration: 0.4,
      onComplete: onClose,
    });
  };

  // Cerrar al hacer clic fuera del contenido
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    <div
      ref={modalRef}
      className="text-balance absolute md:fixed inset-0 z-180 scroll bg-zinc-800/90 backdrop-blur-xs pointer-events-auto flex flex-col items-center justify-center p-2 md:p-6 md:flex-row w-full lg:justify-evenly "
      onClick={handleBackdropClick}
    >
      <div className="h-112 md:w-1/2 flex justify-center lg:w-3/5 xl:h-130 2xl:h-170 3xl:h-175 bg-red-500">
        <Image
          src={notice.images[0].secure_url}
          alt="img-faustino-notice"
          width={500}
          height={500}
          className="w-full h-full border-3 shadow-lg shadow-zinc-700 border-zinc-700 object-cover rounded-2xl"
        ></Image>
      </div>
      <div className="self-start flex justify-start items-center mt-3 md:h-fit md:self-center md:w-1/2 md:mt-0 lg:w-3/5  lg:justify-center ">
        <article
          ref={contentRef}
          className="bg-zinc-200 max-w-175 rounded-xl shadow-2xl text-zinc-600 relative max-h-[90vh] overflow-y-auto modal-scroll p-4 md:p-8 2xl:max-w-187 3xl:max-w-200"
        >
          <h2 className="text-2xl font-semibold mb-4 2xl:text-3xl text-balance">
            {notice.title}
          </h2>
          <p className="text-zinc-500 mb-6 font-medium text-lg 2xl:text-xl">
            {notice.description}
          </p>
          <p className="text-zinc-600 whitespace-pre-line leading-relaxed 2xl:text-lg">
            {notice.content}
          </p>

          <button
            type="button"
            onClick={close}
            className="bg-zinc-600 cursor-pointer text-center z-100 w-56 rounded-lg h-10 relative text-zinc-200 md:text-lg font-medium group mt-9"
          >
            <div className="bg-sky-600 cursor-pointer rounded-lg h-10 w-10 grid place-items-center absolute left-0 top-0 group-hover:w-full z-10 duration-500">
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#e4e4e7"
                  d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                ></path>
                <path
                  fill="#e4e4e7"
                  d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                ></path>
              </svg>
            </div>
            <p className="translate-x-4">Volver atrás</p>
          </button>
        </article>
      </div>
    </div>
  );
}