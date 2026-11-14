export type InterviewType = "mixta" | "tecnica" | "conductual";
export type InterviewSeniority = "Junior" | "Semi-Senior" | "Senior";

export interface InterviewStartPayload {
  tipo: InterviewType;
  seniority: InterviewSeniority;
}

export interface InterviewStartResponse {
  entrevistaId: string;
  respuesta: string;
  preguntaActual: number;
  totalPreguntas: number;
}

export interface InterviewReply {
  respuesta: string;
  /** true cuando se respondió la última pregunta: hay que pedir la evaluación. */
  finalizada: boolean;
  preguntaActual: number;
  totalPreguntas: number;
}

export interface InterviewMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
}

export interface InterviewQuestionFeedback {
  pregunta: string;
  respuesta: string;
  puntaje: number;
  comentario: string;
  sugerencia: string;
}

export interface InterviewEvaluation {
  entrevistaId: string;
  puntaje: number;
  nivel: string;
  resumen: string;
  preguntasRespondidas: number;
  totalPreguntas: number;
  competencias: { nombre: string; puntaje: number }[];
  preguntas: InterviewQuestionFeedback[];
  fortalezas: string[];
  recomendaciones: string[];
}
