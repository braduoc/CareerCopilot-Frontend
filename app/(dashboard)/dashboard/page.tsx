"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { dashboardService } from "@/services/dashboard-service";
import { DashboardSummary } from "@/types/dashboard";
import { FileCheck2, Target, History, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [summaryError, setSummaryError] = useState(false);

  useEffect(() => {
    dashboardService.summary().then(setSummary).catch(() => setSummaryError(true));
  }, []);

  const stats = [
    { label: "Puntaje ATS actual", value: summary?.currentAtsScore != null ? `${summary.currentAtsScore}/100` : "—" },
    { label: "Último Job Match", value: summary?.latestMatchScore != null ? `${summary.latestMatchScore}%` : "—" },
    { label: "Análisis guardados", value: summary ? String(summary.historyCount) : "—" },
    { label: "Plan", value: summary ? (summary.plan === "premium" ? "Premium" : "Gratuito") : "—" },
  ];

  const tools = [
    {
      index: "01",
      title: "Diagnóstico ATS",
      description:
        "Sube tu CV y revisa cómo lo lee un sistema de seguimiento de candidatos antes de postular.",
      href: "/ats",
      icon: FileCheck2,
    },
    {
      index: "02",
      title: "Job Match",
      description:
        "Compara tu perfil contra una vacante específica y detecta qué palabras clave te faltan.",
      href: "/job-match",
      icon: Target,
    },
    {
      index: "03",
      title: "Historial",
      description:
        "Revisa tus fichas anteriores e inicia desde ahí una entrevista o un email de postulación.",
      href: "/historial",
      icon: History,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Portada del expediente */}
      <div className="rounded-md border border-ink-deep/10 bg-ink-deep px-7 py-8 text-ink-deep-foreground">
        <p className="text-sm text-ink-deep-foreground/55">Expediente de postulación</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Prepara una postulación más sólida.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-deep-foreground/70">
          Revisa tu CV, entiende cada vacante y llega mejor preparado a tus
          entrevistas. Cada diagnóstico queda guardado en tu historial.
        </p>
      </div>

      {/* Resumen de actividad */}
      <div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card px-4 py-4">
              <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              <dd className="mt-1 font-mono text-2xl font-bold text-foreground">{stat.value}</dd>
            </div>
          ))}
        </dl>
        {summaryError && (
          <p className="mt-2 text-xs text-muted-foreground">No se pudo cargar tu resumen en este momento.</p>
        )}
      </div>

      {/* Fichas de acceso */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight">¿Qué quieres preparar hoy?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Sigue el orden si es tu primera vez: diagnóstico, comparación con la vacante y luego revisa tu historial.
        </p>

        <div className="mt-5 divide-y divide-border border-y border-border">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-center gap-5 py-5 transition-colors hover:bg-card/60"
              >
                <span className="font-mono text-sm text-muted-foreground/70">
                  {tool.index}
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border bg-card text-primary">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-foreground">{tool.title}</span>
                  <span className="block text-sm text-muted-foreground">{tool.description}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
