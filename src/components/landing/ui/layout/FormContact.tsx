import Link from "next/link";

export default function Form() {
  return (
    <section className="relative pointer-events-auto z-50 w-full flex items-center justify-center text-balance">
      <div className="relative w-full max-w-110 rounded-lg shadow-md pt-2 pb-3 px-4 md:p-6 border border-zinc-600 bg-zinc-900/70 lg:bg-linear-to-bl via-transparent lg:from-sky-900 3xl:max-w-120 3xl:p-8">
        <legend className="flex items-center gap-2 font-medium text-zinc-400">
          Faustino Oro <span className="text-3xl text-sky-500">*</span>
        </legend>

        <h6 className="text-zinc-100 text-2xl mt-1 max-w-90 leading-8 md:text-3xl md:leading-9 3xl:text-4xl 3xl:max-w-110 3xl:leading-10">
          Mové la primera pieza y formá parte de su historia
        </h6>
        
        <p className="text-zinc-400 font-medium mt-3 mb-2 3xl:text-lg 3xl:mt-4">
          Cada mensaje es una oportunidad
        </p>
        
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-400"></div>
          <span className="text-gray-300 text-sm">o</span>
          <div className="flex-1 h-px bg-gray-400"></div>
        </div>

        <form className="relative flex flex-col gap-2 mt-2">
          <input
            placeholder="Nombre"
            className="bg-zinc-800/80 placeholder:text-zinc-300 border-zinc-700 border text-gray-200 rounded-md p-2 mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-sky-500 transition ease-in-out duration-150"
            type="text"
          />

          <input
            placeholder="Email"
            className="bg-zinc-800/80 placeholder:text-zinc-300 border-zinc-700 border text-gray-200 rounded-md p-2 mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-sky-500 transition ease-in-out duration-150"
            type="email"
          />

          <textarea
            placeholder="Escribe tu mensaje"
            className="bg-zinc-800/80 placeholder:text-zinc-300 border-zinc-700 border text-gray-200 rounded-md p-2 mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-sky-500 transition ease-in-out duration-150 h-20 lg:h-24"
          />

          {/* ✅ className como string directo, SIN template literals ni condicionales */}
          <button
            className="bg-sky-700/60 border-2 border-sky-500 text-zinc-100 font-semibold py-2 px-4 rounded-md mt-2 hover:bg-sky-400/60 cursor-pointer transition ease-in-out duration-400 disabled:opacity-50"
            type="submit"
          >
            Enviar jugada
          </button>
        </form>
      </div>
    </section>
  );
}