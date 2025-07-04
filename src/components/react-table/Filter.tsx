import { Column } from "@tanstack/react-table";
import { DebouncedInput } from "./DebouncedInput";
import { array } from "zod";

type Props<T> = {
  column: Column<T, unknown>;
};

export default function Filter<T>({ column }: Props<T>) {
  const columnFilteredValue = column.getFilterValue();
  const sortedUniquedValues = Array.from(column.getFacetedUniqueValues().keys()).sort();

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
        placeholder={`Search ${[...column.getFacetedUniqueValues()].filter((array) => array[0]).length})...`}
        className="w-full  shadow border rounded bg-card"
        list={column.id + "list"}
      />
    </>
  );
}
