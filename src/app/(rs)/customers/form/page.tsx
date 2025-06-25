import { Backbutton } from "@/components/Backbutton";
import { getCustomer } from "@/lib/queries/getCustomer";
import CustomerForm from "./CustomerForm";

export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const { customerId } = await searchParams;
  if (customerId) {
    return {
      title: `Edit Customer ID #${customerId}`,
      description: `Edit details for customer ID #${customerId}`,
    };
  }
  return {
    title: "New Customer Form",
    description: "Create a new customer",
  };
}

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  try {
    const { customerId } = await searchParams;
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">Customer ID # {customerId} not found</h2>
            <Backbutton title="Go Back" variant="default" />
          </>
        );
      }
      return <CustomerForm customer={customer} />;
    } else {
      return <CustomerForm />;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
