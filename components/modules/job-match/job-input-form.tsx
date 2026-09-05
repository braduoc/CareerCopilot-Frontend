"use client";

import { useState, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, Sparkles, Loader2 } from "lucide-react";

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
    <Card className="border-violet-200 dark:border-violet-900/50 shadow-xs">
      <CardHeader className="pb-4 border-b border-violet-100 dark:border-violet-900/30 bg-violet-50/50  rounded-t-xl">
        <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
          <div className="p-2 bg-violet-100 dark:bg-violet-900/60 text-violet-600 dark:text-violet-200 rounded-xl shadow-2xs">
            <Briefcase className="w-4 h-4" />
          </div>
          Ingresar Oferta Laboral
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-foreground">
              Título del Puesto <span className="text-muted-foreground font-normal">(Opcional)</span>
            </label>
            <Input
              placeholder="Ej. Frontend Developer Senior"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              disabled={isLoading}
              className="rounded-xl border-violet-200 dark:border-violet-900/60 focus-visible:ring-violet-600/20 focus-visible:border-violet-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-foreground">
              Descripción de la Vacante / Requisitos <span className="text-violet-600 dark:text-violet-200">*</span>
            </label>
            <textarea
              className="flex min-h-[140px] w-full rounded-2xl border border-violet-200 dark:border-violet-900/60 bg-violet-50/20  p-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground shadow-2xs transition-colors focus-visible:border-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              placeholder="Pega aquí el texto completo de la oferta de trabajo (requisitos, responsabilidades, tecnologías)..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-xs hover:shadow-md hover:shadow-violet-600/20 transition-all h-10 text-xs"
            disabled={isLoading || !jobDescription.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analizando coincidencia...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                Analizar Job Match
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}