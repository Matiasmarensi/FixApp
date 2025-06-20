"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import InputWithLabel from "@/components/inputs/InputWithLabel";
import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
  type selectCustomerSchemaType,
} from "@/zod-schemas/customers";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import TextAreaWithLabel from "@/components/inputs/TextAreaWithLabel";
import SelectWithLabel from "@/components/inputs/SelectWithLabel";
import { StateArray } from "@/constants/StateArray";

type Props = {
  customer?: selectCustomerSchemaType;
};

export default function CustomerForm({ customer }: Props) {
  const searchParams = useSearchParams();
  const hasCustomerId = searchParams.has("customerId");

  const emptyValues: insertCustomerSchemaType = {
    id: 0,
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    notes: "",
    active: true,
  };

  const defaultValues: insertCustomerSchemaType = hasCustomerId
    ? {
        id: customer?.id ?? 0,
        firstName: customer?.firstName ?? "",
        lastName: customer?.lastName ?? "",
        address1: customer?.address1 ?? "",
        address2: customer?.address2 ?? "",
        city: customer?.city ?? "",
        state: customer?.state ?? "",
        zip: customer?.zip ?? "",
        phone: customer?.phone ?? "",
        email: customer?.email ?? "",
        notes: customer?.notes ?? "",
        active: customer?.active ?? true,
      }
    : emptyValues;

  const form = useForm<insertCustomerSchemaType>({
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
    mode: "onBlur", // o "onChange"
  });
  async function submitForm(data: insertCustomerSchemaType) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">{customer?.id ? "Edit Customer" : "New Customer"}</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)} className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertCustomerSchemaType> fieldTitle="First Name" nameInSchema="firstName" {...form} />
            <InputWithLabel<insertCustomerSchemaType> fieldTitle="Last Name" nameInSchema="lastName" {...form} />{" "}
            <InputWithLabel<insertCustomerSchemaType> fieldTitle="Address 1" nameInSchema="address1" {...form} />
            <InputWithLabel<insertCustomerSchemaType> fieldTitle="Address 2" nameInSchema="address2" {...form} />
            <InputWithLabel<insertCustomerSchemaType> fieldTitle="City" nameInSchema="city" {...form} />
            <SelectWithLabel<insertCustomerSchemaType> fieldTitle="State" nameInSchema="state" data={StateArray} />
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertCustomerSchemaType> fieldTitle="Zip" nameInSchema="zip" {...form} />
            <InputWithLabel<insertCustomerSchemaType> fieldTitle="Email" nameInSchema="email" {...form} />

            <InputWithLabel<insertCustomerSchemaType> fieldTitle="Phone" nameInSchema="phone" {...form} />

            <TextAreaWithLabel<insertCustomerSchemaType>
              fieldTitle="Notes"
              nameInSchema="notes"
              {...form}
              className="h-40"
            />
            <div className="flex gap-2">
              <Button type="submit" variant="default" className="w-3/4">
                Save
              </Button>
              <Button type="button" title="Reset" variant="secondary" onClick={() => form.reset(defaultValues)}>
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
