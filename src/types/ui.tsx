// Types des composants d'UI

// Logo
export interface LogoProps {
  width?: number;
  height?: number;
}

export interface InputProps {
  name: string;
  label: string;
  register: any;
  errors: any;
  required: boolean;
  type: string;
  validationSchema: any;
  className?: string;
}

export interface CheckboxProps {
  name: string;
  label: React.ReactNode;
  register: any;
  errors: any;
  required: boolean;
  validationSchema: any;
  className?: string;
}

export interface ButtonProps {
  text: string;
  className?: string;
}

export interface TextDividerProps {
  text: string;
  className?: string;
}
