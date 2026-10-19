"use client"

import { useState } from "react"

export interface ATSAnalysisResult {
  score: number
  summary: string
  suggestions: string[]
  downloadUrl?: string
}

export function useATS() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ATSAnalysisResult | null>(null)

  const uploadCV = async (file: File) => {
    setLoading(true)
    setError(null)

    try {
      // Intento de conexión con el backend real si existiera el endpoint
      // const formData = new FormData()
      // formData.append("file", file)
      // const response = await fetch("/api/ats/upload", { method: "POST", body: formData })

      // Simulamos latencia de red para validar experiencia de usuario
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Datos simulados (Fallback) mientras no esté integrado el backend
      setResult({
        score: 88,
        summary: "Tu currículum cumple con la mayoría de las palabras clave para posiciones técnicas.",
        suggestions: [
          "Destaca más los logros cuantitativos.",
          "Agrega un enlace a tu repositorio de GitHub.",
        ],
        downloadUrl: "#",
      })
    } catch (err: any) {
      // Captura limpia del fallo sin romper la interfaz
      console.warn("Backend no disponible, ejecutando respuesta de reserva:", err)
      setError("No se pudo conectar con el servidor, pero puedes continuar explorando la interfaz.")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (fileUrl?: string) => {
    if (!fileUrl || fileUrl === "#") {
      // Notificación amigable para el usuario si el backend no entregó archivo real
      alert("La descarga del archivo procesado estará disponible al conectar el Backend definitivo.")
      return
    }

    window.open(fileUrl, "_blank")
  }

  return {
    uploadCV,
    handleDownload,
    loading,
    error,
    result,
  }
}