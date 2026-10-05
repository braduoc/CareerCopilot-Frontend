"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, History, ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react"

function EntrevistaContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const historyId = searchParams.get("id")

  // Si no hay ID, muestra la pantalla intuitiva que redirige al historial
  if (!historyId) {
    return (
      <Card className="px-4 py-12 text-center">
        <CardContent className="mx-auto max-w-md space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary">
            <AlertCircle className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-foreground">No has seleccionado ningún análisis</h2>
          <p className="text-sm text-muted-foreground">
            Para iniciar una simulación de entrevista personalizada, selecciona primero un registro desde tu historial.
          </p>
          <Button onClick={() => router.push("/historial")} className="gap-2">
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
            <Badge variant="outline" className="gap-1.5 border-primary/30 text-primary">
              <History className="h-3 w-3" /> Precargado desde Historial
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Sesión activa para el registro ID:{" "}
            <code className="rounded-sm bg-secondary px-1.5 py-0.5 font-mono text-primary">{historyId}</code>
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/historial")}
          className="gap-1.5 self-start md:self-auto"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver al Historial
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-3">
            <div className="rounded-sm border border-border bg-secondary p-2 text-primary">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">Reclutador Virtual IA</CardTitle>
              <CardDescription>
                Preguntas basadas en tu CV y la vacante del análisis seleccionado
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-2 rounded-sm border border-success/30 bg-success/5 p-4 text-sm">
            <p className="flex items-center gap-2 font-semibold text-foreground">
              <CheckCircle2 className="h-4 w-4 text-success" />
              ¡Contexto cargado con éxito!
            </p>
            <p className="leading-relaxed text-foreground/80">
              &ldquo;Hola. He revisado tu diagnóstico y la vacante correspondiente. Vamos a practicar las preguntas clave para evaluar tus fortalezas en Frontend y preparar tus mejores respuestas. ¿Estás listo para comenzar con la primera pregunta?&rdquo;
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Input type="text" placeholder="Escribe tu respuesta aquí..." />
            <Button className="gap-2">
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
