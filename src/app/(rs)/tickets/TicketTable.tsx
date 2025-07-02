"use client";
import type { TicketSearchResultsType } from "@/lib/queries/getTicketSearchResults";

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  data: TicketSearchResultsType;
};
type RowType = TicketSearchResultsType[0];

export default function TicketTable({ data }: Props) {
  const router = useRouter();
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
        header: columnName.charAt(0).toUpperCase() + columnName.slice(1),
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
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-6 rounded-lg overflow-hidden border border-border">
      <Table className="border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((headers) => {
                return (
                  <TableHead key={headers.id} className="bg-secondary text-secondary-foreground">
                    <div>
                      {headers.isPlaceholder ? null : flexRender(headers.column.columnDef.header, headers.getContext())}
                    </div>
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
  );
}
