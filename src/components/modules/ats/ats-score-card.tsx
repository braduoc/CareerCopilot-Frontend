import { ATSDiagnostic } from "@/src/types/ats";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { CheckCircle, AlertCircle, XCircle, RotateCcw } from "lucide-react";

export interface AtsScoreCardProps {
  diagnostic: ATSDiagnostic;
  onReset?: () => void;
}

export function AtsScoreCard({ diagnostic, onReset }: AtsScoreCardProps) {
  const { score, summary, sections, strengths, improvements, missingKeywords } = diagnostic;

  const getScoreBadgeVariant = (val: number) => {
    if (val >= 80) return "success";
    if (val >= 60) return "warning";
    return "destructive";
  };

  return (
    <div className="space-y-6">
      {/* Resumen Principal y Score */}
      <Card className="bg-brand-gradient text-white border-0 rounded-2xl p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-white">Diagnóstico General del CV</CardTitle>
          <div className="flex items-center gap-3">
            <Badge variant={getScoreBadgeVariant(score)} className="border-white/20">
              {score}% Compatibilidad ATS
            </Badge>
            {onReset && (
                <Button variant="outline" size="sm" onClick={onReset} className="gap-2 border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                <RotateCcw className="w-3.5 h-3.5" />
                Analizar otro CV
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <Progress value={score} className="h-3" />
          <p className="text-sm text-white/85">
            {summary}
          </p>
        </CardContent>
      </Card>

      {/* Secciones Detectadas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Estructura y Secciones Detectadas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SectionCheck label="Información de Contacto" isValid={sections.contactInfo} />
          <SectionCheck label="Experiencia Laboral" isValid={sections.workExperience} />
          <SectionCheck label="Educación" isValid={sections.education} />
          <SectionCheck label="Habilidades / Skills" isValid={sections.skills} />
        </CardContent>
      </Card>

      {/* Listados de Detalle */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fortalezas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Fortalezas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {strengths.map((item, idx) => (
              <p key={idx} className="text-xs text-muted-foreground border-b border-border pb-1">
                • {item}
              </p>
            ))}
          </CardContent>
        </Card>

        {/* Mejoras Recomendadas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Sugerencias de Mejora
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {improvements.map((item, idx) => (
              <p key={idx} className="text-xs text-muted-foreground border-b border-border pb-1">
                • {item}
              </p>
            ))}
          </CardContent>
        </Card>

        {/* Palabras Clave Faltantes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Palabras Clave Faltantes
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-1.5 pt-1">
            {missingKeywords.map((kw, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
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
    <div className="flex items-center gap-2 p-2 rounded-xl bg-muted border border-border">
      {isValid ? (
        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
      ) : (
        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
      )}
      <span className="text-xs font-medium text-foreground truncate">
        {label}
      </span>
    </div>
  );
}