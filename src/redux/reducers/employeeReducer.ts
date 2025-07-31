import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiClient,
  handleAuthenticationError,
  tokenManager,
} from "../actions/authESS";

// ===== TYPES =====
export interface BasicInformation {
  employee_name: string;
  professional_photo: string | null;
  place_of_birth: string;
  birth_date: string;
  gender: string;
  id_number_ktp: string;
  passport_number: string;
  religion: string;
  marital_status: string;
  nationality: string;
  clothing_size: string;
  main_phone_number: string;
  secondary_phone_number: string;
  private_email: string;
  photo_ktp: string | null;
}

export interface Address {
  official_address: {
    detail: string;
    province: string;
    city: string;
    postal_code: string;
    sub_district: string;
    administrative_village: string;
    rt: string;
    rw: string;
    street_name: string;
    house_number: string;
  };
  domicile_address: {
    detail: string;
    province: string;
    city: string;
    postal_code: string;
    sub_district: string;
    administrative_village: string;
    rt: string;
    rw: string;
    street_name: string;
    house_number: string;
  };
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone_number: string;
  address: string;
}

export interface PayrollAccount {
  bank_account_number: string;
  bank_name: string;
  account_holder_name: string;
  tax_status: string;
  tax_number: string;
  npwp_doc: string | null;
  saving_book_doc: string | null;
}

export interface FamilyMember {
  name: string;
  gender: string;
  birth_date: string;
  place_of_birth: string;
  address: string;
  occupation: string;
  relation: string;
  marital_status: string;
  member_sequence: number;
  telkomedika_card_number: string;
  telkomedika_member_status: string;
  kk_doc: string | null;
}

export interface Education {
  level: string;
  major: string;
  institution: string;
  start_year: number;
  end_year: number;
  ijazah_doc: string | null;
}

export interface SocialSecurity {
  telkomedika_card_number: string;
  bpjs_tk_number: string;
  bpjs_tk_effective_date: string;
  bpjs_health_number: string;
  telkomedika_doc: string | null;
  bpjs_doc: string | null;
}

export interface MedicalRecord {
  health_status: string;
  last_mcu_date: string;
  blood_type: string;
  height: number;
  weight: number;
  has_disability: string;
  head_size: string;
  health_concern: string;
  medical_treatment_record: string;
}

export interface EmploymentInfo {
  nik: string;
  nik_telkom: string;
  business_email: string;
  directorate: string;
  business_unit: string;
  division: string;
  grade: string;
  grade_date: string;
  band_position: string;
  band_position_date: string;
  level: string;
  level_date: string;
  position: string;
  supervisor: string;
  join_date: string;
  start_date: string;
  terminate_date: string | null;
  reason_employee_in: string;
  reason_employee_out: string | null;
  status: string;
  retirement_date: string | null;
}

export interface EmployeeState {
  basicInformation: BasicInformation | null;
  address: Address | null;
  emergencyContact: EmergencyContact | null;
  payrollAccount: PayrollAccount | null;
  family: FamilyMember[] | null;
  education: Education[] | null;
  socialSecurity: SocialSecurity | null;
  medicalRecord: MedicalRecord | null;
  employmentInfo: EmploymentInfo | null;
  loading: {
    basicInformation: boolean;
    address: boolean;
    emergencyContact: boolean;
    payrollAccount: boolean;
    family: boolean;
    education: boolean;
    socialSecurity: boolean;
    medicalRecord: boolean;
    employmentInfo: boolean;
  };
  error: string | null;
  rawApiResponse: any; // For debugging
}

// ===== API CONFIG =====
const MOCK_API_BASE_URL =
  "https://apigwsand.telkomsigma.co.id/mockapi/prism/essbe";
const PRODUCTION_API_BASE_URL = "https://ess-api.telkomsigma.co.id/api/v1";
const BASE_URL = __DEV__ ? MOCK_API_BASE_URL : PRODUCTION_API_BASE_URL;

