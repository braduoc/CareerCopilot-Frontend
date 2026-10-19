"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const subscribe = () => () => {};

/** Contenido que solo aparece al imprimir / guardar como PDF (el resto de la app se oculta). */
export function PrintOnly({ children }: { children: React.ReactNode }) {
  const root = useSyncExternalStore(
    subscribe,
    () => document.getElementById("print-root"),
    () => null
  );
  return root ? createPortal(<div className="bg-white p-8 text-black">{children}</div>, root) : null;
}

export function printPage() {
  window.print();
}
