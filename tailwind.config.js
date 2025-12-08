/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          primary: '#00ff9f',
          secondary: '#00ff9f',
          accent: '#0a0a0a',
          text: '#ffffff',
          muted: '#666666',
          border: '#00ff9f40',
          hover: '#00ff9f20',
          background: '#000000',
          card: '#111111',
        }
      },
      fontFamily: {
        'cyber': ['Orbitron', 'sans-serif'],
        'mono': ['Space Mono', 'monospace'],
      },
      boxShadow: {
        'cyber': '0 0 10px theme("colors.cyber.primary")',
        'cyber-lg': '0 0 20px theme("colors.cyber.primary")',
        'cyber-2xl': '0 0 30px theme("colors.cyber.primary")',
      },
      textShadow: {
        'cyber': '0 0 5px theme("colors.cyber.primary")',
        'cyber-lg': '0 0 10px theme("colors.cyber.primary")',
      },
      animation: {
        'pulse-border': 'pulse-border 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-border': {
          '0%, 100%': { borderColor: 'rgba(0, 255, 159, 0.5)' },
          '50%': { borderColor: 'rgba(0, 255, 159, 1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          'from': { textShadow: '0 0 5px #00ff9f, 0 0 10px #00ff9f, 0 0 15px #00ff9f' },
          'to': { textShadow: '0 0 10px #00ff9f, 0 0 20px #00ff9f, 0 0 30px #00ff9f' },
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        '.bg-cyber-background': { backgroundColor: theme('colors.cyber.background') },
        '.bg-cyber-card': { backgroundColor: theme('colors.cyber.card') },
        '.text-cyber-text': { color: theme('colors.cyber.text') },
        '.border-cyber-border': { borderColor: theme('colors.cyber.border') },
      })
    }
  ],
}