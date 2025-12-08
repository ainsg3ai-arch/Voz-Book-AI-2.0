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
        primary: "#00f2fe", // Neon Blue
        secondary: "#6a5af9", // AI Purple
        "background-dark": "#0d1117", // Charcoal Black Premium
        "surface-dark": "#161b22", 
        "surface-glass": "rgba(255, 255, 255, 0.03)",
        "sonara-text": "#f5f7fa", // Soft White
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #00f2fe 0%, #6a5af9 100%)',
        'gradient-dark': 'linear-gradient(to bottom, #0d1117, #000000)',
        'gradient-glow': 'radial-gradient(circle at center, rgba(106, 90, 249, 0.15) 0%, rgba(13, 17, 23, 0) 70%)',
      },
      boxShadow: {
        'glow': '0 0 25px rgba(0, 242, 254, 0.2)',
        'glow-sm': '0 0 15px rgba(106, 90, 249, 0.15)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'card': '0 20px 40px -10px rgba(0,0,0,0.5)',
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "1.5rem",
        xl: "2rem",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'equalizer': 'equalizer 1s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        equalizer: {
          '0%, 100%': { height: '10%' },
          '50%': { height: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}