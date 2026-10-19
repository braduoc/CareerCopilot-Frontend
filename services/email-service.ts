import { apiClient } from "@/lib/api-client";
import { EmailDraft, EmailGeneratePayload } from "@/types/email";

export const emailService = {
  generate: (payload: EmailGeneratePayload) =>
    apiClient<EmailDraft>("/email/generate", { method: "POST", body: JSON.stringify(payload) }),
  update: (id: string, data: { subject?: string; body?: string }) =>
    apiClient<EmailDraft>(`/email/${id}`, { method: "PUT", body: JSON.stringify(data) }),
};
