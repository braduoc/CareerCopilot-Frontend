import { apiClient } from "@/src/lib/api-client";
import { JobMatchPayload, JobMatchResult } from "@/src/types/job-match";

export const jobMatchService = {
  async analyzeMatch(payload: JobMatchPayload): Promise<JobMatchResult> {
    return apiClient<JobMatchResult>("/job-match/analyze", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};