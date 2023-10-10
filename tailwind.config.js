module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
  },
  darkMode: "class",
  plugins: [require("tw-elements/dist/plugin.cjs")]
}