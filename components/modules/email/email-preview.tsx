"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmailGenerateResult } from "@/types/email";
import { Copy, Check, Mail } from "lucide-react";

interface EmailPreviewProps {
  result: EmailGenerateResult;
}

export function EmailPreview({ result }: EmailPreviewProps) {
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2 text-foreground">
            <Mail className="h-4 w-4 text-primary" />
            Borrador Generado
          </span>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => copyToClipboard(`Asunto: ${result.subject}\n\n${result.body}`, setCopiedBody)}
          >
            {copiedBody ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
            {copiedBody ? "¡Copiado Todo!" : "Copiar Todo"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {/* Asunto */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-muted-foreground">
              Asunto del correo
            </label>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => copyToClipboard(result.subject, setCopiedSubject)}
            >
              {copiedSubject ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
          <div className="rounded-sm border border-border bg-secondary/50 p-3 text-sm font-medium text-foreground">
            {result.subject}
          </div>
        </div>

        {/* Cuerpo */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-muted-foreground">
            Cuerpo del mensaje
          </label>
          <div className="whitespace-pre-wrap rounded-sm border border-border bg-card p-4 font-sans text-sm leading-relaxed text-foreground">
            {result.body}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
