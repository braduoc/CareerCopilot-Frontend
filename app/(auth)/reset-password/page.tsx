"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { clearSession, translateAuthError } from "@/lib/auth";
import { AuthShell } from "@/components/layout/auth-shell";
import { Notice } from "@/components/ui/notice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_ROUTES } from "@/lib/constants";

type LinkState = "checking" | "ready" | "invalid";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [linkState, setLinkState] = useState<LinkState>("checking");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // Supabase lee el token del enlace del correo y crea una sesión temporal de recuperación.
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session)) setLinkState("ready");
    });
    const timer = setTimeout(async () => {
      const { data } = await supabase.auth.getSession();
      setLinkState((prev) => (prev === "ready" || data.session ? "ready" : "invalid"));
    }, 1500);
    return () => {
      sub.subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setIsLoading(true);
    try {
      const { error: authError } = await supabase.auth.updateUser({ password });
      if (authError) {
        setError(translateAuthError(authError.message));
        return;
      }
      // Cerramos la sesión de recuperación para que ingrese con la clave nueva.
      await supabase.auth.signOut();
      clearSession();
      setDone(true);
      setTimeout(() => router.replace(APP_ROUTES.LOGIN), 2500);
    } catch {
      setError("No se pudo conectar con el servicio de autenticación. Revisa tu conexión.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      asideTitle="Nueva contraseña."
      asideText="Elige una contraseña segura para tu expediente."
      title="Restablece tu contraseña"
      subtitle="Escribe tu nueva contraseña (mínimo 8 caracteres)."
    >
      {done ? (
        <Notice tone="success">Contraseña actualizada. Te llevamos a iniciar sesión...</Notice>
      ) : linkState === "checking" ? (
        <p className="text-sm text-muted-foreground">Verificando enlace...</p>
      ) : linkState === "invalid" ? (
        <div className="space-y-4">
          <Notice tone="error">El enlace no es válido o ya expiró. Solicita uno nuevo.</Notice>
          <Link href={APP_ROUTES.FORGOT_PASSWORD} className="inline-block text-sm font-bold text-primary hover:underline">
            Pedir un nuevo enlace
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-bold text-foreground">
              Nueva contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-11 bg-card pl-11 text-sm focus-visible:ring-primary sm:h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="confirm" className="block text-sm font-bold text-foreground">
              Confirmar contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirm"
                type="password"
                placeholder="••••••••"
                className="h-11 bg-card pl-11 text-sm focus-visible:ring-primary sm:h-12"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          {error && <Notice tone="error">{error}</Notice>}
          <Button type="submit" className="h-11 w-full gap-2 text-sm sm:h-12" disabled={isLoading || !password || !confirm}>
            {isLoading ? "Guardando..." : "Guardar contraseña"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
