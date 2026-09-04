"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { APP_ROUTES, STORAGE_KEYS } from "@/src/lib/constants";
import { Sparkles, ArrowRight, Lock, Mail, User } from "lucide-react";

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
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-border">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <CardTitle className="text-xl font-bold text-foreground">
            Crea tu cuenta en CareerCopilot
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Optimiza tu CV, evalúa vacantes y prepárate para tus entrevistas con IA
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-foreground">
                Nombre Completo
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Ej. Alex Morgan"
                  className="pl-9"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

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
                  placeholder="Mínimo 8 caracteres"
                  className="pl-9"
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
              className="w-full gap-2 mt-2"
              disabled={isLoading || !email.trim() || !fullName.trim() || !password.trim()}
            >
              {isLoading ? "Creando cuenta..." : "Registrarme"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href={APP_ROUTES.LOGIN}
              className="text-primary dark:text-violet-300 font-semibold hover:underline"
            >
              Inicia sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}