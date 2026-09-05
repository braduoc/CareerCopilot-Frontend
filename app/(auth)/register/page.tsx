"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_ROUTES, STORAGE_KEYS } from "@/lib/constants";
import { ArrowRight, ArrowLeft, Lock, Mail, User } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !fullName.trim() || !password.trim()) return;

    setIsLoading(true);

    // Simulación de creación de cuenta
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, "mock_jwt_token_register_67890");
      localStorage.setItem(
        STORAGE_KEYS.USER_DATA,
        JSON.stringify({
          id: "usr-2",
          email,
          fullName,
        })
      );
      setIsLoading(false);
      router.push(APP_ROUTES.HOME);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground lg:grid lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="relative flex h-[40vh] min-h-[250px] max-h-[400px] flex-col justify-center overflow-hidden bg-violet-950 p-5 text-white sm:h-[42vh] sm:min-h-[280px] sm:p-8 lg:h-auto lg:min-h-screen lg:p-10 xl:p-14">
        <div className="relative max-w-sm">
          <h1 className="text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl xl:text-5xl">
            Tu próximo paso empieza aquí.
          </h1>
          <p className="mt-3 max-w-xs text-sm leading-6 text-violet-100/70 sm:mt-4">
            Crea tu espacio profesional.
          </p>
        </div>
      </aside>

      <main className="relative z-10 -mt-10 flex min-h-[60vh] flex-col rounded-t-[1.5rem] bg-card px-4 py-5 shadow-[0_-12px_30px_rgba(124,58,237,0.14)] sm:-mt-12 sm:rounded-t-[2rem] sm:px-10 sm:py-8 lg:z-auto lg:mt-0 lg:min-h-screen lg:rounded-none lg:bg-transparent lg:px-16 lg:py-8 lg:shadow-none xl:px-24">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a la landing
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-start py-5 sm:py-10 lg:justify-center lg:py-12">
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Crea tu cuenta
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Configura tu perfil profesional.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4 sm:space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-foreground">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Ej. Alex Morgan"
                  className="h-11 rounded-xl border-border bg-card pl-11 text-sm shadow-sm focus-visible:ring-primary sm:h-12"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-foreground">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="tu@correo.com"
                  className="h-11 rounded-xl border-border bg-card pl-11 text-sm shadow-sm focus-visible:ring-primary sm:h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label className="block text-xs font-bold text-foreground">
                  Contraseña
                </label>
                <span className="text-right text-[11px] font-medium text-muted-foreground">
                  Mínimo 8 caracteres
                </span>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-11 rounded-xl border-border bg-card pl-11 text-sm shadow-sm focus-visible:ring-primary sm:h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="h-11 w-full gap-2 rounded-xl bg-primary text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 sm:h-12"
              disabled={isLoading || !email.trim() || !fullName.trim() || !password.trim()}
            >
              {isLoading ? "Creando cuenta..." : "Registrarme"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 border-t border-border pt-5 text-center text-xs text-muted-foreground sm:mt-8 sm:pt-6">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href={APP_ROUTES.LOGIN}
              className="font-bold text-primary transition-colors hover:text-foreground hover:underline"
            >
              Inicia sesión
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}