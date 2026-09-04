import { 
  FileText, 
  Target, 
  Mail, 
  MessageSquare, 
  History, 
  LayoutDashboard 
} from "lucide-react";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const STORAGE_KEYS = {
  AUTH_TOKEN: "career_copilot_token",
  USER_DATA: "career_copilot_user",
} as const;

export const APP_ROUTES = {
  HOME: "/dashboard",
  LOGIN: "/login",
  REGISTER: "/register",
  ATS: "/ats",
  JOB_MATCH: "/job-match",
  EMAIL: "/email",
  ENTREVISTA: "/entrevista",
  HISTORIAL: "/historial",
} as const;

export const NAV_ITEMS = [
  { label: "Dashboard", href: APP_ROUTES.HOME, icon: LayoutDashboard },
  { label: "Diagnóstico ATS", href: APP_ROUTES.ATS, icon: FileText },
  { label: "Job Match", href: APP_ROUTES.JOB_MATCH, icon: Target },
  { label: "Generador Email", href: APP_ROUTES.EMAIL, icon: Mail },
  { label: "Entrevista IA", href: APP_ROUTES.ENTREVISTA, icon: MessageSquare },
  { label: "Historial", href: APP_ROUTES.HISTORIAL, icon: History },
];