"use client";

import { useOpenElement } from "@/contexts/OpenElement";
import {
  IconArrowBack,
  IconFountain,
  IconRollercoaster,
  IconSearch,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import Link from "next/link";
import { useDebounce } from "use-debounce";
import SearchService from "@/services/SearchService";

type Park = {
  _id: string;
  name: string;
  city: string;
};

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
};

type Results = {
  parks: Park[];
  users: User[];
} | null;

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useDebounce(query, 300);
  const [results, setResults] = useState<Results>(null);

  useEffect(() => {
    if (debouncedQuery && debouncedQuery.length > 3) {
      SearchService.mainSearch(debouncedQuery)
        .then((response) => {
          setResults(response.data.results);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setResults(null);
    }
  }, [debouncedQuery]);

  return (
    <>
      <Button variant="outline_red" size="sm" onClick={() => setIsOpen(true)}>
        <IconSearch size={20} className="md:me-2" />
        <span className="hidden md:block">Rechercher n'importe quoi...</span>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Taron, B&M, Hôtel Krønasår..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>
              Aucun résultat n'a été trouvé! Il fallait le faire...
            </CommandEmpty>
            {results && results.parks.length > 0 && (
              <CommandGroup heading="Parcs">
                {results.parks.map((park) => (
                  <CommandItem key={park._id} className="cursor-pointer">
                    <Link
                      href={`/park/${park._id}`}
                      className="flex justify-between items-center w-full"
                    >
                      <span className="flex items-center">
                        <IconFountain size={16} className="mr-2" />
                        {park.name}
                      </span>
                      <span className="text-muted-foreground ml-3">
                        {park.city}
                      </span>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results && results.users.length > 0 && (
              <CommandGroup heading="Utilisateurs">
                {results.users.map((user) => (
                  <CommandItem key={user._id} className="cursor-pointer">
                    <Link
                      href={`/user/${user.username}`}
                      className="flex justify-between items-center w-full"
                    >
                      <span className="flex items-center">
                        <IconUser size={16} className="mr-2" />

                        {user.firstName + " " + user.lastName}
                      </span>
                      <span className="text-muted-foreground ml-3">
                        {user.username}
                      </span>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
