/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // Primary Color - Single bold accent (professional blue)
        primary: {
          DEFAULT: "#2563EB", // Professional blue (main accent)
          light: "#3B82F6", // Lighter variant
          dark: "#1E40AF", // Darker variant
          50: "#EFF6FF",
          100: "#DBEAFE",
          600: "#2563EB", // Main color
          700: "#1D4ED8",
        },
        // Secondary Colors - Neutral palette
        secondary: {
          light: "#F8FAFC", // Very light background
          DEFAULT: "#F1F5F9", // Light gray background
          dark: "#0F172A", // Deep dark for contrast
        },
        // Background hierarchy - cleaner
        background: {
          main: "#FFFFFF", // Pure white
          alt: "#F8FAFC", // Subtle gray (not blue-tinted)
          accent: "#EFF6FF", // Very subtle blue tint when needed
        },
        // Text colors - Strong hierarchy
        text: {
          primary: "#0F172A", // Almost black
          secondary: "#475569", // Medium gray
          light: "#64748B", // Light gray
          muted: "#94A3B8", // Very light gray
        },
        // Border colors - subtle
        border: {
          light: "#E2E8F0", // Light gray border
          DEFAULT: "#CBD5E1", // Default border
          dark: "#94A3B8", // Darker border
        },
      },
      animation: {
        "gradient-text": "gradient-text 5s ease infinite",
      },
      keyframes: {
        "gradient-text": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [],
};
