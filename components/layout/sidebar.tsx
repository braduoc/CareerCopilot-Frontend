"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen border-r border-border/60 bg-card p-4 flex flex-col justify-between shadow-xs">
      <div className="space-y-6">
        {/* Logo con Gradiente de Marca */}
        <div className="flex items-center gap-2.5 px-2 font-bold text-xl text-foreground">
          <div className="p-2 bg-brand-gradient rounded-xl text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <span className="tracking-tight">CareerCopilot</span>
        </div>

        {/* Links de navegación */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-secondary text-secondary-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer del Sidebar */}
      <div className="p-2 border-t border-border/60 text-[11px] text-muted-foreground font-medium flex items-center justify-between">
        <span>CareerCopilot</span>
        <span className="px-2 py-0.5 rounded-full bg-secondary text-primary font-semibold">
          v1.0
        </span>
      </div>
    </aside>
  );
}