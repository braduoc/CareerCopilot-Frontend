import Link from "next/link";
import { ArrowRight, FileText, Mail, MessageSquare, Target, History } from "lucide-react";

const tools = [
  ["Diagnóstico ATS", "Analiza la legibilidad y el impacto de tu CV.", "/ats", FileText],
  ["Job Match", "Compara tu perfil con los requisitos de una vacante.", "/job-match", Target],
  ["Generador Email", "Crea mensajes personalizados para tus postulaciones.", "/email", Mail],
  ["Entrevista IA", "Practica respuestas con una simulación técnica.", "/entrevista", MessageSquare],
  ["Historial", "Consulta tus análisis y prácticas anteriores.", "/historial", History],
] as const;

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Dashboard</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">¿Qué quieres preparar hoy?</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Accede a tus herramientas de preparación laboral desde un solo lugar.
        </p>
      </header>

      <section className="bg-brand-gradient rounded-2xl p-6 text-white shadow-sm">
        <p className="text-sm font-medium text-white/80">Tu próxima oportunidad empieza aquí</p>
        <h2 className="mt-2 text-2xl font-bold">Prepara una postulación más sólida.</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
          Revisa tu CV, entiende cada vacante y llega mejor preparado a tus entrevistas.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {tools.map(([title, description, href, Icon]) => (
          <Link key={href} href={href} className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-violet-300 dark:hover:border-violet-700">
            <div className="flex items-start justify-between gap-4">
              <Icon className="h-5 w-5 text-primary" />
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </div>
            <h2 className="mt-5 font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