// Update the fetchEmployeeDetails function around line 169-226
const fetchEmployeeDetails = async (section: string, token: string) => {
  const url = `${BASE_URL}/employees/details/${section}`;

  console.log("🔍 Making GET request to:", url);
  console.log(
    "🔑 Using token:",
    token ? `${token.substring(0, 20)}...` : "No token"
  );

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  console.log("📤 Request headers:", headers);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    console.log("📡 Response status:", response.status);
    console.log("📡 Response status text:", response.statusText);
    console.log(
      "📡 Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (response.status === 401) {
      throw new Error("Authentication required - token invalid or expired");
    }

    if (response.status === 200) {
      const responseText = await response.text();
      console.log("📡 Response body (raw):", responseText);

      try {
        const responseJson = JSON.parse(responseText);
        console.log("📡 Response body (parsed):", responseJson);
        return responseJson;
      } catch (parseError) {
        console.error("❌ Failed to parse JSON:", parseError);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }
    } else {
      const errorText = await response.text();
      console.error(
        "❌ HTTP Error:",
        response.status,
        response.statusText,
        errorText
      );
      throw new Error(
        `HTTP ${response.status}: ${response.statusText} - ${errorText}`
      );
    }
  } catch (error) {
    console.error("❌ Network error:", error);
    throw error;
  }
};

// ===== ASYNC THUNKS =====
export const fetchEmployeeSection = createAsyncThunk(
  "employee/fetchSection",
  async (section: string, { rejectWithValue, dispatch }) => {
    try {
      console.log(`🚀 Fetching employee section: ${section}`);

      // Get token from AsyncStorage
      const { accessToken } = await tokenManager.get();

      if (!accessToken) {
        console.error("❌ No authentication token found");
        dispatch(
          handleAuthenticationError(
            "No authentication token found. Please login again."
          )
        );
        return rejectWithValue(
          "No authentication token found. Please login again."
        );
      }

      console.log("🔑 Token found, making API call...");

      // Use the fetch function based on Postman snippet
      const response = await fetchEmployeeDetails(section, accessToken);

      // Store raw response for debugging
      console.log(`🔍 Raw API response for ${section}:`, response);

      // Check for explicit error responses first
      if (response && response.hasOwnProperty("error")) {
        const errorMessage =
          response.error || response.message || "API returned error";
        console.error("❌ API returned error:", errorMessage);
        return rejectWithValue(errorMessage);
      }

      // Simplified response handling - remove complex logic that's causing issues
      let responseData;

      // Check if response has status/data structure
      if (
        response &&
        response.hasOwnProperty("status") &&
        response.hasOwnProperty("data")
      ) {
        // Structure: {"status": true, "data": {...}, "messages": "..."}
        if (!response.status) {
          const errorMessage =
            response.messages || response.message || "API returned error";
          console.error("❌ API status false:", errorMessage);
          return rejectWithValue(errorMessage);
        }
        responseData = response.data;
        console.log(`✅ Using data from status structure for ${section}`);
      }
      // Check if response has only data property (no status)
      else if (
        response &&
        response.hasOwnProperty("data") &&
        !response.hasOwnProperty("status")
      ) {
        // Structure: {"data": {...}, ...}
        responseData = response.data;
        console.log(`✅ Using data from data property for ${section}`);
      }
      // Direct response (like employment_info) - this should handle your case
      else if (response && typeof response === "object") {
        // The response itself is the data
        responseData = response;
        console.log(`✅ Using direct response as data for ${section}`);
      } else {
        console.error("❌ Invalid response format:", response);
        return rejectWithValue(`Invalid response format for ${section}`);
      }

      // Simplified validation - just check if we have any data
      if (!responseData) {
        console.error(
          "❌ responseData is null/undefined for section:",
          section
        );
        return rejectWithValue(`No ${section} data available`);
      }

      if (
        typeof responseData === "object" &&
        responseData !== null &&
        Object.keys(responseData).length === 0
      ) {
        console.error("❌ responseData is empty object for section:", section);
        return rejectWithValue(`No ${section} data available`);
      }

      console.log(`✅ Successfully processed ${section} data:`, responseData);
      return { section, data: responseData, rawResponse: response };
    } catch (error) {
      console.error(`❌ Error fetching ${section}:`, error);
      const errorMessage =
        error instanceof Error ? error.message : "Network error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

// ===== PROFILE ACTIONS =====
export const fetchESSProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { setLoading } = await import("../reducers/globalReducer");
      dispatch(setLoading(true));

      console.log("🔍 Fetching ESS profile...");

      // Get stored token
      const { accessToken } = await tokenManager.get();

      if (!accessToken) {
        console.log("❌ No access token found for profile fetch");
        return rejectWithValue({ messages: "No access token", status: false });
      }

      // API call to fetch profile
      const response = await apiClient.get("/employees/profile", accessToken);

      console.log("📡 ESS Profile API Response:", response);

      if (response.status && response.data) {
        console.log("✅ ESS profile fetch successful");
        return response.data;
      } else {
        const errorMsg = response.messages || "Failed to fetch profile";
        console.log("❌ ESS profile fetch failed:", errorMsg);
        return rejectWithValue({ messages: errorMsg, status: false });
      }
    } catch (error) {
      console.error("❌ ESS profile fetch error:", error);
      return rejectWithValue({
        messages:
          error instanceof Error ? error.message : "Profile fetch failed",
        status: false,
      });
    } finally {
      const { setLoading } = await import("../reducers/globalReducer");
      dispatch(setLoading(false));
    }
  }
);

