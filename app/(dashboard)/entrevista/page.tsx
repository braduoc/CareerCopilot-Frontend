"use client";

import { InterviewSetupForm } from "@/components/modules/entrevista/interview-setup-form";
import { ChatBox } from "@/components/modules/entrevista/chat-box";
import { ChatInput } from "@/components/modules/entrevista/chat-input";
import { useInterview } from "@/hooks/use-interview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Award, Sparkles, Target, Bot, CheckCircle2 } from "lucide-react";
import { InterviewSessionConfig } from "@/types/entrevista";

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
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      {/* Header Estilizado con Badge e Interacción de Reinicio */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-secondary text-primary hover:bg-secondary border-none px-3 py-1 gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Simulación Dinámica STAR
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Simulador de Entrevistas Técnicas
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">
            Practica tus respuestas frente a un entrevistador IA y recibe retroalimentación en tiempo real estructurada bajo la metodología STAR.
          </p>
        </div>

        {config && (
          <Button variant="outline" size="sm" onClick={resetSession} className="gap-2 shrink-0 self-start md:self-center border-border hover:bg-secondary hover:text-primary">
            <RotateCcw className="w-4 h-4" />
            Reiniciar Sesión
          </Button>
        )}
      </div>

      {/* Alerta de Error */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-sm text-destructive flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          {error}
        </div>
      )}

      {/* Vista de Configuración Inicial (Grid con Guía Informativa) */}
      {!config && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Formulario (7 columnas) */}
          <div className="lg:col-span-7 space-y-4">
            <InterviewSetupForm onStartSession={handleStartSession} isLoading={isLoading} />
          </div>

          {/* Panel Lateral de Consejos (5 columnas) */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="border-border/60 shadow-sm bg-card/50 backdrop-blur">
              <CardContent className="p-6 space-y-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  ¿Cómo funciona la simulación?
                </h3>
                
                <ul className="space-y-4 text-xs text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary text-primary shrink-0">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Preguntas adaptadas al seniority</p>
                      <p className="mt-0.5">El entrevistador formulará casos prácticos en función del puesto y nivel que configures.</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary text-primary shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Metodología STAR</p>
                      <p className="mt-0.5">Evaluaremos si tus respuestas detallan Situación, Tarea, Acción y Resultados concretos.</p>
                    </div>
                  </li>
                </ul>

                {/* Micro Banner de Gradiente */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white space-y-1 mt-2 shadow-sm">
                  <p className="text-xs font-semibold">Consejo para destacar</p>
                  <p className="text-[11px] opacity-90 leading-relaxed">
                    Usa ejemplos reales de tus experiencias previas y procura cuantificar los logros o impacto técnico obtenido.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Vista de Chat / Sesión Activa */}
      {config && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <ChatBox messages={messages} />

          {!isFinished ? (
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          ) : (
            <Card className="border-primary/30 bg-secondary/40 shadow-sm text-center py-8 px-4 rounded-2xl relative overflow-hidden">
              <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
              <CardContent className="space-y-4 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center mx-auto shadow-md text-white">
                  <Award className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-foreground">
                    ¡Simulación Completada!
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Has respondido con éxito a todas las preguntas programadas para esta sesión de <strong className="text-foreground">{config.jobTitle}</strong>.
                  </p>
                </div>
                <Button onClick={resetSession} className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm px-6">
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