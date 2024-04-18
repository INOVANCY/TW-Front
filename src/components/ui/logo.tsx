import { LogoProps } from "@/types/ui";
import Image from "next/image";
import React from "react";

const Logo: React.FC<LogoProps> = ({ width = 100, height = 100 }) => {
  return (
    <Image
      src={"/logomark.svg"}
      alt="Thrills World Logomark"
      width={width}
      height={height}
    />
  );
};

export default Logo;
