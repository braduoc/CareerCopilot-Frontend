import { apiClient } from "@/lib/api-client";
import { ATSDiagnostic } from "@/types/ats";

export interface ATSHistoryItem {
  id: string;
  fileName: string;
  score: number | null;
  createdAt: string;
}

export const atsService = {
  history: () => apiClient<ATSHistoryItem[]>("/ats/history"),

  getById: (id: string) => apiClient<ATSDiagnostic>(`/ats/${id}`),

  async analyzeCv(file: File): Promise<ATSDiagnostic> {
    const formData = new FormData();
    formData.append("file", file);

    return apiClient<ATSDiagnostic>("/ats/analyze", {
      method: "POST",
      body: formData,
    });
  },

  async getLatestDiagnostic(): Promise<ATSDiagnostic | null> {
    return apiClient<ATSDiagnostic>("/ats/latest");
  },
};