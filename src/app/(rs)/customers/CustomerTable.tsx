"use client";
import type { selectCustomerSchemaType } from "@/zod-schemas/customers";

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, CellContext } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, TableOfContents } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  data: selectCustomerSchemaType[];
};
export default function CustomerTable({ data }: Props) {
  const router = useRouter();
  const columnHeaderArray: Array<keyof selectCustomerSchemaType> = ["firstName", "lastName", "email", "phone", "city"];
  const columnHelper = createColumnHelper<selectCustomerSchemaType>();
  const ActionsCell = ({ row }: CellContext<selectCustomerSchemaType, unknown>) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="min-w-[180px] space-y-1 px-2 py-2 bg-gray-800 shadow-md rounded-md border"
        >
          <DropdownMenuLabel className="text-sm text-muted-foreground px-2">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="px-4 py-2 text-base">
            <Link href={`/tickets/form?customerId=${row.original.id}`} className="w-full">
              New Ticket
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="px-4 py-2 text-base">
            <Link href={`/customers/form?customerId=${row.original.id}`} className="w-full">
              Edit Customer
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  ActionsCell.displayName = "ActionsCell";

  const columns = [
    columnHelper.display({
      id: "actions",
      header: () => <TableOfContents />,
      cell: ActionsCell,
    }),
    ...columnHeaderArray.map((columnName) => {
      return columnHelper.accessor(columnName, {
        id: columnName,
        header: columnName.charAt(0).toUpperCase() + columnName.slice(1),
      });
    }),
  ];
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
                  <TableHead
                    key={headers.id}
                    className={`bg-secondary${headers.id === "actions" ? " w-12" : ""} text-secondary-foreground`}
                  >
                    <div className={`${headers.id === "actions" ? "w-12" : ""}`}>
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
              className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/55"
              onClick={() => {}}
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
