module.exports = {
  // パージの対象ファイルを設定
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {},
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00A28A",
          // dark: '',
        },
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};
