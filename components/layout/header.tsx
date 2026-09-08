"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, LogOut, LayoutDashboard, FileSearch, Target, History } from "lucide-react"

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
}

const navigationLinks: NavItem[] = [
  { name: "Panel", href: "/dashboard", icon: LayoutDashboard },
  { name: "Diagnóstico ATS", href: "/ats", icon: FileSearch },
  { name: "Coincidencia de empleo", href: "/job-match", icon: Target },
  { name: "Historial", href: "/historial", icon: History },
]

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Función para cerrar sesión y redirigir
  const handleLogout = () => {
    // Si manejas tokens o cookies en localStorage/cookies, los puedes limpiar aquí:
    // localStorage.removeItem("token")
    router.push("/login")
  }

  return (
    <header className="bg-purple-600 text-white shadow-md sticky top-0 z-50 w-full">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        
        {/* PARTE IZQUIERDA: Marca + Menú Hamburguesa Dropdown */}
        <div className="flex items-center gap-3 relative" ref={menuRef}>
          <Link href="/dashboard" className="text-xl font-bold tracking-tight shrink-0 hover:opacity-90 transition-opacity">
            Dashboard
          </Link>

          {/* Botón Hamburguesa ☰ */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Menú Desplegable (Dropdown) con animación */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-purple-100 py-2 text-gray-800 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
                Navegación
              </div>
              <nav className="flex flex-col gap-1 px-1.5">
                {navigationLinks.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-purple-50 text-purple-700 font-semibold"
                          : "text-gray-600 hover:bg-gray-100 hover:text-purple-600"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? "text-purple-600" : "text-gray-400"}`} />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          )}
        </div>

        {/* PARTE DERECHA: Botón Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-medium transition-all active:scale-95 shadow-sm"
        >
          <LogOut className="h-4 w-4" />
          <span>Cerrar sesión</span>
        </button>

      </div>
    </header>
  )
}