import { API_BASE_URL, APP_ROUTES } from "./constants";
import { clearSession, getAccessToken } from "./auth";

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** FastAPI devuelve `detail` como texto o como lista de errores de validación. */
function extractMessage(errorData: unknown, status: number): string {
  const data = errorData as { detail?: unknown; message?: string } | null;
  const detail = data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0] as { msg?: string };
    if (first?.msg) return first.msg;
  }
  return data?.message || `Error del servidor (${status})`;
}

export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const token = typeof window !== "undefined" ? await getAccessToken() : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  // Con FormData (subida de archivos) el navegador pone el Content-Type con su boundary.
  if (options.body instanceof FormData) delete headers["Content-Type"];

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
  } catch {
    throw new ApiError("No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.", 0);
  }

  if (response.status === 401 && typeof window !== "undefined") {
    clearSession();
    window.location.href = APP_ROUTES.LOGIN;
    throw new ApiError("Tu sesión expiró. Inicia sesión nuevamente.", 401);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new ApiError(extractMessage(errorData, response.status), response.status);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
