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
          className="flex min-h-[90px] w-full resize-none rounded-md border border-input bg-card p-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Escribe tu respuesta con el mayor detalle posible..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading || disabled}
        />
        <Button
          type="submit"
          size="sm"
          className="absolute bottom-3 right-3 h-8 w-8 p-0"
          disabled={isLoading || disabled || !message.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
      <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
        <span className="font-medium text-primary/80">
          Responde emulando un escenario real de entrevista
        </span>
        <span className="flex items-center gap-1">
          Presiona <CornerDownLeft className="inline h-3 w-3 text-primary" /> Enter para enviar
        </span>
      </div>
    </form>
  );
}
