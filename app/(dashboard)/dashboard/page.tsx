"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileSearch, Target, History, ArrowRight } from "lucide-react"

export default function DashboardPage() {
  const tools = [
    {
      title: "Diagnóstico ATS", // Limpiado el "(DS)"
      description: "Analiza la legibilidad y el impacto de tu CV.",
      href: "/ats",
      icon: FileSearch,
    },
    {
      title: "Coincidencia de empleo", // Mantiene consistencia exacta con la Navbar
      description: "Compara tu perfil con los requisitos de una vacante.",
      href: "/job-match",
      icon: Target,
    },
    {
      title: "Historial",
      description: "Consulta tus análisis anteriores e inicia entrevistas o correos.",
      href: "/historial",
      icon: History,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Bánner principal */}
      <div className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white shadow-md">
        <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
          Tu próxima oportunidad empieza aquí
        </span>
        <h1 className="text-3xl font-bold mt-3">Prepara una postulación más sólida.</h1>
        <p className="text-purple-100 mt-1 max-w-2xl text-sm">
          Revisa tu CV, entiende cada vacante y llega mejor preparado a tus entrevistas con el respaldo de IA.
        </p>
      </div>

      {/* Tarjetas de acceso directo */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-1">¿Qué quieres preparar hoy?</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Accede a tus herramientas de preparación laboral desde un solo lugar.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link key={tool.href} href={tool.href} className="group">
                <Card className="h-full hover:shadow-md transition-all group-hover:border-primary/50">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="p-1 rounded-full group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg font-semibold">{tool.title}</CardTitle>
                    <CardDescription className="mt-1 text-xs">{tool.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}