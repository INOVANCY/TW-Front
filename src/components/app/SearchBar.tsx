"use client";

import { useOpenElement } from "@/contexts/OpenElement";
import {
  IconArrowBack,
  IconRollercoaster,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const { openElement, setOpenElement } = useOpenElement();

  const handleButtonClick = () => {
    setOpenElement("search");
  };

  const handleClose = () => {
    setOpenElement(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (openElement === "search") {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    // Cleanup function
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openElement]);

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="py-1.5 px-3 border-2 border-red-600 rounded-lg text-red-600 focus:outline-none dark:text-black font-medium flex items-center gap-2 text-sm"
      >
        <IconSearch size={20} />
        Rechercher n'importe quoi...
      </button>
      <div
        className={`fixed z-40 top-0 left-0 w-full min-h-screen bg-black/30 flex justify-center transition-opacity duration-300 ${
          openElement === "search"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg w-1/3 h-fit mt-48">
          <div className="p-4 flex items-center justify-between">
            <div className="flex flex-grow items-center gap-2 text-slate-800">
              <IconSearch size={24} />
              <input
                className="focus:outline-none flex-grow"
                type="text"
                autoFocus
              />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-slate-800">[esc]</p>
              <button onClick={() => handleClose()} className="text-slate-800">
                <IconX stroke={1} size={24} />
              </button>
            </div>
          </div>
          <hr />
          {/* Results */}
          <div className="flex flex-col py-4 p-1">
            <p className="text-slate-400 uppercase text-xs px-4 mb-2">
              Attractions
            </p>
            <a
              href=""
              className="flex items-center justify-between hover:bg-slate-200/50 p-2 px-4 rounded-lg mb-1 group"
            >
              <div className="flex items-center gap-2 text-slate-700">
                <IconRollercoaster size={24} />
                <p>Kondaa - Walibi Belgium</p>
              </div>
              <IconArrowBack
                size={24}
                className="text-slate-700 hidden group-hover:block"
              />
            </a>
            <a
              href=""
              className="flex items-center justify-between hover:bg-slate-200/50 p-2 px-4 rounded-lg group"
            >
              <div className="flex items-center gap-2 text-slate-700">
                <IconRollercoaster size={24} />
                <p>Taron - Phantasialand</p>
              </div>
              <IconArrowBack
                size={24}
                className="text-slate-700 hidden group-hover:block"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
