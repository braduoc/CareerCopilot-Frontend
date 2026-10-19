"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileSearch, Sparkles, ShieldCheck, Zap } from "lucide-react"

// Componentes del módulo ATS
import { CvUploader } from "@/components/modules/ats/cv-uploader"
import { AtsScoreCard } from "@/components/modules/ats/ats-score-card"
import { AtsSkeleton } from "@/components/modules/ats/ats-skeleton"

// Importación del hook
import { useATS } from "@/hooks/use-ats"
import { ATSDiagnostic } from "@/types/ats"

export default function AtsPage() {
  const { loading, result, uploadCV } = useATS()

  // Adaptador seguro para CvUploader
  const UploaderComponent = CvUploader as any

  // Mapeo/Adaptación de ATSAnalysisResult a ATSDiagnostic para AtsScoreCard
  const diagnosticData: ATSDiagnostic | null = result
    ? {
        score: (result as any).score ?? 0,
        summary: (result as any).summary ?? "",
        parsedText: (result as any).parsedText ?? "",
        sections: (result as any).sections ?? {
          contactInfo: false,
          workExperience: false,
          education: false,
          skills: false,
        },
        strengths: (result as any).strengths ?? [],
        improvements: (result as any).improvements ?? [],
        missingKeywords: (result as any).missingKeywords ?? [],
      }
    : null

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Diagnóstico ATS</h1>
            <Badge variant="secondary" className="gap-1 bg-purple-100 text-purple-700">
              <Sparkles className="h-3 w-3" /> IA Powered
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Optimiza tu currículum para superar los filtros automáticos de selección.
          </p>
        </div>
      </div>

      {/* Tarjetas Informativas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-purple-50/50 border-purple-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">Formato Compatible</CardTitle>
            <ShieldCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-purple-700">
              Verifica que la estructura sea leíble por los sistemas ATS.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-indigo-50/50 border-indigo-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-indigo-900">Palabras Clave</CardTitle>
            <Zap className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-indigo-700">
              Detecta términos técnicos indispensables según la industria.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50/50 border-purple-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">Puntaje de Legibilidad</CardTitle>
            <FileSearch className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-purple-700">
              Obtén una calificación porcentual sobre el impacto de tu CV.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Subir CV */}
      {!diagnosticData && !loading && (
        <UploaderComponent
          onUpload={uploadCV}
          onUploadCV={uploadCV}
          onFileSelect={uploadCV}
          onAnalyze={uploadCV}
          isLoading={loading}
        />
      )}

      {/* Skeleton mientras analiza */}
      {loading && <AtsSkeleton />}

      {/* Resultado del diagnóstico */}
      {diagnosticData && !loading && (
        <AtsScoreCard diagnostic={diagnosticData} />
      )}
    </div>
  )
}