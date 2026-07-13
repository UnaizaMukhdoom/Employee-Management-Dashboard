import axios from "axios";

// Step 1: Decide the API address to use
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://jsonplaceholder.typicode.com";

// Step 2: Create the shared axios instance, with base settings
const client = axios.create({
  baseURL: apiBaseUrl,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Step 3: Log every outgoing request (helpful while developing)
function logRequest(config) {
  const method = config.method?.toUpperCase();
  const fullUrl = `${config.baseURL}${config.url}`;
  console.log(`[axios] ${method} ${fullUrl}`);
  return config;
}

client.interceptors.request.use(logRequest);

// Step 4: Turn any error into one clear, readable message
function getErrorMessage(error) {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.statusText) {
    return error.response.statusText;
  }
  if (error.message) {
    return error.message;
  }
  return "Unexpected network error";
}

function handleResponseError(error) {
  const message = getErrorMessage(error);
  return Promise.reject(new Error(message));
}

client.interceptors.response.use(
  (response) => response,
  handleResponseError
);

export default client;