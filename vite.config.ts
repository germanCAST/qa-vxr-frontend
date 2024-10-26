import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar las variables de entorno
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      // Solo usar el proxy durante el desarrollo
      proxy:
        mode === "development"
          ? {
              "/api": env.VITE_API_URL,
            }
          : undefined,
    },
  };
});
