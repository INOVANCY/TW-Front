"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "./data-table-pagination";
import { useEffect, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { useDebounce } from "use-debounce";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  onPageChange: (pageIndex: number, pageSize: number, query: string) => void;
  onAddButtonClick?: () => void;
  onEditButtonClick?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  onPageChange,
  onAddButtonClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // Pagination
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  // Query
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    manualPagination: true,
  });

  useEffect(() => {
    if (onPageChange) {
      onPageChange(pageIndex, pageSize, debouncedQuery);
    }
  }, [pageIndex, pageSize, debouncedQuery]);

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Rechercher un élément"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="max-w-sm"
        />
        {onAddButtonClick && (
          <Button onClick={() => onAddButtonClick()}>Ajouter un élément</Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun élément trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageCount={pageCount}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
      />
    </div>
  );
}
