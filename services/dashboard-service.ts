import { apiClient } from "@/lib/api-client";
import { DashboardSummary } from "@/types/dashboard";

export const dashboardService = {
  summary: () => apiClient<DashboardSummary>("/dashboard/summary"),
};
