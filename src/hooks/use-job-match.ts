import { useState, useCallback } from "react";
import { JobMatchPayload, JobMatchResult } from "@/src/types/job-match";
import { jobMatchService } from "@/src/services/job-match-service";

export function useJobMatch() {
  const [result, setResult] = useState<JobMatchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeMatch = useCallback(async (payload: JobMatchPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await jobMatchService.analyzeMatch(payload);
      setResult(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al evaluar la compatibilidad de la vacante";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetMatch = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    result,
    isLoading,
    error,
    analyzeMatch,
    resetMatch,
  };
}