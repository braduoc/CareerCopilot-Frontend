import * as React from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type NoticeTone = "error" | "success" | "info";

const tones: Record<NoticeTone, { box: string; icon: React.ElementType }> = {
  error: { box: "border-destructive/30 bg-destructive/5 text-destructive", icon: AlertCircle },
  success: { box: "border-success/30 bg-success/5 text-success", icon: CheckCircle2 },
  info: { box: "border-primary/30 bg-primary/5 text-foreground", icon: Info },
};

interface NoticeProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: NoticeTone;
}

export function Notice({ tone = "info", className, children, ...props }: NoticeProps) {
  const { box, icon: Icon } = tones[tone];
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn("flex items-start gap-2.5 rounded-md border px-4 py-3 text-sm", box, className)}
      {...props}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="min-w-0 flex-1 leading-relaxed">{children}</div>
    </div>
  );
}
