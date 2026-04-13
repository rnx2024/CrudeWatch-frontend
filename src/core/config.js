const viteEnv = typeof import.meta !== "undefined" ? import.meta.env : {};
const nodeEnv = typeof process !== "undefined" ? process.env : {};

export const backendUrl = viteEnv.VITE_BACKEND_URL || nodeEnv.VITE_BACKEND_URL || "";
export const apiKey = viteEnv.VITE_API_KEY || nodeEnv.VITE_API_KEY || "";
