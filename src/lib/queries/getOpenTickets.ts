import { db } from "../../db";
import { tickets, customers } from "../../db/schema";

import { eq } from "drizzle-orm";

export async function getOpenTickets() {
  const results = await db
    .select({
      ticketDate: tickets.createdAt,
      title: tickets.title,
      description: tickets.description,
      tech: tickets.tech,
      FirstName: customers.firstName,
      LastName: customers.lastName,
      email: customers.email,
      phone: customers.phone,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(eq(tickets.completed, false));

  return results;
}
