"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Briefcase, Target, Upload, FileText, CheckCircle2, XCircle, RefreshCw } from "lucide-react"

export default function JobMatchPage() {
  const [jobDescription, setJobDescription] = useState("")
  const [selectedCv, setSelectedCv] = useState<File | null>(null)
  const [useStoredCv, setUseStoredCv] = useState(true) // CV ya cargado en la plataforma
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    score: number
    matchingSkills: string[]
    missingSkills: string[]
    summary: string
  } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedCv(e.target.files[0])
      setUseStoredCv(false)
    }
  }

  const handleMatch = () => {
    if (!jobDescription.trim()) return
    setIsAnalyzing(true)

    setTimeout(() => {
      setResult({
        score: 85,
        matchingSkills: ["React / Next.js", "TypeScript", "Tailwind CSS", "Git"],
        missingSkills: ["GraphQL", "Docker"],
        summary: "Tu CV tiene una alta coincidencia con las demandas de la vacante. El perfil cubre las tecnologías principales solicitadas, destacando en el ecosistema Frontend."
      })
      setIsAnalyzing(false)
    }, 1500)
  }

  const handleReset = () => {
    setJobDescription("")
    setSelectedCv(null)
    setUseStoredCv(true)
    setResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col gap-2 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Job Match</h1>
            <Badge variant="outline" className="gap-1 border-primary/30 text-primary">
              <Target className="h-3 w-3" /> Job Match
            </Badge>
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Compara la descripción de una vacante directamente contra tu CV para evaluar tu compatibilidad.
          </p>
        </div>
      </div>

      {!result ? (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Columna 1: Selección/Carga de CV */}
          <Card className="flex flex-col justify-between">
            <div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <FileText className="h-5 w-5 text-primary" />
                  1. Tu Currículum (CV)
                </CardTitle>
                <CardDescription>
                  Usa el CV activo en la plataforma o sube uno específico para esta prueba.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Opción 1: CV Pre-cargado */}
                <div
                  onClick={() => { setUseStoredCv(true); setSelectedCv(null); }}
                  className={`flex items-center justify-between rounded-md border p-4 transition-colors ${
                    useStoredCv ? "border-primary bg-accent" : "border-border hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">CV_Principal_Guardado.pdf</p>
                      <p className="text-xs text-muted-foreground">CV analizado previamente en Diagnóstico ATS</p>
                    </div>
                  </div>
                  {useStoredCv && <Badge>Activo</Badge>}
                </div>

                {/* Opción 2: Subir un CV distinto */}
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cv-upload-input"
                  />
                  <label
                    htmlFor="cv-upload-input"
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed p-4 text-sm transition-colors ${
                      selectedCv ? "border-success/40 bg-success/5 text-success" : "border-border text-muted-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <Upload className="h-4 w-4" />
                    {selectedCv ? selectedCv.name : "Subir otro archivo de CV (.pdf, .docx)"}
                  </label>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Columna 2: Vacante u Oferta */}
          <Card className="flex flex-col justify-between">
            <div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Briefcase className="h-5 w-5 text-primary" />
                  2. Oferta de Trabajo
                </CardTitle>
                <CardDescription>
                  Pega aquí los requisitos o el texto descriptivo de la vacante.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  placeholder="Ejemplo: Requerimos Desarrollador Frontend con experiencia en React, TypeScript y Tailwind CSS..."
                  value={jobDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJobDescription(e.target.value)}
                  className="flex min-h-[160px] w-full resize-none rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                />
              </CardContent>
            </div>
            <div className="flex justify-end p-6 pt-0">
              <Button
                onClick={handleMatch}
                disabled={!jobDescription.trim() || isAnalyzing}
                className="w-full gap-2 md:w-auto"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Comparando CV y Vacante...
                  </>
                ) : (
                  <>
                    <Target className="h-4 w-4" />
                    Calcular Compatibilidad
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        /* Vista de Resultados */
        <div className="space-y-6">
          <div className="rounded-md border border-ink-deep/10 bg-ink-deep p-6 text-ink-deep-foreground">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-ink-deep-foreground/60">
                    Evaluación de {useStoredCv ? "CV Principal Guardado" : selectedCv?.name} vs. oferta
                  </span>
                </div>
                <div className="flex items-end gap-3">
                  <span className="font-mono text-5xl font-bold leading-none">{result.score}</span>
                  <span className="pb-1 text-sm text-ink-deep-foreground/60">% de compatibilidad</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`-rotate-3 rounded-sm border-2 px-2.5 py-1 text-sm font-bold tracking-wide ${
                    result.score >= 60 ? "border-success text-success" : "border-destructive text-destructive"
                  }`}
                >
                  {result.score >= 60 ? "COMPATIBLE" : "BAJA COINCIDENCIA"}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="gap-2 border-ink-deep-foreground/20 bg-transparent text-ink-deep-foreground hover:bg-white/5 hover:text-ink-deep-foreground"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Nueva Comparación
                </Button>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Progress value={result.score} className="h-2 bg-ink-deep-foreground/15" />
              <p className="max-w-3xl text-sm leading-relaxed text-ink-deep-foreground/75">{result.summary}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-success">
                  <CheckCircle2 className="h-4 w-4" /> Habilidades del CV que coinciden
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {result.matchingSkills.map((skill, idx) => (
                  <Badge key={idx} variant="success">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-destructive">
                  <XCircle className="h-4 w-4" /> Requisitos de la Vacante no encontrados
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {result.missingSkills.map((skill, idx) => (
                  <Badge key={idx} variant="destructive">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
