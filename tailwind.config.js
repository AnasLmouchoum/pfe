module.exports = {
  // mode: 'jit',
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // false or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
