/* eslint-disable global-require */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        neumorph: '19px 19px 37px #b3b3b3,-19px -19px 37px #ffffff',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
