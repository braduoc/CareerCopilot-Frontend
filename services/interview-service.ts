import { apiClient } from "@/lib/api-client";
import { InterviewQuestion, AnswerFeedback, InterviewSessionConfig } from "@/types/entrevista";

export const interviewService = {
  async startSession(config: InterviewSessionConfig): Promise<InterviewQuestion> {
    return apiClient<InterviewQuestion>("/interview/start", {
      method: "POST",
      body: JSON.stringify(config),
    });
  },

  async submitAnswer(questionId: string, answer: string): Promise<{ feedback: AnswerFeedback; nextQuestion?: InterviewQuestion }> {
    return apiClient("/interview/answer", {
      method: "POST",
      body: JSON.stringify({ questionId, answer }),
    });
  },
};