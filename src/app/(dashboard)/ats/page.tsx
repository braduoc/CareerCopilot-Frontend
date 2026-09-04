"use client";

import { CvUploader } from "@/src/components/modules/ats/cv-uploader";
import { AtsScoreCard } from "@/src/components/modules/ats/ats-score-card";
import { AtsSkeleton } from "@/src/components/modules/ats/ats-skeleton";
import { useAts } from "@/src/hooks/use-ats";

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
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Diagnóstico y Optimización ATS
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sube tu Curriculum Vitae en formato PDF o DOCX para auditar su estructura y porcentaje de lectura frente a filtros automáticos.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg text-sm text-rose-700 dark:text-rose-400">
          {error}
        </div>
      )}

      {/* Zona de Carga de Archivo */}
      {!diagnostic && !isLoading && (
        <CvUploader onFileUpload={handleFileSelect} isLoading={isLoading} />
      )}

      {/* Renderizado Condicional: Skeleton vs Resultado */}
      {isLoading && <AtsSkeleton />}

      {!isLoading && diagnostic && (
        <AtsScoreCard diagnostic={diagnostic} onReset={resetDiagnostic} />
      )}
    </div>
  );
}