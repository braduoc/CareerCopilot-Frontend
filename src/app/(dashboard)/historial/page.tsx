"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { 
  FileText, 
  Target, 
  Mail, 
  MessageSquare, 
  Search, 
  ArrowUpRight, 
  Calendar,
  Clock
} from "lucide-react";
import Link from "next/link";
import { APP_ROUTES } from "@/src/lib/constants";

type HistoryType = "ats" | "job-match" | "email" | "entrevista";

interface HistoryItem {
  id: string;
  type: HistoryType;
  title: string;
  subtitle: string;
  date: string;
  scoreOrMetric?: string;
  badgeVariant?: "success" | "warning" | "destructive" | "secondary";
  link: string;
}

const MOCK_HISTORY: HistoryItem[] = [
  {
    id: "hist-1",
    type: "ats",
    title: "Diagnóstico CV_Frontend_2026.pdf",
    subtitle: "Puntuación de legibilidad ATS e impacto general",
    date: "Ayer, 14:30",
    scoreOrMetric: "82/100",
    badgeVariant: "success",
    link: APP_ROUTES.ATS,
  },
  {
    id: "hist-2",
    type: "job-match",
    title: "Match: Senior React Developer",
    subtitle: "Empresa: Tech Corp — Brecha de habilidades",
    date: "12 Oct 2026",
    scoreOrMetric: "78% Match",
    badgeVariant: "success",
    link: APP_ROUTES.JOB_MATCH,
  },
  {
    id: "hist-3",
    type: "email",
    title: "Carta de Presentación - Mercado Libre",
    subtitle: "Tono: Profesional — Puesto: Staff Engineer",
    date: "10 Oct 2026",
    scoreOrMetric: "Borrador",
    badgeVariant: "secondary",
    link: APP_ROUTES.EMAIL,
  },
  {
    id: "hist-4",
    type: "entrevista",
    title: "Simulación Entrevista Técnica Next.js",
    subtitle: "5 Preguntas respondidas — Desempeño STAR",
    date: "05 Oct 2026",
    scoreOrMetric: "85/100",
    badgeVariant: "success",
    link: APP_ROUTES.ENTREVISTA,
  },
];

export default function HistorialPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<HistoryType | "all">("all");

  const filteredItems = MOCK_HISTORY.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const getIcon = (type: HistoryType) => {
    switch (type) {
      case "ats":
        return <FileText className="w-5 h-5 text-primary" />;
      case "job-match":
        return <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case "email":
        return <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case "entrevista":
        return <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Historial de Actividades
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Revisa y consulta de nuevo tus análisis de CV, comparativas de ofertas, correos generados y prácticas de entrevistas pasadas.
        </p>
      </div>

      {/* Controles de Filtro y Búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Buscar por título o contenido..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("all")}
          >
            Todos
          </Button>
          <Button
            variant={filterType === "ats" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("ats")}
          >
            ATS
          </Button>
          <Button
            variant={filterType === "job-match" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("job-match")}
          >
            Job Match
          </Button>
          <Button
            variant={filterType === "email" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("email")}
          >
            Email
          </Button>
          <Button
            variant={filterType === "entrevista" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("entrevista")}
          >
            Entrevistas
          </Button>
        </div>
      </div>

      {/* Lista de Registros */}
      <div className="space-y-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card key={item.id} className="hover:border-primary/40 transition-colors">
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-secondary shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.subtitle}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {item.date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
                  {item.scoreOrMetric && (
                    <Badge variant={item.badgeVariant || "secondary"}>
                      {item.scoreOrMetric}
                    </Badge>
                  )}
                  <Link href={item.link}>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs">
                      Ver <ArrowUpRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="text-center py-12">
            <CardContent className="space-y-2">
              <Clock className="w-8 h-8 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground font-medium">
                No se encontraron actividades en tu historial
              </p>
              <p className="text-xs text-muted-foreground">
                Prueba a ajustar la búsqueda o el filtro de categoría.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}