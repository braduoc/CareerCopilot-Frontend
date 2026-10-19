export interface HistoryMatch {
  id: string;
  nombre: string;
  scoreCompatibilidad: number;
  fecha: string;
}

export interface HistoryMatchDetail extends HistoryMatch {
  cumple: string[];
  noCumple: string[];
  ofertaTexto: string;
}
