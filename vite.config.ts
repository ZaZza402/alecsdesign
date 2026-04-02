import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable minification with esbuild (faster and sufficient)
    minify: "esbuild",
    // Enable code splitting with optimized chunks
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "router-vendor": ["react-router-dom"],
          "motion-vendor": ["framer-motion"],
          "icons-vendor": ["lucide-react"],
          "i18n-vendor": ["i18next", "react-i18next"],
        },
        // Give locale chunks predictable names for better cache headers
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name?.startsWith("locales/")) {
            return "assets/[name]-[hash].js";
          }
          return "assets/[name]-[hash].js";
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Disable source maps for smaller bundle
    sourcemap: false,
    // Target modern browsers for better optimization
    target: "es2020",
  },
  // Performance optimizations
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
    exclude: ["framer-motion"], // Don't pre-bundle heavy deps
  },
});
