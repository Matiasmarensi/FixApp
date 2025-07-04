import { Column } from "@tanstack/react-table";
import { DebouncedInput } from "./DebouncedInput";
import { array } from "zod";

type Props<T> = {
  column: Column<T, unknown>;
  filteredRows: string[];
};

export default function Filter<T>({ column, filteredRows }: Props<T>) {
  const columnFilteredValue = column.getFilterValue();
  const uniqueFilteredValues = new Set(filteredRows);
  const sortedUniquedValues = Array.from(uniqueFilteredValues).sort();

  return (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniquedValues.map((value, i) => (
          <option key={`${i}-${column.id}`} value={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilteredValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${[uniqueFilteredValues.size]})...`}
        className="w-full  shadow border rounded bg-card"
        list={column.id + "list"}
      />
    </>
  );
}
