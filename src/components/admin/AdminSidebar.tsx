"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

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
        className="lg:hidden fixed top-1 left-3 z-5000 bg-sky-700 text-white p-3 rounded-lg shadow-lg hover:bg-sky-800 transition-colors"
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
          className="lg:hidden fixed inset-0 bg-opacity-50 z-40 transition-opacity"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-80 bg-sky-900 border-r border-zinc-700 z-100 
          pt-24 lg:translate-x-0 lg:static lg:w-full lg:h-auto lg:p-0 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
         transition-transform duration-300 ease-in-out`}
      >
        <nav className="lg:gap-2 lg:flex justify-center items-center 2xl:gap-4 lg:py-4 lg:shadow-2xl shadow-zinc-900">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={`
                  flex w-full items-center gap-3 px-3 lg:border lg:border-zinc-500 py-3 rounded-lg 
                  transition-all duration-200 lg:gap-4 lg:w-75 xl:w-80 2xl:w-90
                  ${
                    isActive
                      ? "bg-sky-700 text-white shadow-lg"
                      : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                  }
                `}
              >
                <span className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl flex items-center justify-center h-8 lg:h-10 xl:h-12 2xl:h-14">
                  {item.icon}
                </span>
                <span className="font-medium text-lg xl:text-xl 3xl:text-2xl">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
