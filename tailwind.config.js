/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F6F2EB",
        sand: "#EAE2D6",
        ink: "#2A2521",
        oak: "#B88B5A",
        charcoal: "#211D1A",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
      },
      maxWidth: {
        container: "1360px",
      },
      fontSize: {
        display: ["clamp(3rem, 5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "400" }],
        "display-sm": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "400" }],
        h2: ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "400" }],
        h3: ["1.5rem", { lineHeight: "1.35", letterSpacing: "-0.01em", fontWeight: "400" }],
        eyebrow: ["0.75rem", { lineHeight: "1.35", letterSpacing: "0.18em", fontWeight: "500" }],
        body: ["1rem", { lineHeight: "1.65", fontWeight: "400" }],
        "body-lg": ["1.125rem", { lineHeight: "1.65", fontWeight: "400" }],
        small: ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        label: ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.04em", fontWeight: "500" }],
      },
      spacing: {
        section: "6rem",
        "section-md": "8rem",
      },
    },
  },
  plugins: [],
};
