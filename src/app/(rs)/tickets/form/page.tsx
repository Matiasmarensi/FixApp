import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import { Backbutton } from "@/components/Backbutton";
export const dynamic = "force-dynamic";

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  try {
    const customerId = await searchParams?.customerId;
    const ticketId = await searchParams?.ticketid;

    // if no customerId or ticketId, return error message and go back t
    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">Ticker ID or Customer ID required to load ticket form</h2>
          <Backbutton title="Go Back" variant="default" />
        </>
      );
    }
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">Customer ID not found</h2>
            <Backbutton title="Go Back" variant="default" />
          </>
        );
      }
      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">Customer is not Active</h2>
            <Backbutton title="Go Back" variant="default" />
          </>
        );
      }
    }
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket ID {ticketId} not found</h2>
            <Backbutton title="Go Back" variant="default" />
          </>
        );
      }
      const customer = await getCustomer(ticket.customerId);

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">Customer ID {ticket.customerId} not found</h2>
            <Backbutton title="Go Back" variant="default" />
          </>
        );
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
