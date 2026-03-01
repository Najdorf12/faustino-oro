"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    const confirmed = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    
    if (!confirmed) return;

    setIsLoading(true);
    try {
      await signOut({
        redirect: false,
        callbackUrl: "/auth/login",
      });
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="border border-red-500 text-zinc-600 hover:bg-red-600 hover:text-zinc-300 group  max-w-42 py-1 px-4 rounded-md transition ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer md:font-medium"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 fill-red-500 group-hover:fill-zinc-300 duration-300"
        viewBox="0 0 20 20"
        fill=""
      >
        <path
          fillRule="evenodd"
          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
          clipRule="evenodd"
        />
      </svg>
      {isLoading ? "Cerrando sesión..." : "Cerrar sesión"}
    </button>
  );
}