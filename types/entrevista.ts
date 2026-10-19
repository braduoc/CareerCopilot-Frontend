export interface InterviewStartPayload {
  tipo: string;
  seniority: string;
}

export interface InterviewStartResponse {
  entrevistaId: string;
  respuesta: string;
}

export interface InterviewReply {
  respuesta: string;
}

export interface InterviewMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
}
