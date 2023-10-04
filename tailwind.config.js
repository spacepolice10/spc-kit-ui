/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/index.css',
    './src/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        prim: '#9FE870',
        primHovering: '#80E142',
        second: '#163300',
        secondHovering: '#0D1F00',
        textPrim: '#222222',
        textSecond: '#6A6C6A',
        pastelPink: '#FFD7EF',
        pastelOrange: '#FFC091',
        pastelBlue: '#A0E1E1',
        pastelGray: '#CDD0CD',
      },

      animation: {
        appear: 'appear 0.15s',
      },
      keyframes: {
        appear: {
          from: {
            transform: 'scale(0.95) translate(0px, 4px)',
            opacity: 0,
          },
          to: {
            transform: 'scale(1) translate(0, 0)',
            opacity: 100,
          },
        },
      },
    },
  },
  plugins: [],
}
