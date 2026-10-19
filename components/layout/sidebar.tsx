"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  FileCheck2,
  Target,
  MessageSquare,
  Mail,
  History,
  Stamp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut, StoredUser } from "@/lib/auth";
import { STORAGE_KEYS } from "@/lib/constants";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navigationLinks: NavItem[] = [
  { name: "Panel", href: "/dashboard", icon: LayoutDashboard },
  { name: "Diagnóstico ATS", href: "/ats", icon: FileCheck2 },
  { name: "Job Match", href: "/job-match", icon: Target },
  { name: "Entrevista IA", href: "/entrevista", icon: MessageSquare },
  { name: "Email", href: "/email", icon: Mail },
  { name: "Historial", href: "/historial", icon: History },
];

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navigationLinks.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-r-md rounded-l-none border-l-[3px] px-4 py-2.5 text-sm font-medium transition-all",
              isActive
                ? "translate-x-1 border-primary bg-card text-foreground"
                : "border-transparent text-ink-deep-foreground/60 hover:translate-x-0.5 hover:border-primary/40 hover:bg-white/5 hover:text-ink-deep-foreground"
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4 shrink-0",
                isActive ? "text-primary" : "text-current"
              )}
            />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

function BrandMark() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2.5 px-4 pt-6 pb-8">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-primary/50 bg-primary/15 text-primary">
        <Stamp className="h-4.5 w-4.5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-semibold tracking-tight text-ink-deep-foreground">
          CareerCopilot
        </span>
        <span className="text-[11px] text-ink-deep-foreground/50">
          Tu expediente de postulación
        </span>
      </span>
    </Link>
  );
}

export function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const rawUser = useSyncExternalStore(
    (cb) => {
      window.addEventListener("storage", cb);
      return () => window.removeEventListener("storage", cb);
    },
    () => localStorage.getItem(STORAGE_KEYS.USER_DATA),
    () => null
  );
  const user = useMemo<StoredUser | null>(() => {
    try {
      return rawUser ? (JSON.parse(rawUser) as StoredUser) : null;
    } catch {
      return null;
    }
  }, [rawUser]);

  const handleLogout = async () => {
    await signOut();
    router.replace("/login");
  };

  return (
    <>
      {/* Barra superior móvil */}
      <div className="flex items-center justify-between border-b border-black/20 bg-ink-deep px-4 py-3 md:hidden">
        <Link href="/dashboard" className="flex items-center gap-2 text-ink-deep-foreground">
          <Stamp className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">CareerCopilot</span>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-sm p-2 text-ink-deep-foreground hover:bg-white/10"
          aria-label="Abrir navegación"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Panel deslizable móvil */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64 bg-ink-deep p-4">
            <div className="mb-2 flex items-center justify-between">
              <BrandMark />
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-sm p-2 text-ink-deep-foreground/70 hover:bg-white/10"
                aria-label="Cerrar navegación"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavList onNavigate={() => setIsOpen(false)} />
            {user && (
              <div className="mt-6 border-t border-white/10 px-4 pt-4">
                <p className="truncate text-sm font-semibold text-ink-deep-foreground">{user.fullName}</p>
                <p className="truncate text-xs text-ink-deep-foreground/50">{user.email}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="mt-2 flex w-full items-center gap-3 rounded-sm px-4 py-2.5 text-sm font-medium text-ink-deep-foreground/60 hover:bg-white/10 hover:text-ink-deep-foreground"
            >
              <LogOut className="h-4 w-4" /> Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {/* Sidebar fijo de escritorio */}
      <aside className="hidden w-64 shrink-0 flex-col bg-ink-deep md:flex">
        <BrandMark />
        <div className="flex-1 pr-2">
          <NavList />
        </div>
        {user && (
          <div className="mx-4 mb-3 border-t border-white/10 px-4 pt-4">
            <p className="truncate text-sm font-semibold text-ink-deep-foreground">{user.fullName}</p>
            <p className="truncate text-xs text-ink-deep-foreground/50">{user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="mx-4 mb-6 flex items-center gap-3 rounded-sm px-4 py-2.5 text-sm font-medium text-ink-deep-foreground/50 hover:bg-white/5 hover:text-ink-deep-foreground"
        >
          <LogOut className="h-4 w-4" /> Cerrar sesión
        </button>
      </aside>
    </>
  );
}
