"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, FileText, Trash2, MessageSquare, Mail } from "lucide-react"

export default function HistoryPage() {
  const router = useRouter()

  const [items, setItems] = useState([
    {
      id: "ats-8812",
      type: "ATS",
      title: "CV_Desarrollador_Frontend.pdf",
      score: 85,
      date: "2026-09-05",
      role: "Desarrollador Frontend"
    },
    {
      id: "match-4491",
      type: "Match",
      title: "Vacante Senior React Developer",
      score: 78,
      date: "2026-09-04",
      role: "Senior React Developer"
    },
  ])

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Historial de Análisis</h1>
            <Badge variant="outline" className="gap-1.5 border-primary/30 text-primary">
              <History className="h-3 w-3" /> Registros
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Consulta y gestiona tus análisis. Genera entrevistas simuladas o correos de presentación desde cada registro.
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="border-y border-border py-10 text-center text-sm text-muted-foreground">
          No tienes análisis guardados en el historial.
        </div>
      ) : (
        <div className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 px-2 py-4 transition-colors hover:bg-card/60 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3.5">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border bg-secondary text-primary">
                  <FileText className="h-4.5 w-4.5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <Badge variant={item.score >= 80 ? "success" : "warning"}>
                      {item.score}% Match
                    </Badge>
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {item.date} · {item.type} · {item.id}
                  </p>
                </div>
              </div>

              <div className="flex w-full items-center justify-end gap-2 self-end border-t border-border pt-2 sm:w-auto sm:self-auto sm:border-t-0 sm:pt-0">
                {/* Apunta a /entrevista */}
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => router.push(`/entrevista?id=${item.id}`)}
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Entrevista IA
                </Button>

                {/* Apunta a /email */}
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => router.push(`/email?id=${item.id}`)}
                >
                  <Mail className="h-3.5 w-3.5" />
                  Generar Email
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDelete(item.id)}
                  title="Eliminar análisis"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
