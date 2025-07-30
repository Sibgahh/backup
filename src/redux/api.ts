// API Endpoints for other services
export const API_ENDPOINTS = {
  // Profile
  PROFILE: {
    GET: "/employees/profile",
    UPDATE_PHOTO: "/employees/profile",
    GET_DETAILS: (section: string) => `/employees/details/${section}`,
    UPDATE_SECTION: (section: string) => `/employees/details/${section}`,
    SUBMIT_REQUEST: (section: string) =>
      `/employees/details/${section}/submit-request`,
  },

  // Update History
  HISTORY: {
    LIST: "/employees/update-history",
    DETAIL: (requestId: string) => `/employees/update-history/${requestId}`,
    DOWNLOAD: (requestId: string) =>
      `/employees/update-history/${requestId}/download`,
    EDIT: (requestId: string) => `/employees/update-history/${requestId}/edit`,
  },

  // Documents
  DOCUMENTS: {
    DOWNLOAD: (type: string) => `/documents/download/${type}`,
  },

  // Export
  EXPORT: {
    PDF: "/employee/export",
  },

  // Consent
  CONSENT: {
    SUBMIT: "/consent",
  },
} as const;

// Re-export the API client from authESS
export { apiClient } from "./actions/authESS";
