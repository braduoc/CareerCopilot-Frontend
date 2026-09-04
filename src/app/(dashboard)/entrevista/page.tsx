"use client";

import { InterviewSetupForm } from "@/src/components/modules/entrevista/interview-setup-form";
import { ChatBox } from "@/src/components/modules/entrevista/chat-box";
import { ChatInput } from "@/src/components/modules/entrevista/chat-input";
import { useInterview } from "@/src/hooks/use-interview";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { RotateCcw, Award } from "lucide-react";
import { InterviewSessionConfig } from "@/src/types/entrevista";

export default function EntrevistaPage() {
  const {
    config,
    messages,
    isLoading,
    isFinished,
    error,
    startSession,
    submitAnswer,
    resetSession,
  } = useInterview();

  const handleStartSession = async (newConfig: InterviewSessionConfig) => {
    try {
      await startSession(newConfig);
    } catch (err) {
      console.error("Error al iniciar la sesión:", err);
    }
  };

  const handleSendMessage = async (userAnswer: string) => {
    try {
      await submitAnswer(userAnswer);
    } catch (err) {
      console.error("Error al enviar la respuesta:", err);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Simulador de Entrevistas Técnicas
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Practica tus respuestas frente a un entrevistador IA y recibe retroalimentación en tiempo real estructurada bajo la metodología STAR.
          </p>
        </div>
        {config && (
          <Button variant="outline" size="sm" onClick={resetSession} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </Button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg text-sm text-rose-700 dark:text-rose-400">
          {error}
        </div>
      )}

      {/* Vista de Configuración Inicial */}
      {!config && (
        <InterviewSetupForm onStartSession={handleStartSession} isLoading={isLoading} />
      )}

      {/* Vista de Chat / Sesión Activa */}
      {config && (
        <div className="space-y-6">
          <ChatBox messages={messages} />

          {!isFinished ? (
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          ) : (
            <Card className="border-violet-200 bg-secondary/50 dark:border-violet-900 dark:bg-violet-950/20 text-center py-6">
              <CardContent className="space-y-3">
                <Award className="w-10 h-10 text-primary mx-auto" />
                  <h3 className="text-lg font-bold text-foreground">
                  ¡Simulación Completada!
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Has respondido a todas las preguntas programadas para esta sesión de **{config.jobTitle}**.
                </p>
                <Button onClick={resetSession} className="mt-2">
                  Iniciar Nueva Simulación
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}