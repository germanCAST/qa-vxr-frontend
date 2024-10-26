import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:5000", // Usa VITE_API_URL o el valor por defecto si no está definido
        changeOrigin: true,
        secure: false, // Puedes cambiar esto a true si tu API requiere HTTPS y tiene certificado válido
      },
    },
  },
});
