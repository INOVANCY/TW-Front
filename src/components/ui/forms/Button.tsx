import React from "react";

export interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  color?: "primary" | "secondary";
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const TWButton = ({
  text,
  type,
  color = "primary",
  icon,
  onClick,
  className,
}: ButtonProps) => {
  const colors = {
    primary:
      "bg-gradient-to-r from-red-600 to-rose-600 shadow-red-600 text-white",
    secondary: "bg-slate-200 text-slate-800 shadow-slate-800",
  };
  return (
    <button
      onClick={onClick}
      type={type || "submit"}
      className={`py-1.5 px-3 border-none rounded-lg hover:shadow-sm cursor-pointer transition-all duration-300 ease-in-outrounded-lg flex items-center justify-center gap-2 ${colors[color]} ${className}`}
    >
      {icon && icon}
      <p>{text}</p>
    </button>
  );
};

export default TWButton;
