import { ATSDiagnostic } from "@/types/ats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, XCircle, RotateCcw, FileCheck2 } from "lucide-react";

export interface AtsScoreCardProps {
  diagnostic: ATSDiagnostic;
  onReset?: () => void;
}

export function AtsScoreCard({ diagnostic, onReset }: AtsScoreCardProps) {
  const { score, summary, sections, strengths, improvements, missingKeywords } = diagnostic;

  const isPass = score >= 60;

  return (
    <div className="space-y-6">
      {/* Ficha de resultado: score y veredicto */}
      <div className="rounded-md border border-ink-deep/10 bg-ink-deep p-6 text-ink-deep-foreground">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-ink-deep-foreground/60">
                Resultado del análisis
              </span>
            </div>
            <div className="flex items-end gap-3">
              <span className="font-mono text-5xl font-bold leading-none">{score}</span>
              <span className="pb-1 text-sm text-ink-deep-foreground/60">/ 100 score ATS</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`-rotate-3 rounded-sm border-2 px-2.5 py-1 text-sm font-bold tracking-wide ${
                isPass ? "border-success text-success" : "border-destructive text-destructive"
              }`}
            >
              {isPass ? "APROBADO" : "REVISAR"}
            </span>

            {onReset && (
              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                className="gap-2 border-ink-deep-foreground/20 bg-transparent text-ink-deep-foreground hover:bg-white/5 hover:text-ink-deep-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Analizar otro CV
              </Button>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Progress value={score} className="h-2 bg-ink-deep-foreground/15" />
          <p className="max-w-3xl text-sm leading-relaxed text-ink-deep-foreground/75">
            {summary}
          </p>
        </div>
      </div>

      {/* Secciones Detectadas */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">
            Estructura y Secciones Detectadas
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <SectionCheck label="Información de Contacto" isValid={sections.contactInfo} />
          <SectionCheck label="Experiencia Laboral" isValid={sections.workExperience} />
          <SectionCheck label="Educación" isValid={sections.education} />
          <SectionCheck label="Habilidades / Skills" isValid={sections.skills} />
        </CardContent>
      </Card>

      {/* Listados de Detalle */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Fortalezas */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-success">
              <CheckCircle className="h-4 w-4 shrink-0" /> Fortalezas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {strengths.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 border-b border-border pb-2 last:border-none last:pb-0">
                <span className="text-sm leading-relaxed text-muted-foreground">
                  • {item}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mejoras Recomendadas */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-primary">
              <AlertCircle className="h-4 w-4 shrink-0" /> Sugerencias de Mejora
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {improvements.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 border-b border-border pb-2 last:border-none last:pb-0">
                <span className="text-sm leading-relaxed text-muted-foreground">
                  • {item}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Palabras Clave Faltantes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-destructive">
              <XCircle className="h-4 w-4 shrink-0" /> Palabras Clave Faltantes
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-1.5 pt-1">
            {missingKeywords.map((kw, idx) => (
              <Badge key={idx} variant="destructive">
                {kw}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SectionCheck({ label, isValid }: { label: string; isValid: boolean }) {
  return (
    <div className="flex items-center gap-2.5 rounded-sm border border-border bg-secondary/50 p-2.5">
      {isValid ? (
        <CheckCircle className="h-4 w-4 shrink-0 text-success" />
      ) : (
        <XCircle className="h-4 w-4 shrink-0 text-destructive" />
      )}
      <span className="text-sm font-medium leading-tight text-foreground">
        {label}
      </span>
    </div>
  );
}
