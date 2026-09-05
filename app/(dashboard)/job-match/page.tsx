"use client";

import { useState } from "react";
import { JobInputForm } from "@/components/modules/job-match/job-input-form";
import { MatchResult } from "@/components/modules/job-match/match-result";
import { AtsSkeleton } from "@/components/modules/ats/ats-skeleton";
import { JobMatchResult } from "@/types/job-match";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Target, Layers, CheckCircle2 } from "lucide-react";

// Datos mock para simular la respuesta de comparación por IA
const MOCK_JOB_MATCH: JobMatchResult = {
  matchPercentage: 78,
  jobTitle: "Senior Frontend Developer",
  companyName: "Tech Corp",
  summary: "Tienes una alta compatibilidad con el perfil técnico solicitado. Destacan tu dominio en React y TypeScript, aunque la vacante solicita conocimientos específicos en Next.js y metodologías de Testing.",
  gaps: {
    technicalSkills: {
      matching: ["React", "TypeScript", "Tailwind CSS", "REST API", "Git"],
      missing: ["Next.js (App Router)", "Jest / React Testing Library", "GraphQL"],
    },
    softSkills: {
      matching: ["Trabajo en Equipo", "Comunicación Efectiva", "Autonomía"],
      missing: ["Liderazgo Técnico", "Mentoría de Juniors"],
    },
  },
  recommendations: [
    "Resalta tus proyectos donde utilizaste Server Components o arquitecturas avanzadas en React.",
    "Añade ejemplos o métricas concretas de pruebas unitarias si has trabajado con algún framework de testeo.",
    "Ajusta el resumen de tu CV para enfatizar el rol de liderazgo o apoyo a miembros del equipo.",
  ],
};

export default function JobMatchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<JobMatchResult | null>(null);

  const handleAnalyze = (jobTitle: string, jobDescription: string) => {
    setIsLoading(true);
    setResult(null);

    // Simulación de llamado al backend con IA (2.5 segundos)
    setTimeout(() => {
      setResult({
        ...MOCK_JOB_MATCH,
        jobTitle: jobTitle || MOCK_JOB_MATCH.jobTitle,
      });
      setIsLoading(false);
    }, 2500);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      {/* Header Estilizado con Badge de IA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-secondary text-primary hover:bg-secondary border-none px-3 py-1 gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Comparación Inteligente de Perfil
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Job Match & Análisis de Brechas
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">
            Compara los requisitos de una oferta laboral específica contra tu Curriculum Vitae para descubrir qué habilidades cumples y cómo adaptar tu postulación.
          </p>
        </div>
      </div>

      {/* Grid Inicial: Formulario + Guía Lateral */}
      {!result && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-6">
            <JobInputForm onSubmit={handleAnalyze} isLoading={isLoading} />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <Card className="border-border/60 shadow-sm bg-card/50 backdrop-blur">
              <CardContent className="p-6 space-y-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Beneficios del Job Match
                </h3>
                
                <ul className="space-y-4 text-xs text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary text-primary shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Detección instantánea de Gaps</p>
                      <p className="mt-0.5">Identifica exactamente qué palabras clave o tecnologías faltan en tu resumen antes de enviar tu solicitud.</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary text-primary shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Recomendaciones personalizadas</p>
                      <p className="mt-0.5">Recibe sugerencias para reformular tus puntos de experiencia clave orientándolos al perfil buscado.</p>
                    </div>
                  </li>
                </ul>

                {/* Banner de marca */}
                <div className="p-4 rounded-xl bg-brand-gradient text-white space-y-1 mt-2 shadow-sm">
                  <p className="text-xs font-semibold">Tip para mayor precisión</p>
                  <p className="text-[11px] opacity-90 leading-relaxed">
                    Pega el texto completo de la vacante (incluyendo requerimientos deseables) para obtener un porcentaje de match más certero.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Cargador y Resultados */}
      {isLoading && <AtsSkeleton />}

      {!isLoading && result && (
        <div className="space-y-6">
          <JobInputForm onSubmit={handleAnalyze} isLoading={isLoading} />
          <MatchResult result={result} />
        </div>
      )}
    </div>
  );
}