import { db } from "../../db";
import { tickets, customers } from "../../db/schema";

import { eq, ilike, or } from "drizzle-orm";

export async function getTicketSearchResults(search: string) {
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
    .where(
      or(
        ilike(tickets.title, `%${search}%`),
        ilike(tickets.description, `%${search}%`),
        ilike(customers.firstName, `%${search}%`),
        ilike(customers.lastName, `%${search}%`),
        ilike(customers.email, `%${search}%`),
        ilike(customers.phone, `%${search}%`),
        ilike(tickets.tech, `%${search}%`)
      )
    );

  return results;
}
