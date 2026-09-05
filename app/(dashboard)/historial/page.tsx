"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Target, 
  Mail, 
  MessageSquare, 
  Search, 
  ArrowUpRight, 
  Calendar,
  Clock,
  History,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { APP_ROUTES } from "@/lib/constants";

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
        return <Target className="w-5 h-5 text-primary" />;
      case "email":
        return <Mail className="w-5 h-5 text-primary" />;
      case "entrevista":
        return <MessageSquare className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      {/* Header Estilizado */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-secondary text-primary hover:bg-secondary border-none px-3 py-1 gap-1.5 font-medium">
              <History className="w-3.5 h-3.5 text-primary" />
              Registro Completo
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Historial de Actividades
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">
            Revisa y consulta de nuevo tus análisis de CV, comparativas de ofertas, correos generados y prácticas de entrevistas pasadas.
          </p>
        </div>
      </div>

      {/* Controles de Filtro y Búsqueda */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-card p-4 rounded-2xl border border-border/60 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground" />
          <Input
            placeholder="Buscar por título o contenido..."
            className="pl-10 bg-background/50 border-border/80 focus-visible:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Botones de Filtro Integrados */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {[
            { id: "all", label: "Todos" },
            { id: "ats", label: "ATS" },
            { id: "job-match", label: "Job Match" },
            { id: "email", label: "Email" },
            { id: "entrevista", label: "Entrevistas" },
          ].map((tab) => {
            const isActive = filterType === tab.id;
            return (
              <Button
                key={tab.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterType(tab.id as HistoryType | "all")}
                className={
                  isActive 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }
              >
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Lista de Registros */}
      <div className="space-y-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className="border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-200 group bg-card"
            >
              <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Ícono con contenedor en tono soft violet */}
                  <div className="p-3 rounded-xl bg-secondary text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {item.subtitle}
                    </p>
                    <div className="flex items-center gap-3 mt-2.5 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-0.5 rounded-full font-medium">
                        <Calendar className="w-3 h-3 text-primary" /> {item.date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-border/60">
                  {item.scoreOrMetric && (
                    <Badge 
                      variant="secondary"
                      className="bg-secondary text-primary border-none px-3 py-1 text-xs font-semibold"
                    >
                      {item.scoreOrMetric}
                    </Badge>
                  )}
                  <Link href={item.link}>
                    <Button variant="ghost" size="sm" className="gap-1.5 text-xs hover:bg-primary/10 hover:text-primary rounded-xl">
                      Ver detalle <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="text-center py-16 border-dashed border-border/80 bg-card/40">
            <CardContent className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-base text-foreground font-semibold">
                No se encontraron actividades
              </p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No hay ningún registro que coincida con la búsqueda "{search}" o el filtro seleccionado.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => { setSearch(""); setFilterType("all"); }}
                className="mt-2 text-xs"
              >
                Limpiar filtros
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}