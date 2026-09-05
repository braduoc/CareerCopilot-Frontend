"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Menú de Navegación Flotante Inferior Más Ancho en PC */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="flex items-center gap-2.5 bg-violet-600/95 dark:bg-violet-950/95 backdrop-blur-md px-5 py-3 rounded-full shadow-2xl border border-violet-400/30 text-white">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={cn(
                  "flex items-center gap-2.5 px-3.5 py-2.5 rounded-full transition-all duration-200 relative justify-center md:px-5 md:py-2.5",
                  isActive
                    ? "bg-white text-violet-700 font-semibold shadow-md scale-105"
                    : "text-violet-100 hover:text-white hover:bg-violet-700/60"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {/* Nombre visible solo en PC con más espacio y padding adaptado */}
                <span className="hidden md:inline text-xs font-medium tracking-tight whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}