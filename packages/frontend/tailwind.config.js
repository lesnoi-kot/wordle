import animated from "tailwindcss-animated";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      xs: "450px",
      ...defaultTheme.screens,
    },
  },
  darkMode: "media",
  plugins: [animated],
};
