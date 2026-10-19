import Link from "next/link";
import { ArrowLeft, Stamp } from "lucide-react";

interface AuthShellProps {
  asideTitle: string;
  asideText: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

/** Marco común de las pantallas de autenticación (mismo layout que login/registro). */
export function AuthShell({ asideTitle, asideText, title, subtitle, children }: AuthShellProps) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground lg:grid lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="relative flex h-[40vh] min-h-[250px] max-h-[400px] flex-col justify-center overflow-hidden bg-ink-deep p-5 text-ink-deep-foreground sm:h-[42vh] sm:min-h-[280px] sm:p-8 lg:h-auto lg:min-h-screen lg:p-10 xl:p-14">
        <div className="relative max-w-sm">
          <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-sm border border-primary/50 bg-primary/15 text-primary">
            <Stamp className="h-4.5 w-4.5" />
          </span>
          <h1 className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl xl:text-5xl">{asideTitle}</h1>
          <p className="mt-3 max-w-xs text-sm leading-6 text-ink-deep-foreground/65">{asideText}</p>
        </div>
      </aside>

      <main className="relative z-10 -mt-6 flex min-h-[60vh] flex-col rounded-t-md border-t border-border bg-card px-4 py-5 sm:-mt-8 sm:px-10 sm:py-8 lg:z-auto lg:mt-0 lg:min-h-screen lg:rounded-none lg:border-t-0 lg:bg-transparent lg:px-16 lg:py-8 xl:px-24">
        <Link
          href="/login"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a iniciar sesión
        </Link>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-start py-5 sm:py-10 lg:justify-center lg:py-12">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{subtitle}</p>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
