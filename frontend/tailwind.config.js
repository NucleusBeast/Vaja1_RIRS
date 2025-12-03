/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {},
  },

  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#ff00a8",

          "secondary": "#ff4e00",

          "accent": "#007b81",

          "neutral": "#0d2b18",

          "base-100": "#fafeef",

          "info": "#008ebc",

          "success": "#00ffb1",

          "warning": "#e47c00",

          "error": "#e60041",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
}

