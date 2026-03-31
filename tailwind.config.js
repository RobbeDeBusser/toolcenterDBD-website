/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./contact.html", "./src/**/*.{js,html}"],
  theme: {
    extend: {
      colors: {
        "tool-red": "#cc0000",
        "tool-black": "#111111",
      },
      keyframes: {
        "zoom-hole": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "40%": { opacity: "1" },
          "100%": { transform: "scale(150)", opacity: "0" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "logo-zoom": "zoom-hole 7.2s ease-in forwards",
        "bg-fade": "fade-out 1.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};
