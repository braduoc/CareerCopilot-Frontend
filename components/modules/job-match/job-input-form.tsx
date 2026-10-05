"use client";

import { useState, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, Target, Loader2 } from "lucide-react";

interface JobInputFormProps {
  onSubmit: (jobTitle: string, jobDescription: string) => void;
  isLoading?: boolean;
}

export function JobInputForm({ onSubmit, isLoading = false }: JobInputFormProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;
    onSubmit(jobTitle, jobDescription);
  };

  return (
    <Card>
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
          <div className="rounded-sm border border-border bg-secondary p-2 text-primary">
            <Briefcase className="h-4 w-4" />
          </div>
          Ingresar Oferta Laboral
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-foreground">
              Título del Puesto <span className="font-normal text-muted-foreground">(Opcional)</span>
            </label>
            <Input
              placeholder="Ej. Frontend Developer Senior"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-foreground">
              Descripción de la Vacante / Requisitos <span className="text-primary">*</span>
            </label>
            <textarea
              className="flex min-h-[140px] w-full resize-none rounded-md border border-input bg-card p-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Pega aquí el texto completo de la oferta de trabajo (requisitos, responsabilidades, tecnologías)..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full gap-2"
            disabled={isLoading || !jobDescription.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analizando coincidencia...
              </>
            ) : (
              <>
                <Target className="h-3.5 w-3.5" />
                Analizar Job Match
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
