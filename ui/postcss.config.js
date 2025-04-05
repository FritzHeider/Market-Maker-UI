module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      config: './tailwind.config.ts' // Point to your Tailwind config file
    },
    autoprefixer: {},
  }
}