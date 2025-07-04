"use client";
import type { TicketSearchResultsType } from "@/lib/queries/getTicketSearchResults";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedUniqueValues,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { CircleCheckIcon, CircleXIcon, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Filter from "@/components/react-table/Filter";
import { useState } from "react";

type Props = {
  data: TicketSearchResultsType;
};
type RowType = TicketSearchResultsType[0];

export default function TicketTable({ data }: Props) {
  const router = useRouter();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "ticketDate",
      desc: false,
    },
  ]);

  const colomnWidth = {
    completed: 150,
    ticketDate: 150,
    tittle: 250,
    tech: 255,
    email: 225,
  };

  const columnHeaderArray: Array<keyof RowType> = [
    "id",
    "ticketDate",
    "title",
    "tech",
    "FirstName",
    "LastName",
    "email",
    "completed",
  ];
  const columnHelper = createColumnHelper<RowType>();
  const columns = columnHeaderArray.map((columnName) => {
    return columnHelper.accessor(
      (row) => {
        const value = row[columnName];
        if (columnName === "ticketDate" && value instanceof Date) {
          return value.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        }
        if (columnName === "completed") {
          return value ? "COMPLETED" : "OPEN";
        }
        return value;
      },
      {
        id: columnName,
        size: colomnWidth[columnName as keyof typeof colomnWidth] ?? undefined,
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="pl-1 w-full flex justify-between"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              {columnName[0].toUpperCase() + columnName.slice(1)}

              {column.getIsSorted() === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}

              {column.getIsSorted() === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}

              {column.getIsSorted() !== "desc" && column.getIsSorted() !== "asc" && (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        },
        cell: ({ getValue }) => {
          const value = getValue();
          if (columnName === "completed") {
            return (
              <div className="grid place-content-center">
                {value === "OPEN" ? (
                  <CircleXIcon className=" opacity-25" />
                ) : (
                  <CircleCheckIcon className="text-green-700 " />
                )}
              </div>
            );
          }
          return value;
        },
      }
    );
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-6 rounded-lg overflow-hidden border border-border">
        <Table className="border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((headers) => {
                  return (
                    <TableHead
                      key={headers.id}
                      className="bg-secondary text-secondary-foreground p-1"
                      style={{ width: headers.getSize() }}
                    >
                      <div>
                        {headers.isPlaceholder
                          ? null
                          : flexRender(headers.column.columnDef.header, headers.getContext())}
                      </div>
                      {headers.column.getCanFilter() ? (
                        <div className="grid place-content-center">
                          <Filter
                            column={headers.column}
                            filteredRows={table
                              .getFilteredRowModel()
                              .rows.map((row) => row.getValue(headers.column.id))}
                          />
                        </div>
                      ) : null}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/25"
                onClick={() => {
                  console.log("TICKET ID", row.original.id);

                  router.push(`/tickets/form?ticketid=${row.original.id}`);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center gap-1 flex-w">
        <div className="">
          <p className="whitespace-nowrap font-black">
            {`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
            &nbsp;&nbsp;
            {`[${table.getFilteredRowModel().rows.length} of ${
              table.getFilteredRowModel().rows.length !== 1 ? "total results" : "result"
            }]`}
          </p>
        </div>
        <div className="flex flex-row gap-1">
          <div className="flex flex-row gap-1">
            <Button
              variant="outline"
              onClick={() => {
                table.resetSorting();
              }}
            >
              Reset Sorting
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                table.resetColumnFilters();
              }}
            >
              Reset Filters
            </Button>
          </div>
          <div className="flex flex-row gap-1">
            <Button
              variant="outline"
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
