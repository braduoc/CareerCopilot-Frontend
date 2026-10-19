"use client";

import { useEffect, useState } from "react";
import { History, Loader2 } from "lucide-react";
import { atsService, ATSHistoryItem } from "@/services/ats-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AtsHistoryProps {
  onSelect: (id: string) => void;
  loadingId?: string | null;
}

/** Lista de diagnósticos anteriores; al elegir uno se abre su resultado completo. */
export function AtsHistory({ onSelect, loadingId }: AtsHistoryProps) {
  const [items, setItems] = useState<ATSHistoryItem[] | null>(null);

  useEffect(() => {
    atsService.history().then(setItems).catch(() => setItems([]));
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <History className="h-4 w-4 text-primary" /> Diagnósticos anteriores
        </CardTitle>
      </CardHeader>
      <CardContent className="divide-y divide-border p-0">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            disabled={loadingId === item.id}
            className="flex w-full items-center justify-between gap-4 px-6 py-3 text-left transition-colors hover:bg-secondary/50 disabled:opacity-60"
          >
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-foreground">{item.fileName}</span>
              <span className="block text-xs text-muted-foreground">
                {new Date(item.createdAt).toLocaleString("es-CL", { dateStyle: "medium", timeStyle: "short" })}
              </span>
            </span>
            {loadingId === item.id ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <span className="shrink-0 font-mono text-sm font-bold text-foreground">
                {item.score ?? "—"}
                <span className="text-xs font-normal text-muted-foreground"> /100</span>
              </span>
            )}
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
