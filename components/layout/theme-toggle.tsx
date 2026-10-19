"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const KEY = "cc_theme";

function subscribe(cb: () => void) {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

export function useIsDark() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false
  );
}

export function setTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem(KEY, dark ? "dark" : "light");
  } catch {
    // sin almacenamiento: el cambio vale solo para esta visita
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const dark = useIsDark();
  return (
    <button
      type="button"
      onClick={() => setTheme(!dark)}
      aria-pressed={dark}
      className={cn("flex items-center gap-3 rounded-sm px-4 py-2.5 text-sm font-medium transition-colors", className)}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {dark ? "Modo claro" : "Modo oscuro"}
    </button>
  );
}
