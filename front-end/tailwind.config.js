module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   darkMode: false, 
   theme: {
     extend: {
      colors:{
        'Trippant-1-hex': '#3B3C40',
        'Trippant-2-hex': '#0A0B0D',
        'Trippant-3-hex': '#73221A',
        'Trippant-4-hex': '#F23535',
        'Trippant-5-hex': '#BFBFBF',
      }
     },
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }