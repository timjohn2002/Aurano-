import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3440px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Aurano brand colors
        beige: "#F5F0E6",
        black: "#000000",
        white: "#FFFFFF",
      },
      fontFamily: {
        serif: ["Neue Montreal Medium", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        '10xl': ['10rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '208': '52rem',
        '224': '56rem',
        '240': '60rem',
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
        "auto-rotate": "autoRotate 8s ease-in-out infinite",
        "auto-scroll": "autoScroll 30s ease-in-out infinite",
        "light-strike": "lightStrike 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        autoRotate: {
          "0%": { transform: "rotateY(0deg)" },
          "25%": { transform: "rotateY(2deg)" },
          "50%": { transform: "rotateY(0deg)" },
          "75%": { transform: "rotateY(-2deg)" },
          "100%": { transform: "rotateY(0deg)" },
        },
        autoScroll: {
          "0%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-22.2%)" },
          "40%": { transform: "translateX(-44.4%)" },
          "60%": { transform: "translateX(-66.6%)" },
          "80%": { transform: "translateX(-72%)" },
          "100%": { transform: "translateX(0)" },
        },
        lightStrike: {
          "0%": { boxShadow: "0 0 0 0 #F5F0E6, 0 0 0 0 #F5F0E6, 0 0 0 0 #F5F0E6, 0 0 0 0 #F5F0E6" },
          "25%": { boxShadow: "0 0 0 2px #F5F0E6, 0 0 0 0 #F5F0E6, 0 0 0 0 #F5F0E6, 0 0 0 0 #F5F0E6" },
          "50%": { boxShadow: "0 0 0 0 #F5F0E6, 0 0 0 2px #F5F0E6, 0 0 0 0 #F5F0E6, 0 0 0 0 #F5F0E6" },
          "75%": { boxShadow: "0 0 0 0 #F5F0E6, 0 0 0 0 #F5F0E6, 0 0 0 2px #F5F0E6, 0 0 0 0 #F5F0E6" },
          "100%": { boxShadow: "0 0 0 0 #F5F0E6, 0 0 0 0 #F5F0E6, 0 0 0 0 #F5F0E6, 0 0 0 2px #F5F0E6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
