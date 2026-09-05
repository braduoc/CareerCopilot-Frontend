"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, STORAGE_KEYS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentItem = NAV_ITEMS.find((item) => item.href === pathname);
  const title = currentItem ? currentItem.label : "Dashboard";

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    router.push('/');
  };

  return (
    <header className="h-16 border-b border-border/60 bg-violet-600 dark:bg-violet-950 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40 shadow-2xl">
      {/* Botón hamburguesa (solo móvil) + Título */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl text-violet-100 hover:text-white hover:bg-violet-700/60 transition-colors"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 shrink-0" />
          ) : (
            <Menu className="w-5 h-5 shrink-0" />
          )}
        </button>

        <h1 className="text-lg font-bold tracking-tight text-white">
          {title}
        </h1>
      </div>

      {/* Navegación horizontal integrada en el header (escritorio) */}
      <nav className="hidden lg:flex items-center gap-1 bg-violet-700/40 rounded-full p-1.5 border border-violet-400/30">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-full transition-all duration-200 whitespace-nowrap",
                isActive
                  ? "bg-white text-violet-700 font-semibold shadow-md"
                  : "text-violet-100 hover:text-white hover:bg-violet-700/60"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0",
                  isActive ? "text-violet-700" : "text-violet-100"
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium tracking-tight",
                  isActive ? "text-violet-700" : "text-violet-100"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Panel desplegable (solo móvil, debajo del header) */}
      <div
        className={cn(
          "lg:hidden absolute left-0 top-full w-full origin-top rounded-b-2xl bg-violet-600/95 dark:bg-violet-950/95 backdrop-blur-md p-2 shadow-2xl border-t border-violet-400/30 transition-all duration-200 ease-out z-50",
          isMenuOpen
            ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
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
                  "flex items-center gap-2.5 px-3.5 py-2.5 rounded-full transition-all duration-200 justify-start whitespace-nowrap",
                  isActive
                    ? "bg-white text-violet-700 font-semibold shadow-md"
                    : "text-violet-100 hover:text-white hover:bg-violet-700/60"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 shrink-0",
                    isActive ? "text-violet-700" : "text-violet-100"
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-medium tracking-tight whitespace-nowrap",
                    isActive ? "text-violet-700" : "text-violet-100"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Acciones de usuario y notificaciones */}
      <div className="flex items-center gap-3">
        <div className="h-5 w-px bg-violet-400/30 mx-1" />

        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="gap-2 text-violet-100 hover:text-white hover:bg-violet-700/60"
          aria-label="Cerrar sesión"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </Button>

        <div className="flex items-center gap-3 pl-1">
          <div className="w-9 h-9 rounded-xl bg-white/15 text-white flex items-center justify-center font-semibold text-sm border border-white/20 shadow-2xs">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block text-xs">
            <p className="font-semibold text-white leading-tight">Usuario</p>
            <p className="text-[11px] text-violet-200 leading-tight mt-0.5">Candidato</p>
          </div>
        </div>
      </div>
    </header>
  );
}