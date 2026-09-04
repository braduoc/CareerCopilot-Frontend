"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { APP_ROUTES, STORAGE_KEYS } from "@/src/lib/constants";
import { Sparkles, ArrowRight, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);

    // Simulación de autenticación exitosa
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, "mock_jwt_token_12345");
      localStorage.setItem(
        STORAGE_KEYS.USER_DATA,
        JSON.stringify({
          id: "usr-1",
          email,
          fullName: "Usuario Demo",
        })
      );
      setIsLoading(false);
      router.push(APP_ROUTES.HOME);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-border">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <CardTitle className="text-xl font-bold text-foreground">
            Bienvenido a CareerCopilot
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Ingresa a tu cuenta para potenciar tu postulación laboral con IA
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-foreground">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="tu@correo.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-foreground">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full gap-2 mt-2" disabled={isLoading || !email.trim()}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            ¿Aún no tienes cuenta?{" "}
            <Link
              href={APP_ROUTES.REGISTER}
              className="text-primary dark:text-violet-300 font-semibold hover:underline"
            >
              Regístrate aquí
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}