/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    spacing: {
      0: "0px",
      0.5: "4px",
      0.75: "6px",
      1: "8px",
      1.5: "10px",
      2: "12px",
      3: "16px",
      4: "24px",
      5: "32px",
      6: "48px",
    },
    extend: {
      zIndex: {
        100: 999 * 99,
      },
      screens: {
        rg: "960px",
      },
      boxShadow: {
        x: "1px 0 3px 0 rgb(0 0 0 / 0.1), -1px 0 3px 0px rgb(0 0 0 / 0.1)",
        "x-d":
          "1px 0 3px 0 rgb(255 255 255 / 0.07), -1px 0 3px 0px rgb(255 255 255 / 0.07)",
      },
      animation: {
        slideUp: "slideUp .4s ease-in-out",
      },
      keyframes: {
        slideUp: {
          from: { transform: "translate(-50%, 100%)" },
          to: { transform: "translate(-50%, 0)" },
        },
      },
    },
  },
  plugins: [],
};
