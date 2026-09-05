"use client";

import { InterviewQuestion, AnswerFeedback } from "@/types/entrevista";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, User, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";

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
            <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/60 flex items-center justify-center text-violet-600 dark:text-violet-300 shrink-0 border border-violet-200 dark:border-violet-800/50 shadow-2xs">
              <Bot className="w-4 h-4" />
            </div>
          )}

          <div
            className={`max-w-[85%] space-y-2.5 ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            {/* Mensaje principal */}
            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                msg.sender === "user"
                  ? "bg-violet-600 text-white rounded-br-xs"
                  : "bg-violet-50/50 dark:bg-violet-950/30 text-foreground border border-violet-200/80 dark:border-violet-900/40 rounded-bl-xs"
              }`}
            >
              {msg.questionData && (
                <div className="mb-2 flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className="text-[10px] uppercase font-semibold border-violet-300 dark:border-violet-800 bg-violet-100/50 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300"
                  >
                    {msg.questionData.category}
                  </Badge>
                </div>
              )}
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>

            {/* Retroalimentación si existe para este mensaje */}
            {msg.feedbackData && (
              <Card className="border-violet-200 dark:border-violet-900/50 bg-violet-50/30  shadow-xs">
                <CardHeader className="py-2.5 px-4 flex flex-row items-center justify-between border-b border-violet-100 dark:border-violet-900/40 bg-violet-100/40 dark:bg-violet-900/20 rounded-t-xl">
                  <CardTitle className="text-xs font-semibold text-violet-700 dark:text-violet-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-violet-600 dark:text-violet-400" /> Evaluación de tu Respuesta
                  </CardTitle>
                  <Badge 
                    variant="outline"
                    className={
                      msg.feedbackData.score >= 70 
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
                        : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold"
                    }
                  >
                    {msg.feedbackData.score} / 100
                  </Badge>
                </CardHeader>

                <CardContent className="p-4 space-y-3 text-xs">
                  {/* Puntos Fuertes */}
                  {msg.feedbackData.strengths.length > 0 && (
                    <div>
                      <p className="font-semibold text-violet-900 dark:text-violet-200 mb-1">
                        Fortalezas:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                        {msg.feedbackData.strengths.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Áreas a mejorar */}
                  {msg.feedbackData.areasForImprovement.length > 0 && (
                    <div>
                      <p className="font-semibold text-violet-900 dark:text-violet-200 mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> A mejorar:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                        {msg.feedbackData.areasForImprovement.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Respuesta recomendada */}
                  {msg.feedbackData.suggestedAnswer && (
                    <div className="pt-2 border-t border-violet-100 dark:border-violet-900/40">
                      <p className="font-semibold text-violet-900 dark:text-violet-200 mb-1.5 flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" /> Respuesta Sugerida / Modelo:
                      </p>
                      <p className="italic text-muted-foreground bg-card/80 p-3 rounded-xl border border-violet-200/60 dark:border-violet-900/30 leading-relaxed shadow-2xs">
                        "{msg.feedbackData.suggestedAnswer}"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {msg.sender === "user" && (
            <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white shrink-0 shadow-2xs">
              <User className="w-4 h-4" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}