// ===== INITIAL STATE =====
const initialState: EmployeeState = {
  basicInformation: null,
  address: null,
  emergencyContact: null,
  payrollAccount: null,
  family: null,
  education: null,
  socialSecurity: null,
  medicalRecord: null,
  employmentInfo: null,
  loading: {
    basicInformation: false,
    address: false,
    emergencyContact: false,
    payrollAccount: false,
    family: false,
    education: false,
    socialSecurity: false,
    medicalRecord: false,
    employmentInfo: false,
  },
  error: null,
  rawApiResponse: null,
};

// ===== SLICE =====
const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    clearEmployeeData: (state) => {
      state.basicInformation = null;
      state.address = null;
      state.emergencyContact = null;
      state.payrollAccount = null;
      state.family = null;
      state.education = null;
      state.socialSecurity = null;
      state.medicalRecord = null;
      state.employmentInfo = null;
      state.error = null;
      state.rawApiResponse = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeSection.pending, (state, action) => {
        const section = action.meta.arg;
        const loadingKey = getSectionLoadingKey(section);
        if (loadingKey) {
          state.loading[loadingKey] = true;
        }
        state.error = null;
        console.log(`⏳ Loading ${section}...`);
      })
      .addCase(fetchEmployeeSection.fulfilled, (state, action) => {
        const { section, data, rawResponse } = action.payload;
        const loadingKey = getSectionLoadingKey(section);

        if (loadingKey) {
          state.loading[loadingKey] = false;
        }

        // Store raw response for debugging
        state.rawApiResponse = rawResponse;

        // Map section to state property
        switch (section) {
          case "basic_information":
            state.basicInformation = data;
            break;
          case "address":
            state.address = data;
            break;
          case "emergency_contact":
            state.emergencyContact = data;
            break;
          case "payroll_account":
            state.payrollAccount = data;
            break;
          case "family":
            state.family = data;
            break;
          case "education":
            state.education = data;
            break;
          case "social_security":
            state.socialSecurity = data;
            break;
          case "medical_record":
            state.medicalRecord = data;
            break;
          case "employment_info":
            state.employmentInfo = {
              ...data,
              nik: String(data.nik),
              nik_telkom: String(data.nik_telkom),
              grade: String(data.grade),
            };
            console.log(
              `✅ Stored employment_info in Redux:`,
              state.employmentInfo
            );
            break;
        }

        console.log(`✅ Successfully loaded ${section} data`);
      })
      .addCase(fetchEmployeeSection.rejected, (state, action) => {
        const section = action.meta.arg;
        const loadingKey = getSectionLoadingKey(section);

        if (loadingKey) {
          state.loading[loadingKey] = false;
        }

        state.error = action.payload as string;
        console.error(`❌ Failed to load ${section}:`, action.payload);
      });
  },
});

// Helper function to map section name to loading key
function getSectionLoadingKey(
  section: string
): keyof EmployeeState["loading"] | null {
  switch (section) {
    case "basic_information":
      return "basicInformation";
    case "address":
      return "address";
    case "emergency_contact":
      return "emergencyContact";
    case "payroll_account":
      return "payrollAccount";
    case "family":
      return "family";
    case "education":
      return "education";
    case "social_security":
      return "socialSecurity";
    case "medical_record":
      return "medicalRecord";
    case "employment_info":
      return "employmentInfo";
    default:
      return null;
  }
}

export const { clearEmployeeData, clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
