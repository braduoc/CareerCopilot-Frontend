"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/auth";
import { APP_ROUTES } from "@/lib/constants";

/** Protege las pantallas privadas: sin sesión, redirige al login. */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    getAccessToken().then((token) => {
      if (!active) return;
      if (!token) router.replace(APP_ROUTES.LOGIN);
      else setReady(true);
    });
    return () => {
      active = false;
    };
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Verificando sesión...
      </div>
    );
  }
  return <>{children}</>;
}
