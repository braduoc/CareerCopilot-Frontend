# CareerCopilot — Frontend

Interfaz web de CareerCopilot: diagnóstico ATS del CV, compatibilidad con ofertas (job match), simulación de entrevistas, generación de correos e historial.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS (ver [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md))
- Supabase Auth para login y registro
- Backend: API FastAPI del repo **CareerCopilot-Backend**

## Cómo se conecta con el backend

El frontend **no tiene API routes propias ni llama a ningún proveedor de IA**. Todas las peticiones van al backend FastAPI (`NEXT_PUBLIC_API_URL`) con el token de Supabase en la cabecera `Authorization`. La IA y la base de datos viven en el backend.

```
Navegador (Next.js :3000) ──fetch + Bearer token──► FastAPI (:8000/api/v1) ──► IA + PostgreSQL
            │
            └── Supabase Auth (login, emite el token)
```

Endpoints, contratos y solución de problemas: [integrarbackend.txt](integrarbackend.txt).

## Puesta en marcha

1. Levanta el backend en `http://localhost:8000` (ver su README).
2. Copia `.env.local.example` a `.env.local` y complétalo:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
   NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co   # el mismo proyecto que usa el backend
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-publica
   ```

3. Instala dependencias y arranca:

   ```bash
   npm install
   npm run dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000).

El backend solo acepta peticiones de los orígenes listados en su `CORS_ORIGINS` (por defecto `http://localhost:3000`).

## Estructura

```
app/          páginas (App Router)
components/   componentes de UI y de cada módulo
hooks/        hooks que usan los servicios (use-ats, ...)
services/     una función por endpoint del backend
lib/          api-client (fetch + token + errores), auth, supabase, constantes
types/        contratos de datos; deben coincidir con los schemas.py del backend
```

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build |
| `npm run lint` | ESLint |

También hay un `Dockerfile` para desplegar en contenedor.

## Confirmación de correo (Supabase)

Al registrarse, Supabase envía un correo con un enlace. Ese enlace vuelve a `${NEXT_PUBLIC_SITE_URL}/confirm-email`,
página que inicia la sesión y lleva al usuario a su panel (si el enlace venció, ofrece reenviarlo).

Configuración necesaria en **Supabase → Authentication → URL Configuration**:

| Campo | Desarrollo | Producción |
|---|---|---|
| Site URL | `http://localhost:3000` | `https://tu-dominio` |
| Redirect URLs (agregar) | `http://localhost:3000/**` | `https://tu-dominio/**` |

Si la URL de redirección no está en esa lista, Supabase ignora `emailRedirectTo` y manda al usuario a la *Site URL*.
En producción define también `NEXT_PUBLIC_SITE_URL` y reconstruye (las variables `NEXT_PUBLIC_*` se fijan al compilar).
