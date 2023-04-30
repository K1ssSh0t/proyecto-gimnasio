/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./react_components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2a84c9",

          secondary: "#0b308e",

          accent: "#51d68d",

          neutral: "#292A32",

          "base-100": "#F8F9FC",

          info: "#36B6DD",

          success: "#1DDDA3",

          warning: "#EA932A",

          error: "#FA053E",
        },
        dark: {
          primary: "#661AE6",

          secondary: "#D926AA",

          accent: "#1FB2A5",

          neutral: "#191D24",

          "base-100": "#2A303C",

          info: "#3ABFF8",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#dc2626",
        },
      },
    ],
  },
  darkTheme: "dark",
  plugins: [require("daisyui")],
};
