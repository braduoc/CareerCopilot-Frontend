"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Notice } from "@/components/ui/notice"
import { Progress } from "@/components/ui/progress"
import { ChatInput } from "@/components/modules/entrevista/chat-input"
import { InterviewEvaluation } from "@/components/modules/entrevista/interview-evaluation"
import { MessageSquare, History, ArrowLeft, AlertCircle, Mic, User, Loader2, Flag, RefreshCw } from "lucide-react"
import { historialService } from "@/services/historial-service"
import { interviewService } from "@/services/interview-service"
import {
  InterviewEvaluation as Evaluation,
  InterviewMessage,
  InterviewSeniority,
  InterviewType,
} from "@/types/entrevista"

const TYPES: { value: InterviewType; label: string }[] = [
  { value: "mixta", label: "Mixta (técnica y conductual)" },
  { value: "tecnica", label: "Técnica" },
  { value: "conductual", label: "Conductual" },
]
const LEVELS: { value: InterviewSeniority; label: string }[] = [
  { value: "Junior", label: "Junior / Inicial" },
  { value: "Semi-Senior", label: "Intermedio / Semi-Senior" },
  { value: "Senior", label: "Senior / Liderazgo" },
]

const fieldClass =
  "w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"

function EntrevistaContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const historyId = searchParams.get("id")

  const [jobName, setJobName] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [tipo, setTipo] = useState<InterviewType>("mixta")
  const [seniority, setSeniority] = useState<InterviewSeniority>("Junior")
  const [interviewId, setInterviewId] = useState<string | null>(null)
  const [messages, setMessages] = useState<InterviewMessage[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [isStarting, setIsStarting] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [allAnswered, setAllAnswered] = useState(false)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [confirmFinish, setConfirmFinish] = useState(false)
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!historyId) return
    historialService
      .get(historyId)
      .then((d) => setJobName(d.nombre))
      .catch((err) => setLoadError(err instanceof Error ? err.message : "No se pudo cargar el análisis."))
  }, [historyId])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, isSending, isEvaluating])

  if (!historyId) {
    return (
      <Card className="px-4 py-12 text-center">
        <CardContent className="mx-auto max-w-md space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary">
            <AlertCircle className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-foreground">No has seleccionado ningún análisis</h2>
          <p className="text-sm text-muted-foreground">
            Para iniciar una simulación de entrevista personalizada, selecciona primero un registro desde tu historial.
          </p>
          <Button onClick={() => router.push("/historial")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Ir al Historial de Análisis
          </Button>
        </CardContent>
      </Card>
    )
  }

  const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  const handleStart = async () => {
    setIsStarting(true)
    setError(null)
    try {
      const res = await interviewService.start(historyId, { tipo, seniority })
      setInterviewId(res.entrevistaId)
      setMessages([{ id: "first", sender: "ai", text: res.respuesta }])
      setCurrentQuestion(res.preguntaActual)
      setTotalQuestions(res.totalPreguntas)
      setAnswered(0)
      setAllAnswered(false)
      setEvaluation(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar la entrevista.")
    } finally {
      setIsStarting(false)
    }
  }

  const requestEvaluation = async (id: string) => {
    setIsEvaluating(true)
    setConfirmFinish(false)
    setError(null)
    try {
      setEvaluation(await interviewService.finish(id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo generar la evaluación.")
    } finally {
      setIsEvaluating(false)
    }
  }

  const handleSend = async (text: string): Promise<boolean> => {
    if (!interviewId) return false
    const userMessage: InterviewMessage = { id: newId(), sender: "user", text }
    setMessages((prev) => [...prev, userMessage])
    setIsSending(true)
    setConfirmFinish(false)
    setError(null)
    try {
      const res = await interviewService.sendMessage(interviewId, text)
      setMessages((prev) => [...prev, { id: newId(), sender: "ai", text: res.respuesta }])
      setAnswered((n) => n + 1)
      setCurrentQuestion(res.preguntaActual)
      setTotalQuestions(res.totalPreguntas)
      if (res.finalizada) {
        setAllAnswered(true)
        setIsSending(false)
        await requestEvaluation(interviewId)
      }
      return true
    } catch (err) {
      // La respuesta no se guardó: se quita del chat y vuelve al campo de texto para reintentar.
      setMessages((prev) => prev.filter((m) => m.id !== userMessage.id))
      setError(err instanceof Error ? err.message : "No se pudo enviar tu respuesta.")
      return false
    } finally {
      setIsSending(false)
    }
  }

  const handleRestart = () => {
    setInterviewId(null)
    setMessages([])
    setAnswered(0)
    setCurrentQuestion(1)
    setAllAnswered(false)
    setEvaluation(null)
    setConfirmFinish(false)
    setError(null)
  }

  const progressValue = totalQuestions > 0 ? Math.round((answered / totalQuestions) * 100) : 0
  const chatLocked = allAnswered || isEvaluating

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Simulador de Entrevista IA</h1>
            <Badge variant="outline" className="gap-1.5 whitespace-nowrap border-primary/30 text-primary">
              <History className="h-3 w-3" /> Desde Historial
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Vacante: <strong className="text-foreground">{jobName ?? (loadError ? "no disponible" : "cargando...")}</strong>
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => router.push("/historial")} className="gap-1.5 self-start md:self-auto">
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver al Historial
        </Button>
      </div>

      {loadError && <Notice tone="error">{loadError}</Notice>}

      {evaluation ? (
        <InterviewEvaluation evaluation={evaluation} jobName={jobName} onRestart={handleRestart} />
      ) : !interviewId ? (
        <Card className="mx-auto max-w-xl">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2 text-base">
              <Mic className="h-5 w-5 text-primary" /> Configura tu entrevista
            </CardTitle>
            <CardDescription>
              El entrevistador conoce la oferta, tu CV y las brechas detectadas en el Job Match. Al final recibirás un puntaje y recomendaciones.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-1.5">
              <label htmlFor="tipo" className="text-sm font-medium">Tipo de entrevista</label>
              <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value as InterviewType)} className={fieldClass} disabled={isStarting}>
                {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="nivel" className="text-sm font-medium">Nivel</label>
              <select id="nivel" value={seniority} onChange={(e) => setSeniority(e.target.value as InterviewSeniority)} className={fieldClass} disabled={isStarting}>
                {LEVELS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
            </div>
            {error && <Notice tone="error">{error}</Notice>}
            <Button onClick={handleStart} disabled={isStarting || !!loadError} className="w-full gap-2">
              {isStarting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Preparando entrevista...
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" /> Iniciar simulación
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="space-y-4 border-b border-border">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-sm border border-border bg-secondary p-2 text-primary">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base">Entrevistador virtual</CardTitle>
                  <CardDescription>
                    {chatLocked ? "Entrevista terminada" : `Pregunta ${Math.min(currentQuestion, totalQuestions)} de ${totalQuestions}`}
                  </CardDescription>
                </div>
              </div>
              {!chatLocked && (
                confirmFinish ? (
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-muted-foreground">¿Terminar y evaluar {answered} {answered === 1 ? "respuesta" : "respuestas"}?</span>
                    <Button size="sm" onClick={() => requestEvaluation(interviewId)}>Sí, evaluar</Button>
                    <Button size="sm" variant="ghost" onClick={() => setConfirmFinish(false)}>Seguir</Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5"
                    onClick={() => setConfirmFinish(true)}
                    disabled={isSending || answered === 0}
                    title={answered === 0 ? "Responde al menos una pregunta para recibir una evaluación" : undefined}
                  >
                    <Flag className="h-3.5 w-3.5" /> Terminar y evaluar
                  </Button>
                )
              )}
            </div>
            <Progress value={progressValue} aria-label={`${answered} de ${totalQuestions} preguntas respondidas`} />
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="max-h-[480px] space-y-4 overflow-y-auto pr-1" aria-live="polite">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.sender === "ai" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border bg-secondary text-primary">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-md border p-4 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "border-ink-deep/10 bg-ink-deep text-ink-deep-foreground"
                        : "border-border bg-card text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-ink-deep/20 bg-ink-deep text-ink-deep-foreground">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              {isSending && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> El entrevistador está escribiendo...
                </div>
              )}
              {isEvaluating && (
                <div className="flex items-center gap-2 rounded-md border border-primary/30 bg-primary/5 p-4 text-sm text-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" /> Analizando tus respuestas y calculando tu puntaje...
                </div>
              )}
              <div ref={endRef} />
            </div>

            {error && (
              <Notice tone="error">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span>{error}</span>
                  {allAnswered && !isEvaluating && (
                    <Button size="sm" variant="outline" className="gap-1.5" onClick={() => requestEvaluation(interviewId)}>
                      <RefreshCw className="h-3.5 w-3.5" /> Reintentar evaluación
                    </Button>
                  )}
                </div>
              </Notice>
            )}

            {!chatLocked && <ChatInput onSendMessage={handleSend} isLoading={isSending} />}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function EntrevistaPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Cargando simulador...</div>}>
      <EntrevistaContent />
    </Suspense>
  )
}
