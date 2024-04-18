import Footer from "@/components/app/Footer";
import NavBar from "@/components/app/NavBar";
import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="bg-red-500">
        {/* <Image
          src="/dev/kondaa.jpg"
          alt="Todays picture from user"
          objectFit="cover"
          layout="fill"
        /> */}
      </div>
      {children}
    </div>
  );
}
