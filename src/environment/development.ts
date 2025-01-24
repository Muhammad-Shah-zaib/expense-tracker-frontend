// root api route
const API_URL = "http://localhost:5113/api";

// transaction
export const FETCH_TRANSACTION_URL = `${API_URL}/Transaction`;
export const TRANSACTION_ENDPOINT = `${API_URL}/Transaction`;
export const MARK_TRANSACTION_ENDPOINT = `${API_URL}/Transaction/` // {id}/mark

// Graph
export const FETCH_LAST_SEVEN_DAYS_DATA_ENDPOINT = `${API_URL}/graph/weekly-summary`

// Login API
export const LOGIN_URL = `${API_URL}/Login`;

// SignUp API
export const SIGN_UP_URL = `${API_URL}/Registration`;
