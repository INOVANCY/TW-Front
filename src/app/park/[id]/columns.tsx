import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-header";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Rides = {
  id: number;
  name: string;
  type: string;
  manufacturer: string;
};

export const ridesColumns: ColumnDef<Rides>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nom" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    accessorKey: "manufacturer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Constructeur" />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Button variant="link" size="link" asChild>
          <Link href={`/park/${row.id}`}> Voir</Link>
        </Button>
      );
    },
  },
];
