module.exports = {
  // パージの対象ファイルを設定
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        "Helvetica Neue",
        "Arial",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Noto Sans JP",
        "Segoe UI",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#038B77",
          // dark: '',
        },
        secondary: {
          DEFAULT: "#00D880",
        },
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};
