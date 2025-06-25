"use server";

import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { tickets } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { insertTicketSchema, type InsertTicketSchemaType } from "@/zod-schemas/ticket";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";

export const saveTicketAction = actionClient
  .metadata({ actionName: "saveTicketAction" })

  .schema(insertTicketSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: ticket }: { parsedInput: InsertTicketSchemaType }) => {
    const { isAuthenticated } = await getKindeServerSession();
    const isAuth = isAuthenticated();
    if (!isAuth) {
      redirect("/login");
    }

    if (ticket.id === undefined || ticket.id === null) {
      const result = await db
        .insert(tickets)
        .values({
          customerId: ticket.customerId,
          title: ticket.title,
          description: ticket.description,
          tech: ticket.tech,
        })
        .returning({ updatedId: tickets.id });
      console.log("Ticket created with ID:", result[0].updatedId);

      return { message: "Ticket created successfully", ticketId: result[0].updatedId };
    }
    // Existing ticket
    const result = await db
      .update(tickets)
      .set({
        customerId: ticket.customerId,
        title: ticket.title,
        description: ticket.description,
        tech: ticket.tech,
        completed: ticket.completed,
      })
      .where(eq(tickets.id, ticket.id!))
      .returning({ insertedId: tickets.id });

    return { message: "Ticket updated successfully", ticketId: result[0].insertedId };
  });
