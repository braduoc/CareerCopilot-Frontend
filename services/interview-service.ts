import { apiClient } from "@/lib/api-client";
import {
  InterviewEvaluation,
  InterviewReply,
  InterviewStartPayload,
  InterviewStartResponse,
} from "@/types/entrevista";

export const interviewService = {
  start: (jobMatchId: string, payload: InterviewStartPayload) =>
    apiClient<InterviewStartResponse>(`/interview/start/${jobMatchId}`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  sendMessage: (interviewId: string, contenido: string) =>
    apiClient<InterviewReply>(`/interview/${interviewId}/message`, {
      method: "POST",
      body: JSON.stringify({ contenido }),
    }),
  /** Termina la entrevista y devuelve la evaluación (si ya existía, la misma). */
  finish: (interviewId: string) =>
    apiClient<InterviewEvaluation>(`/interview/${interviewId}/finish`, { method: "POST" }),
};
