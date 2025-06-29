// root api route
const API_URL = "http://localhost:5113/api";

// transaction
export const FETCH_TRANSACTION_URL = `${API_URL}/Transaction`;
export const TRANSACTION_ENDPOINT = `${API_URL}/Transaction`;
export const MARK_TRANSACTION_ENDPOINT = `${API_URL}/Transaction/` // {id}/mark
export const UN_MARK_TRANSACTION_ENDPOINT = `${API_URL}/Transaction/` // {id}/mark
export const FETCH_TRANSACTION_WITH_DATE_ENDPOINT = `${API_URL}/Transaction/summary`; 
export const FETCH_CREDITS_SUMMARY_ENDPOINT = `${API_URL}/Transaction/summary-credits`; // {id}
export const DELETE_TRANSACTION_URL = `${API_URL}/Transaction`; // {id}
export const UPDATE_TRANSACTION_URL = `${API_URL}/Transaction`; // {id}

// Graph
export const FETCH_LAST_SEVEN_DAYS_DATA_ENDPOINT = `${API_URL}/graph/weekly-summary`
export const FETCH_LAST_MONTH_REPORT_ENDPOINT = `${API_URL}/graph/last-month-credit-debit-summary`
export const FETCH_PREV_5_MONTHS_DATA_ENDPOINT = `${API_URL}/graph/previous-5-month-summary`
export const FETCH_LAST_MONTH_CATEGORY_SUMMARY_ENDPOINT = `${API_URL}/graph/category-wise-summary`; // Adjust based on your actual API endpoint
export const FETCH_CUSTOM_GRAPH_SUMMARY_ENDPOINT = `${API_URL}/graph/summary`;

// Login API
export const LOGIN_URL = `${API_URL}/Login`;

// SignUp API
export const SIGN_UP_URL = `${API_URL}/Registration`;
