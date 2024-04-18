import { ButtonProps } from "@/types/ui";
import React from "react";

const TWButton = ({ text, className }: ButtonProps) => {
  return (
    <input
      type="submit"
      className={`p-2 bg-gradient-to-r from-red-600 to-rose-600 border-none hover:shadow-lg cursor-pointer transition-all duration-300 ease-in-out shadow-red-600 text-white rounded ${className}`}
      value={text}
    />
  );
};

export default TWButton;
