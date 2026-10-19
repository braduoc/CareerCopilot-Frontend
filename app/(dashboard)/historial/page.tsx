"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Notice } from "@/components/ui/notice"
import { History, FileText, Trash2, MessageSquare, Mail, ChevronDown, CheckCircle2, XCircle } from "lucide-react"
import { historialService } from "@/services/historial-service"
import { HistoryMatch, HistoryMatchDetail } from "@/types/historial"

function formatDate(iso: string) {
  const date = new Date(iso.endsWith("Z") || iso.includes("+") ? iso : `${iso}Z`)
  return date.toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" })
}

export default function HistoryPage() {
  const router = useRouter()
  const [items, setItems] = useState<HistoryMatch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const [detail, setDetail] = useState<HistoryMatchDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  const fetchItems = useCallback(
    () =>
      historialService
        .list()
        .then(setItems)
        .catch((err) => setError(err instanceof Error ? err.message : "No se pudo cargar el historial."))
        .finally(() => setLoading(false)),
    []
  )

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const retry = () => {
    setLoading(true)
    setError(null)
    fetchItems()
  }

  const toggleDetail = async (id: string) => {
    if (openId === id) {
      setOpenId(null)
      return
    }
    setOpenId(id)
    setDetail(null)
    setDetailLoading(true)
    try {
      setDetail(await historialService.get(id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cargar el detalle.")
      setOpenId(null)
    } finally {
      setDetailLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setBusyId(id)
    setError(null)
    try {
      await historialService.remove(id)
      setItems((prev) => prev.filter((item) => item.id !== id))
      if (openId === id) setOpenId(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo eliminar el análisis.")
    } finally {
      setBusyId(null)
      setConfirmId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Historial de Análisis</h1>
            <Badge variant="outline" className="gap-1.5 border-primary/30 text-primary">
              <History className="h-3 w-3" /> Registros
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Consulta y gestiona tus análisis. Genera entrevistas simuladas o correos de presentación desde cada registro.
          </p>
        </div>
      </div>

      {error && (
        <Notice tone="error">
          <span>{error}</span>{" "}
          <button type="button" onClick={retry} className="font-semibold underline underline-offset-4">
            Reintentar
          </button>
        </Notice>
      )}

      {loading ? (
        <div className="space-y-px border-y border-border">
          {[0, 1, 2].map((n) => (
            <div key={n} className="h-[76px] animate-pulse bg-secondary/40" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="border-y border-border py-12 text-center text-sm text-muted-foreground">
          <p>Aún no tienes análisis guardados.</p>
          <Link href="/job-match" className="mt-2 inline-block font-semibold text-primary underline-offset-4 hover:underline">
            Crear mi primer Job Match
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <div key={item.id}>
              <div className="flex flex-col gap-4 px-2 py-4 transition-colors hover:bg-card/60 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => toggleDetail(item.id)}
                  aria-expanded={openId === item.id}
                  className="flex min-w-0 items-start gap-3.5 text-left"
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border bg-secondary text-primary">
                    <FileText className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{item.nombre}</span>
                      <Badge variant={item.scoreCompatibilidad >= 60 ? "success" : "warning"}>
                        {item.scoreCompatibilidad}% match
                      </Badge>
                    </span>
                    <span className="mt-1 flex items-center gap-1 font-mono text-xs text-muted-foreground">
                      {formatDate(item.fecha)} · Job Match
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openId === item.id ? "rotate-180" : ""}`} />
                    </span>
                  </span>
                </button>

                <div className="flex w-full flex-wrap items-center justify-end gap-2 self-end border-t border-border pt-2 sm:w-auto sm:self-auto sm:border-t-0 sm:pt-0">
                  <Button size="sm" variant="outline" className="gap-1.5" onClick={() => router.push(`/entrevista?id=${item.id}`)}>
                    <MessageSquare className="h-3.5 w-3.5" />
                    Entrevista IA
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1.5" onClick={() => router.push(`/email?id=${item.id}`)}>
                    <Mail className="h-3.5 w-3.5" />
                    Generar Email
                  </Button>
                  {confirmId === item.id ? (
                    <div className="flex items-center gap-1.5">
                      <Button size="sm" variant="destructive" disabled={busyId === item.id} onClick={() => handleDelete(item.id)}>
                        {busyId === item.id ? "Eliminando..." : "Confirmar"}
                      </Button>
                      <Button size="sm" variant="ghost" disabled={busyId === item.id} onClick={() => setConfirmId(null)}>
                        Cancelar
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => setConfirmId(item.id)}
                      title="Eliminar análisis"
                      aria-label={`Eliminar ${item.nombre}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {openId === item.id && (
                <div className="border-t border-dashed border-border bg-card/40 px-4 py-4 text-sm">
                  {detailLoading || !detail ? (
                    <p className="text-muted-foreground">Cargando detalle...</p>
                  ) : (
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-success">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Cumple
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {detail.cumple.length ? detail.cumple.map((c, i) => <Badge key={i} variant="success">{c}</Badge>) : <span className="italic text-muted-foreground">—</span>}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-destructive">
                          <XCircle className="h-3.5 w-3.5" /> No cumple
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {detail.noCumple.length ? detail.noCumple.map((c, i) => <Badge key={i} variant="destructive">{c}</Badge>) : <span className="italic text-muted-foreground">—</span>}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Oferta analizada</p>
                        <p className="max-h-32 overflow-auto whitespace-pre-wrap rounded-sm border border-border bg-card p-3 text-foreground/80">
                          {detail.ofertaTexto}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
