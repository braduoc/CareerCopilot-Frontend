import { JobMatchResult } from "@/types/job-match";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Sparkles, Target } from "lucide-react";

interface MatchResultProps {
  result: JobMatchResult;
}

export function MatchResult({ result }: MatchResultProps) {
  const { matchPercentage, jobTitle, companyName, summary, gaps, recommendations } = result;

  const getMatchBadgeStyle = (val: number) => {
    if (val >= 75) {
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    }
    if (val >= 50) {
      return "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400";
    }
    return "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400";
  };

  return (
    <div className="space-y-6">
      {/* Resumen Principal de Match */}
      <Card className="border-violet-200 dark:border-violet-900/50 shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-violet-100 dark:border-violet-900/30 bg-violet-50/50  rounded-t-xl">
          <div>
            <CardTitle className="text-lg font-bold text-foreground">
              {jobTitle || "Vacante Evaluada"}
            </CardTitle>
            {companyName && (
              <p className="text-xs text-muted-foreground mt-0.5">{companyName}</p>
            )}
          </div>
          <Badge 
            variant="outline" 
            className={`text-xs px-3 py-1 font-bold ${getMatchBadgeStyle(matchPercentage)}`}
          >
            {matchPercentage}% Match
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4 pt-5">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Nivel de Compatibilidad</span>
              <span className="text-violet-600 dark:text-violet-400">{matchPercentage}%</span>
            </div>
            <Progress value={matchPercentage} className="h-2.5 bg-violet-100 dark:bg-violet-950 [&>div]:bg-violet-600" />
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground bg-violet-50/30  p-3 rounded-xl border border-violet-100 dark:border-violet-900/30">
            {summary}
          </p>
        </CardContent>
      </Card>

      {/* Análisis de Gaps (Habilidades Técnicas y Blandas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Habilidades Técnicas */}
        <Card className="border-violet-200 dark:border-violet-900/50 shadow-xs">
          <CardHeader className="pb-3 border-b border-violet-100 dark:border-violet-900/30 bg-violet-50/30 dark:bg-violet-950/10 rounded-t-xl">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
              <div className="p-1.5 bg-violet-100 dark:bg-violet-900/60 text-violet-600 dark:text-violet-300 rounded-lg">
                <Target className="w-4 h-4" />
              </div>
              Hard Skills (Técnicas)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Coinciden
              </p>
              <div className="flex flex-wrap gap-1.5">
                {gaps.technicalSkills.matching.length > 0 ? (
                  gaps.technicalSkills.matching.map((skill, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium text-xs"
                    >
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground italic">Sin coincidencias detectadas</span>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-violet-100 dark:border-violet-900/30">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-500" /> Faltantes en tu CV
              </p>
              <div className="flex flex-wrap gap-1.5">
                {gaps.technicalSkills.missing.length > 0 ? (
                  gaps.technicalSkills.missing.map((skill, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium text-xs"
                    >
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">¡Cubres todas las requeridas!</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Habilidades Blandas */}
        <Card className="border-violet-200 dark:border-violet-900/50 shadow-xs">
          <CardHeader className="pb-3 border-b border-violet-100 dark:border-violet-900/30 bg-violet-50/30 dark:bg-violet-950/10 rounded-t-xl">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
              <div className="p-1.5 bg-violet-100 dark:bg-violet-900/60 text-violet-600 dark:text-violet-300 rounded-lg">
                <Target className="w-4 h-4" />
              </div>
              Soft Skills & Cultura
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Coinciden
              </p>
              <div className="flex flex-wrap gap-1.5">
                {gaps.softSkills.matching.length > 0 ? (
                  gaps.softSkills.matching.map((skill, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium text-xs"
                    >
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground italic">Sin coincidencias detectadas</span>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-violet-100 dark:border-violet-900/30">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-500" /> Faltantes en tu CV
              </p>
              <div className="flex flex-wrap gap-1.5">
                {gaps.softSkills.missing.length > 0 ? (
                  gaps.softSkills.missing.map((skill, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium text-xs"
                    >
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">¡Cubres todas las requeridas!</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recomendaciones Estratégicas */}
      <Card className="border-violet-200 dark:border-violet-900/50 bg-violet-50/20 dark:bg-violet-950/10 shadow-xs">
        <CardHeader className="pb-3 border-b border-violet-100 dark:border-violet-900/30 bg-violet-100/40 dark:bg-violet-900/20 rounded-t-xl">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-violet-700 dark:text-violet-300">
            <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" /> Recomendaciones para Personalizar tu Postulación
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-2.5">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="flex gap-2.5 items-start text-xs text-muted-foreground pb-2 border-b border-violet-100/60 dark:border-violet-900/20 last:border-none last:pb-0">
              <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
              <p className="leading-relaxed">{rec}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}