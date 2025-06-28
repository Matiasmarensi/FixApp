import TicketSearch from "./TicketSearch";
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
export const metadata = {
  title: "Tickets",
};
const Tickets = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  console.log("Tickets searchParams", searchParams);
  const { search } = await searchParams;
  if (!search) {
    const results = await getOpenTickets();

    return (
      <>
        <TicketSearch />
        <p>{JSON.stringify(results)}</p>
      </>
    );
  }
  const results = await getTicketSearchResults(search);

  return (
    <>
      <TicketSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  );
};

export default Tickets;
