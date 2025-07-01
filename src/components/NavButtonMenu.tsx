import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  icon: LucideIcon;
  label: string;

  choices: {
    title: string;
    href: string;
  }[];
};

export default function NavButtonMenu({ icon: Icon, label, choices }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Icon className="h-5 w-5" />
          <span className="sr-only">{label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {choices.map((choice) => (
          <DropdownMenuItem key={choice.href}>
            <Link href={choice.href} className="w-full">
              {choice.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
