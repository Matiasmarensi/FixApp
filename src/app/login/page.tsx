import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="h-dvh flex flex-col items-center gap-6 mt-10 text-4xl">
      <h1>Repair Shop</h1>
      <div className="flex flex-col gap-4">
        <Button asChild>
          <LoginLink postLoginRedirectURL="/home">Sign In</LoginLink>
        </Button>
        <Button asChild>
          <LoginLink postLoginRedirectURL="/home" authUrlParams={{ connection_id: 'conn_01974c3c930538998e82373ed75880c9' }}>
            Sign In with Google
          </LoginLink>
        </Button>
      </div>
    </main>
  );
}