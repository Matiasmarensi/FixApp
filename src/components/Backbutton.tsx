"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";

type Props = {
  title: string;
  className?: string;
  variant?: "default" | "destructive" | "ghost" | "outline" | "secondary" | "link" | null | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Backbutton({ title, className, variant, ...props }: Props) {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };

  return (
    <Button title={title} onClick={handleClick} className={className} variant={variant} {...props}>
      {title}
    </Button>
  );
}
