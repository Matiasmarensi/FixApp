import React from "react";
import { HomeIcon, File, UsersRound, LogOut } from "lucide-react";
import Link from "next/link";
import { NavButton } from "./NavButton";
import { ModeToggle } from "./ModeToggle";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import NavButtonMenu from "./NavButtonMenu";

export const Header = () => {
  return (
    <header className="animated-slide bg-background h-16 p-3 border-b sticky top-0 z-20">
      <div className="flex h-10 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href="/home" label="Home" icon={HomeIcon} />
          <Link href="/home" className="flex justify-center items-center gap-2 ml-0" title="Home">
            <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">Reparar computadoras shop</h1>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <NavButton href="/tickets" label="tickets" icon={File} />
          <NavButtonMenu
            icon={File}
            label="Tickets Menu"
            choices={[
              { title: "Search Tickets", href: "/tickets" },
              { title: "Add Ticket", href: "/tickets/form" },
            ]}
          />
          <NavButtonMenu
            icon={UsersRound}
            label="Customers Menu"
            choices={[
              { title: "Search Customers", href: "/customers" },
              { title: "Add Customer", href: "/customers/form" },
            ]}
          />

          <ModeToggle />
          <Button asChild variant="ghost" size="icon" aria-label="LogOut" title="LogOut" className="rounded-full">
            <LogoutLink>
              <LogOut />
            </LogoutLink>
          </Button>
        </div>
      </div>
    </header>
  );
};
