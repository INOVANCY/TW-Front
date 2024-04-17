"use client";

import { OpenElementProvider } from "@/app/contexts/OpenElement";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

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
      <OpenElementProvider>{children}</OpenElementProvider>
    </ThemeProvider>
  );
}
