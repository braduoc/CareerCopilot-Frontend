import { apiClient } from "@/lib/api-client";
import { JobMatchPayload, JobMatchResult } from "@/types/job-match";

export const jobMatchService = {
  analyzeMatch(payload: JobMatchPayload): Promise<JobMatchResult> {
    return apiClient<JobMatchResult>("/job-match/analyze", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
