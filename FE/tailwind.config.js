/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        luxe: {
          surface: "#fcf9f8",
          container: "#f0eded",
          muted: "#f6f3f2",
          line: "#e5e2e1",
          ink: "#1c1b1b",
          mutedText: "#43474e",
          primary: "#000d22",
          primarySoft: "#002349",
          gold: "#c5a059",
          charcoal: "#212425",
        },
      },
      fontFamily: {
        display: ["Manrope", "Inter", "ui-sans-serif", "system-ui"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};

