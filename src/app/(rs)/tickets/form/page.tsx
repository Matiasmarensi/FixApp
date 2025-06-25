import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import { Backbutton } from "@/components/Backbutton";
import TicketForm from "./TicketForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as kindeInit } from "@kinde/management-api-js";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const customerId = searchParams?.customerId;
  const ticketId = searchParams?.ticketid;

  if (customerId) {
    return {
      title: `Edit Customer ID #${customerId}`,
      description: `Edit details for customer ID #${customerId}`,
    };
  } else if (ticketId) {
    return {
      title: `Edit Ticket ID #${ticketId}`,
      description: `Edit details for ticket ID #${ticketId}`,
    };
  }
  return {
    title: "New Ticket Form",
    description: "Create a new ticket",
  };
}

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
          <Backbutton title="Go Back" variant="default" />
        </>
      );
    }
    const { getPermission, getUser } = await getKindeServerSession();
    const [managerPermission, user] = await Promise.all([getPermission("manager"), getUser()]);

    const isManager = managerPermission?.isGranted;

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
      if (isManager) {
        kindeInit();
        const { users } = await Users.getUsers();
        const techs = users
          ? users.map((user) => ({
              id: user.email!,
              description: user.email!,
            }))
          : [];
        return <TicketForm customer={customer} techs={techs} />;
      } else {
        return <TicketForm customer={customer} />;
      }
    }

    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">ID de Ticket {ticketId} no encontrado</h2>
            <Backbutton title="Go Back" variant="default" />
          </>
        );
      }

      const customer = await getCustomer(ticket.customerId);
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">ID de Cliente {ticket.customerId} no encontrado</h2>
            <Backbutton title="Go Back" variant="default" />
          </>
        );
      }
      if (isManager) {
        kindeInit();
        const { users } = await Users.getUsers();
        const techs = users
          ? users.map((user) => ({
              id: user.email!,
              description: user.email!,
            }))
          : [];
        return <TicketForm customer={customer} ticket={ticket} techs={techs} />;
      } else {
        const isEditable = user?.email?.toLowerCase() === ticket.tech.toLowerCase();

        return <TicketForm customer={customer} ticket={ticket} isEditable={isEditable} />;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    // Puedes retornar un mensaje de error genérico o redirigir
    return (
      <>
        <h2 className="text-2xl mb-2">Ocurrió un error al cargar la información.</h2>
        <Backbutton title="Go Back" variant="default" />
      </>
    );
  }
}
