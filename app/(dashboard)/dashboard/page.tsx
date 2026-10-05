"use client";

import Link from "next/link";
import { FileCheck2, Target, History, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
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
