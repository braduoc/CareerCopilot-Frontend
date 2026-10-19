"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Notice } from "@/components/ui/notice"
import { ChatInput } from "@/components/modules/entrevista/chat-input"
import { MessageSquare, History, ArrowLeft, AlertCircle, Mic, User, Loader2, Flag } from "lucide-react"
import { historialService } from "@/services/historial-service"
import { interviewService } from "@/services/interview-service"
import { InterviewMessage } from "@/types/entrevista"

const TYPES = [
  { value: "mixta", label: "Mixta (técnica y conductual)" },
  { value: "tecnica", label: "Técnica" },
  { value: "conductual", label: "Conductual" },
]
const LEVELS = [
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
  const [tipo, setTipo] = useState("mixta")
  const [seniority, setSeniority] = useState("Junior")
  const [interviewId, setInterviewId] = useState<string | null>(null)
  const [messages, setMessages] = useState<InterviewMessage[]>([])
  const [isStarting, setIsStarting] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [finished, setFinished] = useState(false)
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
  }, [messages, isSending])

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

  const push = (sender: "ai" | "user", text: string) =>
    setMessages((prev) => [...prev, { id: `${Date.now()}-${prev.length}`, sender, text }])

  const handleStart = async () => {
    setIsStarting(true)
    setError(null)
    try {
      const res = await interviewService.start(historyId, { tipo, seniority })
      setInterviewId(res.entrevistaId)
      setMessages([{ id: "first", sender: "ai", text: res.respuesta }])
      setFinished(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar la entrevista.")
    } finally {
      setIsStarting(false)
    }
  }

  const handleSend = async (text: string) => {
    if (!interviewId) return
    push("user", text)
    setIsSending(true)
    setError(null)
    try {
      const res = await interviewService.sendMessage(interviewId, text)
      push("ai", res.respuesta)
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar tu respuesta.")
    } finally {
      setIsSending(false)
    }
  }

  const handleFinish = async () => {
    if (!interviewId) return
    setError(null)
    try {
      await interviewService.finish(interviewId)
      setFinished(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo finalizar la entrevista.")
    }
  }

  const handleRestart = () => {
    setInterviewId(null)
    setMessages([])
    setFinished(false)
    setError(null)
  }

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
            Vacante: <strong className="text-foreground">{jobName ?? "cargando..."}</strong>
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => router.push("/historial")} className="gap-1.5 self-start md:self-auto">
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver al Historial
        </Button>
      </div>

      {loadError && <Notice tone="error">{loadError}</Notice>}

      {!interviewId ? (
        <Card className="mx-auto max-w-xl">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2 text-base">
              <Mic className="h-5 w-5 text-primary" /> Configura tu entrevista
            </CardTitle>
            <CardDescription>Las preguntas se basan en tu CV y en la vacante seleccionada.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-1.5">
              <label htmlFor="tipo" className="text-sm font-medium">Tipo de entrevista</label>
              <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} className={fieldClass} disabled={isStarting}>
                {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="nivel" className="text-sm font-medium">Nivel</label>
              <select id="nivel" value={seniority} onChange={(e) => setSeniority(e.target.value)} className={fieldClass} disabled={isStarting}>
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
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-sm border border-border bg-secondary p-2 text-primary">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base">Reclutador virtual</CardTitle>
                  <CardDescription>{finished ? "Entrevista finalizada" : "Responde con el mayor detalle posible"}</CardDescription>
                </div>
              </div>
              {!finished && (
                <Button size="sm" variant="outline" className="gap-1.5" onClick={handleFinish} disabled={isSending}>
                  <Flag className="h-3.5 w-3.5" /> Finalizar
                </Button>
              )}
            </div>
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
                  <Loader2 className="h-4 w-4 animate-spin" /> El reclutador está escribiendo...
                </div>
              )}
              <div ref={endRef} />
            </div>

            {error && <Notice tone="error">{error}</Notice>}

            {finished ? (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border bg-secondary/40 p-4 text-sm">
                <span className="text-foreground">Terminaste esta entrevista. Puedes practicar de nuevo cuando quieras.</span>
                <Button size="sm" onClick={handleRestart}>Nueva entrevista</Button>
              </div>
            ) : (
              <ChatInput onSendMessage={handleSend} isLoading={isSending} />
            )}
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
