"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, CheckCircle2, Loader2 } from "lucide-react"

interface EmailGeneratorFormProps {
  onGenerate: (data: { historialId?: string; tono: string; mensajeAdicional: string }) => void
}

export function EmailGeneratorForm({ onGenerate }: EmailGeneratorFormProps) {
  const searchParams = useSearchParams()
  const historialId = searchParams.get("id")

  const [tono, setTono] = useState("profesional")
  const [mensajeAdicional, setMensajeAdicional] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de respuesta mientras se integra el backend
    setTimeout(() => {
      onGenerate({ historialId: historialId || undefined, tono, mensajeAdicional })
      setIsLoading(false)
    }, 800)
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <span>Generador de Email</span>
        </CardTitle>
        <CardDescription>
          Genera un correo personalizado para postulación o seguimiento.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {historialId && (
          <div className="mb-6 p-3 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              <CheckCircle2 className="h-4 w-4" />
              <span>Datos tomados del Historial <strong>#{historialId}</strong></span>
            </div>
            <Badge variant="outline">Cargado</Badge>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tono del Mensaje</label>
            <select
              value={tono}
              onChange={(e) => setTono(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="profesional">Formal / Profesional</option>
              <option value="entusiasta">Entusiasta / Directo</option>
              <option value="cercano">Cercano / Persuasivo</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notas o detalles adicionales (Opcional)</label>
            <textarea
              value={mensajeAdicional}
              onChange={(e) => setMensajeAdicional(e.target.value)}
              placeholder="Ej. Mencionar que estoy disponible inmediatamente..."
              rows={3}
              className="w-full rounded-md border border-input bg-background p-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generando borrador...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Generar Email</span>
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}