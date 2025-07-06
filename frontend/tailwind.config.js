/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepgreen: '#0e372b',
        taupe: '#372c2d',
        cream: '#f9f8f4',
        gray: '#dbdbdb',
      },
      borderRadius: {
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
        'full': '9999px',
      },
      boxShadow: {
        clay: '0 4px 24px 0 rgba(55,44,45,0.10), 0 1.5px 6px 0 rgba(14,55,43,0.10)',
      },
      backgroundImage: {
        'concave-wave': 'linear-gradient(135deg, #f9f8f4 60%, #dbdbdb 100%)',
        'fingerprint': 'repeating-radial-gradient(circle at 50% 60%, #f9f8f4, #dbdbdb 10px, #f9f8f4 20px)',
      },
    },
  },
  plugins: [],
};
