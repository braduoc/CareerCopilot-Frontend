import { JobMatchResult } from "@/types/job-match";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Target } from "lucide-react";

interface MatchResultProps {
  result: JobMatchResult;
}

export function MatchResult({ result }: MatchResultProps) {
  const { matchPercentage, jobTitle, companyName, summary, gaps, recommendations } = result;

  const isMatch = matchPercentage >= 60;

  return (
    <div className="space-y-6">
      {/* Resumen Principal de Match */}
      <div className="rounded-md border border-ink-deep/10 bg-ink-deep p-6 text-ink-deep-foreground">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-ink-deep-foreground/60">
                {jobTitle || "Vacante Evaluada"}
                {companyName ? ` · ${companyName}` : ""}
              </span>
            </div>
            <div className="mt-3 flex items-end gap-3">
              <span className="font-mono text-5xl font-bold leading-none">{matchPercentage}</span>
              <span className="pb-1 text-sm text-ink-deep-foreground/60">% de compatibilidad</span>
            </div>
          </div>

          <span
            className={`-rotate-3 rounded-sm border-2 px-2.5 py-1 text-sm font-bold tracking-wide ${
              isMatch ? "border-success text-success" : "border-destructive text-destructive"
            }`}
          >
            {isMatch ? "COMPATIBLE" : "BAJA COINCIDENCIA"}
          </span>
        </div>

        <div className="mt-6 space-y-3">
          <Progress value={matchPercentage} className="h-2 bg-ink-deep-foreground/15" />
          <p className="max-w-3xl text-sm leading-relaxed text-ink-deep-foreground/75">
            {summary}
          </p>
        </div>
      </div>

      {/* Análisis de Gaps (Habilidades Técnicas y Blandas) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Habilidades Técnicas */}
        <Card>
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <div className="rounded-sm border border-border bg-secondary p-1.5 text-primary">
                <Target className="h-4 w-4" />
              </div>
              Hard Skills (Técnicas)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" /> Coinciden
              </p>
              <div className="flex flex-wrap gap-1.5">
                {gaps.technicalSkills.matching.length > 0 ? (
                  gaps.technicalSkills.matching.map((skill, idx) => (
                    <Badge key={idx} variant="success">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm italic text-muted-foreground">Sin coincidencias detectadas</span>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-2">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <XCircle className="h-3.5 w-3.5 text-destructive" /> Faltantes en tu CV
              </p>
              <div className="flex flex-wrap gap-1.5">
                {gaps.technicalSkills.missing.length > 0 ? (
                  gaps.technicalSkills.missing.map((skill, idx) => (
                    <Badge key={idx} variant="destructive">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm font-medium text-success">¡Cubres todas las requeridas!</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Habilidades Blandas */}
        <Card>
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <div className="rounded-sm border border-border bg-secondary p-1.5 text-primary">
                <Target className="h-4 w-4" />
              </div>
              Soft Skills & Cultura
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" /> Coinciden
              </p>
              <div className="flex flex-wrap gap-1.5">
                {gaps.softSkills.matching.length > 0 ? (
                  gaps.softSkills.matching.map((skill, idx) => (
                    <Badge key={idx} variant="success">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm italic text-muted-foreground">Sin coincidencias detectadas</span>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-2">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <XCircle className="h-3.5 w-3.5 text-destructive" /> Faltantes en tu CV
              </p>
              <div className="flex flex-wrap gap-1.5">
                {gaps.softSkills.missing.length > 0 ? (
                  gaps.softSkills.missing.map((skill, idx) => (
                    <Badge key={idx} variant="destructive">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm font-medium text-success">¡Cubres todas las requeridas!</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recomendaciones Estratégicas */}
      <Card>
        <CardHeader className="border-b border-border bg-accent/40 pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Target className="h-4 w-4 text-primary" /> Recomendaciones para Personalizar tu Postulación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5 p-4">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="flex items-start gap-2.5 border-b border-border pb-2 text-sm text-muted-foreground last:border-none last:pb-0">
              <span className="font-bold text-primary">•</span>
              <p className="leading-relaxed">{rec}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
