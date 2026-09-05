"use client";

import { CvUploader } from "@/components/modules/ats/cv-uploader";
import { AtsScoreCard } from "@/components/modules/ats/ats-score-card";
import { AtsSkeleton } from "@/components/modules/ats/ats-skeleton";
import { useAts } from "@/hooks/use-ats";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, FileSearch, ShieldCheck, Zap } from "lucide-react";

export default function AtsPage() {
  const { diagnostic, isLoading, error, analyzeCv, resetDiagnostic } = useAts();

  const handleFileSelect = async (file: File) => {
    try {
      await analyzeCv(file);
    } catch (err) {
      console.error("Error al procesar el archivo:", err);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      {/* Header Estilizado con Badge de IA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-secondary text-primary hover:bg-secondary border-none px-3 py-1 gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Algoritmo de Escaneo ATS v2.4
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Diagnóstico y Optimización ATS
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">
            Audita el nivel de legibilidad de tu Curriculum Vitae frente a los reclutadores automáticos antes de aplicar a vacantes clave.
          </p>
        </div>
      </div>

      {/* Alerta de Error */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-sm text-destructive flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          {error}
        </div>
      )}

      {/* Vista Inicial: Carga + Banner de Características */}
      {!diagnostic && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Componente Uploader (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <CvUploader onFileUpload={handleFileSelect} isLoading={isLoading} />
          </div>

          {/* Tarjeta de Beneficios / Guía Visual (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="border-border/60 shadow-sm bg-card/50 backdrop-blur">
              <CardContent className="p-6 space-y-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <FileSearch className="w-5 h-5 text-primary" />
                  ¿Qué analizamos en tu CV?
                </h3>
                
                <ul className="space-y-4 text-xs text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary text-primary shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Estructura y Encabezados Standard</p>
                      <p className="mt-0.5">Verificamos que secciones clave como Educación y Experiencia sean reconocidas por los parsers.</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary text-primary shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Extracción de Palabras Clave</p>
                      <p className="mt-0.5">Comparamos tus hard & soft skills con la densidad léxica que buscan los reclutadores.</p>
                    </div>
                  </li>
                </ul>

                {/* Micro Banner de Gradiente */}
                <div className="p-4 rounded-xl bg-brand-gradient text-white space-y-1 mt-2 shadow-sm">
                  <p className="text-xs font-semibold">Pro tip de optimización</p>
                  <p className="text-[11px] opacity-90 leading-relaxed">
                    Evita usar tablas complejas o diseños multicolumna en tu PDF original para maximizar el puntaje de lectura.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Renderizado Condicional: Skeleton vs Resultado */}
      {isLoading && <AtsSkeleton />}

      {!isLoading && diagnostic && (
        <AtsScoreCard diagnostic={diagnostic} onReset={resetDiagnostic} />
      )}
    </div>
  );
}