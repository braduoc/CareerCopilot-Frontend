# CareerCopilot — Sistema de diseño "Legajo"

Dirección visual nueva (reemplaza el kit violeta/índigo genérico). La metáfora
central: tu búsqueda de empleo es un **legajo** (expediente/carpeta) que el
ATS procesa — CareerCopilot te muestra ese expediente por dentro: veredictos
sellados, fichas numeradas, un registro (historial) tipo libro de actas.

No es el tema literal de "copiloto/avión". Es administrativo-documental:
carpetas, pestañas, sellos de aprobado/rechazado, fichas, ledger. Encaja con
el vocabulario que el producto ya usa ("Diagnóstico", "Score", "Historial").

## Color (usar SIEMPRE las variables, nunca violet-*/purple-*/indigo-*)

| Token | Hex aprox | Uso |
|---|---|---|
| `--ink` (foreground) | `#141922` | Texto principal, títulos |
| `--ink-deep` | `#10141F` | Fondo de header/hero/footer (banda oscura fija, no es "dark mode") |
| `--paper` (background) | `#EEEDE4` | Fondo base de toda la app (gris-cálido, NO crema/beige de IA genérica) |
| `--card` | `#F8F7F1` | Fichas/tarjetas, inputs |
| `--carbon` (muted-foreground) | `#655D4F` | Texto secundario |
| `--line` (border) | `#D9D3C2` | Líneas/hairlines, divisores tipo ledger |
| `--amber` (primary) | `#C8862B` | ÚNICO acento "de marca": CTA, tabs activos, números clave. Úsalo con moderación. |
| `--approve` (success) | `#2F6B4F` | Sello "aprobado", keywords encontradas, estados positivos |
| `--deny` (destructive) | `#A6392C` | Sello "revisar/rechazado", keywords faltantes, errores |

Radii: por defecto pequeño (`--radius: 0.5rem`). Las "fichas" y sellos pueden
usar esquinas más rectas (no todo redondeado igual — ese es el tell de "kit
SaaS"). Sombras: casi nunca `box-shadow` difuso; usar `border` + `--line` para
separar superficies (estética de documento, no de tarjetas flotantes).

## Tipografía

- **IBM Plex Sans** — única familia para títulos y cuerpo (var `--font-sans`).
  Carácter técnico/documental, no es el Inter/Geist por defecto.
- **Space Mono** — SOLO para lecturas numéricas reales: el score ATS, el %
  de match, IDs de ficha/fecha en el historial (var `--font-mono`). Nunca para
  labels de navegación ni eyebrows — esos van en Plex Sans normal.
- Escala: hero 56/1.05, H1 36/1.15, H2 28/1.2, H3 20/1.3, body 16/1.6 (antes
  el sitio usaba 11–13px en todas partes; subir a tamaños legibles de producto
  real), meta 13/1.4.

## Qué evitar (ya presente en el sitio viejo, hay que sacarlo)

- Iconos `Bot` / `Sparkles` (cliché de "asistente de IA genérico") → usar
  `Stamp`, `FileCheck2`, `FolderOpen`, `ClipboardCheck` del set lucide-react
  ya instalado.
- Textos en mayúscula sostenida tipo eyebrow, badges "01 · 02 · 03" con punto
  medio, flecha "→" pegada a todos los botones.
- Fondos con blobs/gradientes difusos decorativos.
- Grid de 3 tarjetas idénticas con el mismo `shadow-lg` — reemplazar por
  fichas numeradas (01–04, es una secuencia real: ATS → Job Match →
  Entrevista → Email) con borde fino y una barra de color por módulo.

## Navegación del dashboard

Pasa de header con menú hamburguesa a un **sidebar fijo estilo pestañas de
carpeta** (`components/layout/sidebar.tsx`): cada módulo es una pestaña;
la activa se desplaza levemente a la derecha y se tiñe de `--amber`. El
header interno queda reducido a una franja delgada (título de página +
cerrar sesión).
