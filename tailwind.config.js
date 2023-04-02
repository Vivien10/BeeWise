/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
      colors: {
        "accent-yellow": "#facc15",
        "accent-green": "#115e59",
        "dark-grey": "#262626",
      },
      gridTemplateColumns: {
        card: "repeat(auto-fit, minmax(320px, 500px))",
      },
      boxShadow: {
        "sidebar-label": "9px 2px 19px -9px rgba(0,0,0,0.42)",
        "users-sidebar-label": "-9px 2px 19px -9px rgba(0,0,0,0.42)",
      },
    },
  },
  plugins: [],
}
