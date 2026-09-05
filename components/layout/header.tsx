"use client";

import { usePathname } from "next/navigation";
import { User, Bell } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  
  // Buscar el título de la página actual según la ruta
  const currentItem = NAV_ITEMS.find((item) => item.href === pathname);
  const title = currentItem ? currentItem.label : "Dashboard";

  return (
    <header className="h-16 border-b border-border/60 bg-card/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10 shadow-2xs">
      {/* Título dinámico del módulo */}
      <div>
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