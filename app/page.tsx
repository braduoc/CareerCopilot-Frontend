import Link from "next/link";
import { ArrowRight, Bot, FileText, MessageSquare, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 lg:px-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-lg font-bold">
            <span className="rounded-xl bg-primary p-2"><Bot className="h-5 w-5" /></span>
            CareerCopilot
          </div>
          <Link href="/login" className="text-sm font-medium text-violet-100 hover:text-white">
            Iniciar sesión
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">Tu copiloto laboral</p>
            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
              Convierte cada postulación en una mejor oportunidad.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-violet-100/70">
              Analiza tu CV, encuentra coincidencias con vacantes y practica entrevistas con herramientas diseñadas para avanzar con claridad.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold shadow-sm hover:bg-primary/90">
                Entrar al dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/register" className="rounded-xl border border-violet-400/40 px-5 py-3 text-sm font-semibold text-violet-100 hover:border-violet-300">
                Crear cuenta
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              [FileText, "Diagnóstico ATS", "Haz que tu CV sea legible para los filtros automáticos."],
              [Target, "Job Match", "Descubre tus fortalezas y brechas frente a cada vacante."],
              [MessageSquare, "Entrevista IA", "Practica respuestas y recibe retroalimentación estructurada."],
            ].map(([Icon, title, description]) => (
              <div key={title as string} className="rounded-2xl border border-violet-400/20 bg-violet-950/40 p-5">
                <Icon className="mb-4 h-5 w-5 text-violet-300" />
                <h2 className="font-semibold">{title as string}</h2>
                <p className="mt-2 text-sm leading-6 text-violet-100/70">{description as string}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
