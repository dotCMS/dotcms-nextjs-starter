module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    ...Array(13)
      .fill(0)
      .flatMap((el, i) => [`col-start-${i + 1}`, `col-end-${i + 1}`]),
  ],
  theme: {
    extend: {
      fontSize: {
        xs: ['0.625rem', '1rem'],
      },
      colors: {
        'dot-purple': '#c336e5',
        'dot-purple-80': '#CE5DEA',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
