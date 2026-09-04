"use client";

import { useState, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { InterviewSessionConfig, QuestionCategory } from "@/src/types/entrevista";
import { MessageSquare, Play } from "lucide-react";

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
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <MessageSquare className="w-5 h-5 text-primary" />
          Configurar Simulación de Entrevista
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">
              Cargo / Rol a Simular *
            </label>
            <Input
              placeholder="Ej. Full Stack Engineer, Product Manager..."
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Tipo de Preguntas
              </label>
              <select
                className="flex h-10 w-full rounded-xl border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
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

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Cantidad de Preguntas
              </label>
              <select
                className="flex h-10 w-full rounded-xl border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
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
            <Play className="w-4 h-4 fill-current" />
            {isLoading ? "Iniciando simulador..." : "Iniciar Entrevista Técnica"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}