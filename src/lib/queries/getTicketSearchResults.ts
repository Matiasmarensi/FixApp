import { db } from "../../db";
import { tickets, customers } from "../../db/schema";

import { eq, ilike, or, sql, asc } from "drizzle-orm";

export async function getTicketSearchResults(search: string) {
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
    .where(
      or(
        ilike(tickets.title, `%${search}%`),
        ilike(customers.city, `%${search}%`),
        ilike(customers.email, `%${search}%`),
        ilike(customers.phone, `%${search}%`),
        ilike(tickets.tech, `%${search}%`),
        sql`lower(concat(${customers.firstName}, ' ', ${customers.lastName})) LIKE ${`%${search
          .toLowerCase()
          .replace(` `, `%`)}%`}`
      )
    )
    .orderBy(asc(tickets.createdAt));

  return results;
}

export type TicketSearchResultsType = Awaited<ReturnType<typeof getTicketSearchResults>>;
