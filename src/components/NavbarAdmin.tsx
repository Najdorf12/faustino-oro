// components/NavbarAdmin.tsx
import LogoutButton from "./LogoutButton";
import Link from "next/link";


export default function NavbarAdmin() {
  return (
    <nav className="bg-zinc-900 p-4 border-b border-zinc-700">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div>
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        </div>

        <div className="">
    

          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
