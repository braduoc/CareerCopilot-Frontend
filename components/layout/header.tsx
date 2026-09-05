"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Bell, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Buscar el título de la página actual según la ruta
  const currentItem = NAV_ITEMS.find((item) => item.href === pathname);
  const title = currentItem ? currentItem.label : "Dashboard";

  return (
    <header className="h-16 border-b border-border/60 bg-card/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40 shadow-2xs">
      {/* Menú desplegable + Título dinámico del módulo */}
      <div className="flex items-center gap-3">
        {/* Menú de navegación (ahora integrado en el Header, a la izquierda) */}
        <div className="relative">
          <button
            type="button"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 shrink-0" />
            ) : (
              <Menu className="w-5 h-5 shrink-0" />
            )}
          </button>

          {/* Panel desplegable: aparece debajo del ícono, sin mover el resto del header */}
          <div
            className={cn(
              "absolute left-0 top-full mt-2 min-w-[200px] origin-top-left rounded-2xl bg-violet-600/95 dark:bg-violet-950/95 backdrop-blur-md p-1.5 shadow-2xl border border-violet-400/30 text-white transition-all duration-200 ease-out z-50",
              isMenuOpen
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
            )}
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-label={item.label}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 px-3.5 py-2.5 rounded-full transition-all duration-200 relative justify-start whitespace-nowrap",
                      isActive
                        ? "bg-white text-violet-700 font-semibold shadow-md"
                        : "text-violet-100 hover:text-white hover:bg-violet-700/60"
                    )}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-medium tracking-tight whitespace-nowrap">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <h1 className="text-lg font-bold tracking-tight text-foreground">
          {title}
        </h1>
      </div>

      {/* Acciones de usuario y notificaciones */}
      <div className="flex items-center gap-3">
        {/* Botón de Notificaciones con Badge de Estado */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-colors relative"
            aria-label="Notificaciones"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary ring-2 ring-card" />
          </Button>
        </div>

        <div className="h-5 w-px bg-border/60 mx-1" />

        {/* Perfil de Usuario */}
        <div className="flex items-center gap-3 pl-1">
          <div className="w-9 h-9 rounded-xl bg-secondary text-primary flex items-center justify-center font-semibold text-sm border border-primary/10 shadow-2xs">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block text-xs">
            <p className="font-semibold text-foreground leading-tight">Usuario</p>
            <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">Candidato</p>
          </div>
        </div>
      </div>
    </header>
  );
}