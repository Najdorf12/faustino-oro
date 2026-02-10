export default function Form() {
  return (
    <>
      <div className="max-w-[380px] border border-zinc-700 w-full bg-linear-to-t from-zinc-800/30 via-sky-800/40 to-zinc-800/90 rounded-xl shadow-2xl shadow-sky-800 overflow-hidden space-y-6 md:space-y-7 py-6 p-4 md:p-6 2xl:max-w-[420px]">
        <h2 className="text-center text-3xl leading-8  font-medium text-zinc-100 2xl:text-4xl 2xl:leading-9">
          Unite al camino <br /> de Fausti
        </h2>
        <p className="text-sm text-center text-zinc-400 md:text-zinc-400 2xl:text-base">
          Tu mensaje importa. Escribinos y formá parte de este viaje en el mundo
          del ajedrez.
        </p>
        <form method="POST" action="#" className="space-y-6 2xl:space-y-8">
          <div className="relative  pointer-events-auto">
            <input
              autoComplete="off"
              placeholder="john@example.com"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-sky-300 2xl:h-12"
              id="email"
              name="email"
              type="email"
            />
            <label className="absolute left-0 -top-3.5 text-zinc-500 text-sm transition-all peer-placeholder-shown:text-base 2xl:peer-placeholder-shown:text-lg peer-placeholder-shown:text-zinc-200  peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sky-500 peer-focus:text-sm 2xl:peer-focus:text-base">
              Email
            </label>
          </div>
          <div className="relative pointer-events-auto">
            <input
              autoComplete="off"
              placeholder="WhatsApp"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-sky-300 2xl:h-12"
              id="WhatsApp"
              name="WhatsApp"
            />
            <label className="absolute left-0 -top-3.5 text-zinc-500 text-sm transition-all peer-placeholder-shown:text-base 2xl:peer-placeholder-shown:text-lg peer-placeholder-shown:text-zinc-200  peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sky-500 peer-focus:text-sm 2xl:peer-focus:text-base">
              WhatsApp
            </label>
          </div>
          <div className="relative pointer-events-auto">
            <textarea
              placeholder="john@example.com"
              className="peer h-10 pt-2 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-sky-300 2xl:h-12"
              id="mensaje"
              name="mensaje"
            />
            <label className="absolute left-0 -top-3.5 text-zinc-500 text-sm transition-all peer-placeholder-shown:text-base 2xl:peer-placeholder-shown:text-lg peer-placeholder-shown:text-zinc-200  peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sky-500 peer-focus:text-sm 2xl:peer-focus:text-base">
              Mensaje
            </label>
          </div>
          <button
            className="pointer-events-auto cursor-pointer w-full mt-2 py-2 px-4 bg-sky-800 hover:bg-zinc-200 hover:text-sky-600 rounded-md shadow-lg text-white font-semibold transition duration-500 2xl:text-lg"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}