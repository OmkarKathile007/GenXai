
 // Central API client that handles rate limit (429) responses globally.
 

import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8080";

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global response interceptor: catch 429 before it reaches your components
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      const data = error.response.data;
      const minutes = data.retryAfterMinutes || "a few";
      error.rateLimitMessage = `Daily AI limit reached. Try again in ${minutes} minutes.`;
      error.isRateLimit = true;
    }
    return Promise.reject(error);
  }
);

export default apiClient;