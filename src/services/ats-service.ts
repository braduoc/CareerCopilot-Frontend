import { apiClient } from "@/src/lib/api-client";
import { ATSDiagnostic } from "@/src/types/ats";

export const atsService = {
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