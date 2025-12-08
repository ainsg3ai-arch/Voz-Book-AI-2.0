/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#3AB8FF", // Neon Blue
        secondary: "#7C3AED",
        "background-dark": "#0C1115", // Deep Dark Premium
        "surface-dark": "#151e26", 
        "surface-glass": "rgba(255, 255, 255, 0.03)",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #3AB8FF 0%, #0066CC 100%)',
        'gradient-dark': 'linear-gradient(to bottom, #0C1115, #000000)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(58, 184, 255, 0.3)',
        'glow-sm': '0 0 10px rgba(58, 184, 255, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "1.5rem",
        xl: "2rem",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'equalizer': 'equalizer 1s ease-in-out infinite',
      },
      keyframes: {
        equalizer: {
          '0%, 100%': { height: '10%' },
          '50%': { height: '100%' },
        }
      }
    },
  },
  plugins: [],
}