/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00693E",
          dark: "#004D2C",
          light: "#E6F4ED",
        },
        gold: {
          DEFAULT: "#F5A623",
          hover: "#D4891A",
        },
        text: {
          primary: "#1A1A1A",
          secondary: "#555555",
          muted: "#888888",
        },
        bg: {
          white: "#FFFFFF",
          light: "#F8F9FA",
        },
        border: "#E0E0E0",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        "h1": ["3rem", { lineHeight: "1.15", fontWeight: "700" }],
        "h2": ["2.25rem", { lineHeight: "1.2", fontWeight: "700" }],
        "h3": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        "h4": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "small": ["0.875rem", { lineHeight: "1.5" }],
      },
      spacing: {
        "section": "80px",
        "section-mobile": "48px",
      },
      borderRadius: {
        "card": "8px",
        "btn": "4px",
        "pill": "50px",
      },
      boxShadow: {
        "card": "0 2px 12px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 24px rgba(0,105,62,0.15)",
        "nav": "0 2px 8px rgba(0,0,0,0.1)",
      },
      backgroundImage: {
        "cta-gradient": "linear-gradient(135deg, #00693E 0%, #004D2C 100%)",
        "hero-gradient": "linear-gradient(135deg, #F8FDF9 0%, #FFFFFF 100%)",
      },
    },
  },
  plugins: [],
}
