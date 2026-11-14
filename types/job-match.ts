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
  recomendaciones: string[];
}

/** POST /job-match/extract: oferta leída desde la URL de un portal. */
export interface JobExtractResult {
  nombre: string;
  empresa: string | null;
  ofertaTexto: string;
  fuente: "datos-estructurados" | "ia";
  url: string;
}
