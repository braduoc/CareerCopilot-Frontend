"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, CheckCircle2 } from "lucide-react"

interface InterviewSetupFormProps {
  onStartInterview: (data: { historialId?: string; nivel: string }) => void
}

export function InterviewSetupForm({ onStartInterview }: InterviewSetupFormProps) {
  const searchParams = useSearchParams()
  const historialId = searchParams.get("id")

  const [nivel, setNivel] = useState("intermedio")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onStartInterview({ historialId: historialId || undefined, nivel })
  }

  return (
    <Card className="max-w-xl mx-auto shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-primary" />
          Configuración de Entrevista IA
        </CardTitle>
        <CardDescription>
          {historialId
            ? "Cargamos la información de tu posición desde el historial seleccionado."
            : "Prepara tus respuestas para practicar con la IA."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {historialId && (
          <div className="mb-6 p-3 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              <CheckCircle2 className="h-4 w-4" />
              <span>Historial vinculado: <strong>#{historialId}</strong></span>
            </div>
            <Badge variant="outline">Cargado</Badge>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nivel de la Entrevista</label>
            <select
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="junior">Junior / Inicial</option>
              <option value="intermedio">Intermedio / Semi-Senior</option>
              <option value="senior">Senior / Liderazgo</option>
            </select>
          </div>

          <Button type="submit" className="w-full flex items-center justify-center gap-2">
            <Mic className="h-4 w-4" />
            Iniciar Simulación de Entrevista
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}