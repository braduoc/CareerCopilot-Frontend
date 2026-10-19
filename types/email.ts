export interface EmailDraft {
  id: string;
  subject: string;
  body: string;
}

export interface EmailGeneratePayload {
  jobMatchId: string;
  recipientName?: string;
  tone: string;
}
