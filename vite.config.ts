import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifestFilename: "site.webmanifest",
      includeAssets: [
        "logo/favicon-16x16.png",
        "logo/favicon-32x32.png",
        "logo/favicon.ico",
        "logo/apple-touch-icon.png",
        "logo/android-chrome-192x192.png",
        "logo/android-chrome-512x512.png",
        "logo/og-image.jpg",
      ],
      devOptions: {
        enabled: false,
      },
      workbox: {
        globPatterns: ["**/*.{html,css,js,png,svg,ico,webmanifest}"],
        navigateFallback: "index.html",
      },
      manifest: {
        name: "alecsdesign - Professional Web Development",
        short_name: "alecsdesign",
        description: "Professional web development services in Rome, Italy",
        start_url: "/",
        display: "standalone",
        background_color: "#0f172a",
        theme_color: "#1e293b",
        orientation: "portrait-primary",
        scope: "/",
        lang: "en",
        dir: "ltr",
        icons: [
          {
            src: "/logo/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/logo/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        categories: ["business", "productivity", "utilities"],
        shortcuts: [
          {
            name: "Contact",
            short_name: "Contact",
            description: "Get in touch",
            url: "/contact",
            icons: [
              {
                src: "/logo/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
              },
            ],
          },
        ],
      },
    }),
  ],
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
