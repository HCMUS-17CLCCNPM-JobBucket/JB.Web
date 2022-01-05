module.exports = {
  // mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "app/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        my: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
