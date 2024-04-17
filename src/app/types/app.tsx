import { ReactElement } from "react";

// Theme
type Theme = "light" | "dark" | "system";

// Navigation
type NavItem = {
  name: string;
  href: string;
  icon: ReactElement;
  children?: NavItem[];
};

type NavItems = NavItem[];

export type { Theme, NavItems };
