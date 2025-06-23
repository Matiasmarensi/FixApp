"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { insertTicketSchema } from "@/zod-schemas/ticket";
import { z } from "zod";
import { selectCustomerSchemaType } from "@/zod-schemas/customers";
import SelectWithLabel from "@/components/inputs/SelectWithLabel";
import InputWithLabel from "@/components/inputs/InputWithLabel";

import TextAreaWithLabel from "@/components/inputs/TextAreaWithLabel";
import { Button } from "@/components/ui/button";
import CheckboxwithLabel from "@/components/inputs/CheckboxwithLabel";
import { Select } from "@radix-ui/react-select";
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
export default function TicketForm({ customer, ticket, techs, isEditable = true }: Props) {
  const isManager = Array.isArray(techs) && techs.length > 0;

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
        <form onSubmit={form.handleSubmit(submitForm)} className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<InsertTicketSchemaType>
              fieldTitle="Title"
              nameInSchema="title"
              {...form}
              disabled={!isEditable}
            />
            {isManager ? (
              <SelectWithLabel<InsertTicketSchemaType>
                fieldTitle="Tech"
                nameInSchema="tech"
                {...form}
                data={[{ id: "new-ticket@example.com", description: "New Ticket" }, ...techs]}
              />
            ) : (
              <InputWithLabel<InsertTicketSchemaType> fieldTitle="Tech" nameInSchema="tech" {...form} disabled={true} />
            )}
            {ticket?.id ? (
              <CheckboxwithLabel<InsertTicketSchemaType>
                fieldTitle="Completed"
                nameInSchema="completed"
                message="Is this ticket completed?"
                disabled={!isEditable}
              />
            ) : null}

            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold">Customer Info</h3>
              <hr className="w-4/5" />
              <p>
                {customer.firstName} {customer.lastName}
              </p>
              <p>{customer.address1}</p>
              {customer.address2 ? <p>{customer.address2}</p> : null}
              <p>
                {customer.city}, {customer.state} {customer.zip}
              </p>

              <p>Phone: {customer.phone}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <TextAreaWithLabel<InsertTicketSchemaType>
              fieldTitle="Description"
              nameInSchema="description"
              {...form}
              className="h-96"
              disabled={!isEditable}
            />
            {isEditable ? (
              <div className="flex gap-2">
                <Button type="submit" variant="default" className="w-3/4">
                  Save
                </Button>
                <Button type="button" title="Reset" variant="secondary" onClick={() => form.reset(defaultValues)}>
                  Reset
                </Button>
              </div>
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  );
}
