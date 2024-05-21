"use client";

import { useOpenElement } from "@/contexts/OpenElement";
import { Theme } from "@/types/app";
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useState, useEffect, use } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

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
    <Popover>
      <PopoverTrigger asChild>
        <IconSun size={24} className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent sideOffset={10} align="center" className="w-40">
        <Button
          onClick={() => handleThemeChange("system")}
          variant={theme === "system" ? "secondary" : "ghost"}
          className="w-full mb-2"
        >
          <IconDeviceDesktop className="me-2" size={20} /> Système
        </Button>
        <Button
          onClick={() => handleThemeChange("dark")}
          variant={theme === "dark" ? "secondary" : "ghost"}
          className="w-full mb-2"
        >
          <IconMoon className="me-2" size={20} /> Sombre
        </Button>
        <Button
          onClick={() => handleThemeChange("light")}
          variant={theme === "light" ? "secondary" : "ghost"}
          className="w-full"
        >
          <IconSun className="me-2" size={20} /> Clair
        </Button>
      </PopoverContent>
    </Popover>
  );
}
