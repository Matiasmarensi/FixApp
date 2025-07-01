"use client";
import type { selectCustomerSchemaType } from "@/zod-schemas/customers";

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";

import { useRouter } from "next/navigation";

type Props = {
  data: selectCustomerSchemaType[];
};
export default function CustomerTable({ data }: Props) {
  const router = useRouter();
  const columnHeaderArray: Array<keyof selectCustomerSchemaType> = ["firstName", "lastName", "email", "phone", "city"];
  const columnHelper = createColumnHelper<selectCustomerSchemaType>();
  const columns = columnHeaderArray.map((columnName) => {
    return columnHelper.accessor(columnName, {
      id: columnName,
      header: columnName.charAt(0).toUpperCase() + columnName.slice(1),
    });
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
                console.log(row.original.id);
                router.push(`/customers/form?customerId=${row.original.id}`);
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
