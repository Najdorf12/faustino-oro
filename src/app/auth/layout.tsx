import NavbarAuth from "@/components/admin/NavbarAuth";
import Image from "next/image";
import imgAuth from "../../assets/images/chess/12.jpg";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex justify-center items-center min-h-screen lg:h-screen">
      <NavbarAuth />
      <section className="absolute h-full w-full flex items-center justify-center inset-0  bg-linear-to-tr from-sky-800 to-zinc-800 lg:relative lg:w-1/2">
        <div className="bg-zinc-800/75 absolute inset-0 z-20"></div>
        <figure className=" w-full h-full">
          <Image
            src={imgAuth}
            alt="img-auth"
            className="object-cover w-full h-full "
          ></Image>
        </figure>
      </section>
      <section className="relative z-50 w-full lg:w-1/2 flex items-center justify-center">
        {children}
      </section>
    
    </section>
  );
}
