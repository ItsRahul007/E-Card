import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        mukta: ['var(--font-mukta)'],
        ubuntu: ['var(--font-ubuntu)'],
        roboto: ['var(--font-roboto)'],
        poppins: ['var(--font-poppins)'],
        nunito: ['var(--font-nunito)'],
        kanit: ['var(--font-kanit)'],
        outfit: ['var(--font-outfit)'],
        rubik: ['var(--font-rubik)'],
        inter: ['var(--font-inter)'],
        noto_sans_khojki: ['var(--font-noto_sans_khojki)'],
      },
      colors: {
        "appTheme-50": "#F0F9FF",
        "appTheme-100": "#E5F6FF",
        "appTheme-200": "#C7EAFF",
        "appTheme-300": "#9ED0FF",
        "appTheme-400": "#7BB8FF",
        "appTheme-500": "#41B4CD",
        "appTheme-600": "#2CA4C8",
        "appTheme-700": "#1A8ABF",
        "appTheme-800": "#0E6AA8",
        "appTheme-900": "#0A498F",

      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
export default config
