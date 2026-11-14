"use client";

import { Award, CheckCircle, Download, Lightbulb, RotateCcw } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PrintOnly, printPage } from "@/components/ui/print-only";
import { InterviewEvaluation as Evaluation } from "@/types/entrevista";

interface Props {
  evaluation: Evaluation;
  jobName: string | null;
  onRestart: () => void;
}

function scoreTone(score: number) {
  if (score >= 70) return "text-success";
  if (score >= 50) return "text-primary";
  return "text-destructive";
}

export function InterviewEvaluation({ evaluation, jobName, onRestart }: Props) {
  const { puntaje, nivel, resumen, preguntasRespondidas, totalPreguntas, competencias, preguntas, fortalezas, recomendaciones } = evaluation;
  const incomplete = preguntasRespondidas < totalPreguntas;

  return (
    <div className="space-y-6">
      <PrintOnly>
        <h1 className="text-2xl font-bold">Evaluación de entrevista — CareerCopilot</h1>
        {jobName && <p className="mt-1 text-sm">Vacante: {jobName}</p>}
        <p className="mt-1 text-sm">{new Date().toLocaleDateString("es-CL", { dateStyle: "long" })}</p>
        <p className="mt-4 text-4xl font-bold">{puntaje} / 100 · {nivel}</p>
        <p className="mt-3 text-sm leading-relaxed">{resumen}</p>
        <h2 className="mt-5 text-base font-bold">Competencias</h2>
        <ul className="mt-1 list-disc pl-5 text-sm">
          {competencias.map((c) => <li key={c.nombre}>{c.nombre}: {c.puntaje}/100</li>)}
        </ul>
        <h2 className="mt-5 text-base font-bold">Fortalezas</h2>
        <ul className="mt-1 list-disc pl-5 text-sm">{fortalezas.map((t, i) => <li key={i}>{t}</li>)}</ul>
        <h2 className="mt-5 text-base font-bold">Recomendaciones</h2>
        <ol className="mt-1 list-decimal pl-5 text-sm">{recomendaciones.map((t, i) => <li key={i}>{t}</li>)}</ol>
        <h2 className="mt-5 text-base font-bold">Detalle por pregunta</h2>
        {preguntas.map((q, i) => (
          <div key={i} className="mt-3 text-sm">
            <p className="font-semibold">{i + 1}. {q.pregunta} — {q.puntaje}/100</p>
            <p className="mt-1">Tu respuesta: {q.respuesta}</p>
            <p className="mt-1">Comentario: {q.comentario}</p>
            {q.sugerencia && <p className="mt-1">Cómo mejorar: {q.sugerencia}</p>}
          </div>
        ))}
      </PrintOnly>

      {/* Resultado general */}
      <div className="rounded-md border border-ink-deep/10 bg-ink-deep p-6 text-ink-deep-foreground">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-ink-deep-foreground/60">Evaluación de tu entrevista</span>
            </div>
            <div className="flex items-end gap-3">
              <span className="font-mono text-5xl font-bold leading-none">{puntaje}</span>
              <span className="pb-1 text-sm text-ink-deep-foreground/60">/ 100 puntos</span>
            </div>
            <p className="text-xs text-ink-deep-foreground/60">
              Respondiste {preguntasRespondidas} de {totalPreguntas} preguntas
              {incomplete ? " · terminaste antes de tiempo" : ""}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`-rotate-3 rounded-sm border-2 px-2.5 py-1 text-sm font-bold uppercase tracking-wide ${
                puntaje >= 70 ? "border-success text-success" : puntaje >= 50 ? "border-primary text-primary" : "border-destructive text-destructive"
              }`}
            >
              {nivel}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={printPage}
              className="gap-2 border-ink-deep-foreground/20 bg-transparent text-ink-deep-foreground hover:bg-white/5 hover:text-ink-deep-foreground"
            >
              <Download className="h-3.5 w-3.5" /> Descargar PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onRestart}
              className="gap-2 border-ink-deep-foreground/20 bg-transparent text-ink-deep-foreground hover:bg-white/5 hover:text-ink-deep-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Nueva entrevista
            </Button>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <Progress value={puntaje} className="h-2 bg-ink-deep-foreground/15" />
          <p className="max-w-3xl text-sm leading-relaxed text-ink-deep-foreground/75">{resumen}</p>
        </div>
      </div>

      {/* Competencias */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">Competencias evaluadas</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {competencias.map((c) => (
            <div key={c.nombre} className="space-y-1.5">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium text-foreground">{c.nombre}</span>
                <span className={`font-mono text-sm font-semibold ${scoreTone(c.puntaje)}`}>{c.puntaje}</span>
              </div>
              <Progress value={c.puntaje} aria-label={`${c.nombre}: ${c.puntaje} de 100`} />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-success">
              <CheckCircle className="h-4 w-4" /> Lo que hiciste bien
            </CardTitle>
          </CardHeader>
          <CardContent>
            {fortalezas.length > 0 ? (
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {fortalezas.map((t, i) => <li key={i}>• {t}</li>)}
              </ul>
            ) : (
              <p className="text-sm italic text-muted-foreground">Sin fortalezas destacadas en esta sesión.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Lightbulb className="h-4 w-4" /> Recomendaciones para mejorar
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recomendaciones.length > 0 ? (
              <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                {recomendaciones.map((t, i) => <li key={i}>{t}</li>)}
              </ol>
            ) : (
              <p className="text-sm italic text-muted-foreground">Sin recomendaciones adicionales.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detalle por pregunta */}
      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-sm font-semibold text-foreground">Detalle por pregunta</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple">
            {preguntas.map((q, i) => (
              <AccordionItem key={i} value={`q-${i}`} className="last:border-none">
                <AccordionTrigger>
                  <span className="flex min-w-0 flex-1 items-start gap-3 pr-3">
                    <span className={`w-9 shrink-0 font-mono ${scoreTone(q.puntaje)}`}>{q.puntaje}</span>
                    <span className="min-w-0 font-medium">{i + 1}. {q.pregunta}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pl-12">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-foreground/70">Tu respuesta</p>
                    <p className="mt-1 whitespace-pre-wrap">{q.respuesta}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-foreground/70">Comentario</p>
                    <p className="mt-1">{q.comentario}</p>
                  </div>
                  {q.sugerencia && (
                    <div className="border-l-2 border-primary bg-accent p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/70">Cómo mejorarla</p>
                      <p className="mt-1 text-foreground">{q.sugerencia}</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
