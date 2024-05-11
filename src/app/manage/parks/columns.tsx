"use client";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconDotsCircleHorizontal,
  IconEdit,
  IconEye,
  IconTexture,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Park = {
  id: number;
  name: string;
  city: string;
  country: string;
};

export const columns = (
  onEditButtonClick: any,
  onZoneEditButtonClick: any
): ColumnDef<Park>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nom" />
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ville" />
    ),
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pays" />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const park = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir le menu</span>
              <IconDotsCircleHorizontal size={22} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <IconEye size={18} className="me-2" />
              <Link href={`/park/` + park.id}>Voir sur Thrills World</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onEditButtonClick(park.id)}
            >
              <IconEdit size={18} className="me-2" /> Modifier
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onZoneEditButtonClick(park.id)}
            >
              <IconTexture size={18} className="me-2" /> Modifier les zones du
              parc
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
