import React from "react";
import CustomerSearch from "./CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults";
import CustomerTable from "./CustomerTable";

export const metadata = {
  title: "Customers",
};
const Customers = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const { search } = searchParams;

  if (!search) {
    return <CustomerSearch />;
  }
  const results = await getCustomerSearchResults(search);

  return (
    <>
      <CustomerSearch />
      {results.length ? <CustomerTable data={results} /> : <p className="text-center mt-4">No results found</p>}
    </>
  );
};

export default Customers;
