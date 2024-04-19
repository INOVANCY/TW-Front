"use client";

import { OpenElementProvider } from "@/contexts/OpenElement";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import NextTopLoader from "nextjs-toploader";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class">
      <NextTopLoader color="#dc2626" />
      <OpenElementProvider>{children}</OpenElementProvider>
    </ThemeProvider>
  );
}
