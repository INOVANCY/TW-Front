import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Button } from "./button";
import {
  IconChevronLeft,
  IconChevronLeftPipe,
  IconChevronRight,
  IconChevronRightPipe,
} from "@tabler/icons-react";

interface DataTablePaginationProps {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
}

export function DataTablePagination<TData>({
  pageIndex,
  pageSize,
  pageCount,
  setPageIndex,
  setPageSize,
}: DataTablePaginationProps) {
  return (
    <div className="flex items-center justify-end mt-4">
      <div className="flex items-center space-x-2">
        <p className="text-sm">Lignes par page:</p>
        <Select
          value={pageSize.toString()}
          onValueChange={(value: any) => {
            setPageSize(parseInt(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[5, 10, 15, 20].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-[100px] items-center justify-center text-sm">
        Page {pageIndex + 1} sur {pageCount}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => setPageIndex(0)}
          disabled={pageIndex === 0}
        >
          <span className="sr-only">Go to first page</span>
          <IconChevronLeftPipe className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 0}
        >
          <span className="sr-only">Go to previous page</span>
          <IconChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={pageIndex >= pageCount - 1}
        >
          <span className="sr-only">Go to next page</span>
          <IconChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => setPageIndex(pageCount - 1)}
          disabled={!pageCount || pageIndex >= pageCount - 1}
        >
          <span className="sr-only">Go to last page</span>
          <IconChevronRightPipe className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
