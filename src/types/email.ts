export type EmailTone = "professional" | "formal" | "enthusiastic" | "concise";

export type EmailType = "application" | "follow_up" | "thank_you" | "networking";

export interface EmailGeneratePayload {
  recipientName?: string;
  companyName: string;
  jobTitle: string;
  tone: EmailTone;
  type: EmailType;
  additionalNotes?: string;
}

export interface EmailGenerateResult {
  subject: string;
  body: string;
}