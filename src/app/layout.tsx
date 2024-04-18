import type { Metadata } from "next";
import NavBar from "@/components/app/NavBar";
import "./globals.css";
import Providers from "@/components/app/Providers";
import Footer from "@/components/app/Footer";

export const metadata: Metadata = {
  title: "Thrills World - Your thrills. One app.",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
