"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, Sparkles, ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react"

function EntrevistaContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const historyId = searchParams.get("id")

  // Si no hay ID, muestra la pantalla intuitiva que redirige al historial
  if (!historyId) {
    return (
      <Card className="border-border/60 text-center py-12 px-4 shadow-sm">
        <CardContent className="space-y-4 max-w-md mx-auto">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-full w-fit mx-auto">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold">No has seleccionado ningún análisis</h2>
          <p className="text-sm text-muted-foreground">
            Para iniciar una simulación de entrevista personalizada, selecciona primero un registro desde tu historial.
          </p>
          <Button
            onClick={() => router.push("/historial")}
            className="gap-2 bg-purple-600 hover:bg-purple-700 text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Ir al Historial de Análisis
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Simulador de Entrevista IA</h1>
            <Badge variant="secondary" className="gap-1 bg-purple-100 text-purple-700">
              <Sparkles className="h-3 w-3" /> Precargado desde Historial
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Sesión activa para el registro ID: <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-purple-700">{historyId}</code>
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/historial")}
          className="gap-1.5 text-xs self-start md:self-auto"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver al Historial
        </Button>
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardHeader className="border-b border-border/40 bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600 text-white rounded-lg">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">Reclutador Virtual IA</CardTitle>
              <CardDescription className="text-xs">
                Preguntas basadas en tu CV y la vacante del análisis seleccionado
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="p-4 rounded-lg bg-purple-50/60 border border-purple-100 text-sm space-y-2">
            <p className="font-semibold text-purple-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-600" />
              ¡Contexto cargado con éxito!
            </p>
            <p className="text-purple-800 leading-relaxed">
              "Hola. He revisado tu diagnóstico y la vacante correspondiente. Vamos a practicar las preguntas clave para evaluar tus fortalezas en Frontend y preparar tus mejores respuestas. ¿Estás listo para comenzar con la primera pregunta?"
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <input
              type="text"
              placeholder="Escribe tu respuesta aquí..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
            />
            <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
              <Send className="h-4 w-4" />
              Responder
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function EntrevistaPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Cargando simulador...</div>}>
      <EntrevistaContent />
    </Suspense>
  )
}