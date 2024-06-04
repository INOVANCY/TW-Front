import { ReactElement } from "react";

// Theme
type Theme = "light" | "dark" | "system";

// Navigation
type NavItem = {
  name: string;
  href: string;
  icon: ReactElement;
  code?: string;
  children?: NavItem[];
  rank?: "member" | "staff" | "admin";
};

type NavItems = NavItem[];

export type { Theme, NavItems };
