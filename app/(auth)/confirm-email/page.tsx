"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getSiteUrl, saveSession, translateAuthError } from "@/lib/auth";
import { AuthShell } from "@/components/layout/auth-shell";
import { Notice } from "@/components/ui/notice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_ROUTES } from "@/lib/constants";

type State = "checking" | "success" | "failed" | "idle";

/** Supabase devuelve los errores del enlace en el hash (#error=...&error_code=...) o en la query. */
function readLinkError(): string | null {
  const params = new URLSearchParams(window.location.hash.replace(/^#/, "") || window.location.search);
  const query = new URLSearchParams(window.location.search);
  const code = params.get("error_code") ?? query.get("error_code");
  const description = params.get("error_description") ?? query.get("error_description");
  const error = params.get("error") ?? query.get("error");
  if (!code && !error) return null;
  if (code === "otp_expired") return "El enlace de confirmación expiró o ya fue usado.";
  return description ? description.replace(/\+/g, " ") : "No pudimos confirmar tu correo con ese enlace.";
}

export default function ConfirmEmailPage() {
  const router = useRouter();
  const [state, setState] = useState<State>("checking");
  const [linkMessage, setLinkMessage] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    let finished = false;
    const finish = (session: { access_token: string; user: { id: string; email?: string | null; user_metadata?: Record<string, unknown> } }) => {
      if (finished) return;
      finished = true;
      saveSession(session.access_token, {
        id: session.user.id,
        email: session.user.email ?? "",
        fullName: String(session.user.user_metadata?.full_name ?? session.user.email ?? "Usuario"),
      });
      setState("success");
      setTimeout(() => router.replace(APP_ROUTES.HOME), 1800);
    };

    // Supabase lee el token del enlace (hash) y crea la sesión automáticamente.
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")) finish(session);
    });
    const timer = setTimeout(async () => {
      if (finished) return;
      const linkError = readLinkError();
      if (linkError) {
        setLinkMessage(linkError);
        setState("failed");
        return;
      }
      const { data } = await supabase.auth.getSession();
      if (data.session) finish(data.session);
      else setState("idle"); // llegó sin enlace (p. ej. desde "Reenviar correo")
    }, 1200);

    return () => {
      sub.subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [router]);

  const handleResend = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    setResendError(null);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email.trim(),
        options: { emailRedirectTo: `${getSiteUrl()}${APP_ROUTES.CONFIRM_EMAIL}` },
      });
      if (error) setResendError(translateAuthError(error.message));
      else setResent(true);
    } catch {
      setResendError("No se pudo conectar con el servicio de autenticación. Revisa tu conexión.");
    } finally {
      setSending(false);
    }
  };

  const resendForm = (
    <form onSubmit={handleResend} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="resend-email" className="block text-sm font-bold text-foreground">
          Correo con el que te registraste
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="resend-email"
            type="email"
            placeholder="tu@correo.com"
            className="h-11 bg-card pl-11 text-sm focus-visible:ring-primary sm:h-12"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={sending}
          />
        </div>
      </div>
      {resendError && state === "failed" && <Notice tone="error">{resendError}</Notice>}
      {resent && <Notice tone="success">Listo. Te enviamos un nuevo correo; revisa también la carpeta de spam.</Notice>}
      <Button type="submit" className="h-11 w-full gap-2 text-sm sm:h-12" disabled={sending || !email.trim()}>
        {sending ? "Enviando..." : "Reenviar correo de confirmación"}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );

  return (
    <AuthShell
      asideTitle="Confirma tu correo."
      asideText="Un último paso para abrir tu expediente."
      title="Confirmación de correo"
      subtitle="Verificamos que el enlace de tu correo sea válido."
    >
      {state === "checking" && <p className="text-sm text-muted-foreground">Verificando enlace...</p>}

      {state === "success" && (
        <Notice tone="success">¡Correo confirmado! Te llevamos a tu panel...</Notice>
      )}

      {state === "failed" && (
        <div className="space-y-5">
          <Notice tone="error">{linkMessage}</Notice>
          {resendForm}
          <p className="text-xs leading-5 text-muted-foreground">
            Si ya confirmaste antes, simplemente{" "}
            <Link href={APP_ROUTES.LOGIN} className="font-bold text-primary hover:underline">
              inicia sesión
            </Link>
            .
          </p>
        </div>
      )}

      {state === "idle" && (
        <div className="space-y-5">
          <Notice tone="info">
            Revisa tu correo y pulsa el enlace de confirmación. Si no te llegó o ya venció, pide otro aquí.
          </Notice>
          {resendError && <Notice tone="error">{resendError}</Notice>}
          {resendForm}
        </div>
      )}
    </AuthShell>
  );
}
