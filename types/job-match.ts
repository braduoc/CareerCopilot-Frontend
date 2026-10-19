/** Contrato real de POST /job-match/analyze (backend). */
export interface JobMatchPayload {
  nombre: string;
  ofertaTexto: string;
}

export interface JobMatchResult {
  id: string;
  scoreCompatibilidad: number;
  cumple: string[];
  noCumple: string[];
  resumen: string;
}
