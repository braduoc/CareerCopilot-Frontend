import Link from "next/link";
import {
  Stamp,
  FileCheck2,
  Target,
  MessageSquare,
  Mail,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const modules = [
  {
    index: "01",
    title: "Diagnóstico ATS",
    description:
      "Analiza el formato, la densidad de secciones y la legibilidad técnica de tu CV antes de enviarlo, para que el sistema de seguimiento de candidatos lo procese sin perder información.",
    points: [
      "Evaluación de formato y estructura de secciones",
      "Detección de secciones omitidas o mal etiquetadas",
      "Puntuación global del documento",
    ],
    icon: FileCheck2,
    accent: "border-primary text-primary",
  },
  {
    index: "02",
    title: "Job Match",
    description:
      "Compara tu currículum directamente contra el texto de una vacante. La IA cruza los requisitos exigidos con tu experiencia y te muestra qué te falta agregar.",
    points: [
      "Extracción automática de requisitos y habilidades",
      "Porcentaje de coincidencia con la vacante",
      "Palabras clave encontradas y faltantes",
    ],
    icon: Target,
    accent: "border-success text-success",
  },
  {
    index: "03",
    title: "Entrevista IA",
    description:
      "Practica con preguntas generadas a partir del puesto y tu CV. Cada respuesta se evalúa con la metodología STAR, con sugerencias concretas para la siguiente ronda.",
    points: [
      "Preguntas adaptadas al rol y a tu Job Match",
      "Evaluación de Situación, Tarea, Acción y Resultado",
      "Disponible en el plan Premium",
    ],
    icon: MessageSquare,
    accent: "border-foreground text-foreground",
  },
  {
    index: "04",
    title: "Generador de email",
    description:
      "A partir de un Job Match ya calculado, redacta un correo de postulación que menciona tu experiencia relevante y las palabras clave de la oferta.",
    points: [
      "Redacción basada en tu comparación de vacante",
      "Edición directa antes de enviarlo",
      "Guardado junto al resto de la ficha",
    ],
    icon: Mail,
    accent: "border-primary text-primary",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-ink-deep text-ink-deep-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-primary/50 bg-primary/15 text-primary">
              <Stamp className="h-4 w-4" />
            </span>
            <span className="tracking-tight">CareerCopilot</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-ink-deep-foreground/65 md:flex">
            <a href="#modulos" className="border-b-2 border-transparent pb-1 transition-colors hover:border-primary hover:text-ink-deep-foreground">
              Módulos
            </a>
            <a href="#como-funciona" className="border-b-2 border-transparent pb-1 transition-colors hover:border-primary hover:text-ink-deep-foreground">
              Cómo funciona
            </a>
            <a href="#faq" className="border-b-2 border-transparent pb-1 transition-colors hover:border-primary hover:text-ink-deep-foreground">
              Preguntas frecuentes
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-3 py-2 text-sm font-medium text-ink-deep-foreground/70 transition-colors hover:text-ink-deep-foreground"
            >
              Iniciar sesión
            </Link>
            <Link href="/register">
              <Button size="sm">Empezar gratis</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero: expediente abierto */}
        <section className="bg-ink-deep text-ink-deep-foreground">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-24 lg:px-10">
            <div>
              <p className="text-sm text-ink-deep-foreground/55">
                Antes de que lo vea un reclutador, lo revisa un algoritmo.
              </p>
              <h1 className="mt-4 max-w-xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                Tu CV tiene un expediente. Ábrelo antes de postular.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-deep-foreground/70">
                CareerCopilot diagnostica tu CV frente al ATS, lo compara con la
                vacante exacta y te deja practicar la entrevista, todo antes de
                enviar la postulación.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/register">
                  <Button size="lg">Diagnosticar mi CV</Button>
                </Link>
                <a href="#modulos" className="text-sm font-medium text-ink-deep-foreground/70 hover:text-ink-deep-foreground">
                  Ver los 4 módulos
                </a>
              </div>

              <p className="mt-6 text-xs text-ink-deep-foreground/45">
                Sin tarjeta de crédito · compatible con Workday, Taleo y Greenhouse
              </p>
            </div>

            {/* Ficha de muestra */}
            <div className="tab-cut border border-white/10 bg-card p-5 text-card-foreground">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-mono text-xs text-muted-foreground">
                  FICHA-00182 · CV_candidato.pdf
                </span>
              </div>

              <div className="mt-4 flex items-end gap-3">
                <span className="font-mono text-5xl font-bold leading-none text-foreground">88</span>
                <span className="pb-1 text-sm text-muted-foreground">/ 100 score ATS</span>
                <span className="ml-auto -rotate-3 rounded-sm border-2 border-success px-2 py-1 text-xs font-bold tracking-wide text-success">
                  APROBADO
                </span>
              </div>

              <div className="mt-5 space-y-2.5 text-sm">
                <div className="flex items-start gap-2.5 rounded-sm border border-success/30 bg-success/5 p-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <p className="text-foreground">
                    Estructura limpia: los títulos de sección se identifican sin problema.
                  </p>
                </div>
                <div className="flex items-start gap-2.5 rounded-sm border border-destructive/30 bg-destructive/5 p-3">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-destructive text-[10px] font-bold text-destructive">
                    !
                  </span>
                  <p className="text-foreground">
                    Faltan las palabras clave <span className="font-semibold">Docker</span> y{" "}
                    <span className="font-semibold">CI/CD</span> para esta vacante.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Módulos — secuencia real del flujo */}
        <section id="modulos" className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight">Cuatro módulos, un mismo expediente</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Cada paso queda guardado junto a los anteriores, así que la entrevista
              y el email ya saben contra qué vacante estás postulando.
            </p>
          </div>

          <div className="mt-12 divide-y divide-border">
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.index}
                  className="grid gap-6 py-10 md:grid-cols-[auto_1fr_1fr] md:items-start md:gap-10"
                >
                  <span className="font-mono text-sm text-muted-foreground/60">{mod.index}</span>

                  <div>
                    <div className={`inline-flex items-center gap-2 border-l-2 pl-3 ${mod.accent}`}>
                      <Icon className="h-4 w-4" />
                      <span className="text-lg font-semibold text-foreground">{mod.title}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {mod.description}
                    </p>
                  </div>

                  <ul className="space-y-2.5 text-sm">
                    {mod.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground/40" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="como-funciona" className="border-t border-border bg-card/40 px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tight">Cómo funciona</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              <div>
                <span className="font-mono text-sm text-primary">PASO 1</span>
                <h3 className="mt-2 text-lg font-semibold">Sube tu CV</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  En PDF o Word. Lo leemos como lo haría un ATS y abrimos tu ficha.
                </p>
              </div>
              <div>
                <span className="font-mono text-sm text-primary">PASO 2</span>
                <h3 className="mt-2 text-lg font-semibold">Pega la vacante</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Comparamos tu experiencia contra el texto exacto de la oferta.
                </p>
              </div>
              <div>
                <span className="font-mono text-sm text-primary">PASO 3</span>
                <h3 className="mt-2 text-lg font-semibold">Practica y postula</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Genera el email y, si quieres, ensaya la entrevista antes de enviarlo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
          <h2 className="text-3xl font-bold tracking-tight">Preguntas frecuentes</h2>
          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="item-1">
              <AccordionTrigger>¿Cómo analiza mi CV frente a los filtros ATS?</AccordionTrigger>
              <AccordionContent>
                Revisamos el formato, la jerarquía de títulos y la densidad de palabras
                clave de la forma en que lo haría un sistema como Workday, Taleo o
                Greenhouse, y te mostramos exactamente qué falla.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>¿Es compatible con cualquier vacante?</AccordionTrigger>
              <AccordionContent>
                Sí. Pega el texto de cualquier oferta de empleo y la IA extrae los
                requisitos técnicos y blandos específicos de esa posición.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>¿Puedo probarlo gratis?</AccordionTrigger>
              <AccordionContent>
                Sí, te registras sin tarjeta de crédito y el primer diagnóstico de CV
                es gratuito. La simulación de entrevista es parte del plan Premium.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* CTA final */}
        <section className="bg-ink-deep px-6 py-16 text-ink-deep-foreground lg:px-10">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Abre tu expediente antes de postular.
              </h2>
              <p className="mt-2 max-w-md text-sm text-ink-deep-foreground/65">
                El diagnóstico de CV es gratuito y toma menos de dos minutos.
              </p>
            </div>
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Empezar ahora <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 text-sm text-muted-foreground lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <Stamp className="h-4 w-4 text-primary" /> CareerCopilot
          </div>
          <p>Proyecto de Capstone — DuocUC, 2026.</p>
        </div>
      </footer>
    </div>
  );
}
