import Form from "next/form";

import { Input } from "@/components/ui/input";
import SearchButton from "@/components/ui/SearchButton";

export default function CustomerSearch() {
  return (
    <Form action="/customers" className="flex items-center gap-2">
      <Input name="search" type="text" placeholder="Search" className="w-80" autoFocus />
      <SearchButton />
    </Form>
  );
}
