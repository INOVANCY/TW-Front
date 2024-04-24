import { IconX } from "@tabler/icons-react";
import { ReactNode } from "react";

interface TWModalProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  onClose: () => void;
}

const TWModal = ({ children, size = "sm", onClose }: TWModalProps) => {
  const sizes = {
    sm: "w-1/3",
    md: "w-1/2",
    lg: "w-2/3",
  };
  return (
    <div className="fixed top-0 left-0 w-full min-h-screen bg-black/30 flex justify-center">
      <div className={`relative mt-48 w-1/3 ${sizes[size]}`}>
        {children}
        <div
          className="absolute top-0 right-0 p-5 text-slate-800 cursor-pointer"
          onClick={onClose}
        >
          <IconX size={20} />
        </div>
      </div>
    </div>
  );
};

export default TWModal;
