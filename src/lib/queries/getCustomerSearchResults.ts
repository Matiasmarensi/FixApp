import { db } from "../../db";
import { customers } from "../../db/schema";

import { ilike, or, sql } from "drizzle-orm";

export async function getCustomerSearchResults(search: string) {
  const results = await db
    .select()
    .from(customers)
    .where(
      or(
        ilike(customers.firstName, `%${search}%`),
        ilike(customers.lastName, `%${search}%`),
        ilike(customers.email, `%${search}%`),
        ilike(customers.phone, `%${search}%`),
        //combitantion name and lastname
        sql`lower(concat(${customers.firstName}, ' ', ${customers.lastName})) LIKE ${`%${search
          .toLowerCase()
          .replace(` `, `%`)}%`}`
        //combitantion lastname and name
      )
    );

  return results;
}
