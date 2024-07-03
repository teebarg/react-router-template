// import { nextui } from "@nextui-org/theme";
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: "var(--font-inter)",
                display: "var(--font-lexend)",
            },
        },
    },
    plugins: [
        nextui({
            themes: {
                dark: {
                    colors: {
                        primary: {
                            DEFAULT: "#BB86FC",
                            foreground: "#FFFFFF",
                        },
                        secondary: {
                            DEFAULT: "#03DAC6",
                            foreground: "#000000",
                        },
                        background: {
                            DEFAULT: "#121212",
                            // paper: "#1F2937",
                        },
                    },
                },
                light: {
                    colors: {
                        primary: {
                            DEFAULT: "#6200EE",
                            foreground: "#FFFFFF",
                        },
                        secondary: {
                            DEFAULT: "#03DAC6",
                            foreground: "#000000",
                        },
                        background: {
                            DEFAULT: "#FFFFFF",
                            foreground: "#000000",
                            // paper: "#1F2937",
                        },
                        content1: {
                            DEFAULT: "#F1F1F1",
                            foreground: "#000000",
                            // focus: "#000",
                        },
                    },
                },
            },
        }),
    ],
};
