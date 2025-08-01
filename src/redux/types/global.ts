// ===== GLOBAL TYPES =====
// This file contains all type definitions and interfaces used throughout the application

// ===== NAVIGATION TYPES =====
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  ManageData: undefined;
  EmployeeDataEdit: {
    section?:
      | "basic_information"
      | "address"
      | "emergency_contact"
      | "payroll_account"
      | "family"
      | "education"
      | "social_security"
      | "medical_record"
      | "employment_info";
  };
  HistoryPage: undefined;
  HistoryDetailsPage: {
    historyItem: HistoryItemData;
  };
  NotificationPage: undefined;
  SettingsPage: undefined;
  SuccessPage: {
    title: string;
    message: string;
    onPress?: () => void;
  };
};

// ===== AUTH TYPES =====
export interface ESSLoginRequest {
  email: string;
  password: string;
}

export interface ESSLoginResponse {
  status: boolean;
  messages: string;
  data: ESSUser;
  token: {
    access_token: string;
    refresh_token: string;
  };
}

export interface ESSUser {
  email: string;
  employee_id: string;
  employee_name: string;
  employee_position: string;
  organization: string;
  unit: string;
  company_code: string;
  employee_level: string;
  authenticator: string;
  spv_id: string;
  spv_name: string;
  // Optional fields that might be available in profile endpoints
  id?: string;
  username?: string;
  department?: string;
  position?: string;
  company?: string;
  company_address?: string;
  phone_number?: string;
  photo_profile_ess?: string;
  avatar?: string;
}

export interface User {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  position: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  essUser: ESSUser | null;
  loading: boolean;
  error: string | null;
  tokenExpiry: string | null;
  lastLoginTime: string | null;
}

export interface ESSErrorResponse {
  status: false;
  messages: string;
  error_code?: string;
}

// ===== EMPLOYEE DATA TYPES =====
export interface BasicInformation {
  employee_id: string;
  employee_name: string;
  email: string;
  phone_number: string;
  birth_date: string;
  gender: string;
  marital_status: string;
  religion: string;
  nationality: string;
}

export interface Address {
  address_type: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_primary: boolean;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone_number: string;
  email?: string;
  address?: string;
}

export interface PayrollAccount {
  bank_name: string;
  account_number: string;
  account_holder_name: string;
  branch?: string;
}

export interface FamilyMember {
  name: string;
  relationship: string;
  birth_date: string;
  gender: string;
  occupation?: string;
  phone_number?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date?: string;
  gpa?: number;
}

export interface SocialSecurity {
  ssn_number: string;
  issue_date: string;
  expiry_date?: string;
}

export interface MedicalRecord {
  blood_type: string;
  allergies?: string[];
  medical_conditions?: string[];
  emergency_contact: EmergencyContact;
}

export interface EmploymentInfo {
  employee_id: string;
  hire_date: string;
  department: string;
  position: string;
  manager: string;
  salary: number;
  employment_status: string;
}

// ===== NOTIFICATION TYPES =====
export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  timestamp: string;
  isRead: boolean;
  action_url?: string;
}

// ===== HISTORY TYPES =====
export interface HistoryItemData {
  id: string;
  title: string;
  description: string;
  status: "pending" | "approved" | "rejected" | "completed";
  timestamp: string;
  type: "leave" | "overtime" | "timesheet" | "data_update";
  details?: any;
}

// ===== PROFILE TYPES =====
export interface ProfileData {
  employee_name: string;
  email: string;
  phone_number: string;
  company: string;
  company_address: string;
  photo_profile_ess?: string;
  avatar?: string;
  department: string;
  position: string;
  employee_id: string;
}

// ===== DASHBOARD TYPES =====
export interface DashboardData {
  total_leave_days: number;
  used_leave_days: number;
  remaining_leave_days: number;
  overtime_hours: number;
  timesheet_completion: number;
  pending_approvals: number;
}

// ===== GLOBAL STATE TYPES =====
export interface GlobalState {
  loading: boolean;
  error: string | null;
  success: string | null;
}

export interface HomeState {
  dashboardData: DashboardData | null;
  notifications: NotificationItem[];
  recentHistory: HistoryItemData[];
  userProfile: ProfileData | null;
  loading: {
    dashboard: boolean;
    notifications: boolean;
    recentHistory: boolean;
    userProfile: boolean;
  };
  error: string | null;
}

// ===== API RESPONSE TYPES =====
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
}
