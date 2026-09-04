"use client";

import { useState } from "react";
import { JobInputForm } from "@/src/components/modules/job-match/job-input-form";
import { MatchResult } from "@/src/components/modules/job-match/match-result";
import { AtsSkeleton } from "@/src/components/modules/ats/ats-skeleton";
import { JobMatchResult } from "@/src/types/job-match";

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
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Job Match & Análisis de Brecha (Gaps)
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Compara los requisitos de una oferta laboral específica contra tu Curriculum Vitae para descubrir qué habilidades cumples y cómo adaptar tu postulación.
        </p>
      </div>

      {/* Formulario de Entrada */}
      <JobInputForm onSubmit={handleAnalyze} isLoading={isLoading} />

      {/* Cargador y Resultados */}
      {isLoading && <AtsSkeleton />}

      {!isLoading && result && <MatchResult result={result} />}
    </div>
  );
}