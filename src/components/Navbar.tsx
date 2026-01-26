import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full px-20 absolute top-0 bg-zinc-700 py-3 ">
      <ul className="flex justify-end items-center gap-6  lg:gap-12 text-zinc-100">
        <li>
          <Link href={"/auth/login"}>Login</Link>
        </li>
        <Link href={"/auth/register"}>Register</Link>
      </ul>
    </nav>
  );
}
