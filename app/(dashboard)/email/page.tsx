"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Notice } from "@/components/ui/notice"
import { Mail, History, ArrowLeft, Copy, Check, AlertCircle, Save, Loader2, Sparkles } from "lucide-react"
import { historialService } from "@/services/historial-service"
import { emailService } from "@/services/email-service"
import { EmailDraft } from "@/types/email"

const TONES = [
  { value: "professional", label: "Formal / Profesional" },
  { value: "enthusiastic", label: "Entusiasta / Directo" },
  { value: "friendly", label: "Cercano / Persuasivo" },
]

const fieldClass =
  "w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"

function EmailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const historyId = searchParams.get("id")

  const [jobName, setJobName] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [tone, setTone] = useState("professional")
  const [recipient, setRecipient] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [draft, setDraft] = useState<EmailDraft | null>(null)
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!historyId) return
    historialService
      .get(historyId)
      .then((d) => setJobName(d.nombre))
      .catch((err) => setLoadError(err instanceof Error ? err.message : "No se pudo cargar el análisis."))
  }, [historyId])

  if (!historyId) {
    return (
      <Card className="px-4 py-12 text-center">
        <CardContent className="mx-auto max-w-md space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary">
            <AlertCircle className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-foreground">No has seleccionado ningún análisis</h2>
          <p className="text-sm text-muted-foreground">
            Para generar un correo de presentación personalizado, selecciona primero un registro desde tu historial.
          </p>
          <Button onClick={() => router.push("/historial")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Ir al Historial de Análisis
          </Button>
        </CardContent>
      </Card>
    )
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)
    setSaved(false)
    try {
      const result = await emailService.generate({
        jobMatchId: historyId,
        tone,
        recipientName: recipient.trim() || undefined,
      })
      setDraft(result)
      setSubject(result.subject)
      setBody(result.body)
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo generar el correo.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!draft) return
    setIsSaving(true)
    setError(null)
    try {
      const updated = await emailService.update(draft.id, { subject, body })
      setDraft(updated)
      setSaved(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudieron guardar los cambios.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`Asunto: ${subject}\n\n${body}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError("No se pudo copiar al portapapeles. Selecciona el texto y cópialo manualmente.")
    }
  }

  const dirty = draft !== null && (subject !== draft.subject || body !== draft.body)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Generador de Email</h1>
            <Badge variant="outline" className="gap-1.5 whitespace-nowrap border-primary/30 text-primary">
              <History className="h-3 w-3" /> Desde Historial
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Correo de postulación para: <strong className="text-foreground">{jobName ?? "cargando..."}</strong>
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => router.push("/historial")} className="gap-1.5 self-start md:self-auto">
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver al Historial
        </Button>
      </div>

      {loadError && <Notice tone="error">{loadError}</Notice>}

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card className="h-fit">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2 text-base">
              <Mail className="h-5 w-5 text-primary" /> Opciones
            </CardTitle>
            <CardDescription>El correo se redacta con tu CV y los requisitos de la oferta.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            <div className="space-y-1.5">
              <label htmlFor="tone" className="text-sm font-medium">Tono del mensaje</label>
              <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)} className={fieldClass} disabled={isGenerating}>
                {TONES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="recipient" className="text-sm font-medium">Nombre del destinatario (opcional)</label>
              <Input id="recipient" placeholder="Ej: María González" value={recipient} onChange={(e) => setRecipient(e.target.value)} disabled={isGenerating} />
            </div>
            <Button onClick={handleGenerate} disabled={isGenerating || !!loadError} className="w-full gap-2">
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Generando borrador...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> {draft ? "Generar otra versión" : "Generar email"}
                </>
              )}
            </Button>
            {error && <Notice tone="error">{error}</Notice>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base">Borrador</CardTitle>
                <CardDescription>Puedes editar el texto antes de usarlo.</CardDescription>
              </div>
              {draft && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1.5" onClick={handleCopy}>
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copiado" : "Copiar"}
                  </Button>
                  <Button size="sm" className="gap-1.5" onClick={handleSave} disabled={!dirty || isSaving}>
                    {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                    Guardar
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            {isGenerating ? (
              <div className="space-y-3" aria-busy="true">
                <div className="h-10 animate-pulse rounded-md bg-secondary/60" />
                <div className="h-56 animate-pulse rounded-md bg-secondary/60" />
              </div>
            ) : draft ? (
              <>
                {saved && !dirty && <Notice tone="success">Cambios guardados.</Notice>}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-sm font-medium">Asunto</label>
                  <Input id="subject" value={subject} onChange={(e) => { setSubject(e.target.value); setSaved(false) }} maxLength={255} />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="body" className="text-sm font-medium">Mensaje</label>
                  <textarea id="body" value={body} onChange={(e) => { setBody(e.target.value); setSaved(false) }} rows={14} className={`${fieldClass} resize-y leading-relaxed`} />
                </div>
              </>
            ) : (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Elige el tono y presiona <strong>Generar email</strong> para crear tu borrador.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function EmailPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Cargando...</div>}>
      <EmailContent />
    </Suspense>
  )
}
