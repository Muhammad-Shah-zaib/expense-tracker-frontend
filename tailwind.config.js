const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        playpen: ["Playpen Sans", "Roboto", "sans-serif"],
        mulish: ["Mulish", "Roboto", "sans-serif"],
      },
      // extending color scheme
      colors: {
        primary: { ...colors.zinc, DEFAULT: colors.zinc["800"] },
        secondary: { ...colors.teal, DEFAULT: colors.teal["500"] },
        tertiary: { ...colors.emerald, DEFAULT: colors.emerald["500"] },
      },
      // extending the screens for the heights
      screens: {
        "h-sm": { raw: "(min-height: 640px)" },
        "h-md": { raw: "(min-height: 768px)" },
        "h-lg": { raw: "(min-height: 1024px)" },
        // Add more height-based breakpoints as needed
      },
    },
  },
  plugins: [],
};
