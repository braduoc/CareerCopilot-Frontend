import { apiClient } from "@/lib/api-client";
import { JobExtractResult, JobMatchPayload, JobMatchResult } from "@/types/job-match";

export const jobMatchService = {
  analyzeMatch(payload: JobMatchPayload): Promise<JobMatchResult> {
    return apiClient<JobMatchResult>("/job-match/analyze", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  extractFromUrl(url: string): Promise<JobExtractResult> {
    return apiClient<JobExtractResult>("/job-match/extract", {
      method: "POST",
      body: JSON.stringify({ url }),
    });
  },
};
