"use client";

import { InterviewQuestion, AnswerFeedback } from "@/types/entrevista";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, User, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";

export interface MessageItem {
  id: string;
  sender: "ai" | "user";
  text: string;
  questionData?: InterviewQuestion;
  feedbackData?: AnswerFeedback;
}

interface ChatBoxProps {
  messages: MessageItem[];
}

export function ChatBox({ messages }: ChatBoxProps) {
  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-3 ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {msg.sender === "ai" && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border bg-secondary text-primary">
              <MessageSquare className="h-4 w-4" />
            </div>
          )}

          <div
            className={`max-w-[85%] space-y-2.5 ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            {/* Mensaje principal */}
            <div
              className={`rounded-md border p-4 text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "border-ink-deep/10 bg-ink-deep text-ink-deep-foreground"
                  : "border-border bg-card text-foreground"
              }`}
            >
              {msg.questionData && (
                <div className="mb-2 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      msg.sender === "user"
                        ? "border-ink-deep-foreground/30 text-ink-deep-foreground/80"
                        : undefined
                    }
                  >
                    {msg.questionData.category}
                  </Badge>
                </div>
              )}
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>

            {/* Retroalimentación si existe para este mensaje */}
            {msg.feedbackData && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between border-b border-border py-3">
                  <CardTitle className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-success" /> Evaluación de tu Respuesta
                  </CardTitle>
                  <Badge variant={msg.feedbackData.score >= 70 ? "success" : "warning"}>
                    {msg.feedbackData.score} / 100
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-3 p-4 text-sm">
                  {/* Puntos Fuertes */}
                  {msg.feedbackData.strengths.length > 0 && (
                    <div>
                      <p className="mb-1 font-semibold text-foreground">
                        Fortalezas:
                      </p>
                      <ul className="list-inside list-disc space-y-0.5 text-muted-foreground">
                        {msg.feedbackData.strengths.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Áreas a mejorar */}
                  {msg.feedbackData.areasForImprovement.length > 0 && (
                    <div>
                      <p className="mb-1 flex items-center gap-1.5 font-semibold text-foreground">
                        <AlertTriangle className="h-3.5 w-3.5 text-primary" /> A mejorar:
                      </p>
                      <ul className="list-inside list-disc space-y-0.5 text-muted-foreground">
                        {msg.feedbackData.areasForImprovement.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Respuesta recomendada */}
                  {msg.feedbackData.suggestedAnswer && (
                    <div className="border-t border-border pt-3">
                      <p className="mb-1.5 flex items-center gap-1.5 font-semibold text-foreground">
                        <Lightbulb className="h-3.5 w-3.5 text-primary" /> Respuesta Sugerida / Modelo:
                      </p>
                      <p className="rounded-sm border border-border bg-secondary/50 p-3 italic leading-relaxed text-muted-foreground">
                        &ldquo;{msg.feedbackData.suggestedAnswer}&rdquo;
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {msg.sender === "user" && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-ink-deep/20 bg-ink-deep text-ink-deep-foreground">
              <User className="h-4 w-4" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
