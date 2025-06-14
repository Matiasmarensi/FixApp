import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { customers } from "../db/schema";

export const insertCustomerSchema = z.object({
  id: z.number().optional(),
  firstName: z.string(),

  lastName: z.string(),

  address1: z.string(),

  address2: z.string().nullable().optional(),

  city: z.string(),

  state: z.string(),

  email: z.string(),

  zip: z.string(),

  phone: z.string(),
  notes: z.string().nullable().optional(),
  active: z.boolean(),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = z.infer<typeof insertCustomerSchema>;
export type selectCustomerSchemaType = z.infer<typeof selectCustomerSchema>;
