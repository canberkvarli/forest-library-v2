import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load environment variables correctly without using process
  const env = loadEnv(mode, import.meta.url, "VITE_");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:5001",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
