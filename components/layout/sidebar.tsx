"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

const DRAG_THRESHOLD = 6; // px de movimiento antes de considerarlo arrastre real
const FOLLOW_EASE = 0.25; // 0-1, más alto = sigue el cursor más rápido

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Posición renderizada (con animación de seguimiento)
  const [renderPos, setRenderPos] = useState<{ x: number; y: number } | null>(
    null
  );

  const target = useRef({ x: 0, y: 0 }); // hacia dónde debe ir (según el cursor)
  const current = useRef({ x: 0, y: 0 }); // posición actual animada
  const rafId = useRef<number | null>(null);

  const pointerStart = useRef({ x: 0, y: 0, originX: 0, originY: 0 });
  const wasDragging = useRef(false); // para bloquear el click posterior al soltar

  // Posición inicial (equivalente a bottom-6 left-1/2 -translate-x-1/2)
  useEffect(() => {
    if (renderPos === null && navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      const x = window.innerWidth / 2 - rect.width / 2;
      const y = window.innerHeight - rect.height - 24;
      current.current = { x, y };
      target.current = { x, y };
      setRenderPos({ x, y });
    }
  }, [renderPos]);

  const clamp = useCallback((x: number, y: number) => {
    const rect = navRef.current?.getBoundingClientRect();
    const width = rect?.width ?? 0;
    const height = rect?.height ?? 0;
    const maxX = window.innerWidth - width;
    const maxY = window.innerHeight - height;
    return {
      x: Math.min(Math.max(x, 0), Math.max(maxX, 0)),
      y: Math.min(Math.max(y, 0), Math.max(maxY, 0)),
    };
  }, []);

  // Loop de animación: interpola "current" hacia "target" mientras se arrastra
  const animate = useCallback(() => {
    current.current.x += (target.current.x - current.current.x) * FOLLOW_EASE;
    current.current.y += (target.current.y - current.current.y) * FOLLOW_EASE;
    setRenderPos({ x: current.current.x, y: current.current.y });

    const dx = target.current.x - current.current.x;
    const dy = target.current.y - current.current.y;
    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
      rafId.current = requestAnimationFrame(animate);
    } else {
      rafId.current = null;
    }
  }, []);

  const startAnimating = useCallback(() => {
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const activePointerId = useRef<number | null>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // No capturamos el puntero todavía: si es un simple click, debe
    // comportarse de forma 100% nativa (sin pointer capture de por medio).
    pointerStart.current = {
      x: e.clientX,
      y: e.clientY,
      originX: current.current.x,
      originY: current.current.y,
    };
    wasDragging.current = false;
    activePointerId.current = e.pointerId;
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (activePointerId.current !== e.pointerId) return;

      const dx = e.clientX - pointerStart.current.x;
      const dy = e.clientY - pointerStart.current.y;

      if (!wasDragging.current) {
        if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) {
          return; // aún no supera el umbral, no es arrastre todavía
        }
        // Se confirma el arrastre: recién ahora capturamos el puntero
        wasDragging.current = true;
        setIsDragging(true);
        wrapperRef.current?.setPointerCapture(e.pointerId);
      }

      const next = clamp(
        pointerStart.current.originX + dx,
        pointerStart.current.originY + dy
      );
      target.current = next;
      startAnimating();
    },
    [clamp, startAnimating]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (wasDragging.current) {
      wrapperRef.current?.releasePointerCapture(e.pointerId);
    }
    activePointerId.current = null;
    setIsDragging(false);
    // wasDragging.current se resetea en el handler de click (capture),
    // así evitamos que el click "fantasma" abra el toggle o navegue
    // solo cuando SÍ hubo arrastre real.
  }, []);

  // Si hubo arrastre real, cancela el click que el navegador dispara al soltar
  const handleClickCapture = useCallback((e: React.MouseEvent) => {
    if (wasDragging.current) {
      e.preventDefault();
      e.stopPropagation();
      wasDragging.current = false;
    }
  }, []);

  // Reajusta si la ventana cambia de tamaño
  useEffect(() => {
    function handleResize() {
      const next = clamp(current.current.x, current.current.y);
      current.current = next;
      target.current = next;
      setRenderPos(next);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [clamp]);

  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClickCapture={handleClickCapture}
      className={cn(
        "fixed z-50 touch-none select-none",
        isDragging ? "cursor-grabbing" : "cursor-grab"
      )}
      style={
        renderPos
          ? { left: renderPos.x, top: renderPos.y }
          : { bottom: 24, left: "50%", transform: "translateX(-50%)" }
      }
    >
      <nav
        ref={navRef}
        className={cn(
          "flex items-center gap-2.5 bg-violet-600/95 dark:bg-violet-950/95 backdrop-blur-md px-3 py-3 rounded-full shadow-2xl border border-violet-400/30 text-white transition-transform duration-200 ease-out",
          isDragging ? "scale-110 shadow-violet-900/50" : "scale-100"
        )}
      >
        {/* Ícono toggle: no forma parte de NAV_ITEMS */}
        <button
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center justify-center px-3.5 py-2.5 rounded-full transition-all duration-200 text-violet-100 hover:text-white hover:bg-violet-700/60 md:px-5 md:py-2.5"
        >
          {isOpen ? (
            <X className="w-5 h-5 shrink-0" />
          ) : (
            <Menu className="w-5 h-5 shrink-0" />
          )}
        </button>

        {/* Ítems del menú: se muestran tal cual estaban al abrir */}
        {isOpen &&
          NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={cn(
                  "flex items-center gap-2.5 px-3.5 py-2.5 rounded-full transition-all duration-200 relative justify-center md:px-5 md:py-2.5",
                  isActive
                    ? "bg-white text-violet-700 font-semibold shadow-md scale-105"
                    : "text-violet-100 hover:text-white hover:bg-violet-700/60"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {/* Nombre visible solo en PC */}
                <span className="hidden md:inline text-xs font-medium tracking-tight whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            );
          })}
      </nav>
    </div>
  );
}