"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Sparkles, ArrowLeft, Copy, CheckCircle2, AlertCircle } from "lucide-react"

function EmailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const historyId = searchParams.get("id")

  // Estado de protección cuando se ingresa directo sin ID
  if (!historyId) {
    return (
      <Card className="border-border/60 text-center py-12 px-4 shadow-sm">
        <CardContent className="space-y-4 max-w-md mx-auto">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-full w-fit mx-auto">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold">No has seleccionado ningún análisis</h2>
          <p className="text-sm text-muted-foreground">
            Para generar un correo de presentación personalizado, selecciona primero un registro desde tu historial.
          </p>
          <Button
            onClick={() => router.push("/historial")}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
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
            <h1 className="text-2xl font-bold tracking-tight">Generador de Email</h1>
            <Badge variant="secondary" className="gap-1 bg-blue-100 text-blue-700">
              <Sparkles className="h-3 w-3" /> Precargado desde Historial
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Correo generado automáticamente para el registro ID: <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-blue-700">{historyId}</code>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base">Carta de Presentación / Email</CardTitle>
                <CardDescription className="text-xs">
                  Redactado en base a tu perfil y los requerimientos de la oferta
                </CardDescription>
              </div>
            </div>
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <Copy className="h-3.5 w-3.5" />
              Copiar Texto
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="p-4 rounded-lg bg-blue-50/60 border border-blue-100 text-sm space-y-3">
            <p className="font-semibold text-blue-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              Borrador Sugerido:
            </p>
            <div className="text-blue-950 space-y-2 leading-relaxed whitespace-pre-line font-sans">
              {`Estimado/a Equipo de Selección,

Les escribo para expresar mi gran interés en la posición de Desarrollador Frontend. Tras revisar los requisitos de la vacante, estoy convencido de que mi experiencia construyendo interfaces con React, TypeScript y Next.js me permite aportar valor inmediato a su equipo.

Quedo a su disposición para coordinar una entrevista.

Atentamente,
Candidato`}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function EmailPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Cargando borrador de email...</div>}>
      <EmailContent />
    </Suspense>
  )
}