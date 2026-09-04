export interface ATSDiagnostic {
  score: number; // Porcentaje general (ej: 85)
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
}

export interface ATSUploadResponse {
  success: boolean;
  message: string;
  data?: ATSDiagnostic;
}