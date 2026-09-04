import { JobMatchResult } from "@/src/types/job-match";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { Badge } from "@/src/components/ui/badge";
import { CheckCircle2, XCircle, Sparkles, Target } from "lucide-react";

interface MatchResultProps {
  result: JobMatchResult;
}

export function MatchResult({ result }: MatchResultProps) {
  const { matchPercentage, jobTitle, companyName, summary, gaps, recommendations } = result;

  const getMatchVariant = (val: number) => {
    if (val >= 75) return "success";
    if (val >= 50) return "warning";
    return "destructive";
  };

  return (
    <div className="space-y-6">
      {/* Resumen Principal de Match */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl">{jobTitle || "Vacante Evaluada"}</CardTitle>
            {companyName && (
              <p className="text-sm text-muted-foreground">{companyName}</p>
            )}
          </div>
          <Badge variant={getMatchVariant(matchPercentage)} className="text-sm px-3 py-1">
            {matchPercentage}% Match
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <Progress value={matchPercentage} className="h-3" />
          <p className="text-sm text-muted-foreground">
            {summary}
          </p>
        </CardContent>
      </Card>

      {/* Análisis de Gaps (Habilidades Técnicas y Blandas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Habilidades Técnicas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Hard Skills (Técnicas)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Coinciden
              </p>
              <div className="flex flex-wrap gap-1.5">
                {gaps.technicalSkills.matching.length > 0 ? (
                  gaps.technicalSkills.matching.map((skill, idx) => (
                    <Badge key={idx} variant="success">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">Sin coincidencias detectadas</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5 text-rose-500" /> Faltantes en tu CV
              </p>
              <div className="flex flex-wrap gap-1.5">
                {gaps.technicalSkills.missing.length > 0 ? (
                  gaps.technicalSkills.missing.map((skill, idx) => (
                    <Badge key={idx} variant="destructive">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">¡Cubres todas las requeridas!</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Habilidades Blandas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Soft Skills & Cultura
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Coinciden
              </p>
              <div className="flex flex-wrap gap-1.5">
                {gaps.softSkills.matching.length > 0 ? (
                  gaps.softSkills.matching.map((skill, idx) => (
                    <Badge key={idx} variant="success">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">Sin coincidencias detectadas</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5 text-rose-500" /> Faltantes en tu CV
              </p>
              <div className="flex flex-wrap gap-1.5">
                {gaps.softSkills.missing.length > 0 ? (
                  gaps.softSkills.missing.map((skill, idx) => (
                    <Badge key={idx} variant="destructive">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">¡Cubres todas las requeridas!</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recomendaciones Estratégicas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <Sparkles className="w-4 h-4" /> Recomendaciones para Personalizar tu Postulación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {recommendations.map((rec, idx) => (
            <p key={idx} className="text-xs text-muted-foreground border-b border-border pb-2 last:border-none">
              • {rec}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}