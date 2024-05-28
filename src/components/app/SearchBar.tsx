"use client";

import { useOpenElement } from "@/contexts/OpenElement";
import {
  IconArrowBack,
  IconRollercoaster,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import Link from "next/link";

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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openElement]);

  return (
    <>
      <Button
        variant="outline_red"
        size="sm"
        onClick={() => setOpenElement("search")}
      >
        <IconSearch size={20} className="md:me-2" />
        <span className="hidden md:block">Rechercher n'importe quoi...</span>
      </Button>
      <CommandDialog
        open={openElement === "search"}
        onOpenChange={() => setOpenElement(null)}
      >
        <CommandInput placeholder="Taron, B&M, Hôtel Krønasår..." />
        <CommandList>
          <CommandEmpty>
            Aucun résultat n'a été trouvé! Il fallait le faire...
          </CommandEmpty>
          <CommandGroup heading="Attractions">
            <CommandItem>
              <IconRollercoaster className="!w-4 !h-4 mr-2" />
              <span>Taron Phantasialand</span>
            </CommandItem>
            <CommandItem>Colorado Adventure - Phantasialand</CommandItem>
            <CommandItem>Black Mamba - Phantasialand</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
