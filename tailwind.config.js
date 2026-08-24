/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neutral50: "#e0e0e0",
        neutral100: "#b3b3b3",
        neutral200: "#848484",
        neutral300: "#565656",
        neutral400: "#2b2b2b",
        accent: "#ffd41c",
      },
      fontFamily: {
        plex: ["var(--font-plex)", "serif"],
      },
    },
  },
  plugins: [],
};
