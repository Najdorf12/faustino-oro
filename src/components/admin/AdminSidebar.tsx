"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
import Image from "next/image";
import iconKnight from "@/assets/images/icons/iconKnight.svg";

const menuItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: "📊",
  },
  {
    href: "/admin/notices",
    label: "Noticias",
    icon: "📰",
  },
  {
    href: "/admin/tournaments",
    label: "Torneos",
    icon: "🏆",
  },
  {
    href: "/admin/achievements",
    label: "Logros",
    icon: "🎖️",
  },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-1 left-3 z-100 bg-sky-700 text-white p-3 rounded-lg shadow-lg hover:bg-sky-800 transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          className=" lg:hidden fixed inset-0 bg-opacity-50 z-40 transition-opacity"
          onClick={closeSidebar}
        />
      )}
      <div className="flex flex-col items-center justify-center md:flex-row py-6 gap-5 self-center md:gap-6 lg:gap-9 lg:py-12">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={closeSidebar}>
              <button
                className={`
                  z-100 border-2 border-sky-600 hover:scale-105 duration-300 relative group cursor-pointer text-zinc-200 overflow-hidden h-10 w-60 md:w-65 rounded-md  p-2 flex justify-between pl-3 items-center font-medium md:text-lg lg:w-70 hover:bg-zinc-200 hover:text-zinc-700 hover:border-zinc-300 lg:h-12
                  ${
                    isActive
                      ? " text-zinc-600 bg-zinc-200 "
                      : "text-gray-300 bg-sky-700"
                  }
                `}
              >
                <div className="absolute top-0 -right-3 z-10 w-16 h-16 rounded-full scale-150 group-hover:-right-3 duration-500 bg-sky-500"></div>
                <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-1 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-500 bg-sky-600"></div>
                <div className="absolute right-2 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150 duration-500 bg-sky-800"></div>
                <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-1 z-10 w-24 h-24 rounded-full group-hover:scale-150 duration-500 bg-sky-600"></div>
                <p className="z-10"> {item.label}</p>
                <span className="text-2xl z-50 lg:text-3xl xl:text-4xl 2xl:text-5xl flex items-center justify-center h-8 lg:h-10 xl:h-12 2xl:h-14">
                  {item.icon}
                </span>
              </button>
            </Link>
          );
        })}
      </div>
    </>
  );
}
