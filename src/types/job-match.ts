export interface GapAnalysis {
  technicalSkills: {
    matching: string[];
    missing: string[];
  };
  softSkills: {
    matching: string[];
    missing: string[];
  };
}

export interface JobMatchResult {
  matchPercentage: number;
  jobTitle: string;
  companyName?: string;
  summary: string;
  gaps: GapAnalysis;
  recommendations: string[];
}

export interface JobMatchPayload {
  cvText: string;
  jobDescription: string;
}