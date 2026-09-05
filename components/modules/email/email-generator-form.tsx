"use client";

import { useState, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmailGeneratePayload, EmailType, EmailTone } from "@/types/email";
import { Mail, Sparkles, Loader2 } from "lucide-react";

interface EmailGeneratorFormProps {
  onSubmit: (payload: EmailGeneratePayload) => void;
  isLoading?: boolean;
}

export function EmailGeneratorForm({ onSubmit, isLoading = false }: EmailGeneratorFormProps) {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [type, setType] = useState<EmailType>("application");
  const [tone, setTone] = useState<EmailTone>("professional");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !jobTitle.trim()) return;

    onSubmit({
      companyName,
      jobTitle,
      recipientName,
      type,
      tone,
      additionalNotes,
    });
  };

  return (
    <Card className="border-border/60 shadow-xs">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
          <div className="p-2 bg-secondary text-primary rounded-xl shadow-2xs">
            <Mail className="w-4 h-4" />
          </div>
          Configurar Correo Electrónico
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-foreground">
                Empresa <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="Ej. Globant, Mercado Libre..."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                disabled={isLoading}
                className="rounded-xl border-border/80 focus-visible:ring-primary/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-foreground">
                Puesto de Trabajo <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="Ej. Frontend Developer Senior"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
                disabled={isLoading}
                className="rounded-xl border-border/80 focus-visible:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-foreground">
                Reclutador / Persona <span className="text-muted-foreground font-normal">(Opcional)</span>
              </label>
              <Input
                placeholder="Ej. María González"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                disabled={isLoading}
                className="rounded-xl border-border/80 focus-visible:ring-primary/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-foreground">
                Tipo de Correo
              </label>
              <select
                className="flex h-9 w-full rounded-xl border border-border/80 bg-background px-3 py-1 text-xs text-foreground shadow-2xs transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                value={type}
                onChange={(e) => setType(e.target.value as EmailType)}
                disabled={isLoading}
              >
                <option value="application">Carta de Presentación / Postulación</option>
                <option value="follow_up">Seguimiento de Postulación (Follow-up)</option>
                <option value="thank_you">Agradecimiento tras Entrevista</option>
                <option value="networking">Contacto Directo / Networking</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-foreground">
                Tono del Mensaje
              </label>
              <select
                className="flex h-9 w-full rounded-xl border border-border/80 bg-background px-3 py-1 text-xs text-foreground shadow-2xs transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                value={tone}
                onChange={(e) => setTone(e.target.value as EmailTone)}
                disabled={isLoading}
              >
                <option value="professional">Profesional Standard</option>
                <option value="enthusiastic">Entusiasta / Apasionado</option>
                <option value="formal">Corporativo / Formal</option>
                <option value="concise">Directo / Conciso</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-foreground">
              Notas Adicionales <span className="text-muted-foreground font-normal">(Opcional)</span>
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-xl border border-border/80 bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground shadow-2xs transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Añade algún detalle extra (ej. 'Mencionar que fui recomendado por X', 'Destacar mi disponibilidad inmediata')..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-xs hover:shadow-md transition-all h-10 text-xs"
            disabled={isLoading || !companyName.trim() || !jobTitle.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generando borrador...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generar Correo con IA
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}