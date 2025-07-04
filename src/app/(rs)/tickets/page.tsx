import TicketSearch from "./TicketSearch";
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import TicketTable from "./TicketTable";
export const metadata = {
  title: "Tickets",
};
const Tickets = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const { search } = await searchParams;
  if (!search) {
    const results = await getOpenTickets();

    return (
      <>
        <TicketSearch />
        {results.length ? <TicketTable data={results} /> : null}
      </>
    );
  }
  const results = await getTicketSearchResults(search);

  return (
    <>
      <TicketSearch />
      {results.length ? <TicketTable data={results} /> : <p className="text-center mt-4">No results found</p>}
    </>
  );
};

export default Tickets;
