"use client";

import { useState } from "react";
import { EmailGeneratorForm } from "@/components/modules/email/email-generator-form";
import { EmailPreview } from "@/components/modules/email/email-preview";
import { AtsSkeleton } from "@/components/modules/ats/ats-skeleton";
import { EmailGeneratePayload, EmailGenerateResult } from "@/types/email";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Mail, Send, CheckCircle2 } from "lucide-react";

// Datos de prueba para simular la generación del correo vía IA
const MOCK_EMAIL_RESULT: EmailGenerateResult = {
  subject: "Postulación a Senior Frontend Developer - [Tu Nombre]",
  body: `Estimado/a Reclutador/a,

Espero que se encuentre muy bien.

Le escribo para expresar mi gran interés en la posición de Senior Frontend Developer en Tech Corp. Cuento con experiencia liderando desarrollos en React, TypeScript y Next.js, enfocado siempre en construir arquitecturas escalables y optimizar la experiencia de usuario.

Al revisar la vacante, identifiqué que buscan a alguien con capacidad para entregar soluciones de alto rendimiento y colaborar de cerca con equipos de producto, habilidades que he consolidado activamente en mis últimos proyectos.

Adjunto mi Curriculum Vitae para su revisión. Quedo a su disposición para conversar sobre cómo mi perfil puede aportar valor a los objetivos actuales de Tech Corp.

Agradezco de antemano su tiempo y consideración.

Atentamente,
[Tu Nombre]
[Teléfono] | [LinkedIn/Portfolio]`,
};

export default function EmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EmailGenerateResult | null>(null);

  const handleGenerate = (payload: EmailGeneratePayload) => {
    setIsLoading(true);
    setResult(null);

    // Simulación de llamado a la API de IA (2 segundos)
    setTimeout(() => {
      setResult({
        ...MOCK_EMAIL_RESULT,
        subject: `Postulación a ${payload.jobTitle} - [Tu Nombre]`,
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      {/* Header Estilizado con Badge de IA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-secondary text-primary hover:bg-secondary border-none px-3 py-1 gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Redacción con IA Personalizada
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Generador de Correos & Cartas
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">
            Crea mensajes personalizados para postulaciones, seguimientos de entrevistas o contactos directos adaptados a la vacante y empresa.
          </p>
        </div>
      </div>

      {/* Grid de Contenido Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Formulario de Configuración (7 columnas si no hay resultado, o ancho adaptativo) */}
        <div className={result || isLoading ? "lg:col-span-12 space-y-6" : "lg:col-span-7 space-y-6"}>
          <EmailGeneratorForm onSubmit={handleGenerate} isLoading={isLoading} />
        </div>

        {/* Panel lateral informativo (sólo visible antes de generar) */}
        {!result && !isLoading && (
          <div className="lg:col-span-5 space-y-4">
            <Card className="border-border/60 shadow-sm bg-card/50 backdrop-blur">
              <CardContent className="p-6 space-y-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  ¿Por qué personalizar tus emails?
                </h3>
                
                <ul className="space-y-4 text-xs text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary text-primary shrink-0">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Aumenta la tasa de respuesta</p>
                      <p className="mt-0.5">Los correos dirigidos con contexto del rol captan la atención de los reclutadores en los primeros 5 segundos.</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary text-primary shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Tono profesional e impecable</p>
                      <p className="mt-0.5">La IA estructura la propuesta de valor destacando tus fortalezas sin sonar genérico.</p>
                    </div>
                  </li>
                </ul>

                {/* Banner con gradiente de marca */}
                <div className="p-4 rounded-xl bg-brand-gradient text-white space-y-1 mt-2 shadow-sm">
                  <p className="text-xs font-semibold">Tip de comunicación</p>
                  <p className="text-[11px] opacity-90 leading-relaxed">
                    Incluye siempre un enlace a tu LinkedIn o Portafolio actualizado en la firma del correo para facilitar el contacto.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Skeleton / Vista previa */}
      {isLoading && <AtsSkeleton />}

      {!isLoading && result && (
        <div className="pt-2">
          <EmailPreview result={result} />
        </div>
      )}
    </div>
  );
}