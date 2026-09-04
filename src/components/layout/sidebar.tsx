"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { NAV_ITEMS } from "@/src/lib/constants";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen border-r border-border bg-card p-4 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 font-bold text-xl text-foreground">
          <div className="p-2 bg-primary rounded-lg text-white">
            <Bot className="w-5 h-5" />
          </div>
          <span>CareerCopilot</span>
        </div>

        {/* Links de navegación */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#F0EBFF] text-[#7C3AED] font-medium dark:bg-violet-950/50 dark:text-violet-300"
                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer del Sidebar */}
      <div className="p-2 border-t border-border text-xs text-muted-foreground">
        CareerCopilot v1.0
      </div>
    </aside>
  );
}