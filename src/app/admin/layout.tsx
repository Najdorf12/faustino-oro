// app/admin/layout.tsx (con tabs)
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NavbarAdmin from "@/components/NavbarAdmin";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <section className="min-h-screen bg-zinc-800">
      <NavbarAdmin />

      <section className="max-w-7xl mx-auto mt-2">
        <article className="flex flex-col justify-center items-center text-center ">
          <div className="self-center ">
            <p className="text-2xl text-zinc-100">
              Bienvenido {session.user?.name}
            </p>
            <p className="text-zinc-500 font-medium">{session.user?.email}</p>
          </div>
          <h6 className="text-xl md:text-3xl font-medium text-gray-200 my-6">
            Panel de Administración
          </h6>
        </article>
      </section>

        <section className="flex bg-zinc-900">
          <AdminSidebar />
          {children}
        </section>
    </section>
  );
}
