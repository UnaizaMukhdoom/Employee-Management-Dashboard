import axios from "axios";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://jsonplaceholder.typicode.com";

const client = axios.create({
  baseURL: apiBaseUrl,
  timeout: 8000,
});

export default client;
