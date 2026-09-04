"use client";

import { useState, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { EmailGeneratePayload, EmailType, EmailTone } from "@/src/types/email";
import { Mail, Sparkles } from "lucide-react";

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Mail className="w-5 h-5 text-primary" />
          Configurar Correo Electrónico
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Empresa *
              </label>
              <Input
                placeholder="Ej. Globant, Mercado Libre..."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Puesto de Trabajo *
              </label>
              <Input
                placeholder="Ej. Frontend Developer Senior"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Nombre Reclutador / Persona (Opcional)
              </label>
              <Input
                placeholder="Ej. María González"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Tipo de Correo
              </label>
              <select
                className="flex h-10 w-full rounded-xl border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
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

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Tono del Mensaje
              </label>
              <select
                className="flex h-10 w-full rounded-xl border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
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

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">
              Notas Adicionales (Opcional)
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-xl border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Añade algún detalle extra (ej. 'Mencionar que fui recomendado por X', 'Destacar mi disponibilidad inmediata')..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full gap-2"
            disabled={isLoading || !companyName.trim() || !jobTitle.trim()}
          >
            <Sparkles className="w-4 h-4" />
            {isLoading ? "Generando borrador..." : "Generar Correo con IA"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}