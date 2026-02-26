import NavbarAuth from "@/components/admin/NavbarAuth";
import Image from "next/image";
import imgAuth from "../../assets/images/chess/18.jpg";
import icon from "@/assets/images/icons/iconKnight.svg";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex justify-center items-center min-h-screen lg:h-screen">
      <NavbarAuth />
      <section className="absolute h-full w-full flex items-center justify-center inset-0 lg:relative lg:w-1/2">
        <div className="bg-zinc-800/25 absolute inset-0 z-20"></div>
        <figure className=" w-full h-full">
          <Image
            src={imgAuth}
            alt="img-auth"
            className="object-cover w-full h-full "
          ></Image>
        </figure>
      </section>
      <section className="relative z-50 w-full lg:w-1/2 flex items-center justify-center bg-linear-to-tr from-zinc-900 to-zinc-800 ">
        {children}
      </section>
      <div className="fixed z-200 right-0.5 bottom-2 md:bottom-2 w-9 sm:w-10 2xl:w-12">
        <Image src={icon} alt="icon" className="w-full"></Image>
      </div>
    </section>
  );
}
