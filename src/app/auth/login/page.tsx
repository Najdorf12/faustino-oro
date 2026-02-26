"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [loginError, setLoginError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>();

  const submit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setLoginError("Credenciales inválidas. Por favor, intenta de nuevo.");
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        router.push("/admin");
        router.refresh();
      }
    } catch (error) {
      setLoginError("Ocurrió un error. Por favor, intenta de nuevo.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setLoginError("");

    try {
      await signIn("google", {
        callbackUrl: "/admin",
      });
    } catch (error) {
      setLoginError("Error al iniciar sesión con Google");
      setIsGoogleLoading(false);
    }
  };

  return (
    <section className="w-full h-screen px-6 flex items-center justify-center text-balance ">
      <div className="relative w-full max-w-110 rounded-lg shadow-md px-3 pt-1 pb-3 md:pt-4 md:p-6 border border-zinc-600 bg-zinc-800/60 lg:bg-linear-to-r ">
        <legend className="flex items-center gap-2 font-medium  top-0 left-6 text-zinc-400 text-sm md:text-base 3xl:text-lg">
          Faustino Oro <span className="text-4xl text-sky-500">*</span>
        </legend>
        <h6 className="text-zinc-100 max-w-70 text-2xl md:text-3xl 3xl:text-4xl 3xl:max-w-80 3xl:leading-9">
          Bienvenido. Inicia sesión para acceder
        </h6>
        <p className="text-zinc-400 mt-4 mb-2 text-sm md:text-base 3xl:text-lg ">
          Todavía no tienes una cuenta?
          <Link href={"/auth/register"} className="text-zinc-100 ml-2">
            Registrate
          </Link>
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-400"></div>
          <span className="text-gray-300 text-sm">o</span>
          <div className="flex-1 h-px bg-gray-400"></div>
        </div>

        <form
          className="relative flex flex-col gap-2 mt-3 "
          onSubmit={handleSubmit(submit)}
        >
          <input
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            placeholder="Email "
            className="bg-zinc-800 text-gray-200 border border-sky-700 rounded-md p-2 mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mb-2">{errors.email.message}</p>
          )}

          <input
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
            placeholder="Contraseña"
            className="bg-zinc-800 text-gray-200 border border-sky-700 rounded-md p-2 mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mb-2">
              {errors.password.message}
            </p>
          )}

          {loginError && (
            <div className="text-red-400 text-sm mb-2">
              <p>{loginError}</p>
            </div>
          )}
          {/* Botón de Google */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
            className="w-full bg-zinc-200 hover:bg-gray-100 text-gray-800 font-medium text-sm py-2 px-4 rounded-md mt-3 flex items-center justify-center gap-2 transition ease-in-out duration-150 disabled:opacity-50 md:text-base"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isGoogleLoading ? "Cargando..." : "Continuar con Google"}
          </button>

          <button
            className="border border-zinc-500 text-zinc-200 bg-linear-to-b from-sky-700 to-sky-900 font-semibold py-2 px-4 rounded-md mt-2 cursor-pointer transition ease-in-out duration-400 disabled:opacity-50 text-sm md:text-base"
            type="submit"
            disabled={isLoading || isGoogleLoading}
          >
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </section>
  );
}
