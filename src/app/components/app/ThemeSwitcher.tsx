"use client";

import { Theme } from "@/app/types/app";
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useState, useEffect, use } from "react";

export default function ThemeSwitcher() {
  // Variables
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Functions
  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    setIsDropdownOpen(false);
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
        className="text-gray-700 cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />
      <div
        className={`absolute left-0 top-10 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-3 flex flex-col gap-1 transition-all duration-300 transform ${
          isDropdownOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => handleThemeChange("system")}
          className={`text-left py-2 px-3 rounded-lg flex gap-3 items-center ${
            theme === "system"
              ? "bg-red-200/50 text-red-500"
              : "hover:bg-gray-200/50 text-slate-800"
          }`}
        >
          <IconDeviceDesktop size={20} /> Système
        </button>
        <button
          onClick={() => handleThemeChange("dark")}
          className={`text-left py-2 px-3 rounded-lg flex gap-3 items-center ${
            theme === "dark"
              ? "bg-red-200/50 text-red-500"
              : "hover:bg-gray-200/50 text-slate-800"
          }`}
        >
          <IconMoon size={20} /> Sombre
        </button>
        <button
          onClick={() => handleThemeChange("light")}
          className={`text-left py-2 px-3 rounded-lg flex gap-3 items-center ${
            theme === "light"
              ? "bg-red-200/50 text-red-500"
              : "hover:bg-gray-200/50 text-slate-800"
          }`}
        >
          <IconSun size={20} /> Clair
        </button>
      </div>
    </div>
  );
}
