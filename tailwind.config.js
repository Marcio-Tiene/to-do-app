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
        elevation: '0px 0px 17px 5px rgba(0,0,0,0.84)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
