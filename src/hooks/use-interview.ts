import { useState, useCallback } from "react";
import { InterviewQuestion, AnswerFeedback, InterviewSessionConfig } from "@/src/types/entrevista";
import { interviewService } from "@/src/services/interview-service";

export interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  questionData?: InterviewQuestion;
  feedbackData?: AnswerFeedback;
}

export function useInterview() {
  const [config, setConfig] = useState<InterviewSessionConfig | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startSession = useCallback(async (sessionConfig: InterviewSessionConfig) => {
    setIsLoading(true);
    setError(null);
    setConfig(sessionConfig);
    setIsFinished(false);
    setMessages([]);

    try {
      const firstQuestion = await interviewService.startSession(sessionConfig);
      setCurrentQuestion(firstQuestion);
      setMessages([
        {
          id: `msg-${Date.now()}`,
          sender: "ai",
          text: firstQuestion.question,
          questionData: firstQuestion,
        },
      ]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al iniciar la sesión de entrevista";
      setError(message);
      setConfig(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitAnswer = useCallback(async (userAnswer: string) => {
    if (!currentQuestion || !config) return;

    setIsLoading(true);
    setError(null);

    const userMsgId = `usr-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: userAnswer,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const { feedback, nextQuestion } = await interviewService.submitAnswer(currentQuestion.id, userAnswer);

      // Adjuntar feedback a la última respuesta del usuario
      setMessages((prev) =>
        prev.map((msg) => (msg.id === userMsgId ? { ...msg, feedbackData: feedback } : msg))
      );

      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: "ai",
            text: nextQuestion.question,
            questionData: nextQuestion,
          },
        ]);
      } else {
        setIsFinished(true);
        setCurrentQuestion(null);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al procesar la respuesta";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [currentQuestion, config]);

  const resetSession = useCallback(() => {
    setConfig(null);
    setMessages([]);
    setCurrentQuestion(null);
    setIsFinished(false);
    setError(null);
  }, []);

  return {
    config,
    messages,
    currentQuestion,
    isLoading,
    isFinished,
    error,
    startSession,
    submitAnswer,
    resetSession,
  };
}