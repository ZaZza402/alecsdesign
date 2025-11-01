/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // Primary Colors - Richer, more saturated blue & green
        primary: {
          blue: "#3B82F6", // Rich blue (was too light before)
          green: "#10B981", // Vibrant green (was too pastel)
        },
        // Secondary Colors - Better contrast
        secondary: {
          light: "#F0F9FF", // Light blue tint background
          dark: "#0F172A", // Deeper dark for stronger contrast
        },
        // Background hierarchy
        background: {
          main: "#FFFFFF", // Pure white main background
          alt: "#DBEAFE", // Light blue alternative (more presence)
        },
        // Text colors - Improved contrast
        text: {
          primary: "#0F172A", // Dark slate for main text
          secondary: "#475569", // Darker medium gray (better readability)
          light: "#64748B", // Medium gray for subtle text
        },
        // Border colors
        border: {
          light: "#BFDBFE", // Light blue border
          DEFAULT: "#93C5FD", // Blue-tinted border
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
