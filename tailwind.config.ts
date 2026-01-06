import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffef5',
          100: '#fffae0',
          200: '#fff6c7',
          300: '#fff19e',
          400: '#FFED4E',
          500: '#FFE500',
          600: '#E6CF00',
          700: '#B8A500',
          800: '#8A7C00',
          900: '#5C5300',
        },
        premium: {
          gold: '#FFED4E',
          lightGold: '#fff19e',
          darkGold: '#FFE500',
          black: '#0a0a0a',
          darkGray: '#1a1a1a',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #FFE500 0%, #FFED4E 50%, #fff19e 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(255, 237, 78, 0.4)',
        'gold-glow-lg': '0 0 40px rgba(255, 237, 78, 0.5)',
        'gold-3d': '0 10px 30px rgba(255, 237, 78, 0.25)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'bubble-rise': 'bubbleRise 8s ease-in-out infinite',
        'bubble-rise-delay-1': 'bubbleRise 10s ease-in-out 1s infinite',
        'bubble-rise-delay-2': 'bubbleRise 12s ease-in-out 2s infinite',
        'bubble-rise-delay-3': 'bubbleRise 9s ease-in-out 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(201, 169, 97, 0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(201, 169, 97, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        bubbleRise: {
          '0%': { 
            transform: 'translateY(100vh) scale(0)',
            opacity: '0'
          },
          '10%': { 
            opacity: '0.6'
          },
          '90%': { 
            opacity: '0.6'
          },
          '100%': { 
            transform: 'translateY(-100vh) scale(1)',
            opacity: '0'
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
