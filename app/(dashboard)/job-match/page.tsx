"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Briefcase, Sparkles, Target, Upload, FileText, CheckCircle2, XCircle, RefreshCw, Paperclip } from "lucide-react"

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
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Coincidencia de Empleo</h1>
            <Badge variant="secondary" className="gap-1 bg-blue-100 text-blue-700">
              <Sparkles className="h-3 w-3" /> Job Match IA
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Compara la descripción de una vacante directamente contra tu CV para evaluar tu compatibilidad.
          </p>
        </div>
      </div>

      {!result ? (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Columna 1: Selección/Carga de CV */}
          <Card className="border-border/60 flex flex-col justify-between">
            <div>
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
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
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between ${
                    useStoredCv ? "border-blue-600 bg-blue-50/50" : "border-border/60 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">CV_Principal_Guardado.pdf</p>
                      <p className="text-xs text-muted-foreground">CV analizado previamente en Diagnóstico ATS</p>
                    </div>
                  </div>
                  {useStoredCv && <Badge className="bg-blue-600 text-white">Activo</Badge>}
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
                    className={`p-4 rounded-lg border-2 border-dashed cursor-pointer transition-all flex items-center justify-center gap-2 text-sm text-muted-foreground ${
                      selectedCv ? "border-emerald-500 bg-emerald-50/50 text-emerald-700" : "hover:bg-muted/50 border-border/80"
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
          <Card className="border-border/60 flex flex-col justify-between">
            <div>
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
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
                  className="flex min-h-[160px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 resize-none"
                />
              </CardContent>
            </div>
            <div className="p-6 pt-0 flex justify-end">
              <Button
                onClick={handleMatch}
                disabled={!jobDescription.trim() || isAnalyzing}
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
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
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-xl text-white">Nivel de Compatibilidad</CardTitle>
                <p className="text-xs text-blue-100 mt-1">
                  Evaluación de {useStoredCv ? "CV Principal Guardado" : selectedCv?.name} vs Oferta
                </p>
              </div>
              <Badge className="bg-white/20 text-white border-white/30 text-lg px-3 py-1">
                {result.score}% Match
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={result.score} className="h-2 bg-white/20" />
              <p className="text-sm leading-relaxed text-white/90">{result.summary}</p>
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Nueva Comparación
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-emerald-600 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Habilidades del CV que coinciden
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {result.matchingSkills.map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-rose-600 flex items-center gap-2">
                  <XCircle className="h-4 w-4" /> Requisitos de la Vacante no encontrados
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {result.missingSkills.map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
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
  