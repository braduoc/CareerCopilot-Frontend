import { apiClient } from "@/lib/api-client";
import { HistoryMatch, HistoryMatchDetail } from "@/types/historial";

export const historialService = {
  list: () => apiClient<HistoryMatch[]>("/historial/matches"),
  get: (id: string) => apiClient<HistoryMatchDetail>(`/historial/matches/${id}`),
  remove: (id: string) => apiClient<void>(`/historial/matches/${id}`, { method: "DELETE" }),
};
