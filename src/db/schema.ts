import { pgTable, serial, varchar, boolean, integer, text, timestamp } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 15 }).notNull(),
  lastName: varchar("last_name", { length: 15 }).notNull(),
  email: varchar("email", { length: 60 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }).unique().notNull(),
  address1: varchar("address1", { length: 30 }).notNull(),
  address2: varchar("address2", { length: 30 }),
  city: varchar("city", { length: 15 }).notNull(),
  state: varchar("state", { length: 15 }).notNull(),
  zip: varchar("zip", { length: 10 }).notNull(),
  notes: text("notes"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .references(() => customers.id)
    .notNull(),
  title: varchar("title", { length: 30 }).notNull(),
  description: text("description").notNull(),
  tech: varchar("tech", { length: 15 }).notNull().default("unassigned"),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const customersRelations = relations(customers, ({ many }) => ({
  tickets: many(tickets),
}));

export const ticketsRelations = relations(tickets, ({ one }) => ({
  customer: one(customers, {
    fields: [tickets.customerId],
    references: [customers.id],
  }),
}));
