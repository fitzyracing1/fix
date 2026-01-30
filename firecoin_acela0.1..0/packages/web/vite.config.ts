import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative paths so built assets work in Capacitor iOS WKWebView
  base: "./",
  server: { port: 5173 }
});
