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
    <Card className="border-violet-200 dark:border-violet-900/50 shadow-xs">
      <CardHeader className="pb-4 border-b border-violet-100 dark:border-violet-900/30 bg-violet-50/50  rounded-t-xl">
        <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
          <div className="p-2 bg-violet-100 dark:bg-violet-900/60 text-violet-600 dark:text-violet-200 rounded-xl shadow-2xs">
            <MessageSquare className="w-4 h-4" />
          </div>
          Configurar Simulación de Entrevista
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-foreground">
              Cargo / Rol a Simular <span className="text-violet-600 dark:text-violet-200">*</span>
            </label>
            <Input
              placeholder="Ej. Full Stack Engineer, Product Manager..."
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              disabled={isLoading}
              className="rounded-xl border-violet-200 dark:border-violet-900/60 focus-visible:ring-violet-600/20 focus-visible:border-violet-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-foreground">
                Tipo de Preguntas
              </label>
              <select
                className="flex h-9 w-full rounded-xl border border-violet-200 dark:border-violet-900/60 bg-background px-3 py-1 text-xs text-foreground shadow-2xs transition-colors focus-visible:border-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600/20 disabled:cursor-not-allowed disabled:opacity-50"
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
              <label className="block text-xs font-semibold text-foreground">
                Cantidad de Preguntas
              </label>
              <select
                className="flex h-9 w-full rounded-xl border border-violet-200 dark:border-violet-900/60 bg-background px-3 py-1 text-xs text-foreground shadow-2xs transition-colors focus-visible:border-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600/20 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="w-full gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-xs hover:shadow-md hover:shadow-violet-600/20 transition-all h-10 text-xs"
            disabled={isLoading || !jobTitle.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Iniciando simulador...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                Iniciar Entrevista Técnica
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}