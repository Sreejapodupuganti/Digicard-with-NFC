/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",   // <--- VERY important
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};