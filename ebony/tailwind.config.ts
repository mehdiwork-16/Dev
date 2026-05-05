import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9963C',
          light: '#E8B84B',
          dark: '#A07828',
          muted: 'rgba(201,150,60,0.15)',
          glow: 'rgba(201,150,60,0.35)',
        },
        ebony: {
          black: '#0A0A0A',
          dark: '#111111',
          card: '#161616',
          border: '#2A2A2A',
          muted: '#6B6B6B',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9963C 0%, #E8B84B 50%, #A07828 100%)',
        'gold-radial': 'radial-gradient(ellipse at center, rgba(201,150,60,0.2) 0%, transparent 70%)',
        'dark-gradient': 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
      },
      boxShadow: {
        gold: '0 0 20px rgba(201,150,60,0.3)',
        'gold-lg': '0 0 40px rgba(201,150,60,0.4)',
        card: '0 4px 24px rgba(0,0,0,0.6)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201,150,60,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(201,150,60,0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
export default config
