import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: import.meta.env.VITE_SUPABASE_URL || "http://localhost:5000", // Usa VITE_API_URL o el valor por defecto si no está definido
        changeOrigin: true,
        secure: false, // Cambiar a true si necesitas que la conexión sea segura
      },
    },
  },
});
