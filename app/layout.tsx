import type { Metadata } from "next";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerCopilot — Tu expediente de postulación",
  description:
    "Diagnostica tu CV frente al ATS, compara tu perfil contra la vacante y practica la entrevista antes de postular.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("cc_theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <div className="flex min-h-screen flex-1 flex-col print:hidden">{children}</div>
        <div id="print-root" className="hidden print:block" />
      </body>
    </html>
  );
}
