"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, FileText, Trash2, Bot, Mail } from "lucide-react"

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
            <Badge variant="secondary" className="gap-1 bg-amber-100 text-amber-700 hover:bg-amber-100">
              <Sparkles className="h-3 w-3" /> Registros
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Consulta y gestiona tus análisis. Genera entrevistas simuladas o correos de presentación desde cada registro.
          </p>
        </div>
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-3 border-b border-border/40">
          <CardTitle className="text-base font-semibold">Análisis Recientes</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {items.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground text-sm">
              No tienes análisis guardados en el historial.
            </div>
          ) : (
            <div className="divide-y divide-border/40">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between hover:bg-muted/20 px-3 rounded-lg transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-md bg-purple-50 text-purple-600 mt-0.5">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        <Badge
                          variant="outline"
                          className={
                            item.score >= 80
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-xs"
                              : "bg-amber-50 text-amber-700 border-amber-200 text-xs"
                          }
                        >
                          {item.score}% Match
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.date} • Tipo: <span className="font-medium text-foreground">{item.type}</span> • ID: <code className="bg-muted px-1 rounded">{item.id}</code>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40 w-full sm:w-auto justify-end">
                    {/* Apunta a /entrevista */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 text-xs border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
                      onClick={() => router.push(`/entrevista?id=${item.id}`)}
                    >
                      <Bot className="h-3.5 w-3.5" />
                      Entrevista IA
                    </Button>

                    {/* Apunta a /email */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 text-xs border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
                      onClick={() => router.push(`/email?id=${item.id}`)}
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Generar Email
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground hover:text-rose-600 hover:bg-rose-50"
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
        </CardContent>
      </Card>
    </div>
  )
}