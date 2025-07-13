/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9f4",
          100: "#dcf2e3",
          200: "#bce5cc",
          300: "#8dd1a8",
          400: "#57b77f",
          500: "#359f5e",
          600: "#2a8049",
          700: "#23663c",
          800: "#1f5132",
          900: "#1a432a",
          950: "#075933", // Cor principal do projeto
        },
        secondary: {
          50: "#fef7ec",
          100: "#feedd3",
          200: "#fcd9a5",
          300: "#fac06d",
          400: "#f8a133",
          500: "#f29727", // Cor secundária do projeto
          600: "#e3700b",
          700: "#bc550c",
          800: "#964311",
          900: "#783912",
          950: "#411a06",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        foodcampus: {
          primary: "#075933",
          secondary: "#F29727",
          accent: "#f3f4f6",
          neutral: "#1f2937",
          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#f3f4f6",
          info: "#3b82f6",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
}; 