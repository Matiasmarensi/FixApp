"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-20">
      {pending ? <LoaderCircle className="animate-spin mr-2 h-4 w-4" /> : "Search"}
    </Button>
  );
}
