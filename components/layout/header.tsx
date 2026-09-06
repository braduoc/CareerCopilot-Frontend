"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItem {
  name: string
  href: string
}

// Asegúrate de que las rutas coincidan EXACTAMENTE con el nombre de tus carpetas en app/(dashboard)
const navigationLinks: NavItem[] = [
  { name: "Panel", href: "/dashboard" },
  { name: "Diagnóstico ATS", href: "/ats" },        // 👈 DEBE DECIR /ats (NO /diagnostico-ats)
  { name: "Coincidencia de empleo", href: "/job-match" },
  { name: "Historial", href: "/historial" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-purple-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-xl font-bold">Dashboard</div>
        
        <nav className="flex items-center gap-2">
          {navigationLinks.map((item: NavItem) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white text-purple-700 shadow-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}