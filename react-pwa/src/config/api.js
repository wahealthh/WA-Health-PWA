// Base URLs for different environments
const API_BASE = {
  local: "http://localhost:8000",
  development: "https://recall-backend.wahealth.co.uk",
  staging: "https://staging.recall-backend.wahealth.co.uk",
  production: "https://recall-backend.wahealth.co.uk",
};

const AUTH_BASE = {
  local: "http://localhost:8001",
  development: "https://auth.wahealth.co.uk",
  staging: "https://staging.auth.wahealth.co.uk",
  production: "https://auth.wahealth.co.uk",
};

// Determine current environment
// Use LOCAL_API env var or fallback to the mode
// const ENV =
//   import.meta.env.VITE_USE_LOCAL_API === "true"
//     ? "local"
//     : import.meta.env.MODE || "development";

// Construct base URLs based on environment
// const API_URL = API_BASE["local"];
// const AUTH_URL = AUTH_BASE["local"];

// dev base urls
const API_URL = API_BASE["development"];
const AUTH_URL = AUTH_BASE["development"];

// API endpoints grouped by category
export const API_ENDPOINTS = {
  auth: {
    token: `${AUTH_URL}/auth/token`,
    logout: `${AUTH_URL}/auth/logout`,
    resetPassword: (token) => `${AUTH_URL}/auth/reset-password-form/${token}`,
  },
  admin: {
    register: `${API_URL}/admin/register`,
    me: `${API_URL}/admin/me`,
  },
  practice: {
    register: `${API_URL}/practice/register`,
  },
  patients: {
    duePatients: `${API_URL}/patients/due_patients`,
    calls: (limit = "") =>
      `${API_URL}/patients/calls${limit ? `?limit=${limit}` : ""}`,
    callPatient: `${API_URL}/patients/call_patient`,
    callDuePatients: `${API_URL}/patients/call_due_patients`,
    demoCall: `${API_URL}/patients/demo/call`,
    recalls: `${API_URL}/recalls`,
  },
  recalls: {
    groups: `${API_URL}/recall/groups`,
    groupPatients: (groupId) => `${API_URL}/recall/groups/${groupId}/patients`,
  },
};

export default API_ENDPOINTS;
