import { db } from "../../db";
import { tickets, customers } from "../../db/schema";

import { eq, asc } from "drizzle-orm";

export async function getOpenTickets() {
  const results = await db
    .select({
      id: tickets.id,
      ticketDate: tickets.createdAt,
      title: tickets.title,
      description: tickets.description,
      tech: tickets.tech,
      FirstName: customers.firstName,
      LastName: customers.lastName,
      email: customers.email,
      phone: customers.phone,
      completed: tickets.completed,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(eq(tickets.completed, false))
    .orderBy(asc(tickets.createdAt));

  return results;
}

export type OpenTicketsType = Awaited<ReturnType<typeof getOpenTickets>>;
