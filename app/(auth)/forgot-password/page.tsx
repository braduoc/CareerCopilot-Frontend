"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { translateAuthError } from "@/lib/auth";
import { AuthShell } from "@/components/layout/auth-shell";
import { Notice } from "@/components/ui/notice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_ROUTES } from "@/lib/constants";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}${APP_ROUTES.RESET_PASSWORD}`,
      });
      if (authError) {
        setError(translateAuthError(authError.message));
        return;
      }
      // Mensaje neutro: no revela si el correo existe o no.
      setSent(true);
    } catch {
      setError("No se pudo conectar con el servicio de autenticación. Revisa tu conexión.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      asideTitle="Recupera tu acceso."
      asideText="Te enviaremos un enlace para crear una nueva contraseña."
      title="¿Olvidaste tu contraseña?"
      subtitle="Escribe el correo de tu cuenta y te enviaremos un enlace para restablecerla."
    >
      {sent ? (
        <Notice tone="success">
          Si existe una cuenta con <strong>{email.trim()}</strong>, te enviamos un enlace para restablecer la contraseña.
          Revisa tu bandeja de entrada (y la carpeta de spam).
        </Notice>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-bold text-foreground">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                className="h-11 bg-card pl-11 text-sm focus-visible:ring-primary sm:h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          {error && <Notice tone="error">{error}</Notice>}
          <Button type="submit" className="h-11 w-full gap-2 text-sm sm:h-12" disabled={isLoading || !email.trim()}>
            {isLoading ? "Enviando..." : "Enviar enlace"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
