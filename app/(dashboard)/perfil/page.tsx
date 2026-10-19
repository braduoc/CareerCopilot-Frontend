"use client";

import { useEffect, useState, FormEvent } from "react";
import { Moon, Save, Sun, Loader2 } from "lucide-react";
import { profileService, Profile } from "@/services/profile-service";
import { dashboardService } from "@/services/dashboard-service";
import { DashboardSummary } from "@/types/dashboard";
import { getStoredUser, saveSession, getAccessToken } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Notice } from "@/components/ui/notice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { setTheme, useIsDark } from "@/components/layout/theme-toggle";

function Usage({ label, used, limit }: { label: string; used: number; limit: number | null }) {
  const pct = limit ? Math.min(100, Math.round((used / limit) * 100)) : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-foreground">{label}</span>
        <span className="font-mono text-muted-foreground">{limit ? `${used} / ${limit}` : `${used} · sin límite`}</span>
      </div>
      {limit ? (
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div className={pct >= 100 ? "h-full bg-destructive" : "h-full bg-primary"} style={{ width: `${pct}%` }} />
        </div>
      ) : null}
    </div>
  );
}

export default function PerfilPage() {
  const dark = useIsDark();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [name, setName] = useState("");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    profileService
      .me()
      .then((p) => {
        setProfile(p);
        setName(p.nombre_completo ?? "");
      })
      .catch((e) => setLoadError(e instanceof Error ? e.message : "No se pudo cargar tu perfil."));
    dashboardService.summary().then(setSummary).catch(() => {});
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(false);
    if (name.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres.");
      return;
    }
    setSaving(true);
    try {
      const updated = await profileService.update(name.trim());
      setProfile(updated);
      setName(updated.nombre_completo ?? "");
      // Mantiene el nombre visible en el menú y en los metadatos de Supabase.
      const stored = getStoredUser();
      const token = await getAccessToken();
      if (stored && token) saveSession(token, { ...stored, fullName: updated.nombre_completo ?? stored.fullName });
      window.dispatchEvent(new Event("storage"));
      supabase.auth.updateUser({ data: { full_name: updated.nombre_completo } }).catch(() => {});
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar el perfil.");
    } finally {
      setSaving(false);
    }
  };

  const premium = profile?.plan === "premium";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mi perfil</h1>
        <p className="mt-1 text-sm text-muted-foreground">Tus datos, tu plan y la apariencia de la aplicación.</p>
      </div>

      {loadError && <Notice tone="error">{loadError}</Notice>}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border">
            <CardTitle className="text-base">Datos personales</CardTitle>
            <CardDescription>El correo es el de tu cuenta y no se puede cambiar aquí.</CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium">Correo electrónico</label>
                <Input id="email" value={profile?.email ?? ""} disabled readOnly />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-medium">Nombre completo</label>
                <Input id="name" value={name} onChange={(e) => { setName(e.target.value); setSaved(false); }} maxLength={200} disabled={!profile || saving} />
              </div>
              {error && <Notice tone="error">{error}</Notice>}
              {saved && <Notice tone="success">Perfil actualizado.</Notice>}
              <Button type="submit" className="gap-2" disabled={!profile || saving || name.trim() === (profile?.nombre_completo ?? "")}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Guardar cambios
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center justify-between text-base">
                Plan
                <span className="rounded-sm border border-primary/30 px-2 py-0.5 text-xs font-semibold text-primary">
                  {profile ? (premium ? "Premium" : "Gratuito") : "—"}
                </span>
              </CardTitle>
              <CardDescription>
                {premium
                  ? "Tienes acceso sin límites a entrevistas y comparaciones."
                  : "El plan gratuito incluye un número limitado de entrevistas y comparaciones."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-5">
              {summary ? (
                <>
                  <Usage label="Entrevistas simuladas" used={summary.interviewsUsed} limit={summary.interviewsLimit} />
                  <Usage label="Job Match este mes" used={summary.monthMatches} limit={summary.matchesLimit} />
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Cargando uso...</p>
              )}
              {!premium && (
                <p className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                  Para activar Premium contacta al equipo de CareerCopilot: el plan se habilita manualmente en tu cuenta.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border">
              <CardTitle className="text-base">Apariencia</CardTitle>
              <CardDescription>Se recuerda en este navegador.</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2 p-5">
              <Button variant={dark ? "outline" : "default"} className="gap-2" onClick={() => setTheme(false)}>
                <Sun className="h-4 w-4" /> Claro
              </Button>
              <Button variant={dark ? "default" : "outline"} className="gap-2" onClick={() => setTheme(true)}>
                <Moon className="h-4 w-4" /> Oscuro
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
