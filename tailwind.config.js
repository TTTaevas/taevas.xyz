/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    borderWidth: {
      "3": "3px"
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
  important: true
}

