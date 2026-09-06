"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItem {
  name: string
  href: string
}

const navigationLinks: NavItem[] = [
  { name: "Panel", href: "/dashboard" },
  { name: "Diagnóstico ATS", href: "/ats" },
  { name: "Coincidencia de empleo", href: "/job-match" },
  { name: "Historial", href: "/historial" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-purple-600 text-white shadow-md sticky top-0 z-50 w-full overflow-hidden">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="text-xl font-bold shrink-0">
          Dashboard
        </Link>
        
        {/* Navegación adaptable: con scroll horizontal suave en móviles si no cabe, y limpia en escritorio */}
        <nav className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar max-w-full">
          {navigationLinks.map((item: NavItem) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1.5 rounded-md text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
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