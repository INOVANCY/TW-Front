import { TWTabsLabelsList, TWTabsProps } from "@/types/ui";
import { ReactElement, cloneElement } from "react";

const TWTabs = ({ activeTab, labels, onClick }: TWTabsProps) => (
  <div className="py-2 my-4 border-y">
    <div className="flex items-center gap-2">
      {labels.map(({ label, icon }, index) => (
        <button
          key={index}
          onClick={() => onClick(index)}
          className={`py-1.5 px-3 rounded-lg flex items-center gap-2 transition-colors duration-200 ${
            activeTab === index
              ? "bg-gradient-to-r from-red-600 to-rose-600 text-white"
              : "hover:bg-red-100 hover:text-red-600"
          }`}
        >
          {icon && cloneElement(icon, { size: 18 })}
          {label}
        </button>
      ))}
    </div>
  </div>
);

export default TWTabs;
