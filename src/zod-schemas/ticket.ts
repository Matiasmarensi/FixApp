import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tickets } from "../db/schema";
import { z } from "zod";

export const insertTicketSchema = createInsertSchema(tickets, {
  id: z.number().min(1).optional(),
  title: (schema) => schema.min(1, "Title is required"),
  description: (schema) => schema.min(1, "Description is required"),
  tech: (schema) => schema.email({ message: "Invalid email" }),
});

export const selectCustomerSchema = createSelectSchema(tickets);

export type InsertTicketSchemaType = z.infer<typeof insertTicketSchema>;
export type SelectTicketSchemaType = z.infer<typeof selectCustomerSchema>;
