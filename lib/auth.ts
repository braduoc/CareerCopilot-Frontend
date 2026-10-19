import { supabase } from "@/lib/supabase";
import { STORAGE_KEYS } from "@/lib/constants";

export interface StoredUser {
  id: string;
  email: string;
  fullName: string;
}

export function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
}

export function hasStoredToken(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN));
}

/** Guarda token y datos del usuario tras iniciar sesión o registrarse. */
export function saveSession(accessToken: string, user: StoredUser) {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
}

/** Cierra la sesión en Supabase y limpia lo guardado en el navegador. */
export async function signOut() {
  try {
    await supabase.auth.signOut();
  } catch {
    // Si Supabase no responde igual cerramos la sesión local.
  }
  clearSession();
}

/** Devuelve un token vigente: Supabase lo renueva solo cuando expira. */
export async function getAccessToken(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getSession();
    if (data.session?.access_token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.session.access_token);
      return data.session.access_token;
    }
  } catch {
    // Se usa el token guardado como respaldo.
  }
  return typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) : null;
}

/** Traduce los mensajes más comunes de Supabase Auth. */
export function translateAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "Correo o contraseña incorrectos.";
  if (m.includes("email not confirmed")) return "Debes confirmar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada.";
  if (m.includes("already registered") || m.includes("already exists")) return "Ya existe una cuenta con ese correo. Inicia sesión.";
  if (m.includes("at least")) return "La contraseña es demasiado corta. Usa al menos 8 caracteres.";
  if (m.includes("rate limit")) return "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.";
  if (m.includes("fetch") || m.includes("network")) return "No se pudo conectar con el servicio de autenticación.";
  return message;
}
