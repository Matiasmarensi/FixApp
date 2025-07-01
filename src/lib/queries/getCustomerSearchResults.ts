import { db } from "../../db";
import { customers } from "../../db/schema";

import { ilike, or } from "drizzle-orm";

export async function getCustomerSearchResults(search: string) {
  const results = await db
    .select()
    .from(customers)
    .where(
      or(
        ilike(customers.firstName, `%${search}%`),
        ilike(customers.lastName, `%${search}%`),
        ilike(customers.email, `%${search}%`),
        ilike(customers.phone, `%${search}%`)
      )
    );

  return results;
}
