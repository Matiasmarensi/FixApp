"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { insertTicketSchema } from "@/zod-schemas/ticket";
import { z } from "zod";
import { selectCustomerSchemaType } from "@/zod-schemas/customers";

type InsertTicketSchemaType = z.infer<typeof insertTicketSchema>;

type Props = {
  customer: selectCustomerSchemaType;
  ticket?: InsertTicketSchemaType;
  techs?: {
    id: string;
    description: string;
  }[];
  isEditable?: boolean;
  isManager?: boolean | undefined;
};
export default function TicketForm({ customer, ticket }: Props) {
  const defaultValues: InsertTicketSchemaType = {
    id: ticket?.id,
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    completed: ticket?.completed ?? false,
    tech: ticket?.tech.toLowerCase() ?? "new-ticket@example.com",
  };
  const form = useForm<InsertTicketSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });
  async function submitForm(data: InsertTicketSchemaType) {
    console.log(data);
  }
  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {ticket?.id ? "Edit" : "New"}Ticket {ticket?.id ? `${ticket.id}` : "Form "}
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)} className="flex flex-col sm:flex-row gap-4 sm:gap-8"></form>
        <p>{JSON.stringify(form.getValues())}</p>
      </Form>
    </div>
  );
}
