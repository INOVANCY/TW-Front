import Footer from "@/components/app/Footer";
import NavBar from "@/components/app/NavBar";
import Logo from "@/components/ui/logo";
import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        <div className="md:w-3/5 h-1/4 md:h-full p-8 border-e">
          <div className="w-full h-full rounded-xl bg-white relative">
            <Image
              src="/dev/kondaa.jpg"
              alt="Todays Picture from User"
              fill={true}
              objectFit="cover"
              className="rounded-xl"
            />
            <div className="absolute bottom-5 left-5 px-2 py-1 rounded-lg bg-red-200/50 border border-red-200/50 shadow-md text-red-600 font-medium">
              <div className="flex items-center gap-2">
                <Logo width={20} height={20} />
                <p className="text-xs md:text-base">
                  Photo du jour par @gaspard.dlx
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-2/5 p-8 pt-0 md:p-0 flex md:justify-center md:items-center">
          <div className="md:w-2/3">{children}</div>
        </div>
      </div>
    </div>
  );
}
