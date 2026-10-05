"use client";

import { useState, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InterviewSessionConfig, QuestionCategory } from "@/types/entrevista";
import { MessageSquare, Play, Loader2 } from "lucide-react";

interface InterviewSetupFormProps {
  onStartSession: (config: InterviewSessionConfig) => void;
  isLoading?: boolean;
}

export function InterviewSetupForm({ onStartSession, isLoading = false }: InterviewSetupFormProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [category, setCategory] = useState<QuestionCategory | "mixed">("mixed");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim()) return;

    onStartSession({
      jobTitle,
      category,
      numberOfQuestions,
    });
  };

  return (
    <Card>
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
          <div className="rounded-sm border border-border bg-secondary p-2 text-primary">
            <MessageSquare className="h-4 w-4" />
          </div>
          Configurar Simulación de Entrevista
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-foreground">
              Cargo / Rol a Simular <span className="text-primary">*</span>
            </label>
            <Input
              placeholder="Ej. Full Stack Engineer, Product Manager..."
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">
                Tipo de Preguntas
              </label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                value={category}
                onChange={(e) => setCategory(e.target.value as QuestionCategory | "mixed")}
                disabled={isLoading}
              >
                <option value="mixed">Mixtas (Técnicas y Conductuales)</option>
                <option value="technical">100% Técnicas</option>
                <option value="behavioral">100% Conductuales (STAR)</option>
                <option value="situational">Situacionales / Casos</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">
                Cantidad de Preguntas
              </label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                disabled={isLoading}
              >
                <option value={3}>3 Preguntas (Express)</option>
                <option value={5}>5 Preguntas (Estándar)</option>
                <option value={10}>10 Preguntas (Completa)</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full gap-2"
            disabled={isLoading || !jobTitle.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Iniciando simulador...
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                Iniciar Entrevista Técnica
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
