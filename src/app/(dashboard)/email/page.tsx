"use client";

import { useState } from "react";
import { EmailGeneratorForm } from "@/src/components/modules/email/email-generator-form";
import { EmailPreview } from "@/src/components/modules/email/email-preview";
import { AtsSkeleton } from "@/src/components/modules/ats/ats-skeleton";
import { EmailGeneratePayload, EmailGenerateResult } from "@/src/types/email";

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
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Generador de Correos & Cartas de Presentación
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Crea mensajes personalizados para postulaciones, seguimientos de entrevistas o contactos directos adaptados a la vacante y empresa.
        </p>
      </div>

      {/* Formulario de Configuración */}
      <EmailGeneratorForm onSubmit={handleGenerate} isLoading={isLoading} />

      {/* Skeleton / Vista previa */}
      {isLoading && <AtsSkeleton />}

      {!isLoading && result && <EmailPreview result={result} />}
    </div>
  );
}