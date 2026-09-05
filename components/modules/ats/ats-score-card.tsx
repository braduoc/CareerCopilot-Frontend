import { ATSDiagnostic } from "@/types/ats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, XCircle, RotateCcw, Sparkles } from "lucide-react";

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
      {/* Resumen Principal y Score con Gradiente de Marca */}
      <Card className="bg-brand-gradient text-white border-0 rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 pb-2 p-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-200" />
              <span className="text-xs font-semibold tracking-wide uppercase text-violet-200">
                Resultado del Análisis
              </span>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-white">
              Diagnóstico General del CV
            </CardTitle>
          </div>

          <div className="flex items-center gap-3">
            <Badge 
              variant={getScoreBadgeVariant(score)} 
              className="bg-white/10 backdrop-blur-md border-white/20 text-white font-semibold px-3.5 py-1.5 text-xs shadow-xs"
            >
              {score}% Compatibilidad ATS
            </Badge>

            {onReset && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onReset} 
                className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all rounded-xl text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Analizar otro CV
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-6 p-0">
          <Progress value={score} className="h-2.5 bg-white/20" />
          <p className="text-sm leading-relaxed text-white/90 max-w-3xl">
            {summary}
          </p>
        </CardContent>
      </Card>

      {/* Secciones Detectadas */}
      <Card className="border-border/60 shadow-xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">
            Estructura y Secciones Detectadas
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <SectionCheck label="Información de Contacto" isValid={sections.contactInfo} />
          <SectionCheck label="Experiencia Laboral" isValid={sections.workExperience} />
          <SectionCheck label="Educación" isValid={sections.education} />
          <SectionCheck label="Habilidades / Skills" isValid={sections.skills} />
        </CardContent>
      </Card>

      {/* Listados de Detalle */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fortalezas */}
        <Card className="border-border/60 shadow-xs">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" /> Fortalezas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {strengths.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 border-b border-border/40 pb-2 last:border-none last:pb-0">
                <span className="text-xs text-muted-foreground leading-relaxed">
                  • {item}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mejoras Recomendadas */}
        <Card className="border-border/60 shadow-xs">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" /> Sugerencias de Mejora
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {improvements.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 border-b border-border/40 pb-2 last:border-none last:pb-0">
                <span className="text-xs text-muted-foreground leading-relaxed">
                  • {item}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Palabras Clave Faltantes */}
        <Card className="border-border/60 shadow-xs">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <XCircle className="w-4 h-4 shrink-0" /> Palabras Clave Faltantes
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-1.5 pt-1">
            {missingKeywords.map((kw, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className="text-xs font-medium border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 rounded-lg"
              >
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
    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-secondary/50 border border-border/60">
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