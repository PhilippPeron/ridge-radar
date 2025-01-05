/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./lib/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    darkMode: "class", // Enable dark mode
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#F9FAFF",
                    dark: "#131313",
                },
                secondary: {
                    DEFAULT: "#C6C9D0",
                    dark: "#2C2C2C",
                },
                text: {
                    DEFAULT: "#131313",
                    dark: "#F9FAFF",
                },
                active: {
                    DEFAULT: "#4193d9",
                    dark: "#4193d9",
                },
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
