// components/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { 
    href: "/admin", 
    label: "Dashboard", 
    icon: "📊" 
  },
  { 
    href: "/admin/notices", 
    label: "Noticias", 
    icon: "📰" 
  },
  { 
    href: "/admin/tournaments", 
    label: "Torneos", 
    icon: "🏆" 
  },
  { 
    href: "/admin/logros", 
    label: "Logros", 
    icon: "🎖️" 
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-zinc-900 h-screen p-6 border-r border-zinc-700">
      <nav className="space-y-2 ">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg 
                transition-all duration-200
                ${isActive 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                }
              `}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}