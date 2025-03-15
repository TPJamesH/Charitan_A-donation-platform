// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF720C",
        black: "#000000",
        white: "#FFFFFF",
        darkorange: "#E4663A",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      height: {
        '1/12': '8.333333%',
        '1/8': '12.5%',
        '1/5': '20%',
      },
      width: {
        '1/7': '14.2857%',
      },
    },
  },
  plugins: [],
};
