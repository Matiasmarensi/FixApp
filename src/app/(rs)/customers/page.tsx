import React from "react";
import CustomerSearch from "./CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults";

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
      <p>{JSON.stringify(results)}</p>
    </>
  );
};

export default Customers;
