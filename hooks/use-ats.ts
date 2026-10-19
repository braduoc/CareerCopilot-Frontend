import { useState, useCallback } from "react";
import { ATSDiagnostic } from "@/types/ats";
import { atsService } from "@/services/ats-service";

export function useAts() {
  const [diagnostic, setDiagnostic] = useState<ATSDiagnostic | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeCv = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await atsService.analyzeCv(file);
      setDiagnostic(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al analizar el CV";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetDiagnostic = useCallback(() => {
    setDiagnostic(null);
    setError(null);
  }, []);

  return {
    diagnostic,
    isLoading,
    error,
    analyzeCv,
    resetDiagnostic,
  };
}