/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wipe: {
          "0%": { transform: "translate(-100%)" },
          "100%": { transform: "translate(100%)" },
        },
      },
      animation: {
        wipe: "wipe 2.5s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite",
      },
    },
  },
  plugins: [],
};
