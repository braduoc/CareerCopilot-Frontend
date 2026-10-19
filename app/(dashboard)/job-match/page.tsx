"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Notice } from "@/components/ui/notice"
import { Progress } from "@/components/ui/progress"
import { Briefcase, Target, FileText, CheckCircle2, XCircle, RefreshCw, MessageSquare, Mail } from "lucide-react"
import { jobMatchService } from "@/services/job-match-service"
import { dashboardService } from "@/services/dashboard-service"
import { JobMatchResult } from "@/types/job-match"

const MIN_OFFER_LENGTH = 20

export default function JobMatchPage() {
  const router = useRouter()
  const [jobName, setJobName] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [atsScore, setAtsScore] = useState<number | null>(null)
  const [hasCv, setHasCv] = useState<boolean | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<JobMatchResult | null>(null)

  // Para comparar necesitamos un CV ya analizado en Diagnóstico ATS.
  useEffect(() => {
    dashboardService
      .summary()
      .then((summary) => {
        setAtsScore(summary.currentAtsScore)
        setHasCv(summary.currentAtsScore !== null)
      })
      .catch(() => setHasCv(null))
  }, [])

  const offerTooShort = jobDescription.trim().length < MIN_OFFER_LENGTH
  const canSubmit = hasCv !== false && jobName.trim().length > 0 && !offerTooShort && !isAnalyzing

  const handleMatch = async () => {
    if (!canSubmit) return
    setIsAnalyzing(true)
    setError(null)
    try {
      const data = await jobMatchService.analyzeMatch({
        nombre: jobName.trim(),
        ofertaTexto: jobDescription.trim(),
      })
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo calcular la compatibilidad.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setJobName("")
    setJobDescription("")
    setError(null)
    setResult(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Job Match</h1>
            <Badge variant="outline" className="gap-1 border-primary/30 text-primary">
              <Target className="h-3 w-3" /> Compatibilidad
            </Badge>
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Compara una vacante contra tu CV para evaluar qué tan compatible eres.
          </p>
        </div>
      </div>

      {!result ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <FileText className="h-5 w-5 text-primary" />
                1. Tu currículum (CV)
              </CardTitle>
              <CardDescription>Se usa el último CV que analizaste en Diagnóstico ATS.</CardDescription>
            </CardHeader>
            <CardContent>
              {hasCv === false ? (
                <Notice tone="info">
                  Aún no tienes un CV analizado.{" "}
                  <Link href="/ats" className="font-semibold text-primary underline-offset-4 hover:underline">
                    Sube tu CV en Diagnóstico ATS
                  </Link>{" "}
                  para poder comparar.
                </Notice>
              ) : (
                <div className="flex items-center justify-between rounded-md border border-primary bg-accent p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">CV de Diagnóstico ATS</p>
                      <p className="text-xs text-muted-foreground">
                        {atsScore !== null ? `Puntaje ATS: ${atsScore}/100` : "Último CV analizado"}
                      </p>
                    </div>
                  </div>
                  <Badge>Activo</Badge>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="flex flex-col justify-between">
            <div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Briefcase className="h-5 w-5 text-primary" />
                  2. Oferta de trabajo
                </CardTitle>
                <CardDescription>Escribe el nombre de la vacante y pega sus requisitos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <label htmlFor="job-name" className="text-sm font-medium text-foreground">
                    Nombre de la vacante
                  </label>
                  <Input
                    id="job-name"
                    placeholder="Ej: Desarrollador Backend — Acme"
                    value={jobName}
                    maxLength={255}
                    onChange={(e) => setJobName(e.target.value)}
                    disabled={isAnalyzing}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="job-description" className="text-sm font-medium text-foreground">
                    Requisitos de la oferta
                  </label>
                  <textarea
                    id="job-description"
                    placeholder="Ejemplo: Requerimos desarrollador backend con experiencia en Python, FastAPI y SQL..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    disabled={isAnalyzing}
                    className="flex min-h-[160px] w-full resize-y rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:opacity-50"
                  />
                  {jobDescription.length > 0 && offerTooShort && (
                    <p className="text-xs text-muted-foreground">
                      Escribe al menos {MIN_OFFER_LENGTH} caracteres ({jobDescription.trim().length}/{MIN_OFFER_LENGTH}).
                    </p>
                  )}
                </div>
                {error && <Notice tone="error">{error}</Notice>}
              </CardContent>
            </div>
            <div className="flex justify-end p-6 pt-0">
              <Button onClick={handleMatch} disabled={!canSubmit} className="w-full gap-2 md:w-auto">
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Comparando CV y vacante...
                  </>
                ) : (
                  <>
                    <Target className="h-4 w-4" />
                    Calcular compatibilidad
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-md border border-ink-deep/10 bg-ink-deep p-6 text-ink-deep-foreground">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-ink-deep-foreground/60">{jobName}</span>
                </div>
                <div className="flex items-end gap-3">
                  <span className="font-mono text-5xl font-bold leading-none">{result.scoreCompatibilidad}</span>
                  <span className="pb-1 text-sm text-ink-deep-foreground/60">% de compatibilidad</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`-rotate-3 rounded-sm border-2 px-2.5 py-1 text-sm font-bold tracking-wide ${
                    result.scoreCompatibilidad >= 60 ? "border-success text-success" : "border-destructive text-destructive"
                  }`}
                >
                  {result.scoreCompatibilidad >= 60 ? "COMPATIBLE" : "BAJA COINCIDENCIA"}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="gap-2 border-ink-deep-foreground/20 bg-transparent text-ink-deep-foreground hover:bg-white/5 hover:text-ink-deep-foreground"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Nueva comparación
                </Button>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Progress value={result.scoreCompatibilidad} className="h-2 bg-ink-deep-foreground/15" />
              <p className="max-w-3xl text-sm leading-relaxed text-ink-deep-foreground/75">{result.resumen}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-success">
                  <CheckCircle2 className="h-4 w-4" /> Lo que tu CV ya cumple
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {result.cumple.length > 0 ? (
                  result.cumple.map((item, idx) => (
                    <Badge key={idx} variant="success">
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm italic text-muted-foreground">Sin coincidencias detectadas</span>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-destructive">
                  <XCircle className="h-4 w-4" /> Requisitos que no aparecen en tu CV
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {result.noCumple.length > 0 ? (
                  result.noCumple.map((item, idx) => (
                    <Badge key={idx} variant="destructive">
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm italic text-muted-foreground">Cumples todos los requisitos detectados</span>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-foreground">Siguiente paso</p>
                <p className="text-sm text-muted-foreground">
                  Este análisis quedó guardado en tu historial. Prepárate para esta vacante.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="gap-2" onClick={() => router.push(`/entrevista?id=${result.id}`)}>
                  <MessageSquare className="h-4 w-4" /> Practicar entrevista
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => router.push(`/email?id=${result.id}`)}>
                  <Mail className="h-4 w-4" /> Generar email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
