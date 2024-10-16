/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        custom: "linear-gradient(to right, #333333, #E0E0E0);",
      },
    },
  },
  plugins: [],
};
