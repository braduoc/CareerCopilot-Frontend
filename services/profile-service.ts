import { apiClient } from "@/lib/api-client";

export interface Profile {
  id: string;
  email: string;
  nombre_completo: string | null;
  plan: string;
  created_at: string;
}

export const profileService = {
  me: () => apiClient<Profile>("/auth/me"),
  update: (nombre_completo: string) =>
    apiClient<Profile>("/auth/me", { method: "PATCH", body: JSON.stringify({ nombre_completo }) }),
};
