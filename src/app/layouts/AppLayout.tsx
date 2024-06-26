import Footer from "@/components/app/Footer";
import NavBar from "@/components/app/NavBar";
import React, { ReactNode } from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="mb-6">
        <NavBar></NavBar>
        <div className="mx-auto w-11/12 2xl:w-9/12 mt-6">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
