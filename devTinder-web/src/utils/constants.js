// API Base URL - uses environment variable or falls back to localhost
// In production (Docker), VITE_API_URL should be "/api" to use nginx proxy
// In development, it should be "http://localhost:3000"
export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
