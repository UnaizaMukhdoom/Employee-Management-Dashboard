import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://jsonplaceholder.typicode.com";

const client = axios.create({
  baseURL: apiBaseUrl,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json"
  }
});

function logRequest(config) {
  const method = config.method?.toUpperCase();
  const fullUrl = `${config.baseURL}${config.url}`;
  console.log(`[axios] ${method} ${fullUrl}`);
  return config;
}

client.interceptors.request.use(logRequest);

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