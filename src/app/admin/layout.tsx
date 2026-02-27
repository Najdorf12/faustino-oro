// app/admin/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NavbarAdmin from "@/components/admin/NavbarAdmin";
import AdminSidebar from "@/components/admin/AdminSidebar";
import LogoutButton from "@/components/admin/LogoutButton";

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
    <section className="min-h-screen">
      <NavbarAdmin />

      <section className="w-full bg-zinc-200 flex flex-col py-7 px-4 lg:flex-row-reverse items-center lg:justify-between lg:px-16 lg:py-10 3xl:py-12">
        <article className="flex w-full lg:w-auto">
          <div className="flex flex-col text-start">
            <p className="text-lg sm:text-xl lg:text-2xl text-zinc-500 3xl:text-3xl">
              Bienvenido {session.user?.name}
            </p>
            <p className="text-zinc-400 mb-2 text-sm sm:text-base lg:mb-3 3xl:text-lg">
              {session.user?.email}
            </p>
            <LogoutButton />
          </div>
        </article>

        <h6 className="text-3xl font-medium text-zinc-500 mt-9 lg:mt-0 lg:text-5xl 3xl:text-6xl">
          Panel de Administración
        </h6>
      </section>

      <div className="lg:flex relative lg:flex-col">
        <AdminSidebar />

        <section className="relative ">
          {children}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
        linear-gradient(to right, #3f3f46 1px, transparent 1px),
        linear-gradient(to bottom, #3f3f46 1px, transparent 1px)
      `,
              backgroundSize: "150px 150px",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
            }}
          />
        </section>
      </div>
    </section>
  );
}
