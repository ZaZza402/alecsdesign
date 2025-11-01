import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable minification
    minify: "esbuild",
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["lucide-react", "framer-motion"],
          "i18n-vendor": ["i18next", "react-i18next"],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Generate source maps for production debugging (can disable for smaller bundle)
    sourcemap: false,
  },
  // Performance optimizations
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
});
