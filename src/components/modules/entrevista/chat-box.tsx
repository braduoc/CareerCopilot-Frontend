import { InterviewQuestion, AnswerFeedback } from "@/src/types/entrevista";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
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
            <div className="w-8 h-8 rounded-full bg-secondary dark:bg-violet-950 flex items-center justify-center text-primary dark:text-violet-300 shrink-0">
              <Bot className="w-5 h-5" />
            </div>
          )}

          <div
            className={`max-w-[85%] space-y-2 ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            {/* Mensaje principal */}
            <div
              className={`p-4 rounded-xl text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-muted text-foreground border border-border rounded-bl-none"
              }`}
            >
              {msg.questionData && (
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="text-xs uppercase bg-card/50">
                    {msg.questionData.category}
                  </Badge>
                </div>
              )}
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>

            {/* Retroalimentación si existe para este mensaje */}
            {msg.feedbackData && (
              <Card className="border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20">
                <CardHeader className="py-2.5 px-4 flex flex-row items-center justify-between border-b border-emerald-100 dark:border-emerald-900/40">
                  <CardTitle className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Evaluacion de tu Respuesta
                  </CardTitle>
                  <Badge variant={msg.feedbackData.score >= 70 ? "success" : "warning"}>
                    {msg.feedbackData.score} / 100
                  </Badge>
                </CardHeader>
                <CardContent className="p-4 space-y-3 text-xs">
                  {/* Puntos Fuertes */}
                  {msg.feedbackData.strengths.length > 0 && (
                    <div>
                      <p className="font-semibold text-foreground mb-1">
                        Fortalezas:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                        {msg.feedbackData.strengths.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Areas a mejorar */}
                  {msg.feedbackData.areasForImprovement.length > 0 && (
                    <div>
                      <p className="font-semibold text-foreground mb-1 flex items-center gap-1">
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
                    <div className="pt-2 border-t border-emerald-100 dark:border-emerald-900/40">
                      <p className="font-semibold text-foreground mb-1 flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 text-violet-500" /> Respuesta Sugerida / Modelo:
                      </p>
                      <p className="italic text-muted-foreground bg-card/60 p-2.5 rounded-lg border border-border">
                        "{msg.feedbackData.suggestedAnswer}"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {msg.sender === "user" && (
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground shrink-0">
              <User className="w-5 h-5" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}