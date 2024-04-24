// Types des composants d'UI

import { ReactElement } from "react";

// Logo
export interface LogoProps {
  width?: number;
  height?: number;
}

// Formulaires
export interface InputProps {
  name: string;
  label: string;
  register: any;
  errors: any;
  type: string;
  validationSchema: any;
  className?: string;
}

export interface CheckboxProps {
  name: string;
  label: React.ReactNode;
  register: any;
  errors: any;
  validationSchema: any;
  className?: string;
}

export interface TextareaProps {
  name: string;
  label: string;
  rows?: number;
  register: any;
  errors: any;
  validationSchema: any;
  className?: string;
}

export interface TextDividerProps {
  text: string;
  className?: string;
}

// Tabs
export interface TWTabsLabelsList {
  label: string;
  icon?: ReactElement;
}

export interface TWTabsProps {
  activeTab: number;
  labels: TWTabsLabelsList[];
  onClick: (index: number) => void;
}
