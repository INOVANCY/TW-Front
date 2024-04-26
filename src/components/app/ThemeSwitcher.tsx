"use client";

import { useOpenElement } from "@/contexts/OpenElement";
import { Theme } from "@/types/app";
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useState, useEffect, use } from "react";

export default function ThemeSwitcher() {
  // Variables
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { openElement, setOpenElement } = useOpenElement();

  // Functions
  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    setOpenElement(null);
  };

  const handleOpenClose = () => {
    if (openElement === "themeSwitcher") {
      setOpenElement(null);
    } else {
      setOpenElement("themeSwitcher");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      <IconSun
        size={24}
        className="text-slate-800 cursor-pointer"
        onClick={() => handleOpenClose()}
      />
      <div
        className={`absolute z-20 left-0 top-10 w-48 py-2 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col transition-all duration-300 transform ${
          openElement === "themeSwitcher"
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => handleThemeChange("system")}
          className={`text-left mx-2 mt-0.5 px-3 py-2 rounded-lg flex gap-3 items-center ${
            theme === "system"
              ? "bg-red-200/50 text-red-600"
              : "hover:bg-slate-200/50 text-slate-800"
          }`}
        >
          <IconDeviceDesktop size={20} /> Système
        </button>
        <button
          onClick={() => handleThemeChange("dark")}
          className={`text-left mx-2 mt-0.5 px-3 py-2 rounded-lg flex gap-3 items-center ${
            theme === "dark"
              ? "bg-red-200/50 text-red-600"
              : "hover:bg-slate-200/50 text-slate-800"
          }`}
        >
          <IconMoon size={20} /> Sombre
        </button>
        <button
          onClick={() => handleThemeChange("light")}
          className={`text-left mx-2 mt-0.5 px-3 py-2 rounded-lg flex gap-3 items-center ${
            theme === "light"
              ? "bg-red-200/50 text-red-600"
              : "hover:bg-slate-200/50 text-slate-800"
          }`}
        >
          <IconSun size={20} /> Clair
        </button>
      </div>
    </div>
  );
}
