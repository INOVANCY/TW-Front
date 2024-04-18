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
      <div>
        <NavBar></NavBar>
        <div className="mx-auto w-9/12 mt-6">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
