/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#13005aff",
        secondary: "#333333ff",
        accent: "#1c82adff",
        success: "#03c988ff",
        background: "#1d1f21ff",
        text: "#f5f5f5ff",
        danger: "#ff1744ff",
      },
    },
  },
  plugins: [],
};
