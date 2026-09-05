"use client";

import { useState, FormEvent, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Send, CornerDownLeft, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, isLoading = false, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim() || isLoading || disabled) return;

    onSendMessage(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="relative flex items-center">
        <textarea
          className="flex min-h-[90px] w-full rounded-2xl border border-violet-200 dark:border-violet-900/50 bg-violet-50/20  p-3 pr-12 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground shadow-2xs transition-colors focus-visible:border-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          placeholder="Escribe tu respuesta con el mayor detalle posible..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading || disabled}
        />
        <Button
          type="submit"
          size="sm"
          className="absolute right-3 bottom-3 h-8 w-8 p-0 rounded-xl bg-violet-600 hover:bg-violet-700 text-white shadow-xs hover:shadow-violet-500/20 transition-all disabled:opacity-40"
          disabled={isLoading || disabled || !message.trim()}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
        </Button>
      </div>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1">
        <span className="text-violet-600/80 dark:text-violet-400/80 font-medium">
          Responde emulando un escenario real de entrevista
        </span>
        <span className="flex items-center gap-1">
          Presiona <CornerDownLeft className="w-3 h-3 inline text-violet-500" /> Enter para enviar
        </span>
      </div>
    </form>
  );
}