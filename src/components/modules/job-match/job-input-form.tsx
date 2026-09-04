"use client";

import { useState, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Briefcase, Sparkles } from "lucide-react";

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
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Briefcase className="w-5 h-5 text-primary" />
          Ingresar Oferta Laboral
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">
              Título del Puesto (Opcional)
            </label>
            <Input
              placeholder="Ej. Frontend Developer Senior"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">
              Descripción de la Vacante / Requisitos *
            </label>
            <textarea
              className="flex min-h-[140px] w-full rounded-xl border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
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
            <Sparkles className="w-4 h-4" />
            {isLoading ? "Analizando coincidencia..." : "Analizar Job Match"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}