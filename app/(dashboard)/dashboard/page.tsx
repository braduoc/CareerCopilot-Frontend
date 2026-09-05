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
    <div className="space-y-8 max-w-6xl mx-auto pb-8">
      {/* Encabezado Principal */}
      <header className="space-y-1.5">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Mi progreso profesional
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          ¿Qué quieres preparar hoy?
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Accede a tus herramientas de preparación laboral desde un solo lugar.
        </p>
      </header>

      {/* Banner Principal / Hero con Gradiente */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 sm:p-8 text-white shadow-md">
        <div className="relative z-10 space-y-3 max-w-xl">
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            Tu próxima oportunidad empieza aquí
          </span>
          <h2 className="text-2xl font-bold sm:text-3xl tracking-tight leading-snug">
            Prepara una postulación más sólida.
          </h2>
          <p className="text-sm leading-relaxed text-white/90">
            Revisa tu CV, entiende cada vacante y llega mejor preparado a tus entrevistas con el respaldo de IA.
          </p>
        </div>

        {/* Círculos decorativos translúcidos (estilo interfaz de referencia) */}
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -top-12 right-20 h-40 w-40 rounded-full bg-white/10 blur-xl" />
      </section>

      {/* Grid de Herramientas */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map(([title, description, href, Icon]) => (
          <Link
            key={href}
            href={href}
            className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between gap-4">
                {/* Contenedor del ícono con fondo suave */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/60 text-muted-foreground transition-all group-hover:bg-primary/10 group-hover:text-primary">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>

              <h2 className="mt-5 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {title}
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}