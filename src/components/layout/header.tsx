"use client";

import { usePathname } from "next/navigation";
import { User, Bell } from "lucide-react";
import { NAV_ITEMS } from "@/src/lib/constants";

export function Header() {
  const pathname = usePathname();
  
  // Buscar el título de la página actual según la ruta
  const currentItem = NAV_ITEMS.find((item) => item.href === pathname);
  const title = currentItem ? currentItem.label : "Dashboard";

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Título dinámico del módulo */}
      <div>
        <h1 className="text-lg font-semibold text-foreground">
          {title}
        </h1>
      </div>

      {/* Acciones de usuario y notificaciones */}
      <div className="flex items-center gap-4">
        <button 
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors"
          aria-label="Notificaciones"
        >
          <Bell className="w-5 h-5" />
        </button>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#F0EBFF] dark:bg-violet-950 text-[#7C3AED] dark:text-violet-300 flex items-center justify-between justify-center font-medium text-sm border border-violet-200 dark:border-violet-800">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block text-xs">
            <p className="font-medium text-foreground">Usuario</p>
            <p className="text-muted-foreground">Candidato</p>
          </div>
        </div>
      </div>
    </header>
  );
}