import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="h-dvh flex flex-col items-center gap-6 mt-10 text-4xl">
      <h1>Repair Shop</h1>
      <Button asChild>
        <LoginLink postLoginRedirectURL="/home">Sign In</LoginLink>
      </Button>
    </main>
  );
}
