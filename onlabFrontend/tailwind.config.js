/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "retro",
      {
        mytheme: {
          primary: "#504ec9",

          secondary: "#113bf7",

          accent: "#35e074",

          neutral: "#1d2535",

          "base-100": "#eaeaeb",

          info: "#73c5e8",

          success: "#1ecca1",

          warning: "#df7b11",

          error: "#db3229",
        },
      },
    ],
  },
};
