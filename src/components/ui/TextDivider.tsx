import { TextDividerProps } from "@/types/ui";

const TextDivider = ({ text, className }: TextDividerProps) => {
  return (
    <div className="flex items-center w-full">
      <div className="flex-grow border-t border-slate-300"></div>
      <span className="flex-shrink mx-4 text-slate-400 pb-1">{text}</span>
      <div className="flex-grow border-t border-slate-300"></div>
    </div>
  );
};
export default TextDivider;
