// Global Types
export interface LoginMessage {
  message: string;
  type: "success" | "error" | "info" | "warning";
  visible: boolean;
}

export interface ErrorMessage {
  message: string;
  visible: boolean;
}

export interface ToastMessage {
  message: string;
  type: "success" | "error" | "info";
  visible: boolean;
  duration: number;
}

export type AppTheme = "light" | "dark";
export type AppLanguage = "en" | "id";

// ESS Contract Auth Types - PROPERLY EXPORTED
export interface ESSUser {
  employee_id: string;
  employee_name: string;
  email: string;
  employee_level: string;
  employee_position: string;
  unit: string;
  organization: string;
  spv_id: string;
  spv_name: string;
  company_code: string;
  authenticator: string;
}

export interface ESSLoginCredentials {
  email: string;
  password: string;
}

export interface ESSLoginRequest {
  email: string;
  password: string;
}

export interface ESSLoginResponse {
  status: boolean;
  messages: string;
  data: ESSUser & {
    access_token: string;
    refresh_token: string;
  };
}

export interface ESSErrorResponse {
  status: boolean;
  messages: string | { [key: string]: string[] };
  message?: string;
}

// Legacy types for backward compatibility
export interface User {
  id: string;
  email: string;
  name: string;
  employeeId: string;
  department: string;
  position: string;
  avatar?: string;
  nik?: string;
  nikTelkom?: string;
  businessEmail?: string;
  birthPlace?: string;
  birthDate?: string;
  religion?: string;
  gender?: string;
  joinDate?: string;
  startDate?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface UserPreferences {
  language: AppLanguage;
  notifications: boolean;
  theme: AppTheme;
  autoSync: boolean;
}

export interface LoginData {
  loginTime: string;
  method: "credentials" | "biometric" | "sso";
  deviceInfo?: string;
}

// Auth State Interface
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  essUser: ESSUser | null;
  loading: boolean;
  error: ESSErrorResponse | null;
  tokenExpiry: string | null;
  lastLoginTime: string | null;
}
export interface ProfileData {
  // Legacy fields (from login response)
  employee_id?: string;
  employee_name: string;
  email: string;
  employee_level?: string;
  employee_position?: string;
  unit?: string;
  organization?: string;
  spv_id?: string;
  spv_name?: string;
  company_code?: string;
  authenticator?: string;
  avatar?: string;

  // New fields from profile API response
  company?: string;
  company_address?: string;
  phone_number?: number;
  photo_profile_ess?: string;
}

export interface ProfileResponse {
  status: boolean;
  messages: string;
  data: ProfileData;
}

export interface HistoryItem {
  request_id: string;
  update: string;
  status: string;
  date_change: string;
  approved_at: string | null;
  reviewer: string | null;
  reason_update: string;
}

export interface HistoryResponse {
  status_summary: {
    approved: number;
    rejected: number;
    draft: number;
    waiting_approval: number;
  };
  data: HistoryItem[];
}
