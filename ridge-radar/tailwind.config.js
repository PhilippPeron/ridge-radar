/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./lib/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#F9FAFF",
                secondary: "#C6C9D0",
                text: "#131313",
            },
            fontFamily: {
                rblack: ["Roboto-Black", "sans-serif"],
                rbold: ["Roboto-Bold", "sans-serif"],
                rlight: ["Roboto-Light", "sans-serif"],
                rmedium: ["Roboto-Medium", "sans-serif"],
                rregular: ["Roboto", "sans-serif"],
                rthin: ["Roboto-Thin", "sans-serif"],
            },
        },
    },
    plugins: [],
};
