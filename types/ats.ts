export interface ATSScoreItem {
  label: string;
  score: number;
  max: number;
}

export interface ATSDiagnostic {
  score: number; // Suma de la rúbrica (0-100)
  parsedText: string;
  summary: string;
  sections: {
    contactInfo: boolean;
    workExperience: boolean;
    education: boolean;
    skills: boolean;
  };
  strengths: string[];
  improvements: string[];
  missingKeywords: string[];
  /** Desglose del puntaje por criterio. Ausente en diagnósticos antiguos. */
  scoreBreakdown?: ATSScoreItem[] | null;
  /** Perfil profesional detectado en el CV. */
  detectedRole?: string | null;
}
