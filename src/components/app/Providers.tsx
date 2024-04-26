"use client";

import { OpenElementProvider } from "@/contexts/OpenElement";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { useState, useEffect } from "react";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  return (
    <ThemeProvider attribute="class">
      <NextTopLoader color="#dc2626" />
      <OpenElementProvider>{children}</OpenElementProvider>
    </ThemeProvider>
  );
}
