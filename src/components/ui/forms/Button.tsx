import React from "react";

export interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const TWButton = ({ text, type, icon, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type || "submit"}
      className={`py-1.5 px-3 bg-gradient-to-r from-red-600 to-rose-600 border-none hover:shadow-lg cursor-pointer transition-all duration-300 ease-in-out shadow-red-600 text-white rounded-lg flex items-center justify-center gap-2 ${className}`}
    >
      {icon && icon}
      <p>{text}</p>
    </button>
  );
};

export default TWButton;
