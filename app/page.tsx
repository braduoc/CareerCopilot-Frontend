import Link from "next/link";
import { 
  ArrowRight, 
  Bot, 
  FileText, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  BrainCircuit,
  Check,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-violet-500/20 selection:text-violet-600">
      {/* Fondo con brillo difuminado sutil */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      {/* Header / Navbar superior */}
      <header className="sticky top-0 z-50 w-full border-b border-violet-100 dark:border-violet-900/30 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-foreground">
            <span className="rounded-xl bg-violet-600 p-2 text-white shadow-xs">
              <Bot className="h-5 w-5" />
            </span>
            <span className="tracking-tight text-lg">CareerCopilot</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-muted-foreground">
            <a href="#como-funciona" className="hover:text-violet-600 transition-colors">¿Cómo funciona?</a>
            <a href="#modulos" className="hover:text-violet-600 transition-colors">Módulos</a>
            <a href="#faq" className="hover:text-violet-600 transition-colors">Preguntas Frecuentes</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="text-xs font-semibold text-muted-foreground hover:text-violet-600 transition-colors px-3 py-2"
            >
              Iniciar sesión
            </Link>
            <Link href="/register">
              <Button size="sm" className="rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs shadow-xs">
                Empezar Gratis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center py-20 lg:py-28 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 dark:border-violet-900/60 bg-violet-50/50 px-3.5 py-1.5 text-xs font-semibold text-violet-600 dark:text-violet-300">
            <Sparkles className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
            Tu copiloto de empleabilidad con IA
          </div>
          
          <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Optimiza tu CV para el{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              ATS exacto de cada empresa
            </span>
          </h1>
          
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl">
            Supera los filtros automáticos de selección, detecta las palabras clave que le faltan a tu perfil y practica entrevistas reales adaptadas al puesto exacto al que estás postulando.
          </p>

          <div className="pt-2">
            <Link href="/register">
              <Button size="lg" className="gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-md hover:shadow-violet-500/20 text-sm h-12 px-8">
                Escanear mi CV Gratis <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 pt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Sin tarjeta de crédito</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Compatible con Workday, Taleo, Greenhouse</span>
          </div>
        </section>

        {/* Sección de Módulos Principal */}
        <section id="modulos" className="py-16 space-y-24 border-t border-violet-100 dark:border-violet-900/30">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">Todo lo que necesitas para tu próxima contratación</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Tres herramientas integradas diseñadas para llevarte desde la preparación de tu documento hasta la oferta laboral final.
            </p>
          </div>

          {/* Módulo 1: Analizador de CV & ATS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {/* Badge de Módulo 01: Violeta sólido y texto blanco para 100% contraste */}
              <div className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
                <FileText className="w-4 h-4" /> Módulo 01
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold">Diagnóstico e Impacto ATS</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Analiza el formato, la densidad de secciones y la compatibilidad técnica de tu archivo antes de enviarlo. Asegúrate de que los filtros automáticos puedan parsear tu experiencia correctamente.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-violet-600" /> Evaluación de formato y legibilidad técnica
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-violet-600" /> Detección de secciones omitidas o erróneas
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-violet-600" /> Puntuación global del perfil en tiempo real
                </li>
              </ul>
            </div>
            
            {/* Visual Preview Módulo 1 */}
            <div className="rounded-2xl border border-violet-200 dark:border-violet-900/50 bg-card p-6 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="text-xs font-semibold text-muted-foreground">Vista Previa: Diagnóstico de CV</span>
                {/* Score ATS con Violeta Fuerte y Texto Blanco */}
                <span className="text-xs font-bold text-white bg-violet-600 px-3 py-1 rounded-full shadow-xs">Score ATS: 88/100</span>
              </div>
              <div className="space-y-3 text-xs">
                {/* Caja Verde: Fondo claro definido, borde verde y textos oscuros de alto contraste */}
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-950">Estructura Limpia</span>
                    <p className="text-emerald-900 font-medium">Títulos de sección identificados correctamente por el analizador.</p>
                  </div>
                </div>
                {/* Caja Amarilla/Ámbar: Fondo cálido claro, borde ámbar y texto marrón/oscuro contrastado */}
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-amber-950">Formato de Fechas</span>
                    <p className="text-amber-900 font-medium">Usa el formato MM/AAAA para evitar inconsistencias en el orden cronológico.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Módulo 2: Job Match & Keywords */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
            <div className="space-y-6 lg:order-2">
              {/* Badge de Módulo 02 */}
              <div className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
                <Target className="w-4 h-4" /> Módulo 02
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold">Match Exacto con la Vacante</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Compara tu currículum directamente contra la oferta de trabajo objetivo. Nuestra IA cruza los requisitos exigidos con tu experiencia para mostrarte exactamente qué palabras clave debes agregar.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-violet-600" /> Extracción automática de requisitos y skills
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-violet-600" /> Identificación de brechas de palabras clave
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-violet-600" /> Recomendaciones precisas de adaptación
                </li>
              </ul>
            </div>

            {/* Visual Preview Módulo 2 */}
            <div className="rounded-2xl border border-violet-200 dark:border-violet-900/50 bg-card p-6 shadow-lg space-y-4 lg:order-1">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="text-xs font-semibold text-muted-foreground">Coincidencia de Palabras Clave</span>
                <span className="text-xs font-bold text-violet-700">75% Coincidencia</span>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-semibold block mb-2 text-slate-800">Palabras Clave Encontradas:</span>
                  {/* Badges Verdes de Skills: Texto verde muy oscuro sobre fondo menta/verde claro */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold">React.js</span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold">TypeScript</span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold">REST APIs</span>
                  </div>
                </div>
                <div className="pt-2">
                  <span className="font-semibold block mb-2 text-rose-700">Faltantes en tu CV:</span>
                  {/* Badges Rosas de Skills Faltantes: Texto rojo oscuro sobre fondo rosa claro */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-rose-100 border border-rose-300 text-rose-950 font-bold">GraphQL</span>
                    <span className="px-2.5 py-1 rounded-md bg-rose-100 border border-rose-300 text-rose-950 font-bold">CI/CD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Módulo 3: Entrevistas IA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {/* Badge de Módulo 03 */}
              <div className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
                <BrainCircuit className="w-4 h-4" /> Módulo 03
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold">Simulador de Entrevista Inteligente</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Practica tus respuestas en un entorno realista generado a partir del puesto y tu CV. Recibe retroalimentación inmediata sobre la claridad de tus respuestas y la alineación con el perfil buscado.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-violet-600" /> Preguntas dinámicas adaptadas al rol
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-violet-600" /> Evaluación del método STAR en tus respuestas
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-violet-600" /> Sugerencias concretas para mejorar cada punto
                </li>
              </ul>
            </div>

            {/* Visual Preview Módulo 3 */}
            <div className="rounded-2xl border border-violet-200 dark:border-violet-900/50 bg-card p-6 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="text-xs font-semibold text-muted-foreground">Simulación Activa</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> En vivo
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-violet-50 border border-violet-200 space-y-1">
                  <span className="font-bold text-violet-950 block">Reclutador IA:</span>
                  <p className="text-slate-800 font-medium">"Cuéntame sobre una ocasión en la que tuviste que optimizar el rendimiento de una aplicación bajo presión."</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Feedback Instantáneo:</span>
                  <p className="text-slate-800 font-medium">Buena estructura. Intenta añadir métricas cuantificables (ej. porcentaje de mejora) para dar más impacto a tu respuesta.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 border-t border-violet-100 dark:border-violet-900/30">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-violet-600" /> Preguntas Frecuentes
            </h2>
            <p className="text-xs text-muted-foreground">Todo lo que necesitas saber sobre CareerCopilot.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-3">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm font-semibold">
                  ¿Cómo analiza mi CV frente a los filtros ATS?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                  Analizamos los algoritmos de lectura de las plataformas más usadas (Workday, Taleo, Greenhouse) para verificar la compatibilidad de formato, jerarquía de títulos y densidad de keywords.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm font-semibold">
                  ¿Es compatible con cualquier tipo de vacante laboral?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                  Sí. Puedes pegar la descripción de cualquier oferta de empleo y nuestra IA extraerá los requisitos técnicos y blandos específicos requeridos para esa posición.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm font-semibold">
                  ¿Puedo probar la plataforma de forma gratuita?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-slate-600 leading-relaxed">
                  Sí, puedes registrarte sin ingresar ninguna tarjeta de crédito y realizar tu primer diagnóstico de CV de forma totalmente gratuita.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* ÚNICO CTA FINAL */}
        <section className="py-16">
          <div className="rounded-3xl border border-violet-200 dark:border-violet-900/50 bg-gradient-to-r from-violet-600 to-indigo-600 p-10 text-white text-center space-y-6 max-w-4xl mx-auto shadow-xl">
            <h2 className="text-3xl font-extrabold tracking-tight">
              ¿Listo para conseguir más entrevistas?
            </h2>
            <p className="text-xs sm:text-sm text-violet-100 max-w-lg mx-auto leading-relaxed">
              Sube tu CV ahora mismo, detecta tus puntos ciegos y optimízalo para la vacante que deseas en cuestión de minutos.
            </p>
            <div>
              <Link href="/register">
                <Button size="lg" className="bg-white text-violet-700 hover:bg-violet-50 font-bold text-sm gap-2 rounded-xl shadow-md h-12 px-8">
                  Empezar Ahora Gratis <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-violet-100 dark:border-violet-900/30 bg-violet-50/30 dark:bg-violet-950/10 py-8 text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-2 font-bold text-foreground text-sm">
            <Bot className="w-4 h-4 text-violet-600" /> CareerCopilot
          </div>
          <p>© 2026 CareerCopilot. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-violet-600">Privacidad</a>
            <a href="#" className="hover:text-violet-600">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}