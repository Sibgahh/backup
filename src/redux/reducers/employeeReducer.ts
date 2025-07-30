import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../api";
import {
  apiClient,
  tokenManager,
  handleAuthenticationError,
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

// Helper function to create mock data based on ESS Contract examples
const createMockSectionData = (section: string): any => {
  switch (section) {
    case "basic_information":
      return {
        employee_name: "Sarah Wijaya",
        professional_photo:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        place_of_birth: "Jakarta",
        birth_date: "1990-01-01",
        gender: "female",
        id_number_ktp: "1234567890123456",
        passport_number: "A12345678",
        religion: "Islam",
        marital_status: "Single",
        nationality: "Indonesia",
        clothing_size: "M",
        main_phone_number: "081234567890",
        secondary_phone_number: "081298765432",
        private_email: "sarah.wijaya@gmail.com",
        photo_ktp: "https://example.com/ktp.jpg",
      };

    case "address":
      return {
        official_address: {
          detail: "Jalan Telekomunikasi No.1",
          province: "Jawa Barat",
          city: "Bandung",
          postal_code: "40135",
          sub_district: "Coblong",
          administrative_village: "Dago",
          rt: "003",
          rw: "006",
          street_name: "Jl. Telekomunikasi",
          house_number: "1",
        },
        domicile_address: {
          detail: "Jalan Merdeka No.5",
          province: "DKI Jakarta",
          city: "Jakarta Pusat",
          postal_code: "10210",
          sub_district: "Gambir",
          administrative_village: "Petojo",
          rt: "005",
          rw: "002",
          street_name: "Jl. Merdeka",
          house_number: "5",
        },
      };

    case "emergency_contact":
      return {
        name: "David Chen",
        relationship: "Brother",
        phone_number: "08123456789",
        address: "Jl. Mawar No. 10, Jakarta",
      };

    case "payroll_account":
      return {
        bank_account_number: "1234567890",
        bank_name: "BCA",
        account_holder_name: "Sarah Wijaya",
        tax_status: "TK/0",
        tax_number: "321654987123000",
        npwp_doc: "https://example.com/npwp.jpg",
        saving_book_doc: "https://example.com/tabungan.jpg",
      };

    case "family":
      return [
        {
          name: "Fatimah Azzahra",
          gender: "female",
          birth_date: "1965-10-12",
          place_of_birth: "Bandung",
          address: "Jl. Bunga No. 8",
          occupation: "Ibu Rumah Tangga",
          relation: "Ibu",
          marital_status: "Married",
          member_sequence: 1,
          telkomedika_card_number: "TKM123456",
          telkomedika_member_status: "Active",
          kk_doc: "https://example.com/kk.jpg",
        },
      ];

    case "education":
      return [
        {
          level: "S1",
          major: "Teknik Informatika",
          institution: "Universitas Indonesia",
          start_year: 2008,
          end_year: 2012,
          ijazah_doc: "https://example.com/ijazah_s1.jpg",
        },
      ];

    case "social_security":
      return {
        telkomedika_card_number: "TKM202301",
        bpjs_tk_number: "BPJSTK123456",
        bpjs_tk_effective_date: "2015-01-01",
        bpjs_health_number: "BPJSKES654321",
        telkomedika_doc: "https://example.com/telkomedika.jpg",
        bpjs_doc: "https://example.com/bpjs.jpg",
      };

    case "medical_record":
      return {
        health_status: "Fit",
        last_mcu_date: "2023-06-15",
        blood_type: "O",
        height: 170.5,
        weight: 65.0,
        has_disability: "No",
        head_size: "57 cm",
        health_concern: "Tidak ada",
        medical_treatment_record: "Tidak ada riwayat penyakit berat",
      };

    case "employment_info":
      return {
        nik: "3623243632523",
        nik_telkom: "21462176421",
        business_email: "sarah.wijaya@sigma.co.id",
        directorate: "Corporate IT",
        business_unit: "SCC",
        division: "IT Development",
        grade: "7",
        grade_date: "2020-01-01",
        band_position: "Officer",
        band_position_date: "2018-07-01",
        level: "Officer",
        level_date: "2018-01-01",
        position: "Backend Developer",
        supervisor: "S20250236",
        join_date: "2015-01-01",
        start_date: "2015-02-01",
        terminate_date: null,
        reason_employee_in: "Recruitment",
        reason_employee_out: null,
        status: "Active",
        retirement_date: null,
      };

    default:
      return null;
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

        // Trigger automatic logout
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

      // Check if the response contains the expected employee data structure
      let responseData;
      let hasError = false;
      let errorMessage = "";

      // Handle different response structures
      if (response.hasOwnProperty("status")) {
        // Structure: {"status": true, "data": {...}, "messages": "..."}
        if (!response.status) {
          hasError = true;
          errorMessage =
            response.messages || response.message || "API returned error";
        } else {
          responseData = response.data;
        }
      } else if (response.hasOwnProperty("data")) {
        // Structure: {"data": {...}, "access_token": "...", ...}

        // Check if data contains employee-specific fields
        const data = response.data;
        const hasEmployeeData =
          data &&
          (data.employee_name ||
            data.official_address ||
            data.name ||
            data.bank_account_number ||
            Array.isArray(data) ||
            data.telkomedika_card_number ||
            data.health_status ||
            data.nik);

        if (hasEmployeeData) {
          responseData = data;
          console.log(`✅ Found real employee data for ${section}`);
        } else {
          // No employee data found - API might be returning generic data
          console.warn(
            `⚠️ API returned generic data instead of employee ${section} data.`
          );

          if (__DEV__) {
            // In development, use mock data based on ESS Contract examples
            responseData = createMockSectionData(section);
            console.log(`🔧 Using mock data for ${section}:`, responseData);
          } else {
            // In production, return error
            return rejectWithValue(
              `API did not return ${section} data. Received: ${JSON.stringify(
                data
              )}`
            );
          }
        }
      } else if (response.hasOwnProperty("error")) {
        // Error response structure
        hasError = true;
        errorMessage =
          response.error || response.message || "API returned error";
      } else {
        // Check if the response itself contains employee data
        const hasEmployeeData =
          response &&
          (response.employee_name ||
            response.official_address ||
            response.name ||
            response.bank_account_number ||
            Array.isArray(response) ||
            response.telkomedika_card_number ||
            response.health_status ||
            response.nik);

        if (hasEmployeeData) {
          responseData = response;
          console.log(
            `✅ Response itself contains employee data for ${section}`
          );
        } else {
          console.warn(
            `⚠️ Unknown response structure for ${section}:`,
            response
          );

          if (__DEV__) {
            // In development, use mock data
            responseData = createMockSectionData(section);
            console.log(`🔧 Using mock data for ${section}:`, responseData);
          } else {
            return rejectWithValue(`Unknown response structure for ${section}`);
          }
        }
      }

      if (hasError) {
        console.error("❌ API returned error:", errorMessage);
        return rejectWithValue(errorMessage);
      }

      if (!responseData) {
        console.error("❌ No data available for section:", section);
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
            state.employmentInfo = data;
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
