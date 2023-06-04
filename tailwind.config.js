/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      borderWidth: {
        "3": "3px"
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
  important: true
}

