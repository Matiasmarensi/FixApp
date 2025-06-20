import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import { Backbutton } from "@/components/Backbutton";
import TicketForm from "./TicketForm";

export const dynamic = "force-dynamic";

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  try {
    // Accede a las propiedades directamente, sin 'await'
    const customerId = searchParams?.customerId;
    const ticketId = searchParams?.ticketid;

    // Si no hay customerId o ticketId, devuelve un mensaje de error y regresa
    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Se requiere ID de Ticket o ID de Cliente para cargar el formulario de ticket
          </h2>
          <Backbutton title="Volver" variant="default" />
        </>
      );
    }

    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">ID de Cliente no encontrado</h2>
            <Backbutton title="Volver" variant="default" />
          </>
        );
      }
      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">El Cliente no está Activo</h2>
            <Backbutton title="Volver" variant="default" />
          </>
        );
      }
      return <TicketForm customer={customer} />;
    }

    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">ID de Ticket {ticketId} no encontrado</h2>
            <Backbutton title="Volver" variant="default" />
          </>
        );
      }

      // Asegúrate de que este bloque de código se ejecute y sea accesible
      const customer = await getCustomer(ticket.customerId);
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">ID de Cliente {ticket.customerId} no encontrado</h2>
            <Backbutton title="Volver" variant="default" />
          </>
        );
      }
      return <TicketForm ticket={ticket} customer={customer} />;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    // Puedes retornar un mensaje de error genérico o redirigir
    return (
      <>
        <h2 className="text-2xl mb-2">Ocurrió un error al cargar la información.</h2>
        <Backbutton title="Volver" variant="default" />
      </>
    );
  }
}
