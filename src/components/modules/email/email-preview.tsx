"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { EmailGenerateResult } from "@/src/types/email";
import { Copy, Check, MailCheck } from "lucide-react";

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
    <Card className="border-violet-200 dark:border-violet-900/50 shadow-md">
      <CardHeader className="bg-muted/50 border-b border-border">
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2 text-foreground">
            <MailCheck className="w-5 h-5 text-primary" />
            Borrador Generado
          </span>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={() => copyToClipboard(`Asunto: ${result.subject}\n\n${result.body}`, setCopiedBody)}
          >
            {copiedBody ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedBody ? "¡Copiado Todo!" : "Copiar Todo"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {/* Asunto */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Asunto del Correo
            </label>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => copyToClipboard(result.subject, setCopiedSubject)}
            >
              {copiedSubject ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            </Button>
          </div>
          <div className="p-3 bg-muted rounded-xl text-sm font-medium text-foreground border border-border">
            {result.subject}
          </div>
        </div>

        {/* Cuerpo */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Cuerpo del Mensaje
          </label>
          <div className="p-4 bg-muted/50 rounded-xl text-sm text-foreground border border-border whitespace-pre-wrap leading-relaxed font-sans">
            {result.body}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